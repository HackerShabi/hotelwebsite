export interface Room {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  amenities: string[];
  maxGuests: number;
  size: string;
  bedType: string;
  available: boolean;
  featured?: boolean;
}

export interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  roomId: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  createdAt: string;
  specialRequests?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  featured?: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: 'rooms' | 'restaurant' | 'spa' | 'exterior' | 'amenities';
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image?: string;
  date: string;
}

export interface HotelInfo {
  name: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  checkIn: string;
  checkOut: string;
  policies: string[];
  rooms: Room[];
  services: Service[];
  galleryImages: GalleryImage[];
  teamMembers: TeamMember[];
  testimonials: Testimonial[];
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}