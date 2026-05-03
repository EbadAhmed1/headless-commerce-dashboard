import { useQuery } from '@apollo/client/react';
import { Loader2, Package, Warehouse } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { GET_INVENTORY } from '@/lib/graphql';

interface InventoryItem {
  inventoryId: string;
  variantId: string;
  binId: string;
  quantity: number;
  lastUpdated: string;
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
      <div className="space-y-6 page-enter">
        <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/80 backdrop-blur-sm px-5 py-4 shadow-sm">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Inventory</h1>
            <p className="text-muted-foreground mt-1">Manage your stock levels and warehouse bins.</p>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4">
            <Skeleton className="h-28 w-full rounded-xl shimmer" />
            <Skeleton className="h-28 w-full rounded-xl shimmer" />
            <Skeleton className="h-28 w-full rounded-xl shimmer" />
          </div>
        ) : inventory.length === 0 ? (
            <Card className="bg-card/90 border-border/70 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Warehouse className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No inventory records found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {inventory.map((item) => (
              <Card key={item.inventoryId} className="surface-card surface-card-hover stagger-enter">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <CardTitle className="text-base">
                        Variant {item.variantId.slice(0, 8)}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Bin: {item.binId.slice(0, 8)}
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
                    <span>Inventory ID: {item.inventoryId.slice(0, 8)}</span>
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
