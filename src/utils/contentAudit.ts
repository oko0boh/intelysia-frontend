// Content audit utilities for 404s and thin content management

export interface PageContentAudit {
  url: string;
  wordCount: number;
  contentType: 'thin' | 'normal' | 'rich';
  issues: string[];
  recommendations: string[];
  redirectTo?: string;
  status: '404' | 'thin' | 'ok';
}

export interface ContentAuditResult {
  thinContent: PageContentAudit[];
  errors404: PageContentAudit[];
  recommendations: {
    merge: PageContentAudit[];
    redirect: PageContentAudit[];
    enhance: PageContentAudit[];
    remove: PageContentAudit[];
  };
}

// Known 404 URLs that need redirects (based on common patterns)
export const known404Redirects: { [key: string]: string } = {
  // Article URL variations
  '/article/': '/articles/',
  '/articles': '/blog',
  '/blog/best-restaurants': '/articles/best-restaurants-cotonou-2025',
  '/blog/hotels': '/articles/best-hotels-cotonou-2025',
  '/businesses': '/',
  '/directory': '/',
  '/search/restaurants': '/category/Restaurants',
  '/search/hotels': '/category/Hotels',
  '/search/services': '/category/Services',
  
  // Legacy category URLs
  '/categories': '/',
  '/cat/restaurants': '/category/Restaurants',
  '/cat/hotels': '/category/Hotels',
  
  // Location variations
  '/locations': '/',
  '/cotonou': '/location/cotonou',
  '/abomey': '/location/abomey',
  '/porto-novo': '/location/porto-novo'
};

// Detect thin content based on word count and content quality
export const analyzePageContent = (url: string, htmlContent: string): PageContentAudit => {
  // Strip HTML tags and get text content
  const textContent = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = textContent.split(' ').filter(word => word.length > 0).length;
  
  const issues: string[] = [];
  const recommendations: string[] = [];
  
  // Determine content type
  let contentType: 'thin' | 'normal' | 'rich' = 'normal';
  let status: '404' | 'thin' | 'ok' = 'ok';
  
  if (wordCount < 50) {
    contentType = 'thin';
    status = 'thin';
    issues.push(`Only ${wordCount} words (minimum 50 required)`);
    recommendations.push('Merge with related content or add substantial information');
  } else if (wordCount < 150) {
    contentType = 'thin';
    issues.push(`Low word count: ${wordCount} words (recommended: 150+)`);
    recommendations.push('Expand content with more detailed information');
  } else if (wordCount > 500) {
    contentType = 'rich';
  }
  
  // Check for other quality issues
  if (textContent.length < 200) {
    issues.push('Very short content length');
    recommendations.push('Add more descriptive content');
  }
  
  // Check for duplicate/template content patterns
  const commonTemplateWords = ['lorem', 'ipsum', 'placeholder', 'coming soon', 'under construction'];
  const hasTemplateContent = commonTemplateWords.some(word => 
    textContent.toLowerCase().includes(word)
  );
  
  if (hasTemplateContent) {
    issues.push('Contains template/placeholder content');
    recommendations.push('Replace with actual content');
    status = 'thin';
  }
  
  // Detect business listing pages with minimal content
  if (url.includes('/business/') && wordCount < 100) {
    issues.push('Business page lacks detailed description');
    recommendations.push('Add business description, services, hours, and contact details');
  }
  
  // Detect category pages with few listings
  if (url.includes('/category/') && textContent.includes('No businesses found')) {
    issues.push('Category page has no business listings');
    recommendations.push('Merge with parent category or add related businesses');
    status = 'thin';
  }
  
  return {
    url,
    wordCount,
    contentType,
    issues,
    recommendations,
    status
  };
};

