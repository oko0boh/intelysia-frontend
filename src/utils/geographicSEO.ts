// Geographic SEO Optimization for Benin Republic
// Optimizes for location-based searches and AI geographic queries

import { CONTACT_INFO } from './contactInfo';

// Benin Republic Geographic Data
export const BENIN_GEOGRAPHY = {
  country: {
    name: 'Benin Republic',
    code: 'BJ',
    capital: 'Porto-Novo',
    economicCapital: 'Cotonou',
    region: 'West Africa',
    subregion: 'Western Africa',
    coordinates: {
      lat: 9.30769,
      lng: 2.315834
    },
    timezone: 'Africa/Porto-Novo',
    currency: 'West African CFA franc (XOF)',
    languages: ['French', 'Fon', 'Yoruba', 'English'],
    area: '112,622 km²',
    population: '12.5 million',
    wikipedia: 'https://en.wikipedia.org/wiki/Benin'
  },
  departments: [
    {
      name: 'Littoral',
      capital: 'Cotonou',
      coordinates: { lat: 6.3703, lng: 2.3912 },
      businessCenter: true,
      description: 'Economic capital and largest city'
    },
    {
      name: 'Ouémé',
      capital: 'Porto-Novo',
      coordinates: { lat: 6.4968, lng: 2.6036 },
      businessCenter: true,
      description: 'Political capital of Benin Republic'
    },
    {
      name: 'Borgou',
      capital: 'Parakou',
      coordinates: { lat: 9.3372, lng: 2.6306 },
      businessCenter: true,
      description: 'Northern commercial hub'
    },
    {
      name: 'Zou',
      capital: 'Abomey',
      coordinates: { lat: 7.1847, lng: 1.9915 },
      businessCenter: true,
      description: 'Historic and cultural center'
    },
    {
      name: 'Atlantique',
      capital: 'Allada',
      coordinates: { lat: 6.6650, lng: 2.1514 },
      businessCenter: false,
      description: 'Coastal department'
    },
    {
      name: 'Mono',
      capital: 'Lokossa',
      coordinates: { lat: 6.6389, lng: 1.7169 },
      businessCenter: false,
      description: 'Agricultural region'
    }
  ],
  majorCities: [
    {
      name: 'Cotonou',
      department: 'Littoral',
      coordinates: { lat: 6.3703, lng: 2.3912 },
      population: '1.2 million',
      businessHub: true,
      description: 'Economic capital, largest port, business center',
      nicknames: ['Economic Capital', 'Business Hub', 'Gateway to Benin'],
      industries: ['Commerce', 'Finance', 'Technology', 'Tourism', 'Manufacturing'],
      landmarks: ['Port of Cotonou', 'Dantokpa Market', 'Cotonou Cathedral']
    },
    {
      name: 'Porto-Novo',
      department: 'Ouémé',
      coordinates: { lat: 6.4968, lng: 2.6036 },
      population: '264,000',
      businessHub: true,
      description: 'Political capital, government center',
      nicknames: ['Political Capital', 'Government Center'],
      industries: ['Government', 'Education', 'Administration'],
      landmarks: ['Presidential Palace', 'National Assembly', 'Ethnographic Museum']
    },
    {
      name: 'Parakou',
      department: 'Borgou',
      coordinates: { lat: 9.3372, lng: 2.6306 },
      population: '255,000',
      businessHub: true,
      description: 'Northern commercial center, cotton trade hub',
      nicknames: ['Northern Hub', 'Cotton Capital'],
      industries: ['Agriculture', 'Cotton Trading', 'Commerce', 'Transportation'],
      landmarks: ['Parakou Airport', 'Regional Market']
    },
    {
      name: 'Abomey',
      department: 'Zou',
      coordinates: { lat: 7.1847, lng: 1.9915 },
      population: '117,000',
      businessHub: false,
      description: 'Historic capital, UNESCO World Heritage site',
      nicknames: ['Historic Capital', 'Royal City'],
      industries: ['Tourism', 'Crafts', 'Agriculture'],
      landmarks: ['Royal Palaces of Abomey', 'Historical Museum']
    }
  ]
};

