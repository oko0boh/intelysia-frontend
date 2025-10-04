// Centralized contact and social media information for Intelysia

export const CONTACT_INFO = {
  // Primary contact information
  phone: '+229 0148656640',
  email: 'intelysiaapp@gmail.com',
  website: 'https://www.intelysia.com',
  
  // Business information
  businessName: 'Intelysia',
  fullBusinessName: 'Intelysia - Benin Republic Local Business Directory',
  tagline: 'Benin Republic Local Business Directory',
  description: 'Discover the best businesses in Cotonou, Benin. Find restaurants, shops, services, and more in your local area. Connect with trusted local businesses today.',
  
  // Social media handles (all @intelysia)
  social: {
    handle: '@intelysia',
    instagram: 'https://instagram.com/intelysia',
    facebook: 'https://facebook.com/intelysia',
    twitter: 'https://twitter.com/intelysia',
    linkedin: 'https://linkedin.com/company/intelysia',
    youtube: 'https://youtube.com/@intelysia',
    tiktok: 'https://tiktok.com/@intelysia'
  },
  
  // WhatsApp (formatted for click-to-chat)
  whatsapp: {
    number: '+229 0148656640',
    link: 'https://wa.me/2290148656640',
    text: 'Hello! I found your business on Intelysia and would like to know more.'
  },
  
  // Address information
  address: {
    city: 'Cotonou',
    country: 'Benin',
    countryCode: 'BJ',
    region: 'West Africa',
    timezone: 'Africa/Porto-Novo'
  },
  
  // Operating hours
  hours: {
    weekdays: '9:00 AM - 6:00 PM',
    saturday: '10:00 AM - 4:00 PM',
    sunday: 'Closed',
    timezone: 'WAT (West Africa Time)'
  },
  
  // Support information
  support: {
    email: 'support@intelysia.com',
    businessInquiries: 'business@intelysia.com',
    technical: 'tech@intelysia.com'
  }
};

// Helper functions for formatting contact information
export const formatPhoneForDisplay = (phone: string): string => {
  return phone;
};

export const formatPhoneForTel = (phone: string): string => {
  return phone.replace(/\s/g, '');
};

export const getWhatsAppLink = (customMessage?: string): string => {
  const message = customMessage || CONTACT_INFO.whatsapp.text;
  return `${CONTACT_INFO.whatsapp.link}?text=${encodeURIComponent(message)}`;
};

// Social media metadata for schema markup
export const getSocialMediaUrls = (): string[] => {
  return [
    CONTACT_INFO.social.instagram,
    CONTACT_INFO.social.facebook,
    CONTACT_INFO.social.twitter,
    CONTACT_INFO.social.linkedin,
    CONTACT_INFO.social.youtube,
    CONTACT_INFO.social.tiktok
  ];
};

// Contact schema for structured data
export const getContactSchema = () => {
  return {
    "@type": "ContactPoint",
    "telephone": CONTACT_INFO.phone,
    "email": CONTACT_INFO.email,
    "contactType": "Customer Service",
    "availableLanguage": ["English", "French"],
    "hoursAvailable": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification", 
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "16:00"
      }
    ]
  };
};

