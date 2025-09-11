export interface User {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  userType: 'diner' | 'owner';
  avatarUrl?: string;
  createdAt: string;
}

export interface Restaurant {
  id: string;
  ownerId: string;
  name: string;
  description?: string;
  cuisineType: string[];
  address: string;
  phone: string;
  email: string;
  rating: number;
  priceRange: 1 | 2 | 3 | 4;
  images: string[];
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  restaurantId: string;
  bookingDate: string;
  bookingTime: string;
  partySize: number;
  status: 'pending' | 'approved' | 'declined' | 'completed' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
  restaurant?: Restaurant;
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