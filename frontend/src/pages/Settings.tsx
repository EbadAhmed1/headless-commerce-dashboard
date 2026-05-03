import { Link } from 'wouter';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Palette, Bell, Shield, Store } from 'lucide-react';

const settingsItems = [
  {
    title: 'Profile Settings',
    description: 'Update your name, email, and profile photo.',
    icon: <User className="w-6 h-6" />,
    href: '/settings/profile',
  },
  {
    title: 'Preferences',
    description: 'Theme, language, date format, and display options.',
    icon: <Palette className="w-6 h-6" />,
    href: '/settings/preferences',
  },
  {
    title: 'Notifications',
    description: 'Configure email and in-app notification preferences.',
    icon: <Bell className="w-6 h-6" />,
    href: '/notifications',
  },
  {
    title: 'Security',
    description: 'Change password, enable two-factor authentication.',
    icon: <Shield className="w-6 h-6" />,
    href: '/settings/profile',
  },
  {
    title: 'Store Integration',
    description: 'Manage your Shopify connection and webhook settings.',
    icon: <Store className="w-6 h-6" />,
    href: '/settings/preferences',
  },
];

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-2xl border border-border/70 bg-card/80 backdrop-blur-sm px-5 py-4 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and application preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {settingsItems.map((item) => (
            <Link key={item.title} href={item.href}>
              <Card className="cursor-pointer border-border/70 bg-card/90 hover:border-primary/50 hover:shadow-md transition-all group h-full">
                <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    <CardDescription className="mt-1">{item.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
