import { Star, CalendarDays, MapPin, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Itinerary } from '@/types/itinerary';
import heroImage from '@/assets/hero-rome.jpg';

interface HeroSectionProps {
  itinerary: Itinerary;
}

export function HeroSection({ itinerary }: HeroSectionProps) {
  const formatDateRange = () => {
    const start = new Date(itinerary.startDate);
    const end = new Date(itinerary.endDate);
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <section className="relative overflow-hidden hero-gradient">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-foreground/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container relative py-12 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="gap-1.5 bg-accent text-accent-foreground border-0 shadow-lg">
                <Sparkles className="h-3 w-3" />
                Curated Experience
              </Badge>
              <Badge className="bg-primary-foreground/20 text-primary-foreground border-0 backdrop-blur-sm">
                For {itinerary.travelerName}
              </Badge>
            </div>
            
            <div>
              <h1 className="font-display text-4xl font-bold text-primary-foreground lg:text-5xl xl:text-6xl text-balance leading-tight">
                {itinerary.title}
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/85 max-w-xl leading-relaxed">
                Discover the eternal city's timeless beauty, from ancient wonders to hidden trattorias. An unforgettable journey through Italy's heart.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-success text-success-light gap-1.5 py-1.5 px-3 shadow-md">
                <span className="h-2 w-2 rounded-full bg-success-light animate-pulse" />
                Live: Day 1
              </Badge>
              <Badge className="bg-primary-foreground/15 text-primary-foreground border-0 py-1.5 px-3 backdrop-blur-sm">
                📍 Grand Hotel Plaza
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-3 text-primary-foreground/90">
              <div className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2.5 backdrop-blur-sm border border-primary-foreground/10">
                <CalendarDays className="h-4 w-4" />
                <span className="text-sm font-medium">{formatDateRange()}</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2.5 backdrop-blur-sm border border-primary-foreground/10">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">{itinerary.duration} Days</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2.5 backdrop-blur-sm border border-primary-foreground/10">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">{itinerary.destinations.join(' → ')}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="hero-outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Star className="h-4 w-4" />
                Save to favorites
              </Button>
              <Button variant="hero-outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <CalendarDays className="h-4 w-4" />
                Add to calendar
              </Button>
            </div>
          </div>
          
          <div className="relative animate-fade-up stagger-2">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-primary-foreground/10">
              <img
                src={heroImage}
                alt="Rome aerial view at golden hour"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <Badge className="bg-card/95 text-card-foreground backdrop-blur-md border-0 py-2 px-3 shadow-lg">
                🔴 Live trip overview
              </Badge>
              <Badge className="bg-card/95 text-card-foreground backdrop-blur-md border-0 py-2 px-3 shadow-lg">
                📷 12 photos
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
