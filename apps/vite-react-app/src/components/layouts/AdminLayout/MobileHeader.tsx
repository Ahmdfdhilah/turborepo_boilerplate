import { Button } from '@workspace/ui/components/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserDropdown } from './UserDropdown';
import { Menu, Bell } from 'lucide-react';

interface MobileHeaderProps {
  onOpenSidebar: () => void;
}

export function MobileHeader({ onOpenSidebar }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-4 shadow-sm md:hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={onOpenSidebar}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <div className="flex items-center gap-x-2">
        <ThemeToggle />
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary text-xs text-destructive-foreground flex items-center justify-center">
            3
          </span>
        </Button>
        <UserDropdown className="flex items-center space-x-2 p-2 hover:bg-transparent" />
      </div>
    </header>
  );
}