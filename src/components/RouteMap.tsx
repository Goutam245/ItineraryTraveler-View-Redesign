import { Map, MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Itinerary } from '@/types/itinerary';

interface RouteMapProps {
  itinerary: Itinerary;
}

export function RouteMap({ itinerary }: RouteMapProps) {
  return (
    <section className="bg-background py-12">
      <div className="container">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground lg:text-3xl">Your Journey Map</h2>
          <p className="mt-1 text-muted-foreground">
            {itinerary.duration} days across Italy's most treasured destinations
          </p>
        </div>
        
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light to-attraction-light border border-primary/10">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-attraction/20 rounded-full blur-2xl" />
          </div>
          
          <div className="relative flex flex-col items-center justify-center py-16 px-6">
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20 shadow-lg">
              <Map className="h-12 w-12 text-primary" />
            </div>
            
            <div className="mb-6 flex items-center gap-4 text-sm font-medium text-foreground flex-wrap justify-center">
              <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-md">
                <div className="h-3 w-3 rounded-full bg-flight shadow-lg" />
                <span>Rome</span>
              </div>
              <Navigation className="h-4 w-4 text-muted-foreground rotate-90" />
              <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-md">
                <div className="h-3 w-3 rounded-full bg-hotel shadow-lg" />
                <span>Vatican City</span>
              </div>
              <Navigation className="h-4 w-4 text-muted-foreground rotate-90" />
              <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-md">
                <div className="h-3 w-3 rounded-full bg-freetime shadow-lg" />
                <span>Florence</span>
              </div>
            </div>
            
            <p className="mb-8 text-center text-sm text-muted-foreground max-w-md">
              3 iconic cities • 1.5 hour high-speed train • Luxury private transfers included
            </p>
            
            <Button size="lg" className="gap-2 shadow-lg">
              <MapPin className="h-4 w-4" />
              Open Interactive Map
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
