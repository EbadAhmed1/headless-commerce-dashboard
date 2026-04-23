import { useQuery } from '@apollo/client/react';
import { Loader2, Package, Warehouse } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GET_INVENTORY } from '@/lib/graphql';

interface InventoryItem {
  inventoryId: string;
  variantId: string;
  binId: string;
  quantity: number;
  lastUpdated: string;
  variant?: {
    variantId: string;
    sku: string;
    product?: {
      name: string;
    };
  };
  bin?: {
    binId: string;
    name: string;
    locationDescription: string;
  };
}

export default function InventoryPage() {
  const { data, loading, error } = useQuery(GET_INVENTORY, {
    variables: {
      order: [{ lastUpdated: 'DESC' }],
    },
  });

  const inventory: InventoryItem[] = data?.inventory || [];

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center py-12 text-red-500">
          Error loading inventory: {error.message}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inventory</h1>
            <p className="text-muted-foreground mt-1">Manage your stock levels and warehouse bins.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : inventory.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Warehouse className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No inventory records found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {inventory.map((item) => (
              <Card key={item.inventoryId}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <CardTitle className="text-base">
                        {item.variant?.product?.name || 'Unknown Product'}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        SKU: {item.variant?.sku || 'N/A'} · Bin: {item.bin?.name || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={item.quantity <= 10 ? 'destructive' : item.quantity <= 25 ? 'secondary' : 'default'}
                  >
                    {item.quantity} units
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Location: {item.bin?.locationDescription || 'Not specified'}</span>
                    <span>Updated: {new Date(item.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
