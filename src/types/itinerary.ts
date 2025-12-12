export type StopType = 'flight' | 'hotel' | 'attraction' | 'restaurant' | 'freetime';

export interface Document {
  id: string;
  name: string;
  fileName: string;
  size: string;
  type: 'pdf' | 'image' | 'document';
}

export interface Stop {
  id: string;
  type: StopType;
  time: string;
  duration?: string;
  title: string;
  subtitle: string;
  image?: string;
  details?: {
    label: string;
    value: string;
  }[];
  documents?: Document[];
  tip?: string;
  info?: string;
}

export interface Day {
  id: string;
  dayNumber: number;
  title: string;
  date: string;
  location: string;
  heroImage?: string;
  stops: Stop[];
  isToday?: boolean;
}

export interface FlightOption {
  id: string;
  airline: string;
  flightNumber: string;
  badge?: string;
  price: number;
  departure: {
    airport: string;
    time: string;
  };
  arrival: {
    airport: string;
    time: string;
  };
  duration: string;
  selected?: boolean;
}

export interface HotelOption {
  id: string;
  name: string;
  stars: number;
  rating: number;
  reviews: number;
  badge?: string;
  priceModifier: number;
  included?: boolean;
  selected?: boolean;
}

export interface AddOn {
  id: string;
  title: string;
  price: number;
  priceType: 'per-person' | 'total';
  day: number;
  duration: string;
  location: string;
  icon: string;
  selected?: boolean;
}

export interface TravelOrganizer {
  name: string;
  initials: string;
  verified: boolean;
  established: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  phone: string;
  email: string;
  whatsapp: boolean;
}

export interface Itinerary {
  id: string;
  title: string;
  description: string;
  travelerName: string;
  startDate: string;
  endDate: string;
  duration: number;
  destinations: string[];
  heroImage: string;
  days: Day[];
  flightOptions: FlightOption[];
  hotelOptions: HotelOption[];
  addOns: AddOn[];
  included: string[];
  organizer: TravelOrganizer;
  basePrice: number;
  savings: number;
}
