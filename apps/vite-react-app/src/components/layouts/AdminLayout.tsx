import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ScrollArea, ScrollBar } from '@workspace/ui/components/scroll-area';
import { Sheet, SheetContent } from '@workspace/ui/components/sheet';
import { SidebarHeader, SidebarFooter, MobileHeader, AdminFooter } from './AdminLayout/index';
import {
  Home,
  Users,
  Settings,
  BarChart3,
  FileText,
  Package,
  ShoppingCart,
  ChevronDown,
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
  isPlaceholder?: boolean;
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: Home,
  },
  {
    title: 'Users',
    icon: Users,
    isPlaceholder: true,
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
    icon: Package,
    isPlaceholder: true,
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
    icon: ShoppingCart,
    isPlaceholder: true,
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
    icon: BarChart3,
    isPlaceholder: true,
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

  const handleMenuClick = (item: SidebarItem) => {
    if (item.children && item.children.length > 0) {
      if (isCollapsed) {
        setIsCollapsed(false);
      }
      toggleSubmenu(item.title);
    }
  };

  const SidebarMenuItem = ({ item, collapsed }: { item: SidebarItem; collapsed: boolean }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = hasChildren && isMenuExpanded(item.title);
    const menuIsActive = isActive(item);

    if (hasChildren) {
      return (
        <div className="mb-2">
          <button
            onClick={() => handleMenuClick(item)}
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
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </div>
            {!collapsed && hasChildren && (
              <ChevronDown className={cn('h-4 w-4 transition-transform flex-shrink-0', isExpanded && 'rotate-180')} />
            )}
          </button>

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
                  <child.icon className="h-4 w-4 flex-shrink-0" />
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
          <item.icon className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>{item.title}</span>}
        </Link>
      </div>
    );
  };

  const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className="flex h-full flex-col">
      <SidebarHeader 
        collapsed={collapsed} 
        onToggleCollapse={() => setIsCollapsed(!collapsed)} 
      />

      <div className="flex-1 overflow-hidden">
        <ScrollArea className={cn("h-full", !collapsed && "h-[75vh] w-[260px]")}>
          <div className={cn("p-4 pb-2", collapsed && "px-2")}>
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title} item={item} collapsed={collapsed} />
              ))}
            </nav>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>

      <SidebarFooter collapsed={collapsed} />
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden md:fixed md:inset-y-0 md:z-50 md:flex md:flex-col transition-all duration-300",
        isCollapsed ? "md:w-20" : "md:w-64" 
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
        isCollapsed ? "md:pl-20" : "md:pl-64" 
      )}>
        <MobileHeader onOpenSidebar={() => setIsSidebarOpen(true)} />

        {/* Page Content */}
        <main className="flex-1">
          <div className="py-6">
            {children}
          </div>
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}