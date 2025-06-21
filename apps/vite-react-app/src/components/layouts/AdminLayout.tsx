import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@workspace/ui/components/button';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { Sheet, SheetContent } from '@workspace/ui/components/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  Menu,
  Home,
  Users,
  Settings,
  BarChart3,
  FileText,
  Package,
  ShoppingCart,
  Bell,
  ChevronDown,
  LogOut,
  User,
  CreditCard,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  UserCheck,
  UserX,
  TrendingUp,
  PieChart,
  BarChart,
  Archive,
  Plus,
  Edit,
} from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
}

interface SidebarItem {
  title: string;
  href?: string;
  icon: any;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: Home,
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
    children: [
      {
        title: 'All Users',
        href: '/admin/users',
        icon: Users,
      },
      {
        title: 'Add User',
        href: '/admin/users/add',
        icon: UserPlus,
      },
      {
        title: 'Active Users',
        href: '/admin/users/active',
        icon: UserCheck,
      },
      {
        title: 'Inactive Users',
        href: '/admin/users/inactive',
        icon: UserX,
      },
    ],
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: Package,
    children: [
      {
        title: 'All Products',
        href: '/admin/products',
        icon: Package,
      },
      {
        title: 'Add Product',
        href: '/admin/products/add',
        icon: Plus,
      },
      {
        title: 'Categories',
        href: '/admin/products/categories',
        icon: Archive,
      },
    ],
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart,
    children: [
      {
        title: 'All Orders',
        href: '/admin/orders',
        icon: ShoppingCart,
      },
      {
        title: 'Pending Orders',
        href: '/admin/orders/pending',
        icon: Edit,
      },
      {
        title: 'Completed Orders',
        href: '/admin/orders/completed',
        icon: UserCheck,
      },
    ],
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    children: [
      {
        title: 'Overview',
        href: '/admin/analytics',
        icon: BarChart3,
      },
      {
        title: 'Sales Trends',
        href: '/admin/analytics/sales',
        icon: TrendingUp,
      },
      {
        title: 'User Analytics',
        href: '/admin/analytics/users',
        icon: PieChart,
      },
      {
        title: 'Performance',
        href: '/admin/analytics/performance',
        icon: BarChart,
      },
    ],
  },
  {
    title: 'Reports',
    href: '/admin/reports',
    icon: FileText,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const location = useLocation();

  const toggleSubmenu = (title: string) => {
    setExpandedMenus(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isMenuExpanded = (title: string) => expandedMenus.includes(title);

  const isActive = (item: SidebarItem): boolean => {
    if (item.href && location.pathname === item.href) return true;
    if (item.children) {
      return item.children.some(child => location.pathname === child.href);
    }
    return false;
  };

  const SidebarMenuItem = ({ item, collapsed }: { item: SidebarItem; collapsed: boolean }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = hasChildren && isMenuExpanded(item.title);
    const menuIsActive = isActive(item);

    if (hasChildren) {
      return (
        <div className="mb-2">
          <button
            onClick={() => !collapsed && toggleSubmenu(item.title)}
            className={cn(
              'flex items-center w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              collapsed ? 'justify-center' : 'justify-between',
              menuIsActive
                ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
            )}
            title={collapsed ? item.title : undefined}
          >
            <div className={cn('flex items-center', collapsed ? 'justify-center' : 'space-x-3')}>
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.title}</span>}
            </div>
            {!collapsed && hasChildren && (
              <ChevronDown className={cn('h-4 w-4 transition-transform', isExpanded && 'rotate-180')} />
            )}
          </button>

          {/* Submenu items */}
          {!collapsed && hasChildren && isExpanded && (
            <div className="ml-6 mt-1 space-y-1">
              {item.children!.map((child) => (
                <Link
                  key={child.href}
                  to={child.href!}
                  className={cn(
                    'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    location.pathname === child.href
                      ? 'bg-sidebar-primary/80 text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/30 hover:text-sidebar-accent-foreground'
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <child.icon className="h-4 w-4" />
                  <span>{child.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="mb-2">
        <Link
          to={item.href!}
          className={cn(
            'flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
            collapsed ? 'justify-center' : 'space-x-3',
            menuIsActive
              ? 'bg-sidebar-primary text-sidebar-primary-foreground'
              : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
          )}
          onClick={() => setIsSidebarOpen(false)}
          title={collapsed ? item.title : undefined}
        >
          <item.icon className="h-5 w-5" />
          {!collapsed && <span>{item.title}</span>}
        </Link>
      </div>
    );
  };

  const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className="flex h-full flex-col">
      {/* Fixed Header - Logo and Collapse Toggle */}
      <div className={cn("flex h-16 items-center flex-shrink-0 border-b border-sidebar-border", collapsed ? "px-3 justify-center" : "px-6 justify-between")}>
        <Link to="/admin" className={cn("flex items-center", collapsed ? "justify-center" : "space-x-2")}>
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-sm">A</span>
          </div>
          {!collapsed && <span className="text-xl font-bold text-sidebar-foreground">Admin Panel</span>}
        </Link>
        {!collapsed && (
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex h-8 w-8 p-0"
            onClick={() => setIsCollapsed(true)}
            title="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <div className="flex justify-center px-3 py-2 border-b border-sidebar-border flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setIsCollapsed(false)}
            title="Expand sidebar"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-3 py-4">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.title} item={item} collapsed={collapsed} />
            ))}
          </nav>
        </ScrollArea>
      </div>

      {/* Fixed Footer - Theme Toggle, Notifications, Profile */}
      <div className={cn("border-t border-sidebar-border p-3 flex-shrink-0", collapsed ? "space-y-3" : "space-y-2")}>
        {/* Theme Toggle and Notifications */}
        <div className={cn("flex", collapsed ? "flex-col items-center space-y-2" : "items-center gap-2")}>
          {/* Theme Toggle */}
          <div className={cn("flex", collapsed ? "justify-center" : "justify-start")}>
            <ThemeToggle />
          </div>

          {/* Notifications */}
          <div className={cn("flex", collapsed ? "justify-center" : "justify-end")}>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary text-xs text-destructive-foreground flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </div>

        {/* Profile dropdown */}
        <div className={cn("flex", collapsed ? "justify-center" : "justify-start")}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={cn("p-2 hover:bg-transparent", collapsed ? "flex items-center justify-center" : "flex items-center space-x-2 w-full")}>
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <>
                    <div className="flex flex-col items-start flex-1">
                      <span className="text-sm font-medium text-foreground">John Doe</span>
                      <span className="text-xs text-muted-foreground">Admin</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={collapsed ? "center" : "end"} className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/admin/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/admin/billing" className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/admin/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/help" className="flex items-center">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden md:fixed md:inset-y-0 md:z-50 md:flex md:flex-col transition-all duration-300",
        isCollapsed ? "md:w-16" : "md:w-64"
      )}>
        <div className="flex grow flex-col gap-y-0 border-r border-sidebar-border bg-sidebar">
          <SidebarContent collapsed={isCollapsed} />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className={cn(
        "min-h-screen flex flex-col transition-all duration-300",
        isCollapsed ? "md:pl-16" : "md:pl-64"
      )}>
        {/* Mobile Header Only */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-4 shadow-sm md:hidden">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Mobile header actions */}
          <div className="flex items-center gap-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary text-xs text-destructive-foreground flex items-center justify-center">
                3
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 p-2 hover:bg-transparent">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/admin/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin/billing" className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/help" className="flex items-center">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          <div className="py-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-muted-foreground">
                  © 2024 Admin Panel. All rights reserved.
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <Link
                  to="/admin/help"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Help
                </Link>
                <Link
                  to="/admin/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  to="/admin/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}