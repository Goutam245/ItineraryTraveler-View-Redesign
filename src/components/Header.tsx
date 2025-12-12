import { Share2, Download, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  tripTitle: string;
}

export function Header({ tripTitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-card/95 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md">
              <span className="text-lg font-bold text-primary-foreground">✈</span>
            </div>
            <span className="font-display text-xl font-semibold text-foreground tracking-tight">itinify</span>
          </div>
          <div className="hidden h-6 w-px bg-border md:block" />
          <span className="hidden text-sm font-medium text-muted-foreground md:block">{tripTitle}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Globe className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex shadow-sm">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button size="sm" className="shadow-md">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
