import { useState, useEffect } from 'react';
import { buildApiUrl, apiRequest, API_CONFIG } from '@/lib/config';

interface Room {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
}

interface Service {
  _id: string;
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  featured?: boolean;
  price?: number;
  duration?: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export const useRooms = (featured?: boolean) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (featured) params.append('featured', 'true');
        params.append('available', 'true');
        
        const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ROOMS, params));
        const result: ApiResponse<Room[]> = await response.json();
        
        if (result.success) {
          setRooms(result.data);
        } else {
          setError(result.error || 'Failed to fetch rooms');
        }
      } catch (err) {
        setError('Failed to fetch rooms');
        console.error('Error fetching rooms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [featured]);

  return { rooms, loading, error, refetch: () => fetchRooms() };
};

export const useServices = (featured?: boolean) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (featured) params.append('featured', 'true');
        params.append('available', 'true');
        
        const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.SERVICES, params));
        const result: ApiResponse<Service[]> = await response.json();
        
        if (result.success) {
          setServices(result.data);
        } else {
          setError(result.error || 'Failed to fetch services');
        }
      } catch (err) {
        setError('Failed to fetch services');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [featured]);

  return { services, loading, error, refetch: () => fetchServices() };
};

export const useBookings = (guestEmail?: string) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (guestEmail) params.append('guestEmail', guestEmail);
        
        const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.BOOKINGS, params));
        const result = await response.json();
        
        if (result.success) {
          setBookings(result.data);
        } else {
          setError(result.error || 'Failed to fetch bookings');
        }
      } catch (err) {
        setError('Failed to fetch bookings');
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [guestEmail]);

  return { bookings, loading, error, refetch: () => fetchBookings() };
};

interface BookingData {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  specialRequests?: string;
}

export const createBooking = async (bookingData: BookingData) => {
  try {
    const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.BOOKINGS), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating booking:', error);
    return { success: false, error: 'Failed to create booking' };
  }
};