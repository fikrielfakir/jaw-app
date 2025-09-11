export interface User {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  userType: 'diner' | 'owner';
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Restaurant {
  id: string;
  ownerId: string;
  name: string;
  description?: string;
  cuisineTypes: string[];
  address: string;
  city: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  priceRange: 1 | 2 | 3 | 4;
  images: string[];
  coverImage: string;
  amenities: string[];
  businessHours: BusinessHours;
  isVerified: boolean;
  createdAt: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface BusinessHours {
  [key: string]: {
    open: string;
    close: string;
    isClosed: boolean;
  };
}

export interface Booking {
  id: string;
  userId: string;
  restaurantId: string;
  bookingDate: string;
  bookingTime: string;
  partySize: number;
  status: 'pending' | 'approved' | 'declined' | 'completed' | 'cancelled' | 'closed';
  specialRequests?: string;
  tableSection?: string;
  createdAt: string;
  restaurant?: Restaurant;
  user?: User;
}

export interface Review {
  id: string;
  userId: string;
  restaurantId: string;
  bookingId?: string;
  rating: number;
  comment?: string;
  images?: string[];
  createdAt: string;
  user?: User;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  icon: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'review' | 'promotion' | 'social';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: string;
}

export interface OwnerStats {
  totalViews: number;
  totalImpressions: number;
  weeklyViews: number[];
  monthlyBookings: number;
  averageRating: number;
  growthPercentage: number;
}