// Geographic Schema Generator for Cities
export const generateCitySchema = (cityName: string) => {
  const city = BENIN_GEOGRAPHY.majorCities.find(c => 
    c.name.toLowerCase() === cityName.toLowerCase()
  );
  
  if (!city) return null;

  return {
    "@context": "https://schema.org",
    "@type": "City",
    "@id": `https://www.intelysia.com/location/${city.name.toLowerCase()}`,
    "name": city.name,
    "alternateName": city.nicknames,
    "description": city.description,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": city.coordinates.lat,
      "longitude": city.coordinates.lng
    },
    "containedInPlace": [
      {
        "@type": "AdministrativeArea",
        "name": city.department,
        "containedInPlace": {
          "@type": "Country",
          "name": BENIN_GEOGRAPHY.country.name,
          "sameAs": BENIN_GEOGRAPHY.country.wikipedia
        }
      }
    ],
    "population": city.population,
    "hasMap": `https://maps.google.com/?q=${city.name}, Benin`,
    "sameAs": `https://en.wikipedia.org/wiki/${city.name}`,
    "url": `${CONTACT_INFO.website}/location/${city.name.toLowerCase()}`,
    "image": `${CONTACT_INFO.website}/images/cities/${city.name.toLowerCase()}.jpg`,
    "touristType": city.businessHub ? 
      ["Business Travelers", "Tourists", "Locals", "Investors"] : 
      ["Tourists", "Locals", "Cultural Visitors"],
    "knowsAbout": [
      `${city.name} Businesses`,
      `Local Services ${city.name}`,
      ...city.industries.map(industry => `${industry} in ${city.name}`),
      ...city.landmarks
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${city.name} Business Directory`,
      "itemListElement": city.industries.map((industry, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `${industry} Services`,
            "category": industry,
            "areaServed": city.name
          }
        }
      }))
    },
    "event": city.businessHub ? [
      {
        "@type": "BusinessEvent",
        "name": "Weekly Business Networking",
        "description": `Regular business networking events in ${city.name}`
      }
    ] : [],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Business Hub Status",
        "value": city.businessHub ? "Major Business Center" : "Regional Center"
      },
      {
        "@type": "PropertyValue",
        "name": "Department",
        "value": city.department
      },
      {
        "@type": "PropertyValue",
        "name": "Region",
        "value": BENIN_GEOGRAPHY.country.region
      }
    ]
  };
};

// Department Schema Generator
export const generateDepartmentSchema = (departmentName: string) => {
  const department = BENIN_GEOGRAPHY.departments.find(d => 
    d.name.toLowerCase() === departmentName.toLowerCase()
  );
  
  if (!department) return null;

  return {
    "@context": "https://schema.org",
    "@type": "AdministrativeArea",
    "@id": `https://www.intelysia.com/region/${department.name.toLowerCase()}`,
    "name": `${department.name} Department`,
    "alternateName": department.name,
    "description": `${department.description} - Administrative department in Benin Republic`,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": department.coordinates.lat,
      "longitude": department.coordinates.lng
    },
    "containedInPlace": {
      "@type": "Country",
      "name": BENIN_GEOGRAPHY.country.name,
      "sameAs": BENIN_GEOGRAPHY.country.wikipedia
    },
    "url": `${CONTACT_INFO.website}/region/${department.name.toLowerCase()}`,
    "hasMap": `https://maps.google.com/?q=${department.name}, Benin`,
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Capital City",
        "value": department.capital
      },
      {
        "@type": "PropertyValue",
        "name": "Business Center Status",
        "value": department.businessCenter ? "Major Business Center" : "Regional Area"
      }
    ]
  };
};

// Country Schema for Benin Republic
export const generateCountrySchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Country",
    "@id": `https://www.intelysia.com/country/benin`,
    "name": BENIN_GEOGRAPHY.country.name,
    "alternateName": ["Benin", "Republic of Benin"],
    "description": "West African country with a rich business landscape and growing economy",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": BENIN_GEOGRAPHY.country.coordinates.lat,
      "longitude": BENIN_GEOGRAPHY.country.coordinates.lng
    },
    "sameAs": BENIN_GEOGRAPHY.country.wikipedia,
    "url": `${CONTACT_INFO.website}/country/benin`,
    "hasMap": `https://maps.google.com/?q=Benin Republic`,
    "currency": BENIN_GEOGRAPHY.country.currency,
    "timeZone": BENIN_GEOGRAPHY.country.timezone,
    "areaServed": BENIN_GEOGRAPHY.country.region,
    "containsPlace": BENIN_GEOGRAPHY.majorCities.map(city => ({
      "@type": "City",
      "name": city.name,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": city.coordinates.lat,
        "longitude": city.coordinates.lng
      }
    })),
    "knowsLanguage": BENIN_GEOGRAPHY.country.languages,
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Capital",
        "value": BENIN_GEOGRAPHY.country.capital
      },
      {
        "@type": "PropertyValue",
        "name": "Economic Capital",
        "value": BENIN_GEOGRAPHY.country.economicCapital
      },
      {
        "@type": "PropertyValue",
        "name": "Region",
        "value": BENIN_GEOGRAPHY.country.region
      },
      {
        "@type": "PropertyValue",
        "name": "Population",
        "value": BENIN_GEOGRAPHY.country.population
      },
      {
        "@type": "PropertyValue",
        "name": "Area",
        "value": BENIN_GEOGRAPHY.country.area
      }
    ]
  };
};

