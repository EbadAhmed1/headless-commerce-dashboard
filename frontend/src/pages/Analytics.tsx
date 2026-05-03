import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import DashboardLayout from '@/components/DashboardLayout';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import { GET_INVENTORY, GET_ORDERS } from '@/lib/graphql';

interface OrderItem {
  orderItemId: string;
  quantity: number;
  priceAtPurchase: number;
  sku?: string;
  productTitle?: string;
}

interface Order {
  orderId: string;
  orderDate: string;
  totalAmount: number;
  orderItems?: OrderItem[];
}

interface InventoryItem {
  quantity: number;
}

export default function AnalyticsPage() {
  const { data: ordersData, loading: ordersLoading, error: ordersError } = useQuery(GET_ORDERS, {
    variables: { order: [{ orderDate: 'ASC' }] },
  });
  const { data: inventoryData, loading: inventoryLoading, error: inventoryError } = useQuery(GET_INVENTORY, {
    variables: { order: [{ lastUpdated: 'DESC' }] },
  });

  const orders: Order[] = ordersData?.orders || [];
  const inventory: InventoryItem[] = inventoryData?.inventory || [];

  const revenueData = useMemo(() => {
    const grouped = new Map<string, { date: string; totalRevenue: number; orderCount: number }>();

    for (const order of orders) {
      const parsedDate = new Date(order.orderDate);
      const dayKey = parsedDate.toISOString().slice(0, 10);
      const label = parsedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

      const entry = grouped.get(dayKey) || { date: label, totalRevenue: 0, orderCount: 0 };
      entry.totalRevenue += Number(order.totalAmount || 0);
      entry.orderCount += 1;
      grouped.set(dayKey, entry);
    }

    return Array.from(grouped.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-8)
      .map(([, value]) => ({
        ...value,
        averageOrderValue: value.orderCount > 0 ? value.totalRevenue / value.orderCount : 0,
      }));
  }, [orders]);

  const topSellingVariants = useMemo(() => {
    const salesByVariant = new Map<string, {
      variantId: string;
      sku: string;
      productName: string;
      totalSold: number;
      revenue: number;
    }>();

    for (const order of orders) {
      for (const item of order.orderItems || []) {
        const key = item.sku || item.productTitle || item.orderItemId;
        const existing = salesByVariant.get(key) || {
          variantId: key,
          sku: item.sku || 'N/A',
          productName: item.productTitle || item.sku || 'Unknown Product',
          totalSold: 0,
          revenue: 0,
        };

        existing.totalSold += Number(item.quantity || 0);
        existing.revenue += Number(item.quantity || 0) * Number(item.priceAtPurchase || 0);
        salesByVariant.set(key, existing);
      }
    }

    return Array.from(salesByVariant.values())
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 5);
  }, [orders]);

  const lowStockCount = useMemo(() => inventory.filter((item) => item.quantity <= 10).length, [inventory]);

  const isLoading = ordersLoading || inventoryLoading;
  const error = ordersError || inventoryError;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="rounded-2xl border border-border/70 bg-card/80 backdrop-blur-sm px-5 py-4 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Track your business performance with detailed insights and metrics.
          </p>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">Error loading analytics data: {error.message}</div>
        ) : null}

        {/* Analytics Dashboard */}
        <AnalyticsDashboard
          revenueData={revenueData}
          topSellingVariants={topSellingVariants}
          lowStockCount={lowStockCount}
          isLoading={isLoading}
        />
      </div>
    </DashboardLayout>
  );
}
