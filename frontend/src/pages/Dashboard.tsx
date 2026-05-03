import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { BarChart3, Package, ShoppingCart, TrendingUp, RefreshCw, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import DashboardLayout from '@/components/DashboardLayout';
import { GET_ORDERS, GET_PRODUCTS, GET_INVENTORY, SYNC_SHOPIFY_DATA } from '@/lib/graphql';

export default function Dashboard() {
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const { data: ordersData, loading: ordersLoading, refetch: refetchOrders } = useQuery(GET_ORDERS, {
    variables: { order: [{ orderDate: 'DESC' }] },
  });
  const { data: productsData, loading: productsLoading, refetch: refetchProducts } = useQuery(GET_PRODUCTS, {
    variables: { order: [{ createdAt: 'DESC' }] },
  });
  const { data: inventoryData, loading: inventoryLoading, refetch: refetchInventory } = useQuery(GET_INVENTORY, {
    variables: { order: [{ lastUpdated: 'DESC' }] },
  });

  const [syncShopify, { loading: syncing }] = useMutation(SYNC_SHOPIFY_DATA, {
    onCompleted: (data) => {
      const result = data.syncShopifyData;
      if (result.success) {
        setSyncMessage(`Synced ${result.productsSynced} products and ${result.ordersSynced} orders from Shopify`);
        refetchOrders();
        refetchProducts();
        refetchInventory();
      } else {
        setSyncMessage(`Sync failed: ${result.errorMessage || 'Unknown error'}`);
      }
      setTimeout(() => setSyncMessage(null), 5000);
    },
    onError: (error) => {
      setSyncMessage(`Sync failed: ${error.message}`);
      setTimeout(() => setSyncMessage(null), 5000);
    },
  });

  const orders = ordersData?.orders || [];
  const products = productsData?.products || [];
  const inventory = inventoryData?.inventory || [];

  const lowStockCount = inventory.filter((item: any) => item.quantity <= 10).length;
  const totalRevenue = orders.reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0);

  const stats = [
    {
      title: 'Total Orders',
      value: ordersLoading ? '...' : orders.length.toString(),
      icon: <ShoppingCart className="w-6 h-6" />,
    },
    {
      title: 'Active Products',
      value: productsLoading ? '...' : products.length.toString(),
      icon: <Package className="w-6 h-6" />,
    },
    {
      title: 'Revenue',
      value: ordersLoading ? '...' : `RS ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      title: 'Low Stock Items',
      value: inventoryLoading ? '...' : lowStockCount.toString(),
      icon: <BarChart3 className="w-6 h-6" />,
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-8 page-enter">
        {/* Header */}
        <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/80 backdrop-blur-sm px-5 py-4 shadow-sm">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back! Here's your business overview.</p>
          </div>
          <Button onClick={() => syncShopify()} disabled={syncing} className="gap-2 rounded-xl shadow-sm">
            {syncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            {syncing ? 'Syncing...' : 'Sync from Shopify'}
          </Button>
        </div>

        {syncMessage && (
          <div className={`p-3 rounded-xl border text-sm ${syncMessage.includes('failed') ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
            {syncMessage}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="surface-card surface-card-hover stagger-enter">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">
                  {stat.title}
                </CardTitle>
                <div className="text-primary">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders Section */}
        <Card className="surface-card stagger-enter">
          <CardHeader>
            <CardTitle className="text-card-foreground">Recent Orders</CardTitle>
            <CardDescription>Your latest orders from Shopify</CardDescription>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <div className="space-y-3 py-2">
                <Skeleton className="h-20 w-full rounded-xl shimmer" />
                <Skeleton className="h-20 w-full rounded-xl shimmer" />
                <Skeleton className="h-20 w-full rounded-xl shimmer" />
              </div>
            ) : recentOrders.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No orders yet. Click "Sync from Shopify" to import your orders.
              </p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order: any) => (
                  <div
                    key={order.orderId}
                    className="flex items-center justify-between p-4 border border-border/70 rounded-xl bg-background/70 hover:bg-secondary/80 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-card-foreground">
                        #{order.shopifyOrderId || order.orderId.slice(0, 8)}
                      </p>
                      <p className="text-sm text-muted-foreground">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-card-foreground">
                        RS {order.totalAmount?.toFixed(2)}
                      </p>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
