// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  ENDPOINTS: {
    ROOMS: '/api/rooms',
    SERVICES: '/api/services',
    BOOKINGS: '/api/bookings',
    ADMIN: '/api/admin',
    STATS: '/api/stats',
  },
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string, params?: URLSearchParams): string => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  return params ? `${url}?${params.toString()}` : url;
};

// Helper function for API requests with error handling
export const apiRequest = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};