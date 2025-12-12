import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { TripSummaryBar } from '@/components/TripSummaryBar';
import { RouteMap } from '@/components/RouteMap';
import { ItinerarySection } from '@/components/ItinerarySection';
import { Sidebar } from '@/components/Sidebar';
import { BookingBar } from '@/components/BookingBar';
import { MobileSidebar } from '@/components/MobileSidebar';
import { mockItinerary } from '@/data/mockItinerary';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header tripTitle={mockItinerary.title} />
      
      <main>
        <HeroSection itinerary={mockItinerary} />
        <TripSummaryBar itinerary={mockItinerary} />
        <RouteMap itinerary={mockItinerary} />
        
        <div className="container pb-32 lg:pb-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]">
            <ItinerarySection itinerary={mockItinerary} />
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <Sidebar itinerary={mockItinerary} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile sidebar drawer */}
      <MobileSidebar itinerary={mockItinerary} />

      <BookingBar 
        basePrice={mockItinerary.basePrice}
        flightPrice={1850}
        hotelPrice={600}
        addOnsTotal={0}
      />
    </div>
  );
};

export default Index;
