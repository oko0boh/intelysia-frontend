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
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.clear': 'Clear',
    'common.apply': 'Apply',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.closed': 'Closed',
    'common.available': 'Available',
    'common.verified': 'Verified',
    'common.popular': 'Popular',
    'common.featured': 'Featured',
    'common.new': 'New',
    'common.updated': 'Updated',
    
    // Business Categories Extended
    'category.beauty': 'Beauty & Salon',
    'category.automotive': 'Automotive',
    'category.real_estate': 'Real Estate',
    'category.legal': 'Legal Services',
    'category.technology': 'Technology',
    'category.construction': 'Construction',
    'category.consulting': 'Consulting',
    'category.medical': 'Medical',
    'category.dental': 'Dental',
    'category.veterinary': 'Veterinary',
    'category.fitness': 'Fitness',
    'category.photography': 'Photography',
    'category.events': 'Events',
    'category.catering': 'Catering',
    'category.cleaning': 'Cleaning',
    'category.security': 'Security',
    'category.insurance': 'Insurance',
    'category.banking': 'Banking',
    'category.travel': 'Travel',
    'category.logistics': 'Logistics',
    
    // Business Details Extended
    'business.description': 'Description',
    'business.services': 'Services',
    'business.products': 'Products',
    'business.amenities': 'Amenities',
    'business.parking': 'Parking',
    'business.wifi': 'WiFi',
    'business.airConditioning': 'Air Conditioning',
    'business.wheelchairAccessible': 'Wheelchair Accessible',
    'business.petFriendly': 'Pet Friendly',
    'business.kidsWelcome': 'Kids Welcome',
    'business.delivery': 'Delivery',
    'business.takeout': 'Takeout',
    'business.reservation': 'Reservations',
    'business.creditCards': 'Credit Cards Accepted',
    'business.mobilePayment': 'Mobile Payment',
    
    // Search & Filters
    'search.placeholder': 'Search businesses, services, locations...',
    'search.results': 'Search Results',
    'search.noResults': 'No results found',
    'search.tryDifferent': 'Try different keywords',
    'filter.location': 'Location',
    'filter.category': 'Category',
    'filter.rating': 'Rating',
    'filter.price': 'Price Range',
    'filter.distance': 'Distance',
    'filter.openNow': 'Open Now',
    'filter.features': 'Features',
    
    // Location Names
    'location.cotonou': 'Cotonou',
    'location.portonovo': 'Porto-Novo',
    'location.parakou': 'Parakou',
    'location.abomey': 'Abomey',
    'location.bohicon': 'Bohicon',
    'location.kandi': 'Kandi',
    'location.natitingou': 'Natitingou',
    'location.djougou': 'Djougou',
    'location.lokossa': 'Lokossa',
    'location.ouidah': 'Ouidah',
    
    // Pages
    'page.home': 'Home',
    'page.about': 'About Us',
    'page.contact': 'Contact Us',
    'page.privacy': 'Privacy Policy',
    'page.terms': 'Terms of Service',
    'page.help': 'Help',
    'page.blog': 'Blog',
    'page.sitemap': 'Sitemap',
    
    // About Page
    'about.title': 'About Intelysia',
    'about.subtitle': 'Your trusted business directory for Benin Republic',
    'about.mission': 'Our Mission',
    'about.vision': 'Our Vision',
    'about.values': 'Our Values',
    'about.team': 'Our Team',
    'about.history': 'Our History',
    
    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our team',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.hours': 'Business Hours',
    'contact.form': 'Contact Form',
    'contact.name': 'Name',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.success': 'Message sent successfully!',
    'contact.error': 'Error sending message. Please try again.',
    
    // Business Registration
    'register.title': 'Register Your Business',
    'register.subtitle': 'List your business on Intelysia for free',
    'register.businessName': 'Business Name',
    'register.category': 'Category',
    'register.description': 'Description',
    'register.address': 'Address',
    'register.phone': 'Phone Number',
    'register.email': 'Email Address',
    'register.website': 'Website',
    'register.hours': 'Business Hours',
    'register.submit': 'Submit',
    'register.success': 'Business registered successfully!',
    'register.pending': 'Your business is pending approval.',
    
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
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.clear': 'Effacer',
    'common.apply': 'Appliquer',
    'common.close': 'Fermer',
    'common.open': 'Ouvert',
    'common.closed': 'Fermé',
    'common.available': 'Disponible',
    'common.verified': 'Vérifié',
    'common.popular': 'Populaire',
    'common.featured': 'En Vedette',
    'common.new': 'Nouveau',
    'common.updated': 'Mis à Jour',
    
    // Business Categories Extended
    'category.beauty': 'Beauté & Salon',
    'category.automotive': 'Automobile',
    'category.real_estate': 'Immobilier',
    'category.legal': 'Services Juridiques',
    'category.technology': 'Technologie',
    'category.construction': 'Construction',
    'category.consulting': 'Conseil',
    'category.medical': 'Médical',
    'category.dental': 'Dentaire',
    'category.veterinary': 'Vétérinaire',
    'category.fitness': 'Fitness',
    'category.photography': 'Photographie',
    'category.events': 'Événements',
    'category.catering': 'Restauration',
    'category.cleaning': 'Nettoyage',
    'category.security': 'Sécurité',
    'category.insurance': 'Assurance',
    'category.banking': 'Banque',
    'category.travel': 'Voyage',
    'category.logistics': 'Logistique',
    
    // Business Details Extended
    'business.description': 'Description',
    'business.services': 'Services',
    'business.products': 'Produits',
    'business.amenities': 'Équipements',
    'business.parking': 'Parking',
    'business.wifi': 'WiFi',
    'business.airConditioning': 'Climatisation',
    'business.wheelchairAccessible': 'Accessible aux Fauteuils Roulants',
    'business.petFriendly': 'Accepte les Animaux',
    'business.kidsWelcome': 'Enfants Bienvenus',
    'business.delivery': 'Livraison',
    'business.takeout': 'À Emporter',
    'business.reservation': 'Réservations',
    'business.creditCards': 'Cartes de Crédit Acceptées',
    'business.mobilePayment': 'Paiement Mobile',
    
    // Search & Filters
    'search.placeholder': 'Rechercher entreprises, services, localisations...',
    'search.results': 'Résultats de Recherche',
    'search.noResults': 'Aucun résultat trouvé',
    'search.tryDifferent': 'Essayez des mots-clés différents',
    'filter.location': 'Localisation',
    'filter.category': 'Catégorie',
    'filter.rating': 'Note',
    'filter.price': 'Gamme de Prix',
    'filter.distance': 'Distance',
    'filter.openNow': 'Ouvert Maintenant',
    'filter.features': 'Caractéristiques',
    
    // Location Names (keeping original names but could add descriptions)
    'location.cotonou': 'Cotonou',
    'location.portonovo': 'Porto-Novo',
    'location.parakou': 'Parakou',
    'location.abomey': 'Abomey',
    'location.bohicon': 'Bohicon',
    'location.kandi': 'Kandi',
    'location.natitingou': 'Natitingou',
    'location.djougou': 'Djougou',
    'location.lokossa': 'Lokossa',
    'location.ouidah': 'Ouidah',
    
    // Pages
    'page.home': 'Accueil',
    'page.about': 'À Propos de Nous',
    'page.contact': 'Nous Contacter',
    'page.privacy': 'Politique de Confidentialité',
    'page.terms': 'Conditions d\'Utilisation',
    'page.help': 'Aide',
    'page.blog': 'Blog',
    'page.sitemap': 'Plan du Site',
    
    // About Page
    'about.title': 'À Propos d\'Intelysia',
    'about.subtitle': 'Votre répertoire d\'entreprises de confiance pour la République du Bénin',
    'about.mission': 'Notre Mission',
    'about.vision': 'Notre Vision',
    'about.values': 'Nos Valeurs',
    'about.team': 'Notre Équipe',
    'about.history': 'Notre Histoire',
    
    // Contact Page
    'contact.title': 'Nous Contacter',
    'contact.subtitle': 'Entrez en contact avec notre équipe',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.address': 'Adresse',
    'contact.hours': 'Heures d\'Ouverture',
    'contact.form': 'Formulaire de Contact',
    'contact.name': 'Nom',
    'contact.message': 'Message',
    'contact.send': 'Envoyer le Message',
    'contact.success': 'Message envoyé avec succès!',
    'contact.error': 'Erreur lors de l\'envoi du message. Veuillez réessayer.',
    
    // Business Registration
    'register.title': 'Enregistrer Votre Entreprise',
    'register.subtitle': 'Listez votre entreprise sur Intelysia gratuitement',
    'register.businessName': 'Nom de l\'Entreprise',
    'register.category': 'Catégorie',
    'register.description': 'Description',
    'register.address': 'Adresse',
    'register.phone': 'Numéro de Téléphone',
    'register.email': 'Adresse Email',
    'register.website': 'Site Web',
    'register.hours': 'Heures d\'Ouverture',
    'register.submit': 'Soumettre',
    'register.success': 'Entreprise enregistrée avec succès!',
    'register.pending': 'Votre entreprise est en attente d\'approbation.',
    
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