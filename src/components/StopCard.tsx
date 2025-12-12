import { Plane, Building, Ticket, UtensilsCrossed, Clock, FileText, Download, Lightbulb, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Stop, StopType } from '@/types/itinerary';
import { cn } from '@/lib/utils';

interface StopCardProps {
  stop: Stop;
  className?: string;
  style?: React.CSSProperties;
}

const stopConfig: Record<StopType, { icon: typeof Plane; label: string; variant: 'flight' | 'hotel' | 'attraction' | 'restaurant' | 'freetime' }> = {
  flight: { icon: Plane, label: 'FLIGHT', variant: 'flight' },
  hotel: { icon: Building, label: 'HOTEL', variant: 'hotel' },
  attraction: { icon: Ticket, label: 'ATTRACTION', variant: 'attraction' },
  restaurant: { icon: UtensilsCrossed, label: 'RESTAURANT', variant: 'restaurant' },
  freetime: { icon: Clock, label: 'FREE TIME', variant: 'freetime' },
};

export function StopCard({ stop, className, style }: StopCardProps) {
  const config = stopConfig[stop.type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'stop-card animate-fade-up',
        `stop-card-${stop.type}`,
        className
      )}
      style={style}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Badge variant={config.variant} className="gap-1.5 py-1 px-2.5">
              <Icon className="h-3.5 w-3.5" />
              {config.label}
            </Badge>
            {stop.duration && (
              <span className="text-sm text-muted-foreground">{stop.duration}</span>
            )}
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{stop.time}</p>
          </div>
        </div>

        {/* Image (if available) */}
        {stop.image && (
          <div className="mb-4 overflow-hidden rounded-lg aspect-video">
            <img
              src={stop.image}
              alt={stop.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        {/* Title & Subtitle */}
        <div className="mb-4">
          <h3 className="font-display text-xl font-semibold text-foreground">{stop.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{stop.subtitle}</p>
        </div>

        {/* Details Grid */}
        {stop.details && stop.details.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-4 lg:grid-cols-4">
            {stop.details.map((detail, index) => (
              <div key={index} className="rounded-lg bg-secondary/50 p-3">
                <p className="text-xs text-muted-foreground">{detail.label}</p>
                <p className="text-sm font-semibold text-foreground">{detail.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Documents */}
        {stop.documents && stop.documents.length > 0 && (
          <div className="mb-4">
            <p className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <FileText className="h-4 w-4" />
              {stop.type === 'flight' ? 'Flight Documents' : stop.type === 'hotel' ? 'Hotel Documents' : 'Tickets & Info'}
            </p>
            <div className="space-y-2">
              {stop.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card p-3 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'flex h-8 w-8 items-center justify-center rounded',
                      stop.type === 'flight' ? 'bg-flight-light' : stop.type === 'hotel' ? 'bg-hotel-light' : 'bg-attraction-light'
                    )}>
                      <FileText className={cn(
                        'h-4 w-4',
                        stop.type === 'flight' ? 'text-flight' : stop.type === 'hotel' ? 'text-hotel' : 'text-attraction'
                      )} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.fileName} • {doc.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tip */}
        {stop.tip && (
          <div className="tip-card flex gap-3">
            <Lightbulb className="h-5 w-5 shrink-0 text-warning" />
            <div>
              <p className="text-sm font-medium text-foreground mb-0.5">TIP</p>
              <p className="text-sm text-muted-foreground">{stop.tip}</p>
            </div>
          </div>
        )}

        {/* Info */}
        {stop.info && (
          <div className="info-card flex gap-3">
            <Info className="h-5 w-5 shrink-0 text-attraction" />
            <div>
              <p className="text-sm font-medium text-foreground mb-0.5">INFO</p>
              <p className="text-sm text-muted-foreground">{stop.info}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
