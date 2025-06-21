import { ScrollArea, ScrollBar } from '@workspace/ui/components/scroll-area';
import { SidebarHeader } from './SidebarHeader';
import { SidebarFooter } from './SidebarFooter';
import { SidebarMenuItem } from './SidebarMenuItem';
import { sidebarItems, type SidebarItem } from '@/lib/admin-menus';
import { cn } from '@workspace/ui/lib/utils';

interface SidebarContentProps {
  collapsed?: boolean;
  expandedMenus: string[];
  onToggleCollapse: () => void;
  onToggleSubmenu: (title: string) => void;
  onMenuClick: (item: SidebarItem) => void;
  onLinkClick: () => void;
}

export function SidebarContent({ 
  collapsed = false, 
  expandedMenus,
  onToggleCollapse,
  onToggleSubmenu,
  onMenuClick,
  onLinkClick 
}: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col">
      <SidebarHeader 
        collapsed={collapsed} 
        onToggleCollapse={onToggleCollapse} 
      />

      <div className="flex-1 overflow-hidden">
        <ScrollArea className={cn("h-full", !collapsed && "h-[75vh] w-[260px]")}>
          <div className={cn("p-4 pb-2", collapsed && "px-2")}>
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <SidebarMenuItem 
                  key={item.title} 
                  item={item} 
                  collapsed={collapsed}
                  expandedMenus={expandedMenus}
                  onToggleSubmenu={onToggleSubmenu}
                  onMenuClick={onMenuClick}
                  onLinkClick={onLinkClick}
                />
              ))}
            </nav>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>

      <SidebarFooter collapsed={collapsed} />
    </div>
  );
}