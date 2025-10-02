import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_CONFIG, API_ENDPOINTS, REQUEST_CONFIG, logApiCall, logApiResponse } from '../config/api';
import { Business, SearchFilters, LegacyBusiness } from '../types/business';
import { businessApiService } from '../services/businessApi';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

// Helper function to convert new Business to legacy format for backward compatibility
const toLegacyBusiness = (business: any): LegacyBusiness => ({
  id: business.id.toString(),
  name: business.name,
  description: business.description || '',
  category: business.categories?.[0]?.category || business.category || 'Unknown',
  location: business.city || business.location || 'Unknown',
  address: business.formattedAddress || business.address || '',
  phone: business.phone || '',
  email: business.email,
  website: business.website,
  rating: business.rating || 0,
  reviewCount: business.reviewCount || 0,
  images: business.images || [],
  coordinates: business.coordinates || (business.latitude && business.longitude ? {
    lat: business.latitude,
    lng: business.longitude
  } : undefined),
  hours: business.hours || {},
  verified: business.isVerified || business.verified || false,
  createdAt: business.createdAt,
  updatedAt: business.updatedAt,
});

// Custom hook for backend integration
export const useBackendIntegration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinesses = async (filters: SearchFilters = {}): Promise<LegacyBusiness[]> => {
    setLoading(true);
    setError(null);
    
    try {
      logApiCall('GET', 'fetchBusinesses', filters);
      // Use the new business API service
      const response = await businessApiService.getAllBusinesses(
        filters.page || 1, 
        filters.limit || REQUEST_CONFIG.DEFAULT_LIMIT
      );
      const legacyBusinesses = response.businesses.map(toLegacyBusiness);
      logApiResponse('fetchBusinesses', { count: legacyBusinesses.length });
      return legacyBusinesses;
    } catch (err) {
      const errorMessage = 'Failed to fetch businesses';
      setError(errorMessage);
      logApiResponse('fetchBusinesses', null, err);
      console.error('Error fetching businesses:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchBusinessById = async (id: string): Promise<LegacyBusiness | null> => {
    setLoading(true);
    setError(null);
    
    try {
      logApiCall('GET', 'fetchBusinessById', { id });
      const business = await businessApiService.getBusinessById(parseInt(id));
      const legacyBusiness = toLegacyBusiness(business);
      logApiResponse('fetchBusinessById', legacyBusiness);
      return legacyBusiness;
    } catch (err) {
      const errorMessage = 'Failed to fetch business details';
      setError(errorMessage);
      logApiResponse('fetchBusinessById', null, err);
      console.error('Error fetching business:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const searchBusinesses = async (query: string, filters: SearchFilters = {}): Promise<LegacyBusiness[]> => {
    try {
      logApiCall('GET', 'searchBusinesses', { query, ...filters });
      const businesses = await businessApiService.searchBusinessesByName(query, filters.limit || 20);
      const legacyBusinesses = businesses.map(toLegacyBusiness);
      logApiResponse('searchBusinesses', { count: legacyBusinesses.length });
      return legacyBusinesses;
    } catch (err) {
      logApiResponse('searchBusinesses', null, err);
      console.error('Error searching businesses:', err);
      return [];
    }
  };

  const getBusinessesByCategory = async (category: string): Promise<LegacyBusiness[]> => {
    try {
      logApiCall('GET', 'getBusinessesByCategory', { category });
      const businesses = await businessApiService.getBusinessesByCategory(category);
      const legacyBusinesses = businesses.map(toLegacyBusiness);
      logApiResponse('getBusinessesByCategory', { count: legacyBusinesses.length });
      return legacyBusinesses;
    } catch (err) {
      logApiResponse('getBusinessesByCategory', null, err);
      console.error('Error fetching businesses by category:', err);
      return [];
    }
  };

  const getBusinessesByLocation = async (location: string): Promise<LegacyBusiness[]> => {
    try {
      logApiCall('GET', 'getBusinessesByLocation', { location });
      const businesses = await businessApiService.getBusinessesByLocation(location);
      const legacyBusinesses = businesses.map(toLegacyBusiness);
      logApiResponse('getBusinessesByLocation', { count: legacyBusinesses.length });
      return legacyBusinesses;
    } catch (err) {
      logApiResponse('getBusinessesByLocation', null, err);
      console.error('Error fetching businesses by location:', err);
      return [];
    }
  };

  const getFeaturedBusinesses = async (limit: number = 12): Promise<LegacyBusiness[]> => {
    setLoading(true);
    setError(null);
    
    try {
      logApiCall('GET', 'getFeaturedBusinesses', { limit });
      // For now, get recent businesses as featured since API doesn't have featured endpoint
      const response = await businessApiService.getAllBusinesses(1, limit);
      const legacyBusinesses = response.businesses.map(toLegacyBusiness);
      logApiResponse('getFeaturedBusinesses', { count: legacyBusinesses.length });
      return legacyBusinesses;
    } catch (err) {
      const errorMessage = 'Failed to fetch featured businesses';
      setError(errorMessage);
      logApiResponse('getFeaturedBusinesses', null, err);
      console.error('Error fetching featured businesses:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async (): Promise<string[]> => {
    try {
      logApiCall('GET', 'getCategories');
      const categories = await businessApiService.getCategories();
      logApiResponse('getCategories', categories);
      return categories;
    } catch (err) {
      logApiResponse('getCategories', null, err);
      console.error('Error fetching categories:', err);
      return [];
    }
  };

  const getLocations = async (): Promise<string[]> => {
    try {
      logApiCall('GET', 'getLocations');
      const cities = await businessApiService.getCities();
      logApiResponse('getLocations', cities);
      return cities;
    } catch (err) {
      logApiResponse('getLocations', null, err);
      console.error('Error fetching locations:', err);
      return [];
    }
  };

  const submitBusinessClaim = async (businessId: string, claimData: any): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const endpoint = API_ENDPOINTS.BUSINESSES.CLAIM(parseInt(businessId));
      logApiCall('POST', endpoint, claimData);
      await api.post(endpoint, claimData);
      logApiResponse(endpoint, { success: true });
      return true;
    } catch (err) {
      const errorMessage = 'Failed to submit business claim';
      setError(errorMessage);
      logApiResponse('submitBusinessClaim', null, err);
      console.error('Error submitting claim:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const submitBusinessReview = async (businessId: string, reviewData: any): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const endpoint = API_ENDPOINTS.BUSINESSES.REVIEWS(parseInt(businessId));
      logApiCall('POST', endpoint, reviewData);
      await api.post(endpoint, reviewData);
      logApiResponse(endpoint, { success: true });
      return true;
    } catch (err) {
      const errorMessage = 'Failed to submit review';
      setError(errorMessage);
      logApiResponse('submitBusinessReview', null, err);
      console.error('Error submitting review:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchBusinesses,
    fetchBusinessById,
    searchBusinesses,
    getBusinessesByCategory,
    getBusinessesByLocation,
    getFeaturedBusinesses,
    getCategories,
    getLocations,
    submitBusinessClaim,
    submitBusinessReview,
  };
};

// Fallback data service for when backend is not available
export const useFallbackData = () => {
  // This would use your existing static data as fallback
  const { businesses } = require('../utils/data');
  
  return {
    businesses,
    loading: false,
    error: null,
  };
};
