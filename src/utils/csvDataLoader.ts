import Papa from 'papaparse';

export interface CSVBusiness {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  placeId: string;
  types: string;
  phone: string;
  website: string;
  rating: number;
  reviewCount: number;
  businessStatus: string;
  openingHours: string;
  source: string;
  query: string;
  city: string;
  createdAt: string;
  updatedAt: string;
  reviews: string;
  reviewSummary: string;
  hours: string;
  originalPhone: string;
  originalWebsite: string;
  // Enriched data fields
  enrichedPhones: string;
  enrichedWebsites: string;
  enrichedEmails: string;
  enrichedSocial: string;
  enrichedHours: string;
  enrichmentSources: string;
  enrichmentConfidence: number;
  enrichmentDate: string;
}

export interface ProcessedBusiness {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  address: string;
  phone: string;
  website: string;
  description: string;
  images: string[];
  social_links: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  hours: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  // Enriched data
  enrichedPhones: string[];
  enrichedWebsites: string[];
  enrichedEmails: string[];
  enrichedSocial: {
    facebook?: string[];
    instagram?: string[];
    twitter?: string[];
    linkedin?: string[];
    whatsapp?: string[];
  };
  enrichedHours: string[];
  enrichmentSources: string[];
  enrichmentConfidence: number;
  enrichmentDate?: string;
  hasEnrichedData: boolean;
}

// Category mapping from enhanced_category numbers to readable names
const categoryMap: { [key: string]: string } = {
  '0': 'Services',
  '10': 'Education',
  '20': 'Health',
  '30': 'Restaurants',
  '40': 'Hotels',
  '42': 'Hotels',
  '43': 'Hotels',
  '45': 'Transportation',
  '46': 'Transportation',
  '49': 'Services',
  '50': 'Services',
  '60': 'Health',
  '70': 'Entertainment',
  '79': 'Services',
  '80': 'Cafes',
  '90': 'Shopping'
};

// Category-specific business images with variety
const defaultImages: { [key: string]: string[] } = {
  'Restaurants': [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Restaurant interior
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Fine dining
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Local cuisine
    'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'  // African cuisine
  ],
  'Hotels': [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Hotel room
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80', // Hotel lobby
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Boutique hotel
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'  // Hotel exterior
  ],
  'Health': [
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Hospital exterior
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Medical equipment
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Clinic interior
    'https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'  // Pharmacy
  ],
  'Education': [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // University
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // School classroom
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Library
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'  // School building
  ],
  'Shopping': [
    'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Shopping mall
    'https://images.unsplash.com/photo-1473187983305-f615310e7daa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Boutique
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Store interior
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'  // Local market
  ],
  'Cafes': [
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Coffee shop
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Cafe interior
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Coffee counter
    'https://images.unsplash.com/photo-1559496417-e7f25cb247cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'  // Cozy cafe
  ],
  'Entertainment': [
    'https://images.unsplash.com/photo-1489599735734-79b4169bc2d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Cinema
    'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Theater
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Concert venue
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'  // Sports venue
  ],
  'Transportation': [
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80', // Bus station
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Taxi
    'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Transport hub
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'  // Car rental
  ],
  'Agriculture': [
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80', // Farm fields
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80', // Harvest
    'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Livestock
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'  // Agribusiness
  ],
  'Finance': [
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Bank building
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Financial services
    'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Modern banking
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'  // ATM/Banking
  ],
  'Services': [
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80', // Office services
    'https://images.unsplash.com/photo-1497366412874-3415097a27e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80', // Professional services
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1526&q=80', // Consulting
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80'  // Business services
  ]
};