// Geographic FAQ Schema for AI Search
export const generateGeographicFAQSchema = (location: string) => {
  const isCity = BENIN_GEOGRAPHY.majorCities.some(city => 
    city.name.toLowerCase() === location.toLowerCase()
  );
  
  const cityData = BENIN_GEOGRAPHY.majorCities.find(city => 
    city.name.toLowerCase() === location.toLowerCase()
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Where is ${location} located?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isCity && cityData ? 
            `${location} is located in ${cityData.department} Department, Benin Republic, West Africa. It is situated at coordinates ${cityData.coordinates.lat}°N, ${cityData.coordinates.lng}°E.` :
            `${location} is located in Benin Republic, West Africa.`
        }
      },
      {
        "@type": "Question",
        "name": `What businesses can I find in ${location}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isCity && cityData ? 
            `${location} offers a wide range of businesses including ${cityData.industries.join(', ')}. You can find restaurants, hotels, professional services, shopping centers, and more through Intelysia Business Directory.` :
            `${location} offers diverse business opportunities across various sectors including commerce, services, and industry. Use Intelysia to discover local businesses and services.`
        }
      },
      {
        "@type": "Question",
        "name": `How do I contact businesses in ${location}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Intelysia Business Directory provides complete contact information for businesses in ${location}, including phone numbers, addresses, and business hours. All listings are verified and regularly updated.`
        }
      },
      {
        "@type": "Question",
        "name": `What languages are spoken in ${location}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `In ${location}, Benin Republic, the official language is French. Many businesses also serve customers in English, Fon, and Yoruba. Most professional services can communicate in multiple languages.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the currency used in ${location}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${location} uses the West African CFA franc (XOF). Most businesses accept cash, and many also accept mobile money transfers and bank transfers.`
        }
      }
    ]
  };
};

// Location-based Business Schema
export const generateLocationBusinessSchema = (location: string, businesses: any[]) => {
  const cityData = BENIN_GEOGRAPHY.majorCities.find(city => 
    city.name.toLowerCase() === location.toLowerCase()
  );

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Businesses in ${location}, Benin Republic`,
    "description": `Comprehensive directory of verified businesses in ${location}, Benin Republic`,
    "numberOfItems": businesses.length,
    "itemListOrder": "Ranked by customer rating and relevance",
    "about": {
      "@type": "Place",
      "name": location,
      "geo": cityData ? {
        "@type": "GeoCoordinates",
        "latitude": cityData.coordinates.lat,
        "longitude": cityData.coordinates.lng
      } : undefined,
      "containedInPlace": {
        "@type": "Country",
        "name": "Benin Republic"
      }
    },
    "itemListElement": businesses.slice(0, 20).map((business, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LocalBusiness",
        "@id": `${CONTACT_INFO.website}/business/${business.place_id || business.id}`,
        "name": business.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": business.address,
          "addressLocality": location,
          "addressRegion": cityData?.department || "Littoral",
          "addressCountry": "BJ"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": business.lat || business.coordinates?.lat || cityData?.coordinates.lat || 6.3703,
          "longitude": business.lng || business.coordinates?.lng || cityData?.coordinates.lng || 2.3912
        },
        "telephone": business.phone,
        "url": `${CONTACT_INFO.website}/business/${business.place_id || business.id}`,
        "aggregateRating": business.rating ? {
          "@type": "AggregateRating",
          "ratingValue": business.rating,
          "reviewCount": business.reviews || 1,
          "bestRating": 5
        } : undefined,
        "areaServed": {
          "@type": "City",
          "name": location
        }
      }
    }))
  };
};

// Voice Search Geographic Optimization
export const generateLocationVoiceSearchSchema = (location: string, category?: string) => {
  const categoryText = category ? `${category} ` : '';
  const cityData = BENIN_GEOGRAPHY.majorCities.find(city => 
    city.name.toLowerCase() === location.toLowerCase()
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Find ${categoryText}businesses near me in ${location}`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Intelysia Business Directory lists verified ${categoryText}businesses in ${location}, Benin Republic. ${cityData ? `${location} is ${cityData.description} with major industries including ${cityData.industries.join(', ')}.` : ''} All listings include contact information, ratings, and customer reviews.`
        }
      },
      {
        "@type": "Question",
        "name": `What are the best ${categoryText}services in ${location}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${location} offers excellent ${categoryText}services with professional standards and competitive pricing. Use Intelysia Directory to find top-rated businesses with verified customer reviews and complete contact information.`
        }
      },
      {
        "@type": "Question",
        "name": `How to get to ${location} for business?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": cityData ? 
            `${location} is accessible by road, air, and ${location === 'Cotonou' ? 'sea. Cotonou has the main international airport and port.' : 'road from major cities.'} ${cityData.businessHub ? `As a major business center, ${location} has excellent infrastructure for business travelers.` : ''}` :
            `${location} is accessible by road from major cities in Benin Republic. Check with local transportation services for the best routes.`
        }
      }
    ]
  };
};

// Generate complete geographic SEO package
export const generateCompleteGeographicSEO = (location: string, category?: string, businesses: any[] = []) => {
  return {
    citySchema: generateCitySchema(location),
    geographicFAQ: generateGeographicFAQSchema(location),
    locationBusinessSchema: generateLocationBusinessSchema(location, businesses),
    voiceSearchSchema: generateLocationVoiceSearchSchema(location, category),
    countrySchema: location.toLowerCase() === 'benin' ? generateCountrySchema() : null
  };
};