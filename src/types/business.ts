// Unified Business types for consistent API integration

export interface Business {
  id: number;
  name: string;
  normalizedName?: string;
  description?: string;
  category: string;
  location: string;
  
  // Address information
  address?: string;
  formattedAddress?: string;
  street?: string;
  city?: string;
  country?: string;
  
  // Contact information
  phone?: string;
  email?: string;
  website?: string;
  
  // Enriched contact information
  enrichedPhones?: string[];
  enrichedWebsites?: string[];
  enrichedEmails?: string[];
  enrichedSocial?: {
    facebook?: string[];
    instagram?: string[];
    twitter?: string[];
    linkedin?: string[];
    whatsapp?: string[];
  };
  enrichedHours?: string[];
  enrichmentSources?: string[];
  enrichmentConfidence?: number;
  enrichmentDate?: string;
  
  // Location coordinates
  coordinates?: {
    lat: number;
    lng: number;
  };
  latitude?: number;
  longitude?: number;
  
  // Business metrics
  rating?: number;
  reviewCount?: number;
  priceLevel?: number;
  
  // Business status
  verified?: boolean;
  isVerified?: boolean;
  status?: 'operational' | 'closed_temporarily' | 'closed_permanently' | 'unknown';
  
  // Media
  images?: string[];
  
  // Business hours
  hours?: {
    [key: string]: string;
  };
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  lastVerifiedAt?: string;
  
  // Business Claim & Ownership
  isClaimed?: boolean;
  claimStatus?: 'claimed' | 'pending_claim' | 'unclaimed';
  ownerId?: string;
  ownerVerified?: boolean;
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  ownerClaimedAt?: string;
  hasEnrichedData?: boolean;
}

export interface BusinessCategory {
  businessId: number;
  category: string;
  sourceId?: number;
  isPrimary: boolean;
}

export interface BusinessWithCategories extends Business {
  categories: BusinessCategory[];
}

export interface SearchFilters {
  query?: string;
  category?: string;
  location?: string;
  city?: string;
  radius?: number;
  rating?: number;
  verified?: boolean;
  priceLevel?: number;
  limit?: number;
  page?: number;
}

export interface BusinessListResponse {
  businesses: BusinessWithCategories[];
  total: number;
  page: number;
  limit: number;
}

export interface BusinessStats {
  totalBusinesses: number;
  totalCategories: number;
  totalCities: number;
  averageRating: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Legacy support - map old interface to new
export interface LegacyBusiness {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  rating: number;
  reviewCount: number;
  images: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  hours?: {
    [key: string]: string;
  };
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}