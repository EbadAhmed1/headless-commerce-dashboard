import { BarChart3, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

const stats: StatCard[] = [
  {
    title: 'Total Orders',
    value: '1,234',
    change: '+12% from last month',
    icon: <ShoppingCart className="w-6 h-6" />,
    trend: 'up',
  },
  {
    title: 'Active Products',
    value: '456',
    change: '+5% from last month',
    icon: <Package className="w-6 h-6" />,
    trend: 'up',
  },
  {
    title: 'Revenue',
    value: '$45,231',
    change: '+8% from last month',
    icon: <TrendingUp className="w-6 h-6" />,
    trend: 'up',
  },
  {
    title: 'Low Stock Items',
    value: '23',
    change: '-3% from last month',
    icon: <BarChart3 className="w-6 h-6" />,
    trend: 'down',
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here's your business overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card border-border">
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
                <p
                  className={`text-xs mt-2 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Recent Orders</CardTitle>
            <CardDescription>Your latest 5 orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <div>
                    <p className="font-medium text-card-foreground">Order #{1000 + i}</p>
                    <p className="text-sm text-muted-foreground">Customer Name</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-card-foreground">${(i * 150).toFixed(2)}</p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Pending
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
