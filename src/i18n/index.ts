// I18n configuration for French/English support
// Note: For now this is a simplified implementation without react-i18next dependency
// In production, you would install: npm install react-i18next i18next

export interface Translation {
  [key: string]: string;
}

export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.categories': 'Categories',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.addBusiness': 'Add Business',
    'nav.claimBusiness': 'Claim Business',
    
    // Homepage
    'hero.title': 'Find the Best Businesses in Cotonou',
    'hero.subtitle': 'Discover top-rated restaurants, hotels, services, and more in Cotonou, Benin\'s vibrant economic capital.',
    'hero.searchPlaceholder': 'Search for businesses, services...',
    'hero.searchButton': 'Search',
    'hero.popular': 'Popular:',
    
    // Categories
    'category.restaurants': 'Restaurants',
    'category.hotels': 'Hotels',
    'category.services': 'Services',
    'category.shopping': 'Shopping',
    'category.entertainment': 'Entertainment',
    'category.health': 'Health',
    'category.education': 'Education',
    'category.agriculture': 'Agriculture',
    'category.finance': 'Finance',
    'category.transportation': 'Transportation',
    'category.cafes': 'Cafes',
    
    // Business details
    'business.rating': 'Rating',
    'business.reviews': 'reviews',
    'business.phone': 'Phone',
    'business.website': 'Website',
    'business.address': 'Address',
    'business.hours': 'Hours',
    'business.contact': 'Contact',
    'business.directions': 'Get Directions',
    
    // Articles
    'article.publishedBy': 'Published by Intelysia Team',
    'article.backToBlog': 'Back to Blog',
    'article.backToDirectory': 'Back to Directory',
    'article.browseAllArticles': 'Browse All Articles',
    'article.loading': 'Loading...',
    'article.notFound': 'Article not found',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.readMore': 'Read More',
    'common.showLess': 'Show Less',
    'common.viewAll': 'View All',
    'common.seeMore': 'See More',
    'common.contact': 'Contact',
    'common.location': 'Location',
    'common.category': 'Category',
    
    // SEO/Meta content
    'meta.businessDirectory': 'Cotonou Business Directory',
    'meta.businessDirectoryFull': 'Intelysia - Cotonou Business Directory',
    'meta.findBest': 'Find the best',
    'meta.in': 'in',
    'meta.benin': 'Benin',
    'meta.cotonou': 'Cotonou',
    'meta.with': 'with',
    'meta.ratings': 'ratings',
    'meta.contact': 'contact information',
    'meta.and': 'and',
    'meta.reviews': 'reviews'
  },
  
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.categories': 'Catégories',
    'nav.blog': 'Blog',
    'nav.about': 'À Propos',
    'nav.addBusiness': 'Ajouter Entreprise',
    'nav.claimBusiness': 'Revendiquer Entreprise',
    
    // Homepage
    'hero.title': 'Trouvez les Meilleures Entreprises à Cotonou',
    'hero.subtitle': 'Découvrez des restaurants, hôtels, services et plus encore dans la capitale économique dynamique du Bénin.',
    'hero.searchPlaceholder': 'Rechercher des entreprises, services...',
    'hero.searchButton': 'Rechercher',
    'hero.popular': 'Populaire:',
    
    // Categories
    'category.restaurants': 'Restaurants',
    'category.hotels': 'Hôtels',
    'category.services': 'Services',
    'category.shopping': 'Shopping',
    'category.entertainment': 'Divertissement',
    'category.health': 'Santé',
    'category.education': 'Éducation',
    'category.agriculture': 'Agriculture',
    'category.finance': 'Finance',
    'category.transportation': 'Transport',
    'category.cafes': 'Cafés',
    
    // Business details
    'business.rating': 'Note',
    'business.reviews': 'avis',
    'business.phone': 'Téléphone',
    'business.website': 'Site Web',
    'business.address': 'Adresse',
    'business.hours': 'Horaires',
    'business.contact': 'Contact',
    'business.directions': 'Obtenir Directions',
    
    // Articles
    'article.publishedBy': 'Publié par l\'équipe Intelysia',
    'article.backToBlog': 'Retour au Blog',
    'article.backToDirectory': 'Retour au Répertoire',
    'article.browseAllArticles': 'Parcourir Tous les Articles',
    'article.loading': 'Chargement...',
    'article.notFound': 'Article non trouvé',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.readMore': 'Lire Plus',
    'common.showLess': 'Voir Moins',
    'common.viewAll': 'Voir Tout',
    'common.seeMore': 'Voir Plus',
    'common.contact': 'Contact',
    'common.location': 'Localisation',
    'common.category': 'Catégorie',
    
    // SEO/Meta content
    'meta.businessDirectory': 'Répertoire d\'Entreprises de Cotonou',
    'meta.businessDirectoryFull': 'Intelysia - Répertoire d\'Entreprises de Cotonou',
    'meta.findBest': 'Trouvez les meilleurs',
    'meta.in': 'à',
    'meta.benin': 'Bénin',
    'meta.cotonou': 'Cotonou',
    'meta.with': 'avec',
    'meta.ratings': 'notes',
    'meta.contact': 'informations de contact',
    'meta.and': 'et',
    'meta.reviews': 'avis'
  }
};

// Simple translation function
export const t = (key: string, language: 'en' | 'fr' = 'en'): string => {
  return translations[language][key] || translations['en'][key] || key;
};

// Get browser language
export const getBrowserLanguage = (): 'en' | 'fr' => {
  if (typeof window !== 'undefined') {
    const lang = navigator.language.split('-')[0];
    return lang === 'fr' ? 'fr' : 'en';
  }
  return 'en';
};

// Get language from URL path
export const getLanguageFromPath = (pathname: string): 'en' | 'fr' => {
  if (pathname.startsWith('/fr/')) {
    return 'fr';
  }
  return 'en';
};

// Convert path to localized version
export const localizedPath = (path: string, language: 'en' | 'fr'): string => {
  // Remove existing language prefix
  const cleanPath = path.replace(/^\/fr\//, '/');
  
  if (language === 'fr') {
    return `/fr${cleanPath}`;
  }
  return cleanPath;
};

// Generate hreflang URLs
export const generateHreflangUrls = (path: string, baseUrl: string = 'https://intelysia.com'): { [key: string]: string } => {
  const cleanPath = path.replace(/^\/fr\//, '/');
  
  return {
    'en': `${baseUrl}${cleanPath}`,
    'fr': `${baseUrl}/fr${cleanPath}`,
    'x-default': `${baseUrl}${cleanPath}`
  };
};