// Generate descriptions based on category and location
const generateDescription = (business: CSVBusiness, category: string): string => {
  const cityName = business.city || 'Benin';
  const businessName = business.name || 'This business';
  
  const descriptions: { [key: string]: string } = {
    'Restaurants': `${businessName} is a popular dining destination in ${cityName}, offering authentic Beninese cuisine and international dishes. Known for its quality food, friendly service, and welcoming atmosphere, this restaurant provides an excellent dining experience for both locals and visitors.`,
    'Hotels': `${businessName} offers comfortable accommodation in ${cityName}. This hotel provides quality rooms, excellent service, and convenient amenities for travelers visiting the area. Perfect for both business and leisure stays.`,
    'Services': `${businessName} provides professional services in ${cityName}. With experienced staff and quality service delivery, this business serves the local community with reliable and efficient solutions.`,
    'Health': `${businessName} offers healthcare services in ${cityName}. Committed to providing quality medical care and health services to the local community with professional staff and modern facilities.`,
    'Education': `${businessName} is an educational institution in ${cityName}, providing quality education and learning opportunities. Dedicated to academic excellence and student development with experienced educators and modern facilities.`,
    'Entertainment': `${businessName} offers entertainment services in ${cityName}, providing fun activities, events, and recreational opportunities for the local community and visitors.`,
    'Transportation': `${businessName} provides transportation services in ${cityName}, offering reliable and safe transport solutions for passengers and cargo throughout the region.`,
    'Shopping': `${businessName} is a retail establishment in ${cityName}, offering a variety of products and shopping services to meet the needs of the local community.`,
    'Cafes': `${businessName} is a cozy café in ${cityName}, serving quality coffee, beverages, and light meals in a welcoming atmosphere perfect for meetings, work, or relaxation.`,
    'Agriculture': `${businessName} is an agricultural business in ${cityName}, specializing in farming, livestock, and agro-pastoral services to support food security and rural development.`,
    'Finance': `${businessName} offers financial services in ${cityName}, providing banking, loans, and financial solutions to individuals and businesses in the community.`
  };
  
  return descriptions[category] || `${businessName} is a business located in ${cityName}, providing quality services to the local community. Known for reliability and customer satisfaction.`;
};

// Generate realistic ratings and reviews
const generateRatingAndReviews = (): { rating: number; reviews: number } => {
  const ratings = [4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8];
  const reviewCounts = [15, 23, 31, 45, 67, 89, 112, 156, 203, 287];
  
  return {
    rating: ratings[Math.floor(Math.random() * ratings.length)],
    reviews: reviewCounts[Math.floor(Math.random() * reviewCounts.length)]
  };
};