// Generate content improvement suggestions
export const generateContentAuditReport = (pages: PageContentAudit[]): ContentAuditResult => {
  const thinContent = pages.filter(page => page.status === 'thin');
  const errors404 = pages.filter(page => page.status === '404');
  
  const recommendations = {
    merge: thinContent.filter(page => 
      page.wordCount < 30 || 
      page.url.includes('/category/') && page.issues.includes('Category page has no business listings')
    ),
    redirect: thinContent.filter(page => 
      page.url in known404Redirects ||
      page.issues.some(issue => issue.includes('template'))
    ),
    enhance: thinContent.filter(page => 
      page.wordCount >= 30 && page.wordCount < 150 &&
      !page.issues.some(issue => issue.includes('template'))
    ),
    remove: thinContent.filter(page => 
      page.issues.includes('Contains template/placeholder content') &&
      page.wordCount < 20
    )
  };
  
  return {
    thinContent,
    errors404,
    recommendations
  };
};

// Generate redirect rules for .htaccess or Vercel
export const generateRedirectRules = (redirects: { [key: string]: string }, format: 'htaccess' | 'vercel' = 'vercel'): string => {
  if (format === 'vercel') {
    const rules = Object.entries(redirects).map(([from, to]) => ({
      source: from,
      destination: to,
      permanent: true
    }));
    
    return JSON.stringify({ redirects: rules }, null, 2);
  } else {
    // Apache .htaccess format
    return Object.entries(redirects)
      .map(([from, to]) => `Redirect 301 ${from} ${to}`)
      .join('\n');
  }
};

// Content enhancement templates
export const contentEnhancementTemplates = {
  businessPage: {
    minSections: [
      'Business Description (50+ words)',
      'Services Offered',
      'Contact Information',
      'Operating Hours',
      'Location & Directions'
    ],
    seoElements: [
      'Business name in title',
      'Location in meta description',
      'Category keywords',
      'Local area modifiers',
      'Contact schema markup'
    ]
  },
  
  categoryPage: {
    minSections: [
      'Category Overview (100+ words)',
      'Why Choose This Category',
      'Popular Services/Products',
      'Local Market Insights',
      'Related Categories'
    ],
    seoElements: [
      'Category + location in title',
      'Local market keywords',
      'Service-specific terms',
      'Geographic modifiers',
      'ItemList schema markup'
    ]
  },
  
  articlePage: {
    minSections: [
      'Introduction (100+ words)',
      'Main Content (300+ words)',
      'Business Listings',
      'Local Insights',
      'FAQ Section',
      'Conclusion & CTA'
    ],
    seoElements: [
      'Target keyword in title',
      'Long-tail keywords',
      'Local modifiers',
      'Related terms',
      'Article schema markup'
    ]
  }
};

// ALT text audit for images
export interface ImageAuditResult {
  totalImages: number;
  missingAlt: number;
  emptyAlt: number;
  descriptiveAlt: number;
  recommendations: string[];
}

export const auditImageAltText = (htmlContent: string): ImageAuditResult => {
  const imgRegex = /<img[^>]*>/gi;
  const images = htmlContent.match(imgRegex) || [];
  
  let missingAlt = 0;
  let emptyAlt = 0;
  let descriptiveAlt = 0;
  
  const recommendations: string[] = [];
  
  images.forEach(img => {
    const altMatch = img.match(/alt=["']([^"']*)["']/i);
    
    if (!altMatch) {
      missingAlt++;
    } else {
      const altText = altMatch[1].trim();
      if (altText === '') {
        emptyAlt++;
      } else if (altText.length < 10 || altText.match(/^(image|photo|picture)\d*$/i)) {
        // Non-descriptive ALT text
        emptyAlt++;
      } else {
        descriptiveAlt++;
      }
    }
  });
  
  const totalImages = images.length;
  const problemImages = missingAlt + emptyAlt;
  
  if (problemImages > 0) {
    recommendations.push(`${problemImages} images need descriptive ALT text`);
    recommendations.push('Add location and business context to ALT text');
    recommendations.push('Include French translations for bilingual support');
  }
  
  if (totalImages > 0 && descriptiveAlt / totalImages < 0.8) {
    recommendations.push('Improve ALT text quality with more descriptive language');
  }
  
  return {
    totalImages,
    missingAlt,
    emptyAlt,
    descriptiveAlt,
    recommendations
  };
};