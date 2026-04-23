import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  BarChart3,
  Package,
  ShoppingCart,
  Warehouse,
  ChevronDown,
  Home,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
  submenu?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: <Home className="w-5 h-5" />,
    href: '/dashboard',
  },
  {
    label: 'Inventory',
    icon: <Warehouse className="w-5 h-5" />,
    href: '/inventory',
    submenu: [
      { label: 'Products', icon: <Package className="w-4 h-4" />, href: '/inventory/products' },
      { label: 'Stock Levels', icon: <BarChart3 className="w-4 h-4" />, href: '/inventory/stock' },
    ],
  },
  {
    label: 'Orders',
    icon: <ShoppingCart className="w-5 h-5" />,
    href: '/orders',
    badge: 12,
  },
  {
    label: 'Analytics',
    icon: <BarChart3 className="w-5 h-5" />,
    href: '/analytics',
  },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    setLocation('/login');
  };

  const toggleSubmenu = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold text-sm">ED</span>
            </div>
            <div>
              <h1 className="font-semibold text-sidebar-foreground">E-Commerce</h1>
              <p className="text-xs text-sidebar-foreground/60">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link href={item.href}>
                <a
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-lg transition-colors',
                    'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    'group'
                  )}
                  onClick={() => item.submenu && toggleSubmenu(item.label)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {item.submenu && (
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform',
                          expandedItems.includes(item.label) && 'rotate-180'
                        )}
                      />
                    )}
                  </div>
                </a>
              </Link>

              {/* Submenu */}
              {item.submenu && expandedItems.includes(item.label) && (
                <div className="ml-4 mt-2 space-y-1 border-l border-sidebar-border/50 pl-4">
                  {item.submenu.map((subitem) => (
                    <Link key={subitem.label} href={subitem.href}>
                    <a
                      className={cn(
                        'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
                        'text-sidebar-foreground/70 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent',
                        'text-sm'
                      )}
                    >
                      <span>{subitem.icon}</span>
                      <span>{subitem.label}</span>
                    </a>
                  </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="border-t border-sidebar-border p-4 space-y-2">
          <Link href="/settings">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
