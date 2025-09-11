export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  totalPages: number;
}

export interface SearchFilters {
  category?: string;
  priceRange?: number[];
  rating?: number;
  distance?: number;
  amenities?: string[];
}