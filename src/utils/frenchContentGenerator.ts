// French Content Generation for Intelysia Business Directory
// Generates French descriptions, articles, and SEO content

import { ProcessedBusiness } from './csvDataLoader';
import { t } from '../i18n';

// French Business Categories with Descriptions
export const FRENCH_CATEGORIES = {
  'Restaurants': {
    name: 'Restaurants',
    description: 'Découvrez les meilleurs restaurants de Cotonou offrant une cuisine locale béninoise, ouest-africaine et internationale.',
    keywords: ['restaurant', 'cuisine', 'nourriture', 'repas', 'cotonou', 'bénin', 'gastronomie'],
    seoTitle: 'Meilleurs Restaurants à Cotonou - Guide Gastronomique Bénin',
    seoDescription: 'Découvrez les meilleurs restaurants de Cotonou avec des avis clients, menus et informations de contact. Cuisine béninoise, internationale et locale.',
    businessTypes: ['Restaurant traditionnel', 'Restaurant moderne', 'Cuisine de rue', 'Restaurant familial', 'Brasserie', 'Bistrot']
  },
  'Hotels': {
    name: 'Hôtels',
    description: 'Trouvez les meilleurs hôtels et hébergements à Cotonou pour votre séjour d\'affaires ou de tourisme.',
    keywords: ['hôtel', 'hébergement', 'séjour', 'tourisme', 'voyage', 'cotonou', 'bénin'],
    seoTitle: 'Meilleurs Hôtels à Cotonou - Réservation Hébergement Bénin',
    seoDescription: 'Réservez les meilleurs hôtels de Cotonou. Hébergements de qualité avec avis clients, tarifs et services pour votre séjour au Bénin.',
    businessTypes: ['Hôtel de luxe', 'Hôtel d\'affaires', 'Auberge', 'Guesthouse', 'Résidence hôtelière', 'Motel']
  },
  'Services': {
    name: 'Services Professionnels',
    description: 'Services professionnels de qualité à Cotonou : conseil, juridique, comptabilité, et expertise technique.',
    keywords: ['services', 'professionnel', 'conseil', 'expertise', 'cotonou', 'bénin', 'entreprise'],
    seoTitle: 'Services Professionnels à Cotonou - Experts et Consultants Bénin',
    seoDescription: 'Trouvez les meilleurs services professionnels à Cotonou : avocats, comptables, consultants, experts techniques avec avis et contact.',
    businessTypes: ['Cabinet de conseil', 'Services juridiques', 'Comptabilité', 'Expertise technique', 'Consultation', 'Services aux entreprises']
  },
  'Shopping': {
    name: 'Shopping',
    description: 'Centres commerciaux, boutiques et magasins à Cotonou pour tous vos achats : mode, électronique, artisanat.',
    keywords: ['shopping', 'magasin', 'boutique', 'achat', 'commerce', 'cotonou', 'marché'],
    seoTitle: 'Shopping à Cotonou - Magasins et Centres Commerciaux Bénin',
    seoDescription: 'Guide shopping Cotonou : centres commerciaux, boutiques, marchés traditionnels. Trouvez les meilleurs magasins avec avis et horaires.',
    businessTypes: ['Centre commercial', 'Boutique de mode', 'Magasin d\'électronique', 'Marché traditionnel', 'Supermarché', 'Magasin spécialisé']
  },
  'Beauty': {
    name: 'Beauté & Salon',
    description: 'Salons de beauté, coiffeurs et spas à Cotonou pour prendre soin de vous avec des services de qualité.',
    keywords: ['beauté', 'salon', 'coiffeur', 'spa', 'soins', 'esthétique', 'cotonou'],
    seoTitle: 'Salons de Beauté à Cotonou - Coiffeurs et Spas Bénin',
    seoDescription: 'Trouvez les meilleurs salons de beauté à Cotonou : coiffeurs, spas, soins esthétiques avec tarifs et avis clients.',
    businessTypes: ['Salon de coiffure', 'Institut de beauté', 'Spa', 'Barbier', 'Salon d\'esthétique', 'Centre de bien-être']
  },
  'Health': {
    name: 'Santé & Médical',
    description: 'Services de santé et établissements médicaux à Cotonou : cliniques, hôpitaux, pharmacies et spécialistes.',
    keywords: ['santé', 'médical', 'clinique', 'hôpital', 'médecin', 'pharmacie', 'cotonou'],
    seoTitle: 'Services de Santé à Cotonou - Cliniques et Médecins Bénin',
    seoDescription: 'Annuaire médical Cotonou : cliniques, hôpitaux, médecins spécialistes, pharmacies avec informations de contact et horaires.',
    businessTypes: ['Clinique privée', 'Hôpital', 'Cabinet médical', 'Pharmacie', 'Laboratoire d\'analyse', 'Centre de santé']
  },
  'Education': {
    name: 'Éducation',
    description: 'Établissements éducatifs à Cotonou : écoles, universités, centres de formation et cours particuliers.',
    keywords: ['éducation', 'école', 'université', 'formation', 'cours', 'apprentissage', 'cotonou'],
    seoTitle: 'Éducation à Cotonou - Écoles et Universités Bénin',
    seoDescription: 'Guide éducation Cotonou : écoles privées, universités, centres de formation professionnelle avec programmes et contact.',
    businessTypes: ['École primaire', 'École secondaire', 'Université', 'Centre de formation', 'École technique', 'Cours particuliers']
  },
  'Entertainment': {
    name: 'Divertissement',
    description: 'Lieux de divertissement à Cotonou : bars, discothèques, cinémas et centres de loisirs pour vos sorties.',
    keywords: ['divertissement', 'bar', 'discothèque', 'cinéma', 'loisir', 'sortie', 'cotonou'],
    seoTitle: 'Divertissement à Cotonou - Bars, Clubs et Loisirs Bénin',
    seoDescription: 'Sortir à Cotonou : meilleurs bars, discothèques, cinémas et centres de loisirs avec avis, horaires et événements.',
    businessTypes: ['Bar', 'Discothèque', 'Cinéma', 'Centre de loisirs', 'Club de nuit', 'Café-bar']
  },
  'Transportation': {
    name: 'Transport',
    description: 'Services de transport à Cotonou : taxis, location de véhicules, transport en commun et logistique.',
    keywords: ['transport', 'taxi', 'location', 'véhicule', 'logistique', 'déplacement', 'cotonou'],
    seoTitle: 'Transport à Cotonou - Taxis et Location Véhicules Bénin',
    seoDescription: 'Services de transport Cotonou : taxis, location de voitures, transport en commun et solutions logistiques professionnelles.',
    businessTypes: ['Compagnie de taxi', 'Location de véhicules', 'Transport en commun', 'Logistique', 'Transport de marchandises', 'Agence de voyage']
  },
  'Finance': {
    name: 'Finance',
    description: 'Services financiers à Cotonou : banques, assurances, microfinance et conseils financiers.',
    keywords: ['finance', 'banque', 'assurance', 'microfinance', 'crédit', 'investissement', 'cotonou'],
    seoTitle: 'Services Financiers à Cotonou - Banques et Assurances Bénin',
    seoDescription: 'Services financiers Cotonou : banques, compagnies d\'assurance, microfinance et conseillers financiers professionnels.',
    businessTypes: ['Banque commerciale', 'Compagnie d\'assurance', 'Institution de microfinance', 'Cabinet financier', 'Bureau de change', 'Conseil en investissement']
  }
};

