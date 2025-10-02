// API Health Check Service
import axios from 'axios';
import { API_CONFIG, logApiCall, logApiResponse } from '../config/api';

export interface HealthCheckResult {
  isHealthy: boolean;
  responseTime: number;
  error?: string;
  timestamp: Date;
}

class ApiHealthService {
  private healthCache: HealthCheckResult | null = null;
  private cacheTimeout = 30000; // 30 seconds cache

  // Check if API is reachable
  async checkApiHealth(): Promise<HealthCheckResult> {
    // Return cached result if available and fresh
    if (this.healthCache && 
        (Date.now() - this.healthCache.timestamp.getTime()) < this.cacheTimeout) {
      return this.healthCache;
    }

    const startTime = Date.now();
    
    try {
      logApiCall('GET', 'health-check');
      
      const response = await axios.get(`${API_CONFIG.BASE_URL}/health`, {
        timeout: 5000, // Quick timeout for health check
        validateStatus: (status) => status < 500 // Accept 4xx as healthy
      });
      
      const responseTime = Date.now() - startTime;
      
      const result: HealthCheckResult = {
        isHealthy: response.status < 400,
        responseTime,
        timestamp: new Date()
      };
      
      logApiResponse('health-check', result);
      this.healthCache = result;
      return result;
      
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      const result: HealthCheckResult = {
        isHealthy: false,
        responseTime,
        error: error.message || 'Connection failed',
        timestamp: new Date()
      };
      
      logApiResponse('health-check', null, error);
      this.healthCache = result;
      return result;
    }
  }

  // Check if we should use fallback data
  async shouldUseFallback(): Promise<boolean> {
    // Force fallback if configured
    if (API_CONFIG.USE_FALLBACK_DATA) {
      return true;
    }

    // Check API health
    const health = await this.checkApiHealth();
    return !health.isHealthy;
  }

  // Test basic API endpoints
  async testBasicEndpoints(): Promise<{
    businesses: boolean;
    categories: boolean;
    cities: boolean;
    overall: boolean;
  }> {
    const results = {
      businesses: false,
      categories: false,
      cities: false,
      overall: false
    };

    try {
      // Test businesses endpoint
      const businessResponse = await axios.get(`${API_CONFIG.BASE_URL}/businesses/all`, {
        params: { limit: 1 },
        timeout: 10000
      });
      results.businesses = businessResponse.status === 200;
    } catch (error) {
      console.warn('Businesses endpoint test failed:', error);
    }

    try {
      // Test categories endpoint
      const categoriesResponse = await axios.get(`${API_CONFIG.BASE_URL}/businesses/categories`, {
        timeout: 10000
      });
      results.categories = categoriesResponse.status === 200;
    } catch (error) {
      console.warn('Categories endpoint test failed:', error);
    }

    try {
      // Test cities endpoint
      const citiesResponse = await axios.get(`${API_CONFIG.BASE_URL}/businesses/cities`, {
        timeout: 10000
      });
      results.cities = citiesResponse.status === 200;
    } catch (error) {
      console.warn('Cities endpoint test failed:', error);
    }

    results.overall = results.businesses && results.categories && results.cities;
    
    if (API_CONFIG.DEBUG_MODE) {
      console.log('API Endpoints Test Results:', results);
    }
    
    return results;
  }

  // Clear health cache (useful for retesting)
  clearCache() {
    this.healthCache = null;
  }
}

export const apiHealthService = new ApiHealthService();
export default apiHealthService;