export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  featuredImage: string;
  readTime: number;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
}

export const blogCategories = [
  'Business Tips',
  'Local Economy',
  'Entrepreneurship',
  'Market Trends',
  'Success Stories',
  'Industry News',
  'Cotonou Guide',
  'Business Directory'
];

// SEO-optimized blog posts for organic traffic
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Best Restaurants in Cotonou: A Food Lover\'s Guide',
    slug: 'best-restaurants-cotonou-food-guide',
    excerpt: 'Discover the finest dining experiences in Cotonou, from traditional Beninese cuisine to international flavors.',
    content: `
      <h2>Discover Cotonou's Culinary Scene</h2>
      <p>Cotonou, the economic capital of Benin, offers an incredible diversity of dining options that reflect both local traditions and international influences. Whether you're craving authentic Beninese dishes or international cuisine, this guide will help you find the perfect restaurant.</p>
      
      <h3>1. Traditional Beninese Cuisine</h3>
      <p>Experience the rich flavors of local dishes like pâte rouge, akassa, and grilled fish at these authentic restaurants...</p>
      
      <h3>2. International Dining Options</h3>
      <p>From French bistros to Lebanese restaurants, Cotonou's international dining scene is thriving...</p>
      
      <h3>3. Street Food Adventures</h3>
      <p>Don't miss the vibrant street food culture that makes Cotonou's culinary landscape so unique...</p>
    `,
    author: 'Intelysia Team',
    publishedAt: '2024-01-15',
    updatedAt: '2024-01-15',
    category: 'Cotonou Guide',
    tags: ['restaurants', 'food', 'dining', 'cotonou', 'benin cuisine'],
    featuredImage: '/blog/restaurants-cotonou.jpg',
    readTime: 8,
    seoTitle: 'Best Restaurants in Cotonou 2024 - Complete Dining Guide',
    seoDescription: 'Discover the top 10 best restaurants in Cotonou, Benin. From traditional Beninese cuisine to international dining, find your perfect meal.',
    keywords: ['restaurants Cotonou', 'best food Cotonou', 'dining Benin', 'Cotonou restaurants guide']
  },
  {
    id: '2',
    title: 'Starting a Business in Cotonou: Complete Guide for Entrepreneurs',
    slug: 'starting-business-cotonou-entrepreneur-guide',
    excerpt: 'Everything you need to know about launching your business in Cotonou, from registration to finding customers.',
    content: `
      <h2>Your Guide to Business Success in Cotonou</h2>
      <p>Cotonou presents incredible opportunities for entrepreneurs. This comprehensive guide covers everything from business registration to marketing strategies.</p>
      
      <h3>Business Registration Process</h3>
      <p>Learn the step-by-step process of registering your business in Benin...</p>
      
      <h3>Finding the Right Location</h3>
      <p>Location is crucial for business success. Here's how to choose the perfect spot in Cotonou...</p>
      
      <h3>Marketing Your Business</h3>
      <p>Effective marketing strategies for reaching customers in Cotonou and beyond...</p>
    `,
    author: 'Business Expert',
    publishedAt: '2024-01-10',
    updatedAt: '2024-01-10',
    category: 'Entrepreneurship',
    tags: ['business', 'startup', 'entrepreneurship', 'cotonou', 'benin business'],
    featuredImage: '/blog/business-startup-cotonou.jpg',
    readTime: 12,
    seoTitle: 'How to Start a Business in Cotonou, Benin - 2024 Guide',
    seoDescription: 'Complete guide to starting a business in Cotonou, Benin. Learn about registration, permits, locations, and marketing strategies.',
    keywords: ['start business Cotonou', 'business registration Benin', 'entrepreneur Cotonou', 'business guide Benin']
  },
  {
    id: '3',
    title: 'Cotonou Shopping Guide: Best Markets and Shopping Centers',
    slug: 'cotonou-shopping-guide-markets-centers',
    excerpt: 'From traditional markets to modern shopping centers, discover the best places to shop in Cotonou.',
    content: `
      <h2>Shopping in Cotonou: From Markets to Malls</h2>
      <p>Cotonou offers diverse shopping experiences, from bustling traditional markets to modern shopping centers.</p>
      
      <h3>Traditional Markets</h3>
      <p>Explore the vibrant atmosphere of Dantokpa Market and other traditional shopping areas...</p>
      
      <h3>Modern Shopping Centers</h3>
      <p>Discover contemporary shopping experiences in Cotonou's modern retail spaces...</p>
      
      <h3>Local Crafts and Souvenirs</h3>
      <p>Find unique Beninese crafts and souvenirs to take home...</p>
    `,
    author: 'Local Guide',
    publishedAt: '2024-01-05',
    updatedAt: '2024-01-05',
    category: 'Cotonou Guide',
    tags: ['shopping', 'markets', 'retail', 'cotonou', 'benin shopping'],
    featuredImage: '/blog/shopping-cotonou.jpg',
    readTime: 6,
    seoTitle: 'Best Shopping in Cotonou - Markets, Malls & Local Crafts',
    seoDescription: 'Complete shopping guide for Cotonou, Benin. Discover the best markets, shopping centers, and where to find local crafts.',
    keywords: ['shopping Cotonou', 'Cotonou markets', 'shopping centers Benin', 'Dantokpa market']
  },
  {
    id: '4',
    title: 'Digital Marketing for Local Businesses in Benin',
    slug: 'digital-marketing-local-businesses-benin',
    excerpt: 'How local businesses in Benin can leverage digital marketing to reach more customers and grow their revenue.',
    content: `
      <h2>Digital Marketing Strategies for Benin Businesses</h2>
      <p>In today's digital age, local businesses in Benin need effective online marketing strategies to compete and grow.</p>
      
      <h3>Social Media Marketing</h3>
      <p>Learn how to use Facebook, Instagram, and WhatsApp to connect with customers...</p>
      
      <h3>Google My Business Optimization</h3>
      <p>Optimize your Google presence to appear in local search results...</p>
      
      <h3>Content Marketing</h3>
      <p>Create valuable content that attracts and engages your target audience...</p>
    `,
    author: 'Digital Marketing Expert',
    publishedAt: '2024-01-01',
    updatedAt: '2024-01-01',
    category: 'Business Tips',
    tags: ['digital marketing', 'social media', 'local business', 'benin marketing'],
    featuredImage: '/blog/digital-marketing-benin.jpg',
    readTime: 10,
    seoTitle: 'Digital Marketing for Local Businesses in Benin - Complete Guide',
    seoDescription: 'Learn effective digital marketing strategies for local businesses in Benin. Social media, SEO, and content marketing tips.',
    keywords: ['digital marketing Benin', 'social media marketing Benin', 'local business marketing', 'online marketing Cotonou']
  }
];

export const getRelatedPosts = (currentPostId: string, category: string, limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => post.id !== currentPostId && post.category === category)
    .slice(0, limit);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getFeaturedPosts = (limit: number = 3): BlogPost[] => {
  return blogPosts.slice(0, limit);
};
