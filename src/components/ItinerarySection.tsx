import { useState } from 'react';
import { Itinerary } from '@/types/itinerary';
import { DaySection } from './DaySection';
import { cn } from '@/lib/utils';

interface ItinerarySectionProps {
  itinerary: Itinerary;
}

export function ItinerarySection({ itinerary }: ItinerarySectionProps) {
  const [activeDay, setActiveDay] = useState(1);

  return (
    <section className="py-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground lg:text-3xl">Your Itinerary</h2>
        <p className="mt-1 text-muted-foreground">
          Day-by-day breakdown of your adventure
        </p>
      </div>

      {/* Day Navigation Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {itinerary.days.map((day) => (
          <button
            key={day.id}
            onClick={() => setActiveDay(day.dayNumber)}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all',
              activeDay === day.dayNumber
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            Day {day.dayNumber}
          </button>
        ))}
      </div>

      {/* Day Sections */}
      {itinerary.days.map((day) => (
        <div
          key={day.id}
          className={cn(
            'transition-all duration-300',
            activeDay === day.dayNumber ? 'block' : 'hidden'
          )}
        >
          <DaySection day={day} defaultExpanded={true} />
        </div>
      ))}
    </section>
  );
}
