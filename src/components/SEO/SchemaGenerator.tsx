import React from 'react';
import { ProcessedBusiness } from '../../utils/csvDataLoader';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

interface SchemaGeneratorProps {
  type: 'LocalBusiness' | 'ItemList' | 'BreadcrumbList' | 'FAQPage';
  business?: ProcessedBusiness;
  businesses?: ProcessedBusiness[];
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  location?: string;
  category?: string;
}

const SchemaGenerator: React.FC<SchemaGeneratorProps> = ({
  type,
  business,
  businesses = [],
  breadcrumbs = [],
  faqs = [],
  location,
  category
}) => {
  const generateLocalBusinessSchema = (business: ProcessedBusiness) => {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": business.name,
      "description": business.description || `${business.name} - Professional ${business.category} services in ${business.location || 'Cotonou'}, Benin`,
      "url": `https://www.intelysia.com/business/${business.id}`,
      "telephone": business.phone || business.enrichedPhones?.[0],
      "email": business.enrichedEmails?.[0],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": business.address,
        "addressLocality": business.location || "Cotonou",
        "addressCountry": "BJ",
        "addressRegion": "Littoral"
      },
      "geo": business.coordinates ? {
        "@type": "GeoCoordinates",
        "latitude": business.coordinates.lat,
        "longitude": business.coordinates.lng
      } : undefined,
      "aggregateRating": business.rating > 0 ? {
        "@type": "AggregateRating",
        "ratingValue": business.rating,
        "reviewCount": business.reviews,
        "bestRating": 5,
        "worstRating": 1
      } : undefined,
      "openingHours": business.hours || business.enrichedHours?.[0],
      "priceRange": "$$",
      "currenciesAccepted": "XOF",
      "paymentAccepted": "Cash, Mobile Money, Credit Card",
      "image": business.images?.[0] || `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop`,
      "sameAs": [
        business.website,
        business.enrichedSocial?.instagram?.[0] && `https://instagram.com/${business.enrichedSocial.instagram[0].replace('@', '')}`,
        business.enrichedSocial?.facebook?.[0] && `https://facebook.com/${business.enrichedSocial.facebook[0].replace('@', '')}`,
        business.enrichedWebsites?.[0]
      ].filter(Boolean),
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${business.category} Services`,
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": `Professional ${business.category} Services`,
              "provider": {
                "@type": "LocalBusiness",
                "name": business.name
              }
            }
          }
        ]
      }
    };
  };

  const generateItemListSchema = (businesses: ProcessedBusiness[], category?: string, location?: string) => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `Best ${category || 'Businesses'} in ${location || 'Benin'}`,
      "description": `Comprehensive directory of top-rated ${category?.toLowerCase() || 'businesses'} in ${location || 'Benin'} with contact information, ratings, and reviews.`,
      "numberOfItems": businesses.length,
      "itemListElement": businesses.map((business, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "LocalBusiness",
          "name": business.name,
          "url": `https://www.intelysia.com/business/${business.id}`,
          "telephone": business.phone || business.enrichedPhones?.[0],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": business.address,
            "addressLocality": business.location || "Cotonou",
            "addressCountry": "BJ"
          },
          "aggregateRating": business.rating > 0 ? {
            "@type": "AggregateRating",
            "ratingValue": business.rating,
            "reviewCount": business.reviews
          } : undefined
        }
      }))
    };
  };

  const generateBreadcrumbSchema = (breadcrumbs: BreadcrumbItem[]) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `https://www.intelysia.com${crumb.url}`
      }))
    };
  };

  const generateFAQSchema = (faqs: FAQItem[]) => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  };

  let schema;
  switch (type) {
    case 'LocalBusiness':
      schema = business ? generateLocalBusinessSchema(business) : null;
      break;
    case 'ItemList':
      schema = generateItemListSchema(businesses, category, location);
      break;
    case 'BreadcrumbList':
      schema = generateBreadcrumbSchema(breadcrumbs);
      break;
    case 'FAQPage':
      schema = generateFAQSchema(faqs);
      break;
    default:
      schema = null;
  }

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
};

export default SchemaGenerator;