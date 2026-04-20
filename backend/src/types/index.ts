// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: any[];
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationMeta;
}

// User Types
export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: "user" | "agent" | "admin";
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserPublic = Omit<IUser, "password">;

// Property Types
export interface IProperty {
  id: string;
  title: string;
  description: string;
  category: "apartment" | "house" | "villa" | "land" | "townhouse" | "hostel";
  propertyType: "residential" | "commercial" | "industrial";
  price: bigint;
  location: string;
  city: string;
  state: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  parking?: number;
  amenities?: string;
  images?: string;
  videoUrl?: string;
  featured: boolean;
  verified: boolean;
  active: boolean;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Inquiry Types
export interface IInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "pending" | "contacted" | "converted" | "rejected";
  propertyId: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Favorite Types
export interface IFavorite {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: Date;
}

// Review Types
export interface IReview {
  id: string;
  rating: number;
  comment: string;
  propertyId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Category Types
export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
