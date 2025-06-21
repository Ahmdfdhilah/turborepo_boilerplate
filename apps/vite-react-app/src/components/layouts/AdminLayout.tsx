import { ReactNode, useState } from 'react';
import { Sheet, SheetContent } from '@workspace/ui/components/sheet';
import { SidebarContent, MobileHeader, AdminFooter } from './AdminLayout/index';
import type { SidebarItem } from '@/lib/admin-menus';
import { cn } from '@workspace/ui/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleSubmenu = (title: string) => {
    setExpandedMenus(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const handleMenuClick = (item: SidebarItem) => {
    if (item.children && item.children.length > 0) {
      if (isCollapsed) {
        setIsCollapsed(false);
      }
      toggleSubmenu(item.title);
    }
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden md:fixed md:inset-y-0 md:z-50 md:flex md:flex-col transition-all duration-300",
        isCollapsed ? "md:w-20" : "md:w-64" 
      )}>
        <div className="flex grow flex-col gap-y-0 border-r border-sidebar-border bg-sidebar">
          <SidebarContent 
            collapsed={isCollapsed}
            expandedMenus={expandedMenus}
            onToggleCollapse={handleToggleCollapse}
            onToggleSubmenu={toggleSubmenu}
            onMenuClick={handleMenuClick}
            onLinkClick={handleLinkClick}
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent 
            collapsed={false}
            expandedMenus={expandedMenus}
            onToggleCollapse={handleToggleCollapse}
            onToggleSubmenu={toggleSubmenu}
            onMenuClick={handleMenuClick}
            onLinkClick={handleLinkClick}
          />
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