// Enhanced Organization schema for AI search engines
export const getOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "Corporation"],
    "@id": `${CONTACT_INFO.website}#organization`,
    "name": CONTACT_INFO.businessName,
    "legalName": CONTACT_INFO.fullBusinessName,
    "alternateName": [CONTACT_INFO.businessName, "Intelysia Directory", "Benin Business Directory"],
    "description": CONTACT_INFO.description,
    "disambiguatingDescription": "Premier business directory platform connecting customers with trusted local businesses across Benin Republic",
    "slogan": "Connecting Benin Republic - One Business at a Time",
    "url": CONTACT_INFO.website,
    "logo": {
      "@type": "ImageObject",
      "url": `${CONTACT_INFO.website}/intelysia-logo.png`,
      "width": 300,
      "height": 100,
      "caption": "Intelysia - Benin Republic Business Directory Logo"
    },
    "image": [
      `${CONTACT_INFO.website}/intelysia-logo.png`,
      `${CONTACT_INFO.website}/og-image.jpg`
    ],
    "telephone": CONTACT_INFO.phone,
    "email": CONTACT_INFO.email,
    "faxNumber": null,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Business District",
      "addressLocality": CONTACT_INFO.address.city,
      "addressRegion": "Littoral Department",
      "postalCode": "01 BP",
      "addressCountry": CONTACT_INFO.address.countryCode,
      "addressCountryName": CONTACT_INFO.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.3703,
      "longitude": 2.3912,
      "elevation": "10m"
    },
    "contactPoint": [
      getContactSchema(),
      {
        "@type": "ContactPoint",
        "telephone": CONTACT_INFO.phone,
        "email": CONTACT_INFO.support.email,
        "contactType": "Technical Support",
        "availableLanguage": ["English", "French"],
        "areaServed": "BJ"
      },
      {
        "@type": "ContactPoint",
        "email": CONTACT_INFO.support.businessInquiries,
        "contactType": "Business Inquiries",
        "availableLanguage": ["English", "French"],
        "areaServed": ["BJ", "West Africa"]
      }
    ],
    "sameAs": getSocialMediaUrls(),
    "foundingDate": "2024-01-01",
    "foundingLocation": {
      "@type": "Place",
      "name": `${CONTACT_INFO.address.city}, ${CONTACT_INFO.address.country}`,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 6.3703,
        "longitude": 2.3912
      }
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": CONTACT_INFO.address.country,
        "sameAs": "https://en.wikipedia.org/wiki/Benin"
      },
      {
        "@type": "AdministrativeArea",
        "name": "West Africa",
        "containedIn": "Africa"
      },
      {
        "@type": "City",
        "name": "Cotonou",
        "sameAs": "https://en.wikipedia.org/wiki/Cotonou"
      },
      {
        "@type": "City", 
        "name": "Porto-Novo",
        "sameAs": "https://en.wikipedia.org/wiki/Porto-Novo"
      },
      {
        "@type": "City",
        "name": "Parakou"
      },
      {
        "@type": "City",
        "name": "Abomey"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 9.30769,
        "longitude": 2.315834
      },
      "geoRadius": "500000"
    },
    "knowsAbout": [
      "Local Business Directory",
      "Benin Republic Commerce",
      "West African Business Network",
      "Restaurant Directory",
      "Professional Services Directory",
      "Healthcare Services Directory",
      "Shopping Centers Directory",
      "Hotel and Accommodation Services",
      "Educational Institution Directory",
      "Financial Services Directory",
      "Automotive Services Directory",
      "Construction and Real Estate Services",
      "Technology and IT Services",
      "Legal and Professional Services",
      "Beauty and Personal Care Services",
      "Tourism and Travel Services",
      "Agricultural Services",
      "Transportation Services"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Business Directory Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Listings",
            "description": "Free business directory listings for Benin Republic businesses"
          },
          "price": "0",
          "priceCurrency": "XOF"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Premium Business Profiles",
            "description": "Enhanced business profiles with additional features"
          },
          "price": "25000",
          "priceCurrency": "XOF"
        }
      ]
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Business Directory Services",
          "serviceType": "Directory Services"
        },
        "areaServed": "Benin Republic"
      }
    ],
    "award": [
      "Leading Business Directory Platform in Benin Republic",
      "Most Comprehensive Business Listings Database"
    ],
    "owns": {
      "@type": "Product",
      "name": "Intelysia Business Directory Platform",
      "description": "Comprehensive business directory software platform"
    },
    "parentOrganization": null,
    "subOrganization": [],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "West African Business Networks",
        "description": "Regional business directory consortium"
      }
    ],
    "seeks": {
      "@type": "Demand",
      "name": "Business Partnership Opportunities",
      "description": "Seeking partnerships with local businesses and service providers"
    },
    "naics": "518210",
    "isicV4": "6312",
    "taxID": null,
    "vatID": null,
    "duns": null,
    "globalLocationNumber": null,
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "10-50"
    },
    "employee": [
      {
        "@type": "Person",
        "name": "Customer Service Team",
        "jobTitle": "Customer Support",
        "email": CONTACT_INFO.email
      }
    ],
    "department": [
      {
        "@type": "Organization",
        "name": "Customer Service",
        "telephone": CONTACT_INFO.phone,
        "email": CONTACT_INFO.support.email
      },
      {
        "@type": "Organization",
        "name": "Business Development",
        "email": CONTACT_INFO.support.businessInquiries
      },
      {
        "@type": "Organization",
        "name": "Technical Support",
        "email": CONTACT_INFO.support.technical
      }
    ],
    "brand": {
      "@type": "Brand",
      "name": CONTACT_INFO.businessName,
      "logo": `${CONTACT_INFO.website}/intelysia-logo.png`,
      "slogan": "Your Gateway to Benin Republic Businesses"
    },
    "publishingPrinciples": `${CONTACT_INFO.website}/about#publishing-principles`,
    "diversityPolicy": `${CONTACT_INFO.website}/about#diversity`,
    "ethicsPolicy": `${CONTACT_INFO.website}/about#ethics`,
    "correctionsPolicy": `${CONTACT_INFO.website}/about#corrections`,
    "actionableFeedbackPolicy": `${CONTACT_INFO.website}/contact#feedback`,
    "keywords": "business directory, Benin Republic, Cotonou businesses, local services, restaurant directory, professional services, shopping directory, healthcare services, hotel directory, business listings",
    "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/ViewAction",
        "userInteractionCount": "10000+"
      },
      {
        "@type": "InteractionCounter", 
        "interactionType": "https://schema.org/SearchAction",
        "userInteractionCount": "5000+"
      }
    ]
  };
};

