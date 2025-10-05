// Business Enhancer - Adds French descriptions and multilingual support
// Enhances business data with French content and translations

import { ProcessedBusiness } from './csvDataLoader';
import { generateFrenchBusinessDescription, FRENCH_CATEGORIES } from './frenchContentGenerator';
import { t } from '../i18n';

// Enhanced business interface with French support
export interface EnhancedBusiness extends ProcessedBusiness {
  frenchDescription?: string;
  frenchCategory?: string;
  localizedName?: {
    en: string;
    fr: string;
  };
  localizedCategory?: {
    en: string;
    fr: string;
  };
}

// Enhance a single business with French content
export const enhanceBusinessWithFrench = (business: ProcessedBusiness): EnhancedBusiness => {
  // Generate French description
  const frenchDescription = generateFrenchBusinessDescription(business, business.category);
  
  // Get French category name
  const categoryInfo = FRENCH_CATEGORIES[business.category as keyof typeof FRENCH_CATEGORIES];
  const frenchCategory = categoryInfo?.name || business.category;
  
  return {
    ...business,
    frenchDescription,
    frenchCategory,
    localizedName: {
      en: business.name,
      fr: business.name // Business names usually stay the same
    },
    localizedCategory: {
      en: business.category,
      fr: frenchCategory
    }
  };
};

// Enhance array of businesses with French content
export const enhanceBusinessesWithFrench = (businesses: ProcessedBusiness[]): EnhancedBusiness[] => {
  return businesses.map(business => enhanceBusinessWithFrench(business));
};

// Get localized business description
export const getLocalizedDescription = (business: EnhancedBusiness, language: 'en' | 'fr'): string => {
  if (language === 'fr' && business.frenchDescription) {
    return business.frenchDescription;
  }
  
  if (business.description) {
    return business.description;
  }
  
  // Generate a default description
  const categoryName = language === 'fr' ? business.frenchCategory : business.category;
  const location = business.location || 'Cotonou';
  
  if (language === 'fr') {
    return `${business.name} est une entreprise ${categoryName?.toLowerCase()} située à ${location}, offrant des services de qualité avec une excellente réputation. Contactez-nous pour plus d'informations.`;
  } else {
    return `${business.name} is a professional ${categoryName?.toLowerCase()} located in ${location}, offering quality services with an excellent reputation. Contact us for more information.`;
  }
};

// Get localized category name
export const getLocalizedCategory = (business: EnhancedBusiness, language: 'en' | 'fr'): string => {
  if (language === 'fr' && business.frenchCategory) {
    return business.frenchCategory;
  }
  return business.category;
};

// Get business amenities in French
export const getFrenchAmenities = (business: ProcessedBusiness): string[] => {
  const amenities: string[] = [];
  
  // Add common amenities based on category
  switch (business.category.toLowerCase()) {
    case 'restaurants':
      amenities.push('Service de livraison', 'WiFi gratuit', 'Terrasse', 'Climatisation', 'Parking');
      break;
    case 'hotels':
      amenities.push('WiFi gratuit', 'Petit-déjeuner inclus', 'Parking gratuit', 'Climatisation', 'Service 24h/24');
      break;
    case 'services':
      amenities.push('Consultation gratuite', 'Rendez-vous flexible', 'Service professionnel', 'Expertise certifiée');
      break;
    case 'beauty':
      amenities.push('Produits de qualité', 'Équipement moderne', 'Rendez-vous en ligne', 'Parking disponible');
      break;
    case 'health':
      amenities.push('Urgences acceptées', 'Parking patients', 'Équipement moderne', 'Personnel qualifié');
      break;
    default:
      amenities.push('Service professionnel', 'Parking disponible', 'Accueil clientèle');
  }
  
  return amenities;
};

// Generate French business hours
export const getFrenchBusinessHours = (business: ProcessedBusiness): string => {
  if (business.hours) {
    // Convert common English hours to French
    return business.hours
      .replace(/Monday/gi, 'Lundi')
      .replace(/Tuesday/gi, 'Mardi')
      .replace(/Wednesday/gi, 'Mercredi')
      .replace(/Thursday/gi, 'Jeudi')
      .replace(/Friday/gi, 'Vendredi')
      .replace(/Saturday/gi, 'Samedi')
      .replace(/Sunday/gi, 'Dimanche')
      .replace(/Mon/gi, 'Lun')
      .replace(/Tue/gi, 'Mar')
      .replace(/Wed/gi, 'Mer')
      .replace(/Thu/gi, 'Jeu')
      .replace(/Fri/gi, 'Ven')
      .replace(/Sat/gi, 'Sam')
      .replace(/Sun/gi, 'Dim')
      .replace(/AM/gi, 'h')
      .replace(/PM/gi, 'h')
      .replace(/Open/gi, 'Ouvert')
      .replace(/Closed/gi, 'Fermé');
  }
  
  // Default French business hours
  return 'Lundi - Vendredi: 9h00 - 18h00, Samedi: 10h00 - 16h00';
};

// Get French business contact phrases
export const getFrenchContactPhrases = () => {
  return {
    phone: 'Téléphone',
    address: 'Adresse',
    website: 'Site Web',
    email: 'Email',
    hours: 'Horaires',
    contact: 'Nous Contacter',
    directions: 'Obtenir l\'itinéraire',
    reviews: 'avis client',
    rating: 'Note',
    services: 'Nos Services',
    about: 'À Propos',
    callNow: 'Appeler Maintenant',
    visitWebsite: 'Visiter le Site',
    getDirections: 'Obtenir Directions',
    writeReview: 'Écrire un Avis',
    photos: 'Photos',
    menu: 'Menu',
    booking: 'Réservation',
    priceRange: 'Gamme de Prix',
    specialties: 'Spécialités'
  };
};

// Generate French business card content
export const generateFrenchBusinessCard = (business: EnhancedBusiness): {
  title: string;
  subtitle: string;
  description: string;
  callToAction: string;
} => {
  const phrases = getFrenchContactPhrases();
  
  return {
    title: business.name,
    subtitle: `${business.frenchCategory || business.category} à ${business.location || 'Cotonou'}`,
    description: getLocalizedDescription(business, 'fr'),
    callToAction: business.phone ? phrases.callNow : phrases.contact
  };
};

// Localized business search keywords
export const getLocalizedSearchKeywords = (business: EnhancedBusiness, language: 'en' | 'fr'): string[] => {
  const keywords: string[] = [];
  
  // Add business name
  keywords.push(business.name.toLowerCase());
  
  // Add category
  const category = getLocalizedCategory(business, language);
  keywords.push(category.toLowerCase());
  
  // Add location
  if (business.location) {
    keywords.push(business.location.toLowerCase());
  }
  
  // Add language-specific terms
  if (language === 'fr') {
    keywords.push(
      'entreprise',
      'service',
      'professionnel',
      'qualité',
      'bénin',
      'cotonou',
      'local',
      'recommandé'
    );
  } else {
    keywords.push(
      'business',
      'service',
      'professional',
      'quality',
      'benin',
      'cotonou',
      'local',
      'recommended'
    );
  }
  
  return keywords;
};

// Export utility functions for easy use
export const BusinessEnhancer = {
  enhance: enhanceBusinessWithFrench,
  enhanceMany: enhanceBusinessesWithFrench,
  getDescription: getLocalizedDescription,
  getCategory: getLocalizedCategory,
  getFrenchAmenities,
  getFrenchHours: getFrenchBusinessHours,
  getFrenchPhrases: getFrenchContactPhrases,
  generateCard: generateFrenchBusinessCard,
  getKeywords: getLocalizedSearchKeywords
};