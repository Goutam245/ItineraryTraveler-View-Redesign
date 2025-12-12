import { useState } from 'react';
import {
  Settings,
  Check,
  Star,
  AlertTriangle,
  Phone,
  Mail,
  MessageCircle,
  Share2,
  ChevronDown,
  Plane,
  Building,
  Download,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Itinerary } from '@/types/itinerary';
import { cn } from '@/lib/utils';

interface SidebarProps {
  itinerary: Itinerary;
}

export function Sidebar({ itinerary }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['customize', 'included']);
  const [selectedFlight, setSelectedFlight] = useState(itinerary.flightOptions.find(f => f.selected)?.id);
  const [selectedHotel, setSelectedHotel] = useState(itinerary.hotelOptions.find(h => h.selected)?.id);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev =>
      prev.includes(id)
        ? prev.filter(a => a !== id)
        : [...prev, id]
    );
  };

  return (
    <aside className="space-y-6">
      {/* Customize Your Experience */}
      <div className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 overflow-hidden">
        <button
          onClick={() => toggleSection('customize')}
          className="w-full flex items-center justify-between p-4"
        >
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">Customize Your Experience</span>
          </div>
          <ChevronDown className={cn(
            'h-5 w-5 text-muted-foreground transition-transform',
            expandedSections.includes('customize') && 'rotate-180'
          )} />
        </button>
        
        {expandedSections.includes('customize') && (
          <div className="p-4 pt-0 space-y-6">
            <p className="text-sm text-muted-foreground">
              Tailor your itinerary to match your preferences and needs.
            </p>

            {/* Flight Selection */}
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                <Plane className="h-4 w-4 text-flight" />
                Select Your Flight
              </p>
              <div className="space-y-2">
                {itinerary.flightOptions.map((flight) => (
                  <label
                    key={flight.id}
                    className={cn(
                      'block rounded-lg border p-3 cursor-pointer transition-all',
                      selectedFlight === flight.id
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors',
                        selectedFlight === flight.id
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground'
                      )}>
                        {selectedFlight === flight.id && (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-foreground">{flight.airline} {flight.flightNumber}</span>
                          {flight.badge && (
                            <Badge variant="ghost" className="text-xs py-0">{flight.badge}</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {flight.departure.airport} → {flight.arrival.airport} • {flight.departure.time} → {flight.arrival.time} • {flight.duration}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-primary">${flight.price}</span>
                    </div>
                    <input
                      type="radio"
                      name="flight"
                      value={flight.id}
                      checked={selectedFlight === flight.id}
                      onChange={() => setSelectedFlight(flight.id)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Hotel Selection */}
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                <Building className="h-4 w-4 text-hotel" />
                Select Your Hotel - Rome (Days 1-2)
              </p>
              <div className="space-y-2">
                {itinerary.hotelOptions.map((hotel) => (
                  <label
                    key={hotel.id}
                    className={cn(
                      'block rounded-lg border p-3 cursor-pointer transition-all',
                      selectedHotel === hotel.id
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors',
                        selectedHotel === hotel.id
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground'
                      )}>
                        {selectedHotel === hotel.id && (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-foreground">{hotel.name}</span>
                          {hotel.badge && (
                            <Badge variant={hotel.badge === 'Recommended' ? 'premium' : 'ghost'} className="text-xs py-0">
                              {hotel.badge === 'Recommended' ? '🔥' : ''} {hotel.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          {'⭐'.repeat(hotel.stars)} {hotel.rating}/5 • ({hotel.reviews} reviews)
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        {hotel.included ? 'Included' : `+$${hotel.priceModifier}`}
                      </span>
                    </div>
                    <input
                      type="radio"
                      name="hotel"
                      value={hotel.id}
                      checked={selectedHotel === hotel.id}
                      onChange={() => setSelectedHotel(hotel.id)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <p className="flex items-center justify-between text-sm font-semibold text-foreground mb-3">
                <span>Optional Add-ons</span>
                <Badge variant="ghost">{selectedAddOns.length} selected</Badge>
              </p>
              <div className="space-y-2">
                {itinerary.addOns.map((addon) => (
                  <label
                    key={addon.id}
                    className={cn(
                      'block rounded-lg border p-3 cursor-pointer transition-all',
                      selectedAddOns.includes(addon.id)
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'mt-0.5 h-5 w-5 rounded border-2 flex items-center justify-center transition-colors',
                        selectedAddOns.includes(addon.id)
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground'
                      )}>
                        {selectedAddOns.includes(addon.id) && (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{addon.icon}</span>
                          <span className="text-sm font-medium text-foreground">{addon.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          📅 Day {addon.day || 'Any'} • ⏱️ {addon.duration} • 📍 {addon.location}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        +${addon.price} {addon.priceType === 'per-person' ? '/pp' : ''}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedAddOns.includes(addon.id)}
                      onChange={() => toggleAddOn(addon.id)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* What's Included */}
      <div className="rounded-xl bg-success-light border border-success/20 p-4">
        <p className="flex items-center gap-2 font-semibold text-foreground mb-4">
          <Check className="h-5 w-5 text-success" />
          What's Included
        </p>
        <ul className="space-y-2 mb-4">
          {itinerary.included.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-foreground">
              <Check className="h-4 w-4 text-success shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <div className="border-t border-success/20 pt-4 space-y-1">
          <p className="text-sm text-muted-foreground line-through">Regular Price: $2,850</p>
          <p className="text-xl font-bold text-foreground">With Itinify: ${itinerary.basePrice}</p>
          <p className="text-sm font-semibold text-success">
            💰 You Save ${itinerary.savings} (30% off!)
          </p>
        </div>
      </div>

      {/* Travel Documents */}
      <div className="rounded-xl bg-card border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="flex items-center gap-2 font-semibold text-foreground">
            <FileText className="h-5 w-5" />
            Your Travel Documents
          </p>
          <Button variant="ghost" size="sm" className="text-xs">
            <Download className="h-3 w-3 mr-1" />
            Download all
          </Button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-secondary/30 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-flight-light flex items-center justify-center">
                <FileText className="h-5 w-5 text-flight" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Flight Ticket</p>
                <p className="text-xs text-muted-foreground">TLV → FCO • Jul 15, 08:00</p>
              </div>
            </div>
            <span className="text-muted-foreground">→</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-secondary/30 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-hotel-light flex items-center justify-center">
                <FileText className="h-5 w-5 text-hotel" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Hotel Voucher</p>
                <p className="text-xs text-muted-foreground">Grand Hotel • Rome</p>
              </div>
            </div>
            <span className="text-muted-foreground">→</span>
          </div>
        </div>
      </div>

      {/* Important Info */}
      <div className="rounded-xl bg-warning-light border border-warning/20 p-4">
        <p className="flex items-center gap-2 font-semibold text-foreground mb-3">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Important Info
        </p>
        <ul className="space-y-2 text-sm text-foreground">
          <li>• Comfortable walking shoes recommended for all days</li>
          <li>• Shoulders and knees must be covered for Vatican on Day 2</li>
          <li>• Keep your passport and printed documents in hand luggage</li>
          <li>• Local time is CET (UTC+1). Your schedule is in local time</li>
        </ul>
      </div>

      {/* Travel Organizer */}
      <div className="rounded-xl bg-card border border-border p-4">
        <div className="flex items-start gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            {itinerary.organizer.initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-foreground">{itinerary.organizer.name}</p>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Share2 className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {itinerary.organizer.verified && (
                <Badge variant="success" className="py-0 text-xs">✓ Verified</Badge>
              )}
              <span>Est {itinerary.organizer.established}</span>
              <span>•</span>
              <span>{itinerary.organizer.location}</span>
            </div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              {'⭐'.repeat(5)} {itinerary.organizer.rating} ({itinerary.organizer.reviews} reviews)
            </p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          "{itinerary.organizer.description}"
        </p>
        
        <div className="space-y-2 text-sm text-foreground mb-4">
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            {itinerary.organizer.phone}
          </p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            {itinerary.organizer.email}
          </p>
          {itinerary.organizer.whatsapp && (
            <p className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-success" />
              <span className="text-success">24/7 WhatsApp Support Available</span>
            </p>
          )}
        </div>
        
        <Button className="w-full">
          <MessageCircle className="h-4 w-4" />
          Contact Us
        </Button>
        
        <p className="text-center text-xs text-muted-foreground mt-4">
          Powered by <span className="font-semibold">Itinify</span> • Professional Travel Planning
        </p>
      </div>
    </aside>
  );
}