// Convert CSV business to processed business
export const processCSVBusiness = (csvBusiness: CSVBusiness, index: number): ProcessedBusiness => {
  // Enhanced mapping based on business name, types, and query
  const determineCategory = (business: CSVBusiness): string => {
    const name = (business.name || '').toLowerCase();
    const types = (business.types || '').toLowerCase();
    const query = (business.query || '').toLowerCase();
    const address = (business.address || '').toLowerCase();
    
    // Entertainment & Recreation - Check FIRST (before restaurants)
    if (types.includes('bar') || types.includes('night_club') || types.includes('amusement') || 
        types.includes('entertainment') || types.includes('movie_theater') || types.includes('gym') ||
        types.includes('bowling_alley') || types.includes('casino') || types.includes('stadium') ||
        query.includes('bar') || query.includes('entertainment') || query.includes('recreation') ||
        query.includes('club') || query.includes('cinema') || query.includes('music') ||
        query.includes('sport') || query.includes('game') || query.includes('leisure') ||
        query.includes('nightclub') || query.includes('disco') || query.includes('pub') ||
        name.includes('bar ') || name.includes(' bar') || name.includes('club') || name.includes('pub') ||
        name.includes('cinema') || name.includes('entertainment') || name.includes('recreation') ||
        name.includes('disco') || name.includes('nightclub') || name.includes('casino') ||
        name.includes('stadium') || name.includes('theatre') || name.includes('theater') ||
        name.includes('concert') || name.includes('music') || name.includes('dance') ||
        name.includes('sport') || name.includes('game') || name.includes('fun') || name.includes('leisure') ||
        name.includes('maquis') || name.includes('buvette') || name.includes('espace')) {
      return 'Entertainment';
    }
    
    // Food & Restaurants (after entertainment check)
    if (types.includes('food') || types.includes('restaurant') || types.includes('meal_takeaway') ||
        (name.includes('restaurant') && !name.includes('bar')) || 
        (name.includes('food') && !name.includes('bar')) || name.includes('cuisine') ||
        (query.includes('restaurant') && !query.includes('bar')) || 
        (query.includes('food') && !query.includes('bar'))) {
      return 'Restaurants';
    }
    
    // Hotels & Accommodation
    if (types.includes('lodging') || types.includes('hotel') || 
        name.includes('hotel') || name.includes('lodge') || name.includes('accommodation') ||
        query.includes('hotel') || query.includes('lodging')) {
      return 'Hotels';
    }
    
    // Health & Medical
    if (types.includes('health') || types.includes('hospital') || types.includes('pharmacy') || 
        types.includes('doctor') || types.includes('medical') ||
        name.includes('hospital') || name.includes('clinic') || name.includes('pharmacy') ||
        name.includes('health') || name.includes('medical') ||
        query.includes('health') || query.includes('medical') || query.includes('hospital')) {
      return 'Health';
    }
    
    // Education
    if (types.includes('school') || types.includes('university') || types.includes('education') ||
        name.includes('school') || name.includes('university') || name.includes('college') ||
        name.includes('education') || name.includes('académie') || name.includes('institut') ||
        query.includes('school') || query.includes('education') || query.includes('university')) {
      return 'Education';
    }
    
    // Shopping & Retail
    if (types.includes('store') || types.includes('shopping') || types.includes('clothing_store') ||
        types.includes('electronics_store') || types.includes('supermarket') ||
        name.includes('shop') || name.includes('store') || name.includes('market') ||
        name.includes('boutique') || name.includes('magasin') ||
        query.includes('shopping') || query.includes('store') || query.includes('market')) {
      return 'Shopping';
    }
    
    // Cafes & Coffee
    if (types.includes('cafe') || types.includes('coffee') || types.includes('bakery') ||
        name.includes('café') || name.includes('coffee') || name.includes('bakery') ||
        query.includes('cafe') || query.includes('coffee')) {
      return 'Cafes';
    }
    
    
    // Transportation
    if (types.includes('taxi') || types.includes('bus') || types.includes('car_rental') ||
        types.includes('gas_station') || types.includes('parking') ||
        name.includes('transport') || name.includes('taxi') || name.includes('bus') ||
        name.includes('station') || query.includes('transport') ||
        query.includes('taxi') || query.includes('bus')) {
      return 'Transportation';
    }
    
    // Agriculture (common in the data)
    if (name.includes('agro') || name.includes('farm') || name.includes('agriculture') ||
        name.includes('ferme') || query.includes('agricultural') ||
        query.includes('agro') || query.includes('farm')) {
      return 'Agriculture';
    }
    
    // Banks & Finance
    if (types.includes('bank') || types.includes('atm') || types.includes('finance') ||
        name.includes('bank') || name.includes('atm') || name.includes('finance') ||
        name.includes('banque') || query.includes('bank') || query.includes('finance')) {
      return 'Finance';
    }
    
    // Default to Services
    return 'Services';
  };

  const category = determineCategory(csvBusiness);
  const rating = csvBusiness.rating || 4.2;
  const reviews = csvBusiness.reviewCount || 25;
  
  // Select specific image based on business name and category
  const selectSpecificImage = (business: CSVBusiness, category: string): string[] => {
    const name = (business.name || '').toLowerCase();
    const categoryImages = defaultImages[category] || defaultImages['Services'];
    
    // Select specific images based on business type keywords
    if (category === 'Health') {
      if (name.includes('hospital')) return [categoryImages[0]]; // Hospital exterior
      if (name.includes('clinic')) return [categoryImages[2]]; // Clinic interior  
      if (name.includes('pharmacy') || name.includes('pharmacie')) return [categoryImages[3]]; // Pharmacy
      return [categoryImages[1]]; // Medical equipment (default health)
    }
    
    if (category === 'Education') {
      if (name.includes('university') || name.includes('université')) return [categoryImages[0]]; // University
      if (name.includes('library') || name.includes('bibliothèque')) return [categoryImages[2]]; // Library
      return [categoryImages[1]]; // School classroom (default education)
    }
    
    if (category === 'Restaurants') {
      if (name.includes('african') || name.includes('local') || name.includes('traditional')) return [categoryImages[3]]; // African cuisine
      if (name.includes('fine') || name.includes('luxury') || name.includes('restaurant')) return [categoryImages[1]]; // Fine dining
      return [categoryImages[0]]; // Restaurant interior (default)
    }
    
    if (category === 'Hotels') {
      if (name.includes('boutique')) return [categoryImages[2]]; // Boutique hotel
      if (name.includes('hotel')) return [categoryImages[3]]; // Hotel exterior
      return [categoryImages[0]]; // Hotel room (default)
    }
    
    if (category === 'Transportation') {
      if (name.includes('taxi')) return [categoryImages[1]]; // Taxi
      if (name.includes('rental') || name.includes('location')) return [categoryImages[3]]; // Car rental
      return [categoryImages[0]]; // Bus station (default)
    }
    
    if (category === 'Agriculture') {
      if (name.includes('livestock') || name.includes('élevage')) return [categoryImages[2]]; // Livestock
      if (name.includes('agro') || name.includes('business')) return [categoryImages[3]]; // Agribusiness
      return [categoryImages[0]]; // Farm fields (default)
    }
    
    if (category === 'Finance') {
      if (name.includes('atm') || name.includes('distributeur')) return [categoryImages[3]]; // ATM
      if (name.includes('modern') || name.includes('digital')) return [categoryImages[2]]; // Modern banking
      return [categoryImages[0]]; // Bank building (default)
    }
    
    // For other categories, select random image from category
    return [categoryImages[Math.floor(Math.random() * categoryImages.length)]];
  };

  // Process enriched data
  const enrichedPhones = csvBusiness.enrichedPhones ? 
    csvBusiness.enrichedPhones.split(';').filter(p => p.trim()) : [];
  const enrichedWebsites = csvBusiness.enrichedWebsites ? 
    csvBusiness.enrichedWebsites.split(';').filter(w => w.trim()) : [];
  const enrichedEmails = csvBusiness.enrichedEmails ? 
    csvBusiness.enrichedEmails.split(';').filter(e => e.trim()) : [];
  const enrichedHours = csvBusiness.enrichedHours ? 
    csvBusiness.enrichedHours.split(';').filter(h => h.trim()) : [];
  const enrichmentSources = csvBusiness.enrichmentSources ? 
    csvBusiness.enrichmentSources.split(';').filter(s => s.trim()) : [];

  // Parse social media data (JSON string)
  let enrichedSocial: any = {};
  try {
    if (csvBusiness.enrichedSocial && csvBusiness.enrichedSocial !== '{}') {
      enrichedSocial = JSON.parse(csvBusiness.enrichedSocial);
    }
  } catch (e) {
    enrichedSocial = {};
  }

  const hasEnrichedData = enrichedPhones.length > 0 || enrichedWebsites.length > 0 || 
                          enrichedEmails.length > 0 || Object.keys(enrichedSocial).length > 0;

  // Use enriched data when available, fallback to original
  const bestPhone = enrichedPhones.length > 0 ? enrichedPhones[0] : 
                   (csvBusiness.phone || 'Phone not available');
  const bestWebsite = enrichedWebsites.length > 0 ? enrichedWebsites[0] : 
                     (csvBusiness.website || `https://business-${index}.bj`);

  return {
    id: csvBusiness.placeId || `csv-${index}`,
    name: csvBusiness.name || `Business ${index}`,
    category,
    rating,
    reviews,
    address: csvBusiness.address || 'Address not available',
    phone: bestPhone,
    website: bestWebsite,
    description: generateDescription(csvBusiness, category),
    images: selectSpecificImage(csvBusiness, category),
    social_links: {
      facebook: enrichedSocial.facebook?.[0] || `https://facebook.com/business-${index}`,
      instagram: enrichedSocial.instagram?.[0] || `https://instagram.com/business-${index}`,
      twitter: enrichedSocial.twitter?.[0]
    },
    hours: enrichedHours.length > 0 ? enrichedHours[0] : 'Mon-Fri: 8 AM - 6 PM, Sat: 9 AM - 4 PM',
    location: csvBusiness.city || 'Benin',
    coordinates: {
      lat: csvBusiness.latitude || 6.36536,
      lng: csvBusiness.longitude || 2.41833
    },
    // Enriched data fields
    enrichedPhones,
    enrichedWebsites,
    enrichedEmails,
    enrichedSocial,
    enrichedHours,
    enrichmentSources,
    enrichmentConfidence: csvBusiness.enrichmentConfidence || 0,
    enrichmentDate: csvBusiness.enrichmentDate,
    hasEnrichedData
  };
};

