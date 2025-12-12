import { Button } from '@/components/ui/button';

interface BookingBarProps {
  basePrice: number;
  flightPrice: number;
  hotelPrice: number;
  addOnsTotal: number;
}

export function BookingBar({ basePrice, flightPrice, hotelPrice, addOnsTotal }: BookingBarProps) {
  const total = basePrice + flightPrice + hotelPrice + addOnsTotal;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg shadow-xl lg:hidden">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Trip Summary</p>
            <p className="text-xl font-bold text-foreground">${total.toLocaleString()}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Save Changes
            </Button>
            <Button size="sm">
              Book Now →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
