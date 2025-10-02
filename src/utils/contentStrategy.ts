// Content Discovery Strategy Configuration
export interface ContentStrategy {
  seoKeywords: string[];
  targetAudience: string[];
  contentPillars: string[];
  localSEOTerms: string[];
}

export const contentStrategy: ContentStrategy = {
  // Primary SEO keywords for organic traffic
  seoKeywords: [
    'Cotonou businesses',
    'Benin business directory',
    'local businesses Cotonou',
    'restaurants Cotonou',
    'shops Benin',
    'services Cotonou',
    'business listings Benin',
    'Cotonou directory',
    'find businesses Benin',
    'local services Cotonou'
  ],
  
  // Target audience segments
  targetAudience: [
    'Local residents in Cotonou',
    'Tourists visiting Benin',
    'Business owners in Cotonou',
    'Entrepreneurs in Benin',
    'Expatriates living in Cotonou',
    'Investors looking at Benin market'
  ],
  
  // Content pillars for blog and marketing
  contentPillars: [
    'Local Business Spotlights',
    'Cotonou City Guides',
    'Business Tips for Entrepreneurs',
    'Market Trends in Benin',
    'Cultural Business Practices',
    'Economic Development News'
  ],
  
  // Local SEO terms for geographic targeting
  localSEOTerms: [
    'Cotonou',
    'Benin',
    'Porto-Novo',
    'Parakou',
    'Abomey-Calavi',
    'Djougou',
    'Bohicon',
    'Kandi',
    'Ouidah',
    'Natitingou'
  ]
};

// Content calendar suggestions for regular publishing
export const getContentCalendar = () => {
  return [
    {
      week: 1,
      topics: [
        'Weekly Business Spotlight',
        'Market Monday: Economic News',
        'Entrepreneur Wednesday: Success Story',
        'Friday Feature: New Business Listings'
      ]
    },
    {
      week: 2,
      topics: [
        'Location Guide: Exploring Cotonou Districts',
        'Industry Analysis: Trending Sectors',
        'Business Tips: Marketing for Local Businesses',
        'Weekend Guide: Best Places to Visit'
      ]
    },
    {
      week: 3,
      topics: [
        'Cultural Business Practices in Benin',
        'Technology Adoption in Local Businesses',
        'Seasonal Business Opportunities',
        'Customer Success Stories'
      ]
    },
    {
      week: 4,
      topics: [
        'Monthly Market Report',
        'Upcoming Events and Opportunities',
        'Business Directory Updates',
        'Community Highlights'
      ]
    }
  ];
};

// SEO-optimized page templates
export const pageTemplates = {
  categoryPage: {
    titleTemplate: '{category} in {location} | Intelysia Business Directory',
    descriptionTemplate: 'Find the best {category} businesses in {location}, Benin. Browse verified local {category} services, read reviews, and get contact information.',
    keywordsTemplate: '{category} {location}, {category} Benin, {category} businesses, local {category}, {location} {category} directory'
  },
  
  locationPage: {
    titleTemplate: 'Businesses in {location}, Benin | Intelysia Directory',
    descriptionTemplate: 'Discover local businesses in {location}, Benin. Find restaurants, shops, services, and more in your area. Connect with trusted local businesses today.',
    keywordsTemplate: '{location} businesses, {location} Benin, local businesses {location}, business directory {location}'
  },
  
  businessPage: {
    titleTemplate: '{businessName} - {category} in {location} | Intelysia',
    descriptionTemplate: '{businessName} is a trusted {category} business in {location}, Benin. Get contact information, reviews, and directions.',
    keywordsTemplate: '{businessName}, {category} {location}, {businessName} {location}, {category} Benin'
  }
};

// Content optimization utilities
export const optimizeContent = (content: string, keywords: string[]): string => {
  // Simple keyword density optimization (aim for 1-2% density)
  const wordCount = content.split(' ').length;
  const targetDensity = 0.015; // 1.5%
  const targetKeywordCount = Math.floor(wordCount * targetDensity);
  
  // This is a simplified version - in production, you'd use more sophisticated NLP
  return content;
};

export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
  const sentences = content.split('. ');
  let description = '';
  
  for (const sentence of sentences) {
    if ((description + sentence).length <= maxLength - 3) {
      description += sentence + '. ';
    } else {
      break;
    }
  }
  
  return description.trim() || content.substring(0, maxLength - 3) + '...';
};
