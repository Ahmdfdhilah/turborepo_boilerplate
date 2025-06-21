import { Button } from '@workspace/ui/components/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserDropdown } from './UserDropdown';
import { Bell } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

interface SidebarFooterProps {
  collapsed: boolean;
}

export function SidebarFooter({ collapsed }: SidebarFooterProps) {
  return (
    <div className={cn("border-t border-sidebar-border p-4 pt-3 flex-shrink-0 mt-auto", collapsed ? "space-y-3" : "space-y-3")}>
      <div className={cn("flex", collapsed ? "flex-col items-center space-y-2" : "items-center justify-between")}>
        <div className={cn("flex", collapsed ? "justify-center" : "justify-end")}>
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary text-xs text-destructive-foreground flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
        <div className={cn("flex", collapsed ? "justify-center" : "justify-start")}>
          <ThemeToggle />
        </div>
      </div>

      <UserDropdown collapsed={collapsed} />
    </div>
  );
}