// AI Search Engine Optimization Utilities
// Advanced schema generation for ChatGPT, Claude, Gemini and other AI search engines

import { ProcessedBusiness } from './csvDataLoader';
import { CONTACT_INFO } from './contactInfo';

// Enhanced Business Schema for AI Search Engines
export const generateAIOptimizedBusinessSchema = (business: ProcessedBusiness, category?: string) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${CONTACT_INFO.website}/business/${business.place_id}`,
    "name": business.name,
    "description": business.description || `Professional ${category || 'business'} services in ${business.address.split(',').pop()?.trim() || 'Cotonou'}, Benin Republic.`,
    "url": `${CONTACT_INFO.website}/business/${business.place_id}`,
    "telephone": business.phone,
    "email": business.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address,
      "addressLocality": business.address.split(',').find(part => 
        part.toLowerCase().includes('cotonou') || 
        part.toLowerCase().includes('porto-novo') ||
        part.toLowerCase().includes('parakou') ||
        part.toLowerCase().includes('abomey')
      )?.trim() || "Cotonou",
      "addressRegion": "Littoral",
      "addressCountry": "BJ",
      "addressCountryCode": "BJ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": business.lat || 6.3703,
      "longitude": business.lng || 2.3912
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Cotonou",
        "sameAs": "https://en.wikipedia.org/wiki/Cotonou"
      },
      {
        "@type": "Country", 
        "name": "Benin Republic",
        "sameAs": "https://en.wikipedia.org/wiki/Benin"
      }
    ],
    "openingHours": business.hours || "Mo-Fr 09:00-18:00",
    "priceRange": business.price_level ? "€".repeat(business.price_level) : "€€",
    "currenciesAccepted": "XOF",
    "paymentAccepted": ["Cash", "Mobile Money", "Bank Transfer"],
    "aggregateRating": business.rating ? {
      "@type": "AggregateRating",
      "ratingValue": business.rating,
      "reviewCount": business.reviews || 1,
      "bestRating": 5,
      "worstRating": 1
    } : undefined,
    "knowsLanguage": ["French", "English", "Fon"],
    "isAccessibleForFree": true,
    "publicAccess": true,
    "smokingAllowed": false,
    "foundingDate": "2020",
    "slogan": `Quality ${category || 'business'} services in Cotonou, Benin Republic`,
    "keywords": [
      business.name.toLowerCase(),
      category?.toLowerCase() || 'business',
      'cotonou',
      'benin republic',
      'local business',
      'professional services'
    ].join(', ')
  };

  // Add category-specific schema enhancements
  if (category?.toLowerCase().includes('restaurant')) {
    return {
      ...baseSchema,
      "@type": "Restaurant",
      "servesCuisine": ["Beninese", "West African", "International"],
      "menu": `${CONTACT_INFO.website}/business/${business.place_id}#menu`,
      "acceptsReservations": true,
      "hasDeliveryService": true,
      "hasTakeAway": true,
      "smokingAllowed": false,
      "alcoholServed": true,
      "specialDiet": ["Vegetarian", "Halal"],
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "WiFi",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification", 
          "name": "Parking",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Air Conditioning", 
          "value": true
        }
      ]
    };
  }

  if (category?.toLowerCase().includes('hotel')) {
    return {
      ...baseSchema,
      "@type": "LodgingBusiness",
      "checkinTime": "14:00",
      "checkoutTime": "12:00",
      "numberOfRooms": "20+",
      "petsAllowed": false,
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "WiFi",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Restaurant",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "24 Hour Front Desk",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Air Conditioning",
          "value": true
        }
      ]
    };
  }

  if (category?.toLowerCase().includes('health') || category?.toLowerCase().includes('medical')) {
    return {
      ...baseSchema,
      "@type": "MedicalBusiness",
      "medicalSpecialty": "General Practice",
      "availableService": [
        {
          "@type": "MedicalTherapy",
          "name": "General Consultation"
        },
        {
          "@type": "MedicalTest",
          "name": "Diagnostic Services"
        }
      ]
    };
  }

  return baseSchema;
};

