import { Link } from 'react-router-dom';
import { Button } from '@workspace/ui/components/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function SidebarHeader({ collapsed, onToggleCollapse }: SidebarHeaderProps) {
  return (
    <>
      <div className={cn("flex h-16 items-center flex-shrink-0 border-b border-sidebar-border", collapsed ? "px-3 justify-center" : "px-6 justify-between")}>
        <Link to="/admin" className={cn("flex items-center", collapsed ? "justify-center" : "space-x-2")}>
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-sidebar-primary-foreground font-bold text-sm">A</span>
          </div>
          {!collapsed && <span className="text-xl font-bold text-sidebar-foreground">Admin Panel</span>}
        </Link>
        {!collapsed && (
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex h-8 w-8 p-0 flex-shrink-0"
            onClick={onToggleCollapse}
            title="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      {collapsed && (
        <div className="flex justify-center px-3 py-2 border-b border-sidebar-border flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onToggleCollapse}
            title="Expand sidebar"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}