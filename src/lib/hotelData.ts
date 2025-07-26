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

// Room data
const rooms: Room[] = [
  {
    id: "deluxe-suite",
    title: "Deluxe Suite",
    description: "Spacious and elegantly appointed suite with panoramic city views, separate living area, and premium amenities.",
    price: 299,
    originalPrice: 399,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop"
    ],
    amenities: ["King Bed", "City View", "Free WiFi", "Mini Bar", "Room Service", "Air Conditioning"],
    maxGuests: 2,
    size: "45 sqm",
    bedType: "King Bed",
    available: true,
    featured: true
  },
  {
    id: "presidential-suite",
    title: "Presidential Suite",
    description: "The epitome of luxury with a private terrace, jacuzzi, and personalized butler service.",
    price: 799,
    originalPrice: 999,
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop"
    ],
    amenities: ["King Bed", "Private Terrace", "Jacuzzi", "Butler Service", "Premium WiFi", "Mini Bar", "Room Service"],
    maxGuests: 4,
    size: "120 sqm",
    bedType: "King Bed",
    available: true,
    featured: true
  },
  {
    id: "ocean-view-room",
    title: "Ocean View Room",
    description: "Comfortable room with stunning ocean views and modern amenities for a relaxing stay.",
    price: 199,
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
    ],
    amenities: ["Queen Bed", "Ocean View", "Free WiFi", "Air Conditioning", "Coffee Maker"],
    maxGuests: 2,
    size: "32 sqm",
    bedType: "Queen Bed",
    available: true
  },
  {
    id: "family-suite",
    title: "Family Suite",
    description: "Perfect for families with connecting rooms, bunk beds for children, and family-friendly amenities.",
    price: 349,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop"
    ],
    amenities: ["King Bed", "Bunk Beds", "Connecting Rooms", "Free WiFi", "Mini Fridge", "Game Console"],
    maxGuests: 6,
    size: "65 sqm",
    bedType: "King Bed + Bunk Beds",
    available: true
  }
];

// Service data
const services: Service[] = [
  {
    id: "spa-wellness",
    title: "Spa & Wellness",
    description: "Rejuvenate your body and mind with our world-class spa treatments and wellness facilities.",
    icon: "Sparkles",
    featured: true
  },
  {
    id: "fine-dining",
    title: "Fine Dining",
    description: "Experience culinary excellence at our award-winning restaurants with international cuisine.",
    icon: "UtensilsCrossed",
    featured: true
  },
  {
    id: "fitness-center",
    title: "Fitness Center",
    description: "State-of-the-art fitness equipment and personal training services available 24/7.",
    icon: "Dumbbell",
    featured: true
  },
  {
    id: "business-center",
    title: "Business Center",
    description: "Fully equipped business facilities and meeting rooms for corporate travelers.",
    icon: "Briefcase",
    featured: false
  },
  {
    id: "concierge",
    title: "Concierge Service",
    description: "Personalized assistance for reservations, tours, and local recommendations.",
    icon: "Users",
    featured: false
  },
  {
    id: "valet-parking",
    title: "Valet Parking",
    description: "Convenient valet parking service for all guests with luxury vehicle care.",
    icon: "Car",
    featured: false
  }
];

// Gallery data
const galleryImages: GalleryImage[] = [
  {
    id: "lobby-1",
    url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
    alt: "Elegant hotel lobby with marble floors",
    category: "exterior"
  },
  {
    id: "restaurant-1",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    alt: "Fine dining restaurant interior",
    category: "restaurant"
  },
  {
    id: "spa-1",
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop",
    alt: "Relaxing spa treatment room",
    category: "spa"
  },
  {
    id: "pool-1",
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    alt: "Infinity pool with city view",
    category: "amenities"
  },
  {
    id: "suite-1",
    url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
    alt: "Luxurious suite bedroom",
    category: "rooms"
  },
  {
    id: "exterior-1",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    alt: "Hotel exterior at sunset",
    category: "exterior"
  }
];

// Team data
const teamMembers: TeamMember[] = [
  {
    id: "john-smith",
    name: "John Smith",
    position: "General Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "With over 15 years in luxury hospitality, John ensures every guest receives exceptional service."
  },
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    position: "Head Chef",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    bio: "Award-winning chef with expertise in international cuisine and innovative culinary experiences."
  },
  {
    id: "michael-brown",
    name: "Michael Brown",
    position: "Spa Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Certified wellness expert dedicated to providing transformative spa and wellness experiences."
  }
];

// Testimonial data
const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Emily Davis",
    location: "New York, USA",
    rating: 5,
    comment: "Absolutely stunning hotel with impeccable service. The staff went above and beyond to make our anniversary celebration unforgettable.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    date: "2024-01-15"
  },
  {
    id: "testimonial-2",
    name: "James Wilson",
    location: "London, UK",
    rating: 5,
    comment: "The presidential suite exceeded all expectations. The view, amenities, and personalized service were world-class.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    date: "2024-01-10"
  },
  {
    id: "testimonial-3",
    name: "Maria Garcia",
    location: "Madrid, Spain",
    rating: 5,
    comment: "Perfect location, beautiful rooms, and the spa treatments were divine. Will definitely return!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    date: "2024-01-05"
  }
];

// Default hotel data - can be customized for each hotel
export const hotelData: HotelInfo = {
  name: "Luxury Grand Hotel",
  tagline: "Where Elegance Meets Comfort",
  description: "Experience unparalleled luxury and comfort at our prestigious hotel. With world-class amenities, exceptional service, and breathtaking views, we create unforgettable memories for our distinguished guests.",
  address: {
    street: "123 Luxury Avenue",
    city: "Metropolitan City",
    state: "State",
    zipCode: "12345",
    country: "Country"
  },
  contact: {
    phone: "+1 (555) 123-4567",
    email: "info@luxurygrandhotel.com",
    whatsapp: "+1555123456"
  },
  socialMedia: {
    facebook: "https://facebook.com/luxurygrandhotel",
    instagram: "https://instagram.com/luxurygrandhotel",
    twitter: "https://twitter.com/luxurygrandhotel",
    linkedin: "https://linkedin.com/company/luxurygrandhotel"
  },
  coordinates: {
    lat: 40.7128,
    lng: -74.0060
  },
  checkIn: "3:00 PM",
  checkOut: "11:00 AM",
  policies: [
    "Check-in time is 3:00 PM and check-out time is 11:00 AM",
    "Valid government-issued photo ID required at check-in",
    "Smoking is prohibited in all rooms and indoor areas",
    "Pets are welcome with prior arrangement (additional fees may apply)",
    "Cancellation policy: 24 hours before arrival for full refund"
  ],
  rooms,
  services,
  galleryImages,
  teamMembers,
  testimonials
};