// Voice Search Optimization Schema
export const generateVoiceSearchSchema = (businesses: ProcessedBusiness[], category: string, location: string = 'Cotonou') => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Where can I find ${category.toLowerCase()} in ${location}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can find ${businesses.length} excellent ${category.toLowerCase()} in ${location}, Benin Republic. The top-rated options include ${businesses.slice(0, 3).map(b => b.name).join(', ')}. All listings are verified and include contact information, ratings, and customer reviews.`
        }
      },
      {
        "@type": "Question",
        "name": `What are the best ${category.toLowerCase()} near me in ${location}?`,
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": `The highest-rated ${category.toLowerCase()} in ${location} include: ${businesses.filter(b => b.rating >= 4.0).slice(0, 5).map(b => `${b.name} (${b.rating}⭐)`).join(', ')}. These businesses have excellent customer reviews and are conveniently located throughout ${location}.`
        }
      },
      {
        "@type": "Question",
        "name": `How do I contact ${category.toLowerCase()} in ${location}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `All ${category.toLowerCase()} listings on Intelysia include direct contact information. You can call them directly, visit their locations, or find their details in our comprehensive business directory. Most businesses in ${location} speak French and English.`
        }
      },
      {
        "@type": "Question",
        "name": `Are ${category.toLowerCase()} in ${location} open now?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Business hours vary, but most ${category.toLowerCase()} in ${location} operate Monday to Friday 9 AM to 6 PM, with many also open on Saturdays. Check individual business listings for specific opening hours and contact information.`
        }
      }
    ]
  };
};

