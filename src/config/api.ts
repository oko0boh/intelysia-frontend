// Centralized API configuration

// Vite exposes env vars as import.meta.env, not process.env
const env = (import.meta as any).env || {};

export const API_CONFIG = {
  // Base URLs
  BASE_URL: env.REACT_APP_API_URL || 'http://localhost:4000/api',
  TIMEOUT: parseInt(env.REACT_APP_API_TIMEOUT || '30000'),
  
  // Environment settings
  ENVIRONMENT: env.REACT_APP_ENVIRONMENT || 'development',
  DEBUG_MODE: env.REACT_APP_DEBUG_MODE === 'true',
  
  // Site configuration
  SITE_URL: env.REACT_APP_SITE_URL || 'https://intelysia.com',
  SITE_NAME: env.REACT_APP_SITE_NAME || 'Intelysia',
  
  // Analytics
  GA_TRACKING_ID: env.REACT_APP_GA_TRACKING_ID,
  
  // Fallback data configuration
  USE_FALLBACK_DATA: env.REACT_APP_USE_FALLBACK_DATA === 'true',
  FALLBACK_DATA_PATH: env.REACT_APP_FALLBACK_DATA_PATH || '/data/phase3_output.csv',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  BUSINESSES: {
    ALL: '/businesses/all',
    BY_ID: (id: number) => `/businesses/${id}`,
    BY_CATEGORY: (category: string) => `/businesses/by-category/${encodeURIComponent(category)}`,
    BY_LOCATION: (city: string) => `/businesses/by-location/${encodeURIComponent(city)}`,
    SEARCH: '/businesses/search',
    SEARCH_BY_NAME: '/businesses/search/name',
    FEATURED: '/businesses/featured',
    STATS: '/businesses/stats',
    CATEGORIES: '/businesses/categories',
    CITIES: '/businesses/cities',
    CLAIM: (id: number) => `/businesses/${id}/claim`,
    REVIEWS: (id: number) => `/businesses/${id}/reviews`,
  }
} as const;

// Request/Response configuration
export const REQUEST_CONFIG = {
  DEFAULT_TIMEOUT: API_CONFIG.TIMEOUT,
  DEFAULT_LIMIT: 50,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
} as const;

// Validation helpers
export const isValidApiUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getApiUrl = (endpoint: string): string => {
  const baseUrl = API_CONFIG.BASE_URL.endsWith('/') 
    ? API_CONFIG.BASE_URL.slice(0, -1) 
    : API_CONFIG.BASE_URL;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

// Development helpers
export const logApiCall = (method: string, url: string, data?: any) => {
  if (API_CONFIG.DEBUG_MODE) {
    console.log(`[API] ${method.toUpperCase()} ${url}`, data ? { data } : '');
  }
};

export const logApiResponse = (url: string, response: any, error?: any) => {
  if (API_CONFIG.DEBUG_MODE) {
    if (error) {
      console.error(`[API Error] ${url}:`, error);
    } else {
      console.log(`[API Response] ${url}:`, response);
    }
  }
};