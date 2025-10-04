// Voice Search & Natural Language Query Optimization Component
// Optimizes for "OK Google", Siri, Alexa, and AI search engines

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ProcessedBusiness } from '../../utils/csvDataLoader';
import { 
  generateVoiceSearchSchema, 
  generateHowToSchema, 
  generateNaturalLanguageSchema,
  generateFeaturedSnippetSchema 
} from '../../utils/aiSearchOptimization';

interface VoiceSearchOptimizerProps {
  businesses: ProcessedBusiness[];
  category: string;
  location?: string;
  searchQuery?: string;
  primaryQuestion?: string;
  primaryAnswer?: string;
}

const VoiceSearchOptimizer: React.FC<VoiceSearchOptimizerProps> = ({
  businesses,
  category,
  location = 'Cotonou',
  searchQuery,
  primaryQuestion,
  primaryAnswer
}) => {
  // Generate voice search optimized content
  const voiceSearchQueries = [
    `best ${category.toLowerCase()} in ${location}`,
    `${category.toLowerCase()} near me ${location}`,
    `find ${category.toLowerCase()} ${location} Benin`,
    `top rated ${category.toLowerCase()} ${location}`,
    `${category.toLowerCase()} services ${location}`,
    `where to find ${category.toLowerCase()} in ${location}`,
    `recommended ${category.toLowerCase()} ${location} Benin Republic`,
    `professional ${category.toLowerCase()} services ${location}`
  ];

  // Natural language answers for AI search engines
  const naturalLanguageAnswers = {
    "What are the best restaurants in Cotonou?": `The best restaurants in Cotonou include ${businesses.slice(0, 3).map(b => b.name).join(', ')}. These establishments offer excellent local and international cuisine with high customer ratings.`,
    
    "Where can I find professional services in Cotonou?": `Cotonou offers ${businesses.length} professional service providers. Top-rated options include ${businesses.filter(b => b.rating >= 4.0).slice(0, 3).map(b => b.name).join(', ')}.`,
    
    "How do I find reliable businesses in Benin Republic?": `Use Intelysia Business Directory to find ${businesses.length} verified businesses across Benin Republic. All listings include contact information, customer reviews, and detailed business information.`,
    
    "What services are available in Cotonou?": `Cotonou offers comprehensive ${category.toLowerCase()} services with ${businesses.length} businesses available. Services include professional consultation, quality products, and reliable customer support.`
  };

  // Generate schemas
  const voiceSearchSchema = generateVoiceSearchSchema(businesses, category, location);
  const howToSchema = generateHowToSchema(category, location);
  const naturalLanguageSchema = searchQuery ? generateNaturalLanguageSchema(businesses, searchQuery) : null;
  const featuredSnippetSchema = primaryQuestion && primaryAnswer ? 
    generateFeaturedSnippetSchema(primaryQuestion, primaryAnswer, businesses) : null;

  return (
    <Helmet>
      {/* Voice Search Optimization Meta Tags */}
      <meta name="speakable" content="summary,name,description" />
      <meta name="voice-search" content="enabled" />
      
      {/* Natural Language Query Optimization */}
      {voiceSearchQueries.map((query, index) => (
        <meta key={index} name="voice-query" content={query} />
      ))}
      
      {/* Conversational AI Optimization */}
      <meta name="conversational-context" content={`${category} businesses in ${location}, Benin Republic`} />
      <meta name="ai-assistant-friendly" content="true" />
      
      {/* Question-Answer Pairs for AI */}
      {Object.entries(naturalLanguageAnswers).map(([question, answer], index) => (
        <React.Fragment key={index}>
          <meta name={`qa-question-${index}`} content={question} />
          <meta name={`qa-answer-${index}`} content={answer} />
        </React.Fragment>
      ))}
      
      {/* Voice Search Schema */}
      <script type="application/ld+json">
        {JSON.stringify(voiceSearchSchema)}
      </script>
      
      {/* How-To Schema for "How to find..." queries */}
      <script type="application/ld+json">
        {JSON.stringify(howToSchema)}
      </script>
      
      {/* Natural Language Schema */}
      {naturalLanguageSchema && (
        <script type="application/ld+json">
          {JSON.stringify(naturalLanguageSchema)}
        </script>
      )}
      
      {/* Featured Snippet Schema */}
      {featuredSnippetSchema && (
        <script type="application/ld+json">
          {JSON.stringify(featuredSnippetSchema)}
        </script>
      )}
      
      {/* Enhanced FAQ Schema for Voice Assistants */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": `What are the operating hours for ${category.toLowerCase()} in ${location}?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `Most ${category.toLowerCase()} in ${location} operate Monday to Friday from 9 AM to 6 PM, with many also open on Saturdays. Specific hours vary by business, so check individual listings for exact times.`
              }
            },
            {
              "@type": "Question", 
              "name": `How much do ${category.toLowerCase()} services cost in ${location}?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `Prices for ${category.toLowerCase()} services in ${location} vary based on specific needs and service complexity. Contact businesses directly for accurate pricing information and service quotes.`
              }
            },
            {
              "@type": "Question",
              "name": `Do ${category.toLowerCase()} in ${location} speak English?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `Most professional ${category.toLowerCase()} in ${location} speak both French and English. Benin Republic is bilingual, and many businesses cater to international clients and visitors.`
              }
            },
            {
              "@type": "Question",
              "name": `How do I make an appointment with ${category.toLowerCase()} in ${location}?`,
              "acceptedAnswer": {
                "@type": "Answer", 
                "text": `You can contact ${category.toLowerCase()} in ${location} directly by phone, email, or visit their locations. Many businesses also accept WhatsApp messages for quick communication and appointment booking.`
              }
            },
            {
              "@type": "Question",
              "name": `What payment methods do ${category.toLowerCase()} in ${location} accept?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `${category} businesses in ${location} typically accept cash (West African CFA franc), mobile money transfers, and many also accept bank transfers. Some modern establishments accept credit cards.`
              }
            }
          ]
        })}
      </script>
      
      {/* Speakable Content Schema for Voice Search */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SpeakableSpecification",
          "xpath": [
            "/html/head/title",
            "//h1",
            "//h2[1]",
            "//*[@id='business-summary']"
          ],
          "cssSelector": [
            "h1",
            "h2:first-of-type", 
            ".business-summary",
            ".contact-info"
          ]
        })}
      </script>
      
      {/* Local Business Discovery Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": `${category} Directory - ${location}, Benin Republic`,
          "description": `Comprehensive directory of ${category.toLowerCase()} businesses in ${location}, Benin Republic`,
          "numberOfItems": businesses.length,
          "itemListOrder": "Ranked by customer rating and relevance",
          "itemListElement": businesses.slice(0, 10).map((business, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "LocalBusiness",
              "@id": `https://www.intelysia.com/business/${business.place_id}`,
              "name": business.name,
              "description": business.description || `Professional ${category.toLowerCase()} services in ${location}, Benin Republic`,
              "address": {
                "@type": "PostalAddress", 
                "streetAddress": business.address,
                "addressLocality": location,
                "addressCountry": "BJ"
              },
              "telephone": business.phone,
              "url": `https://www.intelysia.com/business/${business.place_id}`,
              "aggregateRating": business.rating ? {
                "@type": "AggregateRating",
                "ratingValue": business.rating,
                "reviewCount": business.reviews || 1,
                "bestRating": 5
              } : undefined,
              "openingHours": business.hours || "Mo-Fr 09:00-18:00",
              "priceRange": business.price_level ? "€".repeat(business.price_level) : "€€",
              "knowsLanguage": ["French", "English"],
              "paymentAccepted": ["Cash", "Mobile Money"],
              "currenciesAccepted": "XOF"
            }
          }))
        })}
      </script>
    </Helmet>
  );
};

export default VoiceSearchOptimizer;