// Generate French business description
export const generateFrenchBusinessDescription = (business: ProcessedBusiness, category: string): string => {
  const categoryInfo = FRENCH_CATEGORIES[category as keyof typeof FRENCH_CATEGORIES];
  const businessTypes = categoryInfo?.businessTypes || ['Entreprise professionnelle'];
  const randomType = businessTypes[Math.floor(Math.random() * businessTypes.length)];
  
  const templates = [
    `${business.name} est un ${randomType.toLowerCase()} situé à ${business.location || 'Cotonou'}, offrant des services de qualité avec ${business.rating ? `une note de ${business.rating}/5` : 'une excellente réputation'}. ${categoryInfo?.description || 'Services professionnels de qualité.'} Contactez-nous pour plus d\'informations.`,
    
    `Découvrez ${business.name}, votre ${randomType.toLowerCase()} de confiance à ${business.location || 'Cotonou'}. ${categoryInfo?.description || 'Nous offrons des services exceptionnels.'} ${business.rating ? `Nos clients nous accordent une note de ${business.rating}/5 étoiles.` : 'Satisfaction client garantie.'} Appelez-nous dès maintenant.`,
    
    `${business.name} - ${randomType} professionnel à ${business.location || 'Cotonou'}, République du Bénin. ${categoryInfo?.description || 'Services de qualité supérieure.'} ${business.reviews ? `Plus de ${business.reviews} avis clients positifs.` : 'Recommandé par nos clients.'} Rendez-vous sur place ou contactez-nous.`,
    
    `Chez ${business.name}, nous sommes spécialisés en tant que ${randomType.toLowerCase()} à ${business.location || 'Cotonou'}. ${categoryInfo?.description || 'Excellence et professionnalisme garantis.'} ${business.rating ? `Note moyenne: ${business.rating}/5` : 'Service de qualité'} - Venez nous rendre visite.`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
};

// Generate French category page content
export const generateFrenchCategoryContent = (category: string, businessCount: number, location: string = 'Cotonou'): {
  title: string;
  description: string;
  introText: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
} => {
  const categoryInfo = FRENCH_CATEGORIES[category as keyof typeof FRENCH_CATEGORIES];
  
  if (!categoryInfo) {
    return {
      title: `${category} à ${location}`,
      description: `Trouvez les meilleurs ${category.toLowerCase()} à ${location}, République du Bénin.`,
      introText: `Découvrez ${businessCount} ${category.toLowerCase()} vérifiés à ${location}.`,
      seoTitle: `${category} à ${location} - Répertoire d'Entreprises Bénin`,
      seoDescription: `Annuaire complet des ${category.toLowerCase()} à ${location}, Bénin. Trouvez les meilleures entreprises avec avis clients et informations de contact.`,
      keywords: [category.toLowerCase(), location.toLowerCase(), 'bénin', 'entreprise', 'service']
    };
  }
  
  return {
    title: `${categoryInfo.name} à ${location}`,
    description: categoryInfo.description,
    introText: `Découvrez les ${businessCount} meilleurs ${categoryInfo.name.toLowerCase()} à ${location}, République du Bénin. ${categoryInfo.description} Tous nos établissements sont vérifiés avec des avis clients authentiques et des informations de contact à jour.`,
    seoTitle: categoryInfo.seoTitle.replace('Cotonou', location),
    seoDescription: categoryInfo.seoDescription.replace('Cotonou', location),
    keywords: [...categoryInfo.keywords, location.toLowerCase()]
  };
};

// Generate French homepage content
export const FRENCH_HOMEPAGE_CONTENT = {
  hero: {
    title: 'Trouvez les Meilleures Entreprises au Bénin',
    subtitle: 'Découvrez restaurants, hôtels, services professionnels et bien plus dans la République du Bénin. Votre guide complet des entreprises locales avec avis clients, coordonnées et horaires.',
    searchPlaceholder: 'Rechercher entreprises, services, localisations...',
    searchButton: 'Rechercher',
    popularSearches: 'Recherches populaires:'
  },
  features: {
    title: 'Pourquoi Choisir Intelysia?',
    subtitle: 'Votre répertoire d\'entreprises de confiance pour la République du Bénin',
    items: [
      {
        title: 'Entreprises Vérifiées',
        description: 'Plus de 1000 entreprises vérifiées avec des informations à jour et des avis clients authentiques.'
      },
      {
        title: 'Couverture Nationale',
        description: 'Annuaire complet couvrant Cotonou, Porto-Novo, Parakou, Abomey et toutes les grandes villes du Bénin.'
      },
      {
        title: 'Recherche Facile',
        description: 'Trouvez rapidement les entreprises par catégorie, localisation ou nom avec notre moteur de recherche avancé.'
      },
      {
        title: 'Informations Complètes',
        description: 'Coordonnées, horaires, avis clients, photos et descriptions détaillées pour chaque entreprise.'
      }
    ]
  },
  categories: {
    title: 'Catégories Principales',
    subtitle: 'Explorez nos catégories d\'entreprises les plus populaires',
    viewAll: 'Voir Toutes les Catégories'
  },
  testimonials: {
    title: 'Ce Que Disent Nos Utilisateurs',
    subtitle: 'Des milliers d\'utilisateurs font confiance à Intelysia pour trouver les meilleures entreprises',
    items: [
      {
        text: 'Intelysia m\'a aidé à trouver le meilleur restaurant pour mon anniversaire. Les avis étaient très utiles!',
        author: 'Marie K.',
        location: 'Cotonou'
      },
      {
        text: 'Excellent service pour trouver des entreprises fiables. Je recommande Intelysia à tous.',
        author: 'Jean-Claude A.',
        location: 'Porto-Novo'
      },
      {
        text: 'Très pratique pour les touristes. J\'ai trouvé facilement un bon hôtel grâce à Intelysia.',
        author: 'Sophie L.',
        location: 'Visiteur'
      }
    ]
  },
  cta: {
    title: 'Votre Entreprise Mérite d\'Être Trouvée',
    subtitle: 'Rejoignez plus de 1000 entreprises qui font confiance à Intelysia pour attirer de nouveaux clients',
    primaryButton: 'Ajouter Mon Entreprise',
    secondaryButton: 'En Savoir Plus'
  }
};

// Generate French article content
export const generateFrenchArticle = (category: string, businesses: ProcessedBusiness[], location: string = 'Cotonou'): {
  title: string;
  content: string;
  excerpt: string;
  keywords: string[];
} => {
  const categoryInfo = FRENCH_CATEGORIES[category as keyof typeof FRENCH_CATEGORIES];
  const topBusinesses = businesses.slice(0, 5);
  
  const title = `Guide Complet des ${categoryInfo?.name || category} à ${location} 2024`;
  
  const content = `
# ${title}

${location} est le cœur économique du Bénin et abrite certains des meilleurs ${categoryInfo?.name.toLowerCase() || category.toLowerCase()} du pays. ${categoryInfo?.description || 'Découvrez les meilleures entreprises de la région.'} 

## Les Meilleurs ${categoryInfo?.name || category} à ${location}

Nous avons sélectionné pour vous les ${businesses.length} meilleurs ${categoryInfo?.name.toLowerCase() || category.toLowerCase()} de ${location}, tous vérifiés et évalués par nos utilisateurs :

${topBusinesses.map((business, index) => `
### ${index + 1}. ${business.name}
**Adresse :** ${business.address}  
**Téléphone :** ${business.phone}  
**Note :** ${business.rating ? `${business.rating}/5 étoiles` : 'Excellent service'}  
${business.rating && business.reviews ? `**Avis :** ${business.reviews} avis clients` : ''}

${generateFrenchBusinessDescription(business, category)}
`).join('')}

## Comment Choisir le Bon ${categoryInfo?.name.slice(0, -1) || category}

Voici nos conseils pour choisir le meilleur ${categoryInfo?.name.toLowerCase().slice(0, -1) || category.toLowerCase()} à ${location} :

1. **Vérifiez les avis clients** - Les commentaires authentiques vous donnent une idée réelle de la qualité
2. **Comparez les tarifs** - Demandez plusieurs devis pour faire le bon choix
3. **Visitez sur place** - Rien ne remplace une visite pour évaluer l'établissement
4. **Vérifiez les horaires** - Assurez-vous que les horaires correspondent à vos besoins
5. **Contactez directement** - N'hésitez pas à appeler pour poser vos questions

## Pourquoi Choisir Intelysia ?

Intelysia est le répertoire d'entreprises le plus complet du Bénin. Nous vérifions chaque établissement et mettons régulièrement à jour les informations pour vous garantir :

- ✅ Des informations fiables et à jour
- ✅ Des avis clients authentiques
- ✅ Des coordonnées vérifiées
- ✅ Une couverture complète du territoire béninois

## Conclusion

${location} offre un large choix de ${categoryInfo?.name.toLowerCase() || category.toLowerCase()} de qualité. Que vous soyez résident ou visiteur, utilisez notre guide pour trouver l'établissement qui correspond parfaitement à vos besoins. N'oubliez pas de consulter les avis clients et de contacter directement les entreprises pour plus d'informations.

**Vous êtes propriétaire d'un ${categoryInfo?.name.toLowerCase().slice(0, -1) || category.toLowerCase()} à ${location} ?** [Ajoutez votre entreprise](/register-business) gratuitement sur Intelysia et attirez de nouveaux clients dès aujourd'hui !
`;

  const excerpt = `Guide complet pour choisir les meilleurs ${categoryInfo?.name.toLowerCase() || category.toLowerCase()} à ${location}. Découvrez ${businesses.length} établissements vérifiés avec avis clients, coordonnées et conseils d'experts.`;
  
  return {
    title,
    content,
    excerpt,
    keywords: categoryInfo?.keywords || [category.toLowerCase(), location.toLowerCase(), 'bénin']
  };
};

// Generate French SEO meta tags
export const generateFrenchSEOTags = (page: string, category?: string, location?: string): {
  title: string;
  description: string;
  keywords: string[];
} => {
  const loc = location || 'Cotonou';
  
  switch (page) {
    case 'home':
      return {
        title: 'Intelysia - Répertoire d\'Entreprises du Bénin | Trouvez les Meilleures Entreprises',
        description: 'Découvrez plus de 1000 entreprises vérifiées au Bénin. Restaurants, hôtels, services professionnels à Cotonou, Porto-Novo, Parakou. Avis clients et coordonnées.',
        keywords: ['répertoire entreprises', 'bénin', 'cotonou', 'porto-novo', 'annuaire', 'business directory', 'restaurants', 'hôtels', 'services']
      };
      
    case 'category':
      const categoryInfo = category ? FRENCH_CATEGORIES[category as keyof typeof FRENCH_CATEGORIES] : null;
      return {
        title: categoryInfo?.seoTitle.replace('Cotonou', loc) || `${category} à ${loc} - Intelysia`,
        description: categoryInfo?.seoDescription.replace('Cotonou', loc) || `Trouvez les meilleurs ${category?.toLowerCase()} à ${loc}, Bénin.`,
        keywords: categoryInfo?.keywords || [category?.toLowerCase() || '', loc.toLowerCase(), 'bénin']
      };
      
    case 'about':
      return {
        title: 'À Propos d\'Intelysia - Votre Répertoire d\'Entreprises du Bénin',
        description: 'Découvrez l\'histoire d\'Intelysia, le répertoire d\'entreprises leader au Bénin. Notre mission : connecter les clients avec les meilleures entreprises locales.',
        keywords: ['intelysia', 'à propos', 'répertoire entreprises', 'bénin', 'mission', 'histoire']
      };
      
    case 'contact':
      return {
        title: 'Contactez Intelysia - Support et Assistance Répertoire Bénin',
        description: 'Contactez l\'équipe Intelysia pour toute question sur notre répertoire d\'entreprises. Support client, partenariats et assistance technique.',
        keywords: ['contact', 'intelysia', 'support', 'assistance', 'bénin', 'aide']
      };
      
    default:
      return {
        title: 'Intelysia - Répertoire d\'Entreprises du Bénin',
        description: 'Trouvez les meilleures entreprises au Bénin avec Intelysia.',
        keywords: ['intelysia', 'bénin', 'entreprises']
      };
  }
};