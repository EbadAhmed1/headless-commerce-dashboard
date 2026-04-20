import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { ChevronRight, Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import OrderDetails from '@/components/OrderDetails';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GET_ORDERS } from '@/lib/graphql';

interface Order {
  orderId: string;
  shopifyOrderId?: number;
  customerName: string;
  shippingAddress: string;
  totalAmount: number;
  status: string;
  orderDate: string;
  orderItems: any[];
}

export default function OrdersPage() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const { data, loading, error } = useQuery(GET_ORDERS, {
    variables: {
      order: [{ orderDate: 'DESC' }],
    },
  });

  const orders: Order[] = data?.orders || [];
  const selectedOrder = orders.find((o) => o.orderId === selectedOrderId);

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

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-red-600">Error loading orders: {error.message}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-2">
            Manage and fulfill customer orders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Recent Orders</CardTitle>
                <CardDescription>
                  {loading ? 'Loading...' : `${orders.length} orders`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    {orders.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No orders found
                      </p>
                    ) : (
                      orders.map((order) => (
                        <button
                          key={order.orderId}
                          onClick={() => setSelectedOrderId(order.orderId)}
                          className={`w-full text-left p-3 rounded-lg border transition-colors ${
                            selectedOrderId === order.orderId
                              ? 'bg-primary/10 border-primary'
                              : 'border-border hover:bg-secondary'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-card-foreground truncate">
                                #{order.shopifyOrderId || order.orderId.slice(0, 8)}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {order.customerName}
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-card-foreground">
                              ${order.totalAmount.toFixed(2)}
                            </span>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-2">
            {selectedOrder ? (
              <OrderDetails
                order={selectedOrder}
                onStatusChange={() => {
                  // Refetch orders after status change
                }}
              />
            ) : (
              <Card className="bg-card border-border">
                <CardContent className="flex items-center justify-center h-96">
                  <p className="text-muted-foreground">Select an order to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