// Load and process CSV data - now loads ALL data by default
export const loadBusinessData = async (csvPath: string, limit: number = Infinity): Promise<ProcessedBusiness[]> => {
  try {
    console.log('Fetching CSV from:', csvPath, 'with limit:', limit);
    const response = await fetch(csvPath);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    console.log('CSV text length:', csvText.length);
    
    return new Promise((resolve, reject) => {
      Papa.parse<CSVBusiness>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log('Papa parse results:', results.data.length, 'total rows');
          
          // Filter and limit for performance
          const validBusinesses = results.data
            .filter(business => business.name && business.name.trim() !== '');
          
          console.log('Valid businesses after filtering:', validBusinesses.length);
          console.log('Limit parameter:', limit);
          
          // Apply limit only if it's not Infinity
          const finalBusinesses = limit === Infinity ? validBusinesses : validBusinesses.slice(0, limit);
          
          console.log('Processing', finalBusinesses.length, 'businesses (limited from', results.data.length, 'total)');
          
          const processedBusinesses = finalBusinesses.map((business, index) => processCSVBusiness(business, index));
          
          console.log('Successfully processed:', processedBusinesses.length, 'businesses');
          if (processedBusinesses.length > 0) {
            console.log('First processed business:', processedBusinesses[0]);
          }
          
          resolve(processedBusinesses);
        },
        error: (error: any) => {
          console.error('Error parsing CSV:', error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading CSV file:', error);
    return [];
  }
};

// Filter businesses by category
export const getBusinessesByCategory = (businesses: ProcessedBusiness[], category: string): ProcessedBusiness[] => {
  return businesses.filter(business => 
    business.category.toLowerCase() === category.toLowerCase()
  );
};

// Filter businesses by location
export const getBusinessesByLocation = (businesses: ProcessedBusiness[], location: string): ProcessedBusiness[] => {
  return businesses.filter(business => 
    business.location.toLowerCase().includes(location.toLowerCase())
  );
};

// Get businesses by category and location
export const getBusinessesByCategoryAndLocation = (
  businesses: ProcessedBusiness[], 
  category: string, 
  location: string
): ProcessedBusiness[] => {
  return businesses.filter(business => 
    business.category.toLowerCase() === category.toLowerCase() &&
    business.location.toLowerCase().includes(location.toLowerCase())
  );
};

// Get unique cities from businesses
export const getUniqueCities = (businesses: ProcessedBusiness[]): string[] => {
  const cities = businesses.map(business => business.location).filter(Boolean);
  return [...new Set(cities)].sort();
};

// Get unique categories from businesses
export const getUniqueCategories = (businesses: ProcessedBusiness[]): string[] => {
  const categories = businesses.map(business => business.category).filter(Boolean);
  return [...new Set(categories)].sort();
};