// How-To Schema for AI Search
export const generateHowToSchema = (category: string, location: string = 'Cotonou') => {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Find the Best ${category} in ${location}, Benin Republic`,
    "description": `Complete guide to finding and choosing reliable ${category.toLowerCase()} services in ${location}, Benin Republic`,
    "image": `${CONTACT_INFO.website}/og-image.jpg`,
    "totalTime": "PT10M",
    "estimatedCost": {
      "@type": "MonetaryAmount", 
      "currency": "XOF",
      "value": "0"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Internet Connection"
      },
      {
        "@type": "HowToSupply",
        "name": "Phone or Computer"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Intelysia Business Directory"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Visit Intelysia Directory",
        "text": "Go to Intelysia.com and search for your desired business category",
        "url": `${CONTACT_INFO.website}/category/${category}`
      },
      {
        "@type": "HowToStep", 
        "position": 2,
        "name": "Filter by Location",
        "text": `Select ${location} or your preferred area in Benin Republic`,
        "url": `${CONTACT_INFO.website}/search?location=${location}`
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Check Ratings and Reviews", 
        "text": "Review customer ratings, read reviews, and compare businesses",
        "url": `${CONTACT_INFO.website}/category/${category}`
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Contact Directly",
        "text": "Use the provided phone numbers or visit business locations",
        "url": `${CONTACT_INFO.website}/category/${category}`
      }
    ]
  };
};

// Natural Language Query Schema for AI
export const generateNaturalLanguageSchema = (businesses: ProcessedBusiness[], query: string) => {
  const topBusinesses = businesses.slice(0, 5);
  
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `Business Directory Results for: ${query}`,
    "description": `Comprehensive business directory results for "${query}" in Benin Republic`,
    "creator": {
      "@type": "Organization",
      "name": "Intelysia Business Directory",
      "url": CONTACT_INFO.website
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "keywords": query.split(' ').concat(['Cotonou', 'Benin Republic', 'business directory']).join(', '),
    "distribution": [
      {
        "@type": "DataDownload",
        "contentUrl": `${CONTACT_INFO.website}/api/businesses?q=${encodeURIComponent(query)}`,
        "encodingFormat": "application/json"
      }
    ],
    "variableMeasured": [
      {
        "@type": "PropertyValue",
        "name": "Business Name",
        "description": "Name of the business establishment"
      },
      {
        "@type": "PropertyValue", 
        "name": "Rating",
        "description": "Customer rating out of 5 stars",
        "minValue": 1,
        "maxValue": 5
      },
      {
        "@type": "PropertyValue",
        "name": "Location",
        "description": "Physical address in Benin Republic"
      },
      {
        "@type": "PropertyValue",
        "name": "Contact Information",
        "description": "Phone number and business hours"
      }
    ],
    "mainEntity": topBusinesses.map((business, index) => ({
      "@type": "LocalBusiness",
      "name": business.name,
      "address": business.address,
      "telephone": business.phone,
      "aggregateRating": business.rating ? {
        "@type": "AggregateRating",
        "ratingValue": business.rating,
        "reviewCount": business.reviews || 1
      } : undefined,
      "position": index + 1
    }))
  };
};

// Entity-Based SEO Schema
export const generateEntitySchema = (entityType: 'business' | 'location' | 'category', entityData: any) => {
  if (entityType === 'location') {
    return {
      "@context": "https://schema.org",
      "@type": "Place",
      "name": entityData.name,
      "description": `${entityData.name} is a major city in Benin Republic, home to numerous businesses and services.`,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": entityData.lat || 6.3703,
        "longitude": entityData.lng || 2.3912
      },
      "containedInPlace": {
        "@type": "Country",
        "name": "Benin Republic",
        "sameAs": "https://en.wikipedia.org/wiki/Benin"
      },
      "sameAs": entityData.wikipedia || `https://en.wikipedia.org/wiki/${entityData.name}`,
      "hasMap": `https://maps.google.com/?q=${entityData.name}, Benin`,
      "touristType": ["Business Travelers", "Tourists", "Locals"],
      "knowsAbout": [
        "Local Businesses",
        "Professional Services", 
        "Restaurants and Dining",
        "Shopping Centers",
        "Cultural Heritage"
      ]
    };
  }

  if (entityType === 'category') {
    return {
      "@context": "https://schema.org",
      "@type": "CategoryCode",
      "name": entityData.name,
      "codeValue": entityData.code || entityData.name.toLowerCase().replace(/\s+/g, '-'),
      "inCodeSet": {
        "@type": "CategoryCodeSet",
        "name": "Intelysia Business Categories",
        "url": `${CONTACT_INFO.website}/categories`
      },
      "description": `${entityData.name} businesses and services in Benin Republic`,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${entityData.name} Services Directory`,
        "itemListElement": entityData.subcategories?.map((sub: string, index: number) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Service",
            "name": sub,
            "category": entityData.name,
            "areaServed": "Benin Republic"
          }
        })) || []
      }
    };
  }

  return entityData;
};

// AI Search Result Optimization
export const generateSearchResultSchema = (businesses: ProcessedBusiness[], searchQuery: string, totalResults: number) => {
  return {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    "name": `Search Results for "${searchQuery}" - Intelysia`,
    "description": `Found ${totalResults} businesses matching "${searchQuery}" in Benin Republic`,
    "url": `${CONTACT_INFO.website}/search?q=${encodeURIComponent(searchQuery)}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": totalResults,
      "itemListElement": businesses.map((business, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": generateAIOptimizedBusinessSchema(business, searchQuery)
      }))
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${CONTACT_INFO.website}/search?q={search_term}`,
      "query-input": "required name=search_term"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": CONTACT_INFO.website
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Search Results",
          "item": `${CONTACT_INFO.website}/search?q=${encodeURIComponent(searchQuery)}`
        }
      ]
    }
  };
};

// Featured Snippet Optimization
export const generateFeaturedSnippetSchema = (question: string, answer: string, businesses?: ProcessedBusiness[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "Question",
    "name": question,
    "acceptedAnswer": {
      "@type": "Answer", 
      "text": answer,
      "author": {
        "@type": "Organization",
        "name": "Intelysia Business Directory",
        "url": CONTACT_INFO.website
      },
      "dateCreated": new Date().toISOString(),
      "upvoteCount": businesses?.length || 0
    },
    "answerCount": 1,
    "suggestedAnswer": businesses?.slice(0, 3).map(business => ({
      "@type": "Answer",
      "text": `${business.name} - ${business.address}. Phone: ${business.phone}. Rating: ${business.rating}⭐`,
      "author": {
        "@type": "LocalBusiness",
        "name": business.name
      }
    })) || []
  };
};