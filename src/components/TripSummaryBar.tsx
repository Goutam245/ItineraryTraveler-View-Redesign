import { CalendarDays, Clock, Users, MessageCircle, Sparkles } from 'lucide-react';
import { Itinerary } from '@/types/itinerary';

interface TripSummaryBarProps {
  itinerary: Itinerary;
}

export function TripSummaryBar({ itinerary }: TripSummaryBarProps) {
  const formatDateRange = () => {
    const start = new Date(itinerary.startDate);
    const end = new Date(itinerary.endDate);
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const totalStops = itinerary.days.reduce((acc, day) => acc + day.stops.length, 0);

  const stats = [
    { icon: CalendarDays, label: 'Travel Dates', value: formatDateRange(), color: 'text-primary' },
    { icon: Clock, label: 'Trip Duration', value: `${itinerary.duration} days • ${totalStops} experiences`, color: 'text-attraction' },
    { icon: Users, label: 'Travelers', value: '2 adults • 1 teen', color: 'text-hotel' },
    { icon: MessageCircle, label: 'Concierge', value: '24/7 WhatsApp support', color: 'text-success' },
  ];

  return (
    <section className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container py-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-sm animate-fade-up hover:shadow-md transition-shadow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                <p className="text-sm font-semibold text-foreground truncate">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
