import {
  Home,
  Users,
  Settings,
  BarChart3,
  FileText,
  Package,
  ShoppingCart,
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

export interface SidebarItem {
  title: string;
  href?: string;
  icon: any;
  children?: SidebarItem[];
  isPlaceholder?: boolean;
}

export const sidebarItems: SidebarItem[] = [
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