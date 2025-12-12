import { useState } from 'react';
import { ChevronDown, MapPin, Camera } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Day } from '@/types/itinerary';
import { StopCard } from './StopCard';
import { cn } from '@/lib/utils';

interface DaySectionProps {
  day: Day;
  defaultExpanded?: boolean;
}

export function DaySection({ day, defaultExpanded = true }: DaySectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="mb-6">
      {/* Day Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full group"
      >
        <div className="flex items-center justify-between rounded-xl bg-card border border-border p-4 transition-all hover:shadow-md hover:border-primary/20">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display font-bold text-lg shadow-md">
              {day.dayNumber}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Day {day.dayNumber} • {day.title}
                </h3>
                {day.isToday && (
                  <Badge variant="success" className="gap-1 bg-success text-primary-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                    Live
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {day.date} • {day.stops.length} experiences
              </p>
            </div>
          </div>
          <ChevronDown
            className={cn(
              'h-5 w-5 text-muted-foreground transition-transform duration-200',
              isExpanded && 'rotate-180'
            )}
          />
        </div>
      </button>

      {/* Day Content */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isExpanded ? 'mt-4 max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        {/* Hero Image */}
        {day.heroImage && (
          <div className="relative mb-6 overflow-hidden rounded-xl aspect-[21/9] shadow-lg">
            <img
              src={day.heroImage}
              alt={day.location}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-card">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">{day.location}</span>
              </div>
              <Badge className="bg-card/90 text-card-foreground backdrop-blur-sm border-0 shadow-md">
                <Camera className="h-3 w-3 mr-1.5" />
                4 photos
              </Badge>
            </div>
          </div>
        )}

        {/* Day Route Mini */}
        <div className="mb-6 rounded-xl bg-primary-light border border-primary/10 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
            🗺️ Day {day.dayNumber} Journey
          </p>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {day.stops.map((stop, index) => (
              <div key={stop.id} className="flex items-center gap-2">
                <div className={cn(
                  'shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium shadow-sm',
                  stop.type === 'flight' ? 'bg-flight/15 text-flight border border-flight/20' :
                  stop.type === 'hotel' ? 'bg-hotel/15 text-hotel border border-hotel/20' :
                  stop.type === 'attraction' ? 'bg-attraction/15 text-attraction border border-attraction/20' :
                  stop.type === 'restaurant' ? 'bg-restaurant/15 text-restaurant border border-restaurant/20' :
                  'bg-freetime/15 text-freetime border border-freetime/20'
                )}>
                  {stop.title.length > 18 ? stop.title.substring(0, 18) + '...' : stop.title}
                </div>
                {index < day.stops.length - 1 && (
                  <span className="text-muted-foreground text-lg">→</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {day.stops.length} experiences across {day.location}
          </p>
        </div>

        {/* Stop Cards */}
        <div className="space-y-4">
          {day.stops.map((stop, index) => (
            <StopCard
              key={stop.id}
              stop={stop}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
