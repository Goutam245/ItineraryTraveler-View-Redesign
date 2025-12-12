import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar } from './Sidebar';
import { Itinerary } from '@/types/itinerary';
import { cn } from '@/lib/utils';

interface MobileSidebarProps {
  itinerary: Itinerary;
}

export function MobileSidebar({ itinerary }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Trigger Button */}
      <div className="fixed bottom-20 right-4 z-40 lg:hidden">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-xl"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm transition-opacity lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Panel */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background shadow-2xl transition-transform duration-300 ease-out lg:hidden overflow-y-auto',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-4 py-3">
          <h2 className="font-semibold text-foreground">Trip Options</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4">
          <Sidebar itinerary={itinerary} />
        </div>
      </div>
    </>
  );
}
