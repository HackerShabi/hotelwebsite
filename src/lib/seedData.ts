import { connectToDatabase } from './mongodb';
import Room from './models/Room';
import Service from './models/Service';

// Initial room data
const initialRooms = [
  {
    id: 'deluxe-ocean-view',
    title: 'Deluxe Ocean View',
    description: 'Spacious room with stunning ocean views, king-size bed, and modern amenities.',
    price: 299,
    originalPrice: 399,
    images: [
      '/images/rooms/deluxe-ocean-1.jpg',
      '/images/rooms/deluxe-ocean-2.jpg',
      '/images/rooms/deluxe-ocean-3.jpg'
    ],
    amenities: [
      'Ocean View',
      'King Size Bed',
      'Free WiFi',
      'Mini Bar',
      'Air Conditioning',
      'Room Service',
      'Balcony',
      'Smart TV'
    ],
    maxGuests: 2,
    size: '45 sqm',
    bedType: 'King Size',
    available: true,
    featured: true
  },
  {
    id: 'luxury-suite',
    title: 'Luxury Suite',
    description: 'Premium suite with separate living area, premium amenities, and panoramic city views.',
    price: 599,
    originalPrice: 799,
    images: [
      '/images/rooms/luxury-suite-1.jpg',
      '/images/rooms/luxury-suite-2.jpg',
      '/images/rooms/luxury-suite-3.jpg'
    ],
    amenities: [
      'City View',
      'Separate Living Area',
      'King Size Bed',
      'Free WiFi',
      'Premium Mini Bar',
      'Air Conditioning',
      '24/7 Room Service',
      'Private Balcony',
      'Smart TV',
      'Jacuzzi',
      'Work Desk'
    ],
    maxGuests: 4,
    size: '85 sqm',
    bedType: 'King Size + Sofa Bed',
    available: true,
    featured: true
  },
  {
    id: 'standard-room',
    title: 'Standard Room',
    description: 'Comfortable room with essential amenities, perfect for business travelers.',
    price: 149,
    images: [
      '/images/rooms/standard-1.jpg',
      '/images/rooms/standard-2.jpg'
    ],
    amenities: [
      'Queen Size Bed',
      'Free WiFi',
      'Air Conditioning',
      'Work Desk',
      'Smart TV',
      'Coffee Maker'
    ],
    maxGuests: 2,
    size: '25 sqm',
    bedType: 'Queen Size',
    available: true,
    featured: false
  },
  {
    id: 'family-room',
    title: 'Family Room',
    description: 'Spacious room perfect for families with children, featuring bunk beds and play area.',
    price: 249,
    images: [
      '/images/rooms/family-1.jpg',
      '/images/rooms/family-2.jpg'
    ],
    amenities: [
      'Double Bed + Bunk Beds',
      'Free WiFi',
      'Air Conditioning',
      'Mini Fridge',
      'Smart TV',
      'Play Area',
      'Baby Cot Available'
    ],
    maxGuests: 4,
    size: '40 sqm',
    bedType: 'Double + Bunk Beds',
    available: true,
    featured: true
  }
];

// Initial service data
const initialServices = [
  {
    id: 'spa-wellness',
    title: 'Spa & Wellness',
    description: 'Relax and rejuvenate with our premium spa treatments and wellness facilities.',
    icon: '🧘‍♀️',
    image: '/images/services/spa.jpg',
    featured: true,
    price: 150,
    duration: '90 minutes',
    available: true
  },
  {
    id: 'fine-dining',
    title: 'Fine Dining',
    description: 'Experience culinary excellence at our award-winning restaurant.',
    icon: '🍽️',
    image: '/images/services/dining.jpg',
    featured: true,
    available: true
  },
  {
    id: 'fitness-center',
    title: 'Fitness Center',
    description: 'State-of-the-art fitness equipment and personal training services.',
    icon: '💪',
    image: '/images/services/fitness.jpg',
    featured: true,
    available: true
  },
  {
    id: 'business-center',
    title: 'Business Center',
    description: 'Fully equipped business facilities for corporate travelers.',
    icon: '💼',
    image: '/images/services/business.jpg',
    featured: false,
    available: true
  },
  {
    id: 'concierge',
    title: 'Concierge Service',
    description: '24/7 concierge service to assist with all your needs.',
    icon: '🛎️',
    featured: false,
    available: true
  },
  {
    id: 'pool-bar',
    title: 'Pool & Bar',
    description: 'Outdoor pool with poolside bar service and tropical cocktails.',
    icon: '🏊‍♂️',
    image: '/images/services/pool.jpg',
    featured: true,
    available: true
  }
];

export async function seedDatabase() {
  try {
    await connectToDatabase();
    
    // Clear existing data
    await Room.deleteMany({});
    await Service.deleteMany({});
    
    // Insert rooms
    await Room.insertMany(initialRooms);
    console.log('✅ Rooms seeded successfully');
    
    // Insert services
    await Service.insertMany(initialServices);
    console.log('✅ Services seeded successfully');
    
    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}