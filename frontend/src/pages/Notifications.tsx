import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  Package,
  ShoppingCart,
  AlertTriangle,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'order' | 'inventory' | 'alert' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'New Order Received',
    message: 'Order #1042 has been placed by a customer for $234.50.',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'inventory',
    title: 'Low Stock Alert',
    message: 'Product "Wireless Headphones" is running low — only 3 units left.',
    time: '15 minutes ago',
    read: false,
  },
  {
    id: '3',
    type: 'alert',
    title: 'Shopify Sync Completed',
    message: 'All products and orders have been synced successfully.',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '4',
    type: 'system',
    title: 'Welcome to CommerceHub',
    message: 'Your dashboard is set up and ready. Start by connecting your Shopify store.',
    time: '2 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'order',
    title: 'Order Shipped',
    message: 'Order #1038 has been shipped via UPS with tracking number 1Z999AA10.',
    time: '3 hours ago',
    read: true,
  },
];

const iconMap = {
  order: <ShoppingCart className="w-5 h-5" />,
  inventory: <Package className="w-5 h-5" />,
  alert: <AlertTriangle className="w-5 h-5" />,
  system: <Bell className="w-5 h-5" />,
};

const colorMap = {
  order: 'bg-blue-100 text-blue-600',
  inventory: 'bg-orange-100 text-orange-600',
  alert: 'bg-green-100 text-green-600',
  system: 'bg-gray-100 text-gray-600',
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground mt-1">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}.`
                : 'You\'re all caught up.'}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark all read
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No notifications yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <Card
                key={n.id}
                className={`transition-colors ${!n.read ? 'border-primary/30 bg-primary/5' : ''}`}
              >
                <CardContent className="flex items-start gap-4 py-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorMap[n.type]}`}>
                    {iconMap[n.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground text-sm">{n.title}</p>
                      {!n.read && <Badge variant="default" className="text-[10px] px-1.5 py-0">New</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {!n.read && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => markAsRead(n.id)}>
                        <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteNotification(n.id)}>
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
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
