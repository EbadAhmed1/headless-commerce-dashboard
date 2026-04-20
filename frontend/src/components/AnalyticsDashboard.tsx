import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Package, ShoppingCart, DollarSign } from 'lucide-react';

interface RevenueDataPoint {
  date: string;
  totalRevenue: number;
  orderCount: number;
  averageOrderValue: number;
}

interface TopSellingVariant {
  variantId: string;
  sku: string;
  productName: string;
  totalSold: number;
  revenue: number;
}

interface AnalyticsDashboardProps {
  revenueData?: RevenueDataPoint[];
  topSellingVariants?: TopSellingVariant[];
  isLoading?: boolean;
}

// Mock data for demonstration
const mockRevenueData: RevenueDataPoint[] = [
  { date: 'Jan 1', totalRevenue: 4000, orderCount: 24, averageOrderValue: 166.67 },
  { date: 'Jan 2', totalRevenue: 3000, orderCount: 18, averageOrderValue: 166.67 },
  { date: 'Jan 3', totalRevenue: 2000, orderCount: 12, averageOrderValue: 166.67 },
  { date: 'Jan 4', totalRevenue: 2780, orderCount: 17, averageOrderValue: 163.53 },
  { date: 'Jan 5', totalRevenue: 1890, orderCount: 11, averageOrderValue: 171.82 },
  { date: 'Jan 6', totalRevenue: 2390, orderCount: 14, averageOrderValue: 170.71 },
  { date: 'Jan 7', totalRevenue: 3490, orderCount: 21, averageOrderValue: 166.19 },
  { date: 'Jan 8', totalRevenue: 4200, orderCount: 25, averageOrderValue: 168.0 },
];

const mockTopVariants: TopSellingVariant[] = [
  { variantId: '1', sku: 'TSH-BLK-M', productName: 'T-Shirt Black Medium', totalSold: 145, revenue: 2175 },
  { variantId: '2', sku: 'TSH-WHT-L', productName: 'T-Shirt White Large', totalSold: 128, revenue: 1920 },
  { variantId: '3', sku: 'HOOD-BLU-XL', productName: 'Hoodie Blue XL', totalSold: 87, revenue: 2610 },
  { variantId: '4', sku: 'JEANS-32-32', productName: 'Denim Jeans 32x32', totalSold: 64, revenue: 1920 },
  { variantId: '5', sku: 'BEANIE-BLK', productName: 'Beanie Black', totalSold: 156, revenue: 1404 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export default function AnalyticsDashboard({
  revenueData = mockRevenueData,
  topSellingVariants = mockTopVariants,
  isLoading = false,
}: AnalyticsDashboardProps) {
  // Calculate summary statistics
  const stats = useMemo(() => {
    const totalRevenue = revenueData.reduce((sum, item) => sum + item.totalRevenue, 0);
    const totalOrders = revenueData.reduce((sum, item) => sum + item.orderCount, 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const topVariant = topSellingVariants[0];

    return {
      totalRevenue,
      totalOrders,
      avgOrderValue,
      topVariant,
    };
  }, [revenueData, topSellingVariants]);

  if (isLoading) {
    return <div className="text-center py-12">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              ${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 8 days</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">Last 8 days</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Average Order Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              ${stats.avgOrderValue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Per order</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Top Product</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-card-foreground truncate">
              {stats.topVariant?.productName}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.topVariant?.totalSold} sold
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Revenue Trend</CardTitle>
          <CardDescription>Daily revenue over the last 8 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={revenueData}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 12 }}
                label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
                formatter={(value: number) => `$${value.toFixed(2)}`}
              />
              <Legend />
              <Bar dataKey="totalRevenue" fill="#3b82f6" name="Total Revenue" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Orders and AOV Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Orders & Average Order Value</CardTitle>
          <CardDescription>Order count and AOV over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={revenueData}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis
                yAxisId="left"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                label={{ value: 'Order Count', angle: -90, position: 'insideLeft' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                label={{ value: 'AOV ($)', angle: 90, position: 'insideRight' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
                formatter={(value: number) => {
                  if (typeof value === 'number' && value > 100) {
                    return `$${value.toFixed(2)}`;
                  }
                  return value;
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="orderCount"
                stroke="#8b5cf6"
                name="Order Count"
                dot={{ fill: '#8b5cf6' }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="averageOrderValue"
                stroke="#ec4899"
                name="Average Order Value"
                dot={{ fill: '#ec4899' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Selling Variants */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Top Selling Variants</CardTitle>
            <CardDescription>By units sold</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSellingVariants.map((variant, index) => (
                <div key={variant.variantId} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-card-foreground truncate">
                        {variant.productName}
                      </p>
                      <p className="text-xs text-muted-foreground">{variant.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-card-foreground">{variant.totalSold}</p>
                    <p className="text-xs text-muted-foreground">
                      ${variant.revenue.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Distribution Pie Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Revenue by Variant</CardTitle>
            <CardDescription>Distribution of revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topSellingVariants}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ productName, revenue }) => `${productName}: $${revenue}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {topSellingVariants.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
