import { Menu, Search, Bell, User, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    setLocation('/login');
  };

  const userEmail = localStorage.getItem('user_email') || 'Admin User';

  return (
    <header className="h-18 bg-card/85 backdrop-blur-md border-b border-border/70 flex items-center justify-between px-6 gap-4 shadow-xs">
      {/* Left Section: Menu Toggle & Search */}
      <div className="flex items-center gap-4 flex-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md rounded-xl border border-border/70 bg-background/80 px-3 py-1.5">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search orders, products..."
            className="bg-transparent border-0 shadow-none focus-visible:ring-0"
          />
        </div>
      </div>

      {/* Right Section: Notifications & User Menu */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Link href="/notifications">
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-xl"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>
        </Link>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/70 bg-background/80 hover:bg-secondary/80"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-sm">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-foreground">{userEmail}</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLocation('/settings/profile')}>
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLocation('/settings/preferences')}>
              Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={handleLogout}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
