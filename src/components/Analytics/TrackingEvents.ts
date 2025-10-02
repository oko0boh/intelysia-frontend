// Google Analytics event tracking utilities
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Business-specific tracking events
export const trackBusinessView = (businessId: string, businessName: string) => {
  trackEvent('view_business', 'business', `${businessName} (${businessId})`);
};

export const trackBusinessContact = (businessId: string, contactMethod: 'phone' | 'email' | 'website') => {
  trackEvent('contact_business', 'business', `${contactMethod}_${businessId}`);
};

export const trackSearch = (query: string, resultsCount: number) => {
  trackEvent('search', 'user_interaction', query, resultsCount);
};

export const trackCategoryView = (category: string) => {
  trackEvent('view_category', 'navigation', category);
};

export const trackLocationView = (location: string) => {
  trackEvent('view_location', 'navigation', location);
};

export const trackBlogPostView = (postSlug: string, postTitle: string) => {
  trackEvent('view_blog_post', 'content', `${postTitle} (${postSlug})`);
};

export const trackNewsletterSignup = (source: string) => {
  trackEvent('newsletter_signup', 'conversion', source);
};

export const trackBusinessClaim = (businessId: string) => {
  trackEvent('claim_business', 'conversion', businessId);
};