// Enhanced WebSite schema for AI search engines
export const getWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${CONTACT_INFO.website}#website`,
    "name": CONTACT_INFO.fullBusinessName,
    "alternateName": CONTACT_INFO.businessName,
    "description": CONTACT_INFO.description,
    "url": CONTACT_INFO.website,
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${CONTACT_INFO.website}/search?q={search_term_string}`,
          "actionPlatform": [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform"
          ]
        },
        "query-input": "required name=search_term_string"
      },
      {
        "@type": "FindAction",
        "target": {
          "@type": "EntryPoint", 
          "urlTemplate": `${CONTACT_INFO.website}/category/{category_name}`,
          "actionPlatform": [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform"
          ]
        },
        "object": {
          "@type": "Thing",
          "name": "Business Categories"
        }
      }
    ],
    "publisher": {
      "@id": `${CONTACT_INFO.website}#organization`
    },
    "copyrightHolder": {
      "@id": `${CONTACT_INFO.website}#organization`
    },
    "copyrightYear": 2024,
    "inLanguage": ["en", "fr"],
    "isAccessibleForFree": true,
    "hasPart": [
      {
        "@type": "WebPage",
        "name": "Business Categories",
        "url": `${CONTACT_INFO.website}/categories`
      },
      {
        "@type": "WebPage",
        "name": "Restaurant Directory",
        "url": `${CONTACT_INFO.website}/category/Restaurants`
      },
      {
        "@type": "WebPage",
        "name": "Hotel Directory", 
        "url": `${CONTACT_INFO.website}/category/Hotels`
      },
      {
        "@type": "WebPage",
        "name": "Professional Services",
        "url": `${CONTACT_INFO.website}/category/Services`
      }
    ],
    "mainEntity": {
      "@id": `${CONTACT_INFO.website}#organization`
    },
    "about": {
      "@type": "Thing",
      "name": "Benin Republic Business Directory",
      "description": "Comprehensive business listings and local services directory"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": ["Business Owners", "Customers", "Tourists", "Residents"],
      "geographicArea": {
        "@type": "Country",
        "name": "Benin Republic"
      }
    },
    "significantLink": getSocialMediaUrls(),
    "relatedLink": [
      "https://en.wikipedia.org/wiki/Benin",
      "https://en.wikipedia.org/wiki/Cotonou",
      "https://www.goafricaonline.com"
    ]
  };
};