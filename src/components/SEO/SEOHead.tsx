import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CONTACT_INFO, getOrganizationSchema, getSocialMediaUrls } from '../../utils/contactInfo';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object;
  noIndex?: boolean;
  hreflang?: { [key: string]: string };
  language?: 'en' | 'fr';
  type?: 'website' | 'article' | 'business' | 'organization';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = '/og-image.jpg',
  structuredData,
  noIndex = false,
  hreflang = {},
  language = 'en',
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = []
}) => {
  const fullTitle = title.includes('Intelysia') ? title : `${title} | Intelysia - Benin Republic Business Directory`;
  const socialMediaUrls = getSocialMediaUrls();
  const organizationSchema = getOrganizationSchema();
  
  // Enhanced keywords with Cotonou and Benin focus
  const enhancedKeywords = keywords 
    ? `${keywords}, Cotonou businesses, Benin Republic directory, local businesses Cotonou, business directory Benin, find businesses Cotonou`
    : 'Cotonou businesses, Benin Republic directory, local businesses, business directory, restaurants Cotonou, services Benin';

  return (
    <Helmet>
      {/* Primary Meta Tags - Enhanced for AI Search */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={enhancedKeywords} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <meta name="author" content={author || 'Intelysia Business Directory'} />
      <meta name="generator" content="Intelysia Business Directory Platform" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="7 days" />
      <html lang={language} />
      
      {/* Geo-targeting for Benin */}
      <meta name="geo.region" content="BJ" />
      <meta name="geo.placename" content="Cotonou, Benin Republic" />
      <meta name="geo.position" content="6.3703;2.3912" />
      <meta name="ICBM" content="6.3703, 2.3912" />
      
      {/* Contact Information */}
      <meta name="contact" content={CONTACT_INFO.email} />
      <meta name="reply-to" content={CONTACT_INFO.email} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Hreflang for internationalization */}
      {Object.entries(hreflang).map(([lang, url]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      
      {/* Enhanced Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} - Intelysia Business Directory`} />
      <meta property="og:site_name" content="Intelysia - Benin Republic Business Directory" />
      <meta property="og:url" content={canonicalUrl || CONTACT_INFO.website} />
      <meta property="og:locale" content={language === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta property="og:locale:alternate" content={language === 'fr' ? 'en_US' : 'fr_FR'} />
      
      {/* Article-specific Open Graph */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Enhanced Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@intelysia" />
      <meta name="twitter:creator" content="@intelysia" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${title} - Intelysia Business Directory`} />
      
      {/* AI Search Engine Optimization */}
      <meta name="description" content={description} />
      <meta name="abstract" content={description} />
      <meta name="summary" content={description} />
      <meta name="classification" content="Business Directory" />
      <meta name="category" content="Local Business, Directory, Benin Republic, Cotonou" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      
      {/* Additional AI Search Signals */}
      <link rel="author" href={`${CONTACT_INFO.website}/about`} />
      <link rel="publisher" href={CONTACT_INFO.website} />
      <link rel="me" href={socialMediaUrls[0]} />
      
      {/* Structured Data - Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {/* Page-specific Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Breadcrumb Schema for Navigation */}
      {type !== 'website' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": CONTACT_INFO.website
              },
              {
                "@type": "ListItem", 
                "position": 2,
                "name": title,
                "item": canonicalUrl || `${CONTACT_INFO.website}${window.location.pathname}`
              }
            ]
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
