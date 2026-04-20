import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { Package, Truck, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { GENERATE_SHIPPING_LABEL, UPDATE_ORDER_STATUS } from '@/lib/graphql';

interface OrderItem {
  orderItemId: string;
  quantity: number;
  priceAtPurchase: number;
  variant: {
    variantId: string;
    sku: string;
    price: number;
    product: {
      productId: string;
      name: string;
      description?: string;
    };
  };
}

interface OrderDetailsProps {
  order: {
    orderId: string;
    shopifyOrderId?: number;
    customerName: string;
    shippingAddress: string;
    totalAmount: number;
    status: string;
    orderDate: string;
    orderItems: OrderItem[];
  };
  onStatusChange?: (newStatus: string) => void;
}

export default function OrderDetails({ order, onStatusChange }: OrderDetailsProps) {
  const [isGeneratingLabel, setIsGeneratingLabel] = useState(false);
  const [labelGenerated, setLabelGenerated] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null);

  const [generateLabel] = useMutation<{
    generateShippingLabel: {
      success: boolean;
      trackingNumber: string;
      message?: string;
    };
  }>(GENERATE_SHIPPING_LABEL);
  const [updateStatus] = useMutation(UPDATE_ORDER_STATUS);

  const handleGenerateLabel = async () => {
    setIsGeneratingLabel(true);
    try {
      const result = await generateLabel({
        variables: { orderId: order.orderId },
      });

      if (result.data?.generateShippingLabel?.success) {
        setLabelGenerated(true);
        setTrackingNumber(result.data.generateShippingLabel.trackingNumber);
        toast.success(
          `Shipping label generated! Tracking: ${result.data.generateShippingLabel.trackingNumber}`
        );

        // Automatically update order status to "Shipped"
        await updateStatus({
          variables: {
            orderId: order.orderId,
            newStatus: 'Shipped',
          },
        });

        if (onStatusChange) {
          onStatusChange('Shipped');
        }
      } else {
        toast.error(result.data?.generateShippingLabel?.message || 'Failed to generate label');
      }
    } catch (error) {
      toast.error('Error generating shipping label');
      console.error('Error:', error);
    } finally {
      setIsGeneratingLabel(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-green-100 text-green-800';
      case 'fulfilled':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-card-foreground">
                Order #{order.shopifyOrderId || order.orderId.slice(0, 8)}
              </CardTitle>
              <CardDescription>
                Placed on {new Date(order.orderDate).toLocaleDateString()}
              </CardDescription>
            </div>
            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Customer</p>
              <p className="font-medium text-card-foreground">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="font-medium text-card-foreground">${order.totalAmount.toFixed(2)}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Shipping Address</p>
            <p className="font-medium text-card-foreground">{order.shippingAddress}</p>
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Package className="w-5 h-5" />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {order.orderItems.map((item) => (
              <div
                key={item.orderItemId}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-card-foreground">{item.variant.product.name}</p>
                  <p className="text-sm text-muted-foreground">SKU: {item.variant.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-card-foreground">Qty: {item.quantity}</p>
                  <p className="text-sm text-muted-foreground">
                    ${item.priceAtPurchase.toFixed(2)} each
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fulfillment Actions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Truck className="w-5 h-5" />
            Fulfillment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {labelGenerated ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="text-green-600 mt-0.5">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-green-900">Shipping Label Generated</p>
                  <p className="text-sm text-green-700 mt-1">
                    Tracking Number: <span className="font-mono font-semibold">{trackingNumber}</span>
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 gap-2"
                    onClick={() => toast.info('Download label functionality would be implemented here')}
                  >
                    <Download className="w-4 h-4" />
                    Download Label
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Generate a shipping label via EasyPost to mark this order as shipped.
              </p>
              <Button
                onClick={handleGenerateLabel}
                disabled={isGeneratingLabel || order.status.toLowerCase() === 'shipped'}
                className="gap-2"
              >
                <Truck className="w-4 h-4" />
                {isGeneratingLabel ? 'Generating...' : 'Generate Shipping Label'}
              </Button>
            </div>
          )}

          {order.status.toLowerCase() !== 'shipped' && order.status.toLowerCase() !== 'fulfilled' && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Order status will be automatically updated to "Shipped" when you generate a label.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
