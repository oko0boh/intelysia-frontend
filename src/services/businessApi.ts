import axios from 'axios';
import { API_CONFIG, API_ENDPOINTS, REQUEST_CONFIG, logApiCall, logApiResponse } from '../config/api';
import { Business, BusinessCategory, BusinessWithCategories, BusinessListResponse, BusinessStats } from '../types/business';

class BusinessApiService {
  private apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
  });

  // Get all businesses (with pagination)
  async getAllBusinesses(page: number = 1, limit: number = REQUEST_CONFIG.DEFAULT_LIMIT): Promise<BusinessListResponse> {
    try {
      logApiCall('GET', API_ENDPOINTS.BUSINESSES.ALL, { page, limit });
      const response = await this.apiClient.get(API_ENDPOINTS.BUSINESSES.ALL, {
        params: { page, limit }
      });
      logApiResponse(API_ENDPOINTS.BUSINESSES.ALL, response.data);
      return response.data;
    } catch (error) {
      logApiResponse(API_ENDPOINTS.BUSINESSES.ALL, null, error);
      console.error('Failed to fetch businesses:', error);
      throw new Error('Failed to fetch businesses from API');
    }
  }

  // Get businesses by category
  async getBusinessesByCategory(category: string, limit: number = REQUEST_CONFIG.DEFAULT_LIMIT): Promise<BusinessWithCategories[]> {
    try {
      const endpoint = API_ENDPOINTS.BUSINESSES.BY_CATEGORY(category);
      logApiCall('GET', endpoint, { category, limit });
      const response = await this.apiClient.get(endpoint, {
        params: { limit }
      });
      logApiResponse(endpoint, response.data);
      return response.data.businesses;
    } catch (error) {
      const endpoint = API_ENDPOINTS.BUSINESSES.BY_CATEGORY(category);
      logApiResponse(endpoint, null, error);
      console.error('Failed to fetch businesses by category:', error);
      throw new Error(`Failed to fetch businesses for category: ${category}`);
    }
  }

  // Get businesses by location (city)
  async getBusinessesByLocation(city: string, limit: number = REQUEST_CONFIG.DEFAULT_LIMIT): Promise<BusinessWithCategories[]> {
    try {
      const endpoint = API_ENDPOINTS.BUSINESSES.BY_LOCATION(city);
      logApiCall('GET', endpoint, { city, limit });
      const response = await this.apiClient.get(endpoint, {
        params: { limit }
      });
      logApiResponse(endpoint, response.data);
      return response.data.businesses;
    } catch (error) {
      const endpoint = API_ENDPOINTS.BUSINESSES.BY_LOCATION(city);
      logApiResponse(endpoint, null, error);
      console.error('Failed to fetch businesses by location:', error);
      throw new Error(`Failed to fetch businesses for location: ${city}`);
    }
  }

  // Get businesses by category and location
  async getBusinessesByCategoryAndLocation(category: string, city: string, limit: number = REQUEST_CONFIG.DEFAULT_LIMIT): Promise<BusinessWithCategories[]> {
    try {
      const endpoint = API_ENDPOINTS.BUSINESSES.SEARCH;
      logApiCall('GET', endpoint, { category, city, limit });
      const response = await this.apiClient.get(endpoint, {
        params: { category, city, limit }
      });
      logApiResponse(endpoint, response.data);
      return response.data.businesses;
    } catch (error) {
      logApiResponse(API_ENDPOINTS.BUSINESSES.SEARCH, null, error);
      console.error('Failed to fetch businesses by category and location:', error);
      throw new Error(`Failed to fetch businesses for category "${category}" in "${city}"`);
    }
  }

  // Get single business by ID
  async getBusinessById(id: number): Promise<BusinessWithCategories> {
    try {
      const endpoint = API_ENDPOINTS.BUSINESSES.BY_ID(id);
      logApiCall('GET', endpoint, { id });
      const response = await this.apiClient.get(endpoint);
      logApiResponse(endpoint, response.data);
      return response.data.business;
    } catch (error) {
      const endpoint = API_ENDPOINTS.BUSINESSES.BY_ID(id);
      logApiResponse(endpoint, null, error);
      console.error('Failed to fetch business details:', error);
      throw new Error(`Failed to fetch business with ID: ${id}`);
    }
  }

  // Search businesses by name
  async searchBusinessesByName(query: string, limit: number = 20): Promise<BusinessWithCategories[]> {
    try {
      const endpoint = API_ENDPOINTS.BUSINESSES.SEARCH_BY_NAME;
      logApiCall('GET', endpoint, { query, limit });
      const response = await this.apiClient.get(endpoint, {
        params: { query, limit }
      });
      logApiResponse(endpoint, response.data);
      return response.data.businesses;
    } catch (error) {
      logApiResponse(API_ENDPOINTS.BUSINESSES.SEARCH_BY_NAME, null, error);
      console.error('Failed to search businesses by name:', error);
      throw new Error(`Failed to search businesses with query: ${query}`);
    }
  }

  // Get all categories
  async getCategories(): Promise<string[]> {
    try {
      const endpoint = API_ENDPOINTS.BUSINESSES.CATEGORIES;
      logApiCall('GET', endpoint);
      const response = await this.apiClient.get(endpoint);
      logApiResponse(endpoint, response.data);
      return response.data.categories;
    } catch (error) {
      logApiResponse(API_ENDPOINTS.BUSINESSES.CATEGORIES, null, error);
      console.error('Failed to fetch categories:', error);
      throw new Error('Failed to fetch categories');
    }
  }

  // Get all cities
  async getCities(): Promise<string[]> {
    try {
      const endpoint = API_ENDPOINTS.BUSINESSES.CITIES;
      logApiCall('GET', endpoint);
      const response = await this.apiClient.get(endpoint);
      logApiResponse(endpoint, response.data);
      return response.data.cities;
    } catch (error) {
      logApiResponse(API_ENDPOINTS.BUSINESSES.CITIES, null, error);
      console.error('Failed to fetch cities:', error);
      throw new Error('Failed to fetch cities');
    }
  }

  // Get business statistics
  async getBusinessStats(): Promise<BusinessStats> {
    try {
      const endpoint = API_ENDPOINTS.BUSINESSES.STATS;
      logApiCall('GET', endpoint);
      const response = await this.apiClient.get(endpoint);
      logApiResponse(endpoint, response.data);
      return response.data;
    } catch (error) {
      logApiResponse(API_ENDPOINTS.BUSINESSES.STATS, null, error);
      console.error('Failed to fetch business stats:', error);
      throw new Error('Failed to fetch business statistics');
    }
  }
}

export const businessApiService = new BusinessApiService();
export default businessApiService;