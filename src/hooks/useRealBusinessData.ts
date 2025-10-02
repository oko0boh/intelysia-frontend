import { useState, useEffect, useCallback } from 'react';
import { businessApiService } from '../services/businessApi';
import { BusinessWithCategories } from '../types/business';
import { businesses as staticBusinesses } from '../utils/data';
import { ProcessedBusiness } from '../utils/csvDataLoader';

// Helper function to convert static business data to API format
const convertStaticToApiFormat = (staticBusiness: any): BusinessWithCategories => ({
  id: staticBusiness.id,
  name: staticBusiness.name,
  normalizedName: staticBusiness.name.toLowerCase().replace(/\s+/g, '-'),
  description: staticBusiness.description,
  formattedAddress: staticBusiness.address,
  street: staticBusiness.address.split(',')[0],
  city: staticBusiness.location || 'Cotonou',
  country: 'Benin',
  latitude: staticBusiness.coordinates?.lat,
  longitude: staticBusiness.coordinates?.lng,
  phone: staticBusiness.phone,
  website: staticBusiness.website,
  rating: staticBusiness.rating,
  reviewCount: staticBusiness.reviews,
  isVerified: true,
  status: 'operational' as const,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  categories: [{
    businessId: staticBusiness.id,
    category: staticBusiness.category,
    isPrimary: true
  }]
});

// Helper function to convert API format to ProcessedBusiness format
const convertApiToProcessedFormat = (apiBusiness: BusinessWithCategories): ProcessedBusiness => ({
  id: typeof apiBusiness.id === 'string' ? apiBusiness.id : apiBusiness.id.toString(),
  name: apiBusiness.name,
  category: apiBusiness.categories[0]?.category || 'General',
  rating: typeof apiBusiness.rating === 'string' ? parseFloat(apiBusiness.rating) : (apiBusiness.rating || 0),
  reviews: apiBusiness.reviewCount || 0,
  address: apiBusiness.formattedAddress || '',
  phone: apiBusiness.phone || '',
  website: apiBusiness.website || '',
  description: apiBusiness.description || '',
  images: [], // API doesn't have images yet
  social_links: {},
  hours: '', // API doesn't have hours yet
  location: apiBusiness.city || 'Cotonou',
  coordinates: {
    lat: typeof apiBusiness.latitude === 'string' ? parseFloat(apiBusiness.latitude) : (apiBusiness.latitude || 6.36536),
    lng: typeof apiBusiness.longitude === 'string' ? parseFloat(apiBusiness.longitude) : (apiBusiness.longitude || 2.41833)
  },
  // Default empty enriched data for API format businesses
  enrichedPhones: [],
  enrichedWebsites: [],
  enrichedEmails: [],
  enrichedSocial: {},
  enrichedHours: [],
  enrichmentSources: [],
  enrichmentConfidence: 0,
  enrichmentDate: undefined,
  hasEnrichedData: false
});

export const useRealBusinessData = () => {
  const [businesses, setBusinesses] = useState<BusinessWithCategories[]>([]);
  const [processedBusinesses, setProcessedBusinesses] = useState<ProcessedBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        console.log('🚀 Starting to load business data (skipping API, loading CSV directly)...');
        
        // Skip API and go directly to CSV data since no backend is running
        throw new Error('No backend API server - loading CSV directly');
      } catch (err) {
        console.warn('✅ API skipped, loading CSV data directly:', err);
        
        try {
          // Try to load enriched CSV data with contact information
          console.log('🔄 Loading enriched CSV data from /data/enriched_businesses.csv...');
          const { loadBusinessData } = await import('../utils/csvDataLoader');
          const csvBusinesses = await loadBusinessData('/data/enriched_businesses.csv'); // Load enriched dataset
          
          if (!csvBusinesses || csvBusinesses.length === 0) {
            throw new Error('CSV data is empty or failed to load');
          }
          console.log('✅ Successfully loaded CSV data:', csvBusinesses.length, 'businesses');
          
          // Convert CSV businesses to API format - preserve original placeId as ID
          const apiFormatBusinesses = csvBusinesses.map((csvBusiness, index) => convertStaticToApiFormat({
            id: csvBusiness.id, // Use original placeId from CSV
            name: csvBusiness.name,
            category: csvBusiness.category, // Use actual category from CSV processing
            rating: csvBusiness.rating,
            reviews: csvBusiness.reviews,
            address: csvBusiness.address,
            phone: csvBusiness.phone,
            website: csvBusiness.website,
            description: csvBusiness.description || `${csvBusiness.name} in ${csvBusiness.location}`,
            coordinates: csvBusiness.coordinates,
            location: csvBusiness.location
          }));
          
          setBusinesses(apiFormatBusinesses);
          setProcessedBusinesses(csvBusinesses);
          setUsingFallback(false); // CSV is real data, not fallback
          setError(null);
        } catch (csvErr) {
          console.error('❌ CSV LOADING FAILED - falling back to static data:', csvErr);
          console.error('❌ This means business IDs will be numeric instead of Google Places IDs!');
          
          // Final fallback to static data
          const fallbackBusinesses = staticBusinesses.map(convertStaticToApiFormat);
          setBusinesses(fallbackBusinesses);
          setProcessedBusinesses(fallbackBusinesses.map(convertApiToProcessedFormat));
          setUsingFallback(true);
          setError(null);
          console.log('⚠️ Using static fallback data:', fallbackBusinesses.length, 'businesses');
          console.log('⚠️ Static data has numeric IDs, not Google Places IDs');
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getByCategory = useCallback(async (category: string): Promise<ProcessedBusiness[]> => {
    try {
      // Skip API and use local processed data directly
      console.log('🔍 Getting businesses by category:', category, 'from loaded data');
      return processedBusinesses.filter(b => 
        category === 'All' || b.category.toLowerCase() === category.toLowerCase()
      );
    } catch (err) {
      console.error('Error filtering businesses by category:', err);
      return [];
    }
  }, [processedBusinesses]);

  const getByLocation = useCallback(async (location: string): Promise<ProcessedBusiness[]> => {
    try {
      // Skip API and use loaded processedBusinesses data directly
      console.log('🔍 Filtering businesses by location:', location, 'from loaded data');
      
      // Normalize location name for better matching
      const normalizedLocation = location.toLowerCase().replace(/-/g, ' ');
      
      const filtered = processedBusinesses.filter(b => {
        const businessAddress = b.address?.toLowerCase() || '';
        
        // Use very precise location matching to avoid issues like "Abomey" matching "Abomey Calavi"
        const locationWords = normalizedLocation.split(' ');
        
        // For single word locations like "Abomey", we need to be extra careful
        if (locationWords.length === 1) {
          const targetLocation = locationWords[0];
          
          // Prevent "Abomey" from matching "Abomey Calavi", "Abomey-something", etc.
          // Look for exact word match followed by comma, space, or end of string
          const exactWordRegex = new RegExp(`\\b${targetLocation}\\b(?!\\s+[a-zA-Z])`, 'i');
          const matches = exactWordRegex.test(businessAddress);
          
          console.log(`Business: ${b.name} | Address: ${businessAddress} | Target: ${targetLocation} | Match: ${matches}`);
          return matches;
        } else {
          // For multi-word locations, use the original logic
          const addressWords = businessAddress.split(/[\s,]+/);
          const hasExactMatch = locationWords.every(locWord => 
            addressWords.some(addrWord => addrWord === locWord)
          );
          
          console.log(`Business: ${b.name} | Address: ${businessAddress} | Multi-word match: ${hasExactMatch}`);
          return hasExactMatch;
        }
      });
      
      console.log('✅ Found', filtered.length, 'businesses in', location);
      return filtered;
    } catch (err) {
      console.error('Error filtering businesses by location:', err);
      return [];
    }
  }, [processedBusinesses]);

  const getByCategoryAndLocation = useCallback(async (category: string, location: string): Promise<ProcessedBusiness[]> => {
    try {
      // Skip API and use loaded processedBusinesses data directly
      console.log('🔍 Filtering businesses by category and location:', category, location);
      
      // Normalize location name for better matching
      const normalizedLocation = location.toLowerCase().replace(/-/g, ' ');
      
      const filtered = processedBusinesses.filter(b => {
        const matchesCategory = category === 'All' || b.category?.toLowerCase().includes(category.toLowerCase());
        const businessAddress = b.address?.toLowerCase() || '';
        
        // Use very precise location matching to avoid issues like "Abomey" matching "Abomey Calavi"
        const locationWords = normalizedLocation.split(' ');
        
        let matchesLocation = false;
        
        // For single word locations like "Abomey", we need to be extra careful
        if (locationWords.length === 1) {
          const targetLocation = locationWords[0];
          
          // Prevent "Abomey" from matching "Abomey Calavi", "Abomey-something", etc.
          // Look for exact word match followed by comma, space, or end of string
          const exactWordRegex = new RegExp(`\\b${targetLocation}\\b(?!\\s+[a-zA-Z])`, 'i');
          matchesLocation = exactWordRegex.test(businessAddress);
        } else {
          // For multi-word locations, use the original logic
          const addressWords = businessAddress.split(/[\s,]+/);
          matchesLocation = locationWords.every(locWord => 
            addressWords.some(addrWord => addrWord === locWord)
          );
        }
        
        return matchesCategory && matchesLocation;
      });
      
      console.log('✅ Found', filtered.length, 'businesses in', category, location);
      return filtered;
    } catch (err) {
      console.error('Error filtering businesses by category and location:', err);
      return [];
    }
  }, [processedBusinesses]);

  const searchByName = useCallback(async (query: string): Promise<ProcessedBusiness[]> => {
    try {
      const businesses = await businessApiService.searchBusinessesByName(query);
      return businesses.map(convertApiToProcessedFormat);
    } catch (err) {
      console.error('Error searching businesses by name, using fallback:', err);
      // Fallback to searching static data
      const fallbackBusinesses = staticBusinesses
        .filter(b => b.name.toLowerCase().includes(query.toLowerCase()))
        .map(convertStaticToApiFormat);
      return fallbackBusinesses.map(convertApiToProcessedFormat);
    }
  }, []);

  const getBusinessById = useCallback(async (id: string | number): Promise<ProcessedBusiness | null> => {
    try {
      // If ID is a string (Google Places ID), search in processedBusinesses directly
      if (typeof id === 'string') {
        const business = processedBusinesses.find(b => b.id === id);
        return business || null;
      }
      
      // If ID is numeric, try API first then fallback
      const business = await businessApiService.getBusinessById(id);
      return convertApiToProcessedFormat(business);
    } catch (err) {
      console.error('Error fetching business by ID, using fallback:', err);
      // Fallback to finding in static data
      if (typeof id === 'string') {
        const business = processedBusinesses.find(b => b.id === id);
        return business || null;
      }
      const staticBusiness = staticBusinesses.find(b => b.id === id);
      return staticBusiness ? convertApiToProcessedFormat(convertStaticToApiFormat(staticBusiness)) : null;
    }
  }, [processedBusinesses]);

  return {
    businesses: processedBusinesses,
    loading,
    error,
    usingFallback,
    getByCategory,
    getByLocation,
    getByCategoryAndLocation,
    searchByName,
    getBusinessById,
    // Additional API services
    apiService: businessApiService
  };
};
