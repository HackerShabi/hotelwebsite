import { Room, Booking } from './types';

// Simple in-memory database for development
// In production, replace with actual database (PostgreSQL, MongoDB, etc.)

interface Database {
  bookings: Booking[];
  rooms: Room[];
}

// Mock database
const db: Database = {
  bookings: [
    {
      id: 'BK001',
      guestName: 'John Smith',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      roomId: 'deluxe-suite',
      roomType: 'Deluxe Suite',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      guests: 2,
      totalAmount: 897,
      status: 'confirmed',
      createdAt: '2024-01-10',
      specialRequests: 'Late check-in requested'
    },
    {
      id: 'BK002',
      guestName: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 234 567 8901',
      roomId: 'presidential-suite',
      roomType: 'Presidential Suite',
      checkIn: '2024-01-20',
      checkOut: '2024-01-25',
      guests: 4,
      totalAmount: 3995,
      status: 'pending',
      createdAt: '2024-01-12',
      specialRequests: 'Anniversary celebration'
    },
    {
      id: 'BK003',
      guestName: 'Michael Brown',
      email: 'michael@example.com',
      phone: '+1 234 567 8902',
      roomId: 'ocean-view-room',
      roomType: 'Ocean View Room',
      checkIn: '2024-01-22',
      checkOut: '2024-01-24',
      guests: 2,
      totalAmount: 398,
      status: 'completed',
      createdAt: '2024-01-08',
      specialRequests: ''
    }
  ],
  rooms: [
    {
      id: 'deluxe-suite',
      title: 'Deluxe Suite',
      description: 'Spacious and elegantly appointed suite with panoramic city views.',
      price: 299,
      originalPrice: 399,
      images: [
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop'
      ],
      amenities: ['King Bed', 'City View', 'Free WiFi', 'Mini Bar'],
      maxGuests: 2,
      size: '45 sqm',
      bedType: 'King Bed',
      available: true,
      featured: true
    },
    {
      id: 'presidential-suite',
      title: 'Presidential Suite',
      description: 'The epitome of luxury with a private terrace and jacuzzi.',
      price: 799,
      originalPrice: 999,
      images: [
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop'
      ],
      amenities: ['King Bed', 'Private Terrace', 'Jacuzzi', 'Butler Service'],
      maxGuests: 4,
      size: '120 sqm',
      bedType: 'King Bed',
      available: true,
      featured: true
    },
    {
      id: 'ocean-view-room',
      title: 'Ocean View Room',
      description: 'Comfortable room with stunning ocean views.',
      price: 199,
      images: [
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop'
      ],
      amenities: ['Queen Bed', 'Ocean View', 'Free WiFi', 'Air Conditioning'],
      maxGuests: 2,
      size: '32 sqm',
      bedType: 'Queen Bed',
      available: true,
      featured: false
    },
    {
      id: 'family-suite',
      title: 'Family Suite',
      description: 'Perfect for families with connecting rooms and bunk beds.',
      price: 349,
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
      ],
      amenities: ['King Bed', 'Bunk Beds', 'Connecting Rooms', 'Free WiFi'],
      maxGuests: 6,
      size: '65 sqm',
      bedType: 'King Bed + Bunk Beds',
      available: true,
      featured: false
    }
  ]
};

// Database operations
export const database = {
  // Bookings
  getBookings: (): Booking[] => {
    return db.bookings;
  },

  getBookingById: (id: string): Booking | undefined => {
    return db.bookings.find(booking => booking.id === id);
  },

  createBooking: (booking: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const newBooking: Booking = {
      ...booking,
      id: `BK${String(db.bookings.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    db.bookings.push(newBooking);
    return newBooking;
  },

  updateBooking: (id: string, updates: Partial<Booking>): Booking | null => {
    const index = db.bookings.findIndex(booking => booking.id === id);
    if (index === -1) return null;
    
    db.bookings[index] = { ...db.bookings[index], ...updates };
    return db.bookings[index];
  },

  deleteBooking: (id: string): boolean => {
    const index = db.bookings.findIndex(booking => booking.id === id);
    if (index === -1) return false;
    
    db.bookings.splice(index, 1);
    return true;
  },

  // Rooms
  getRooms: (): Room[] => {
    return db.rooms;
  },

  getRoomById: (id: string): Room | undefined => {
    return db.rooms.find(room => room.id === id);
  },

  updateRoom: (id: string, updates: Partial<Room>): Room | null => {
    const index = db.rooms.findIndex(room => room.id === id);
    if (index === -1) return null;
    
    db.rooms[index] = { ...db.rooms[index], ...updates };
    return db.rooms[index];
  },

  // Statistics
  getStats: () => {
    const totalBookings = db.bookings.length;
    const totalRevenue = db.bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
    const confirmedBookings = db.bookings.filter(b => b.status === 'confirmed').length;
    const occupancyRate = Math.round((confirmedBookings / db.rooms.length) * 100);
    const avgDailyRate = totalRevenue / totalBookings || 0;

    return {
      totalBookings,
      totalRevenue,
      occupancyRate,
      avgDailyRate: Math.round(avgDailyRate)
    };
  }
};

export default database;