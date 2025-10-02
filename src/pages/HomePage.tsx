import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOHead from '../components/SEO/SEOHead';
import Hero from '../components/home/Hero';
import BusinessGrid from '../components/home/BusinessGrid';
import MapView from '../components/home/MapView';
import CategorySection from '../components/home/CategorySection';
import BusinessByLocation from '../components/home/BusinessByLocation';
import PopularSearches from '../components/home/PopularSearches';
import { useRealBusinessData } from '../hooks/useRealBusinessData';
import { ProcessedBusiness } from '../utils/csvDataLoader';
const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { businesses, loading, error, usingFallback, getByCategory, getByLocation, getByCategoryAndLocation } = useRealBusinessData();
  const [filteredBusinesses, setFilteredBusinesses] = useState<ProcessedBusiness[]>([]);
  const categoryParam = searchParams.get('category');
  const locationParam = searchParams.get('location');
  
  useEffect(() => {
    const filterBusinesses = async () => {
      if (businesses.length === 0) {
        setFilteredBusinesses([]);
        return;
      }
      
      let filtered = businesses;
      
      if (categoryParam && categoryParam !== 'All' && locationParam) {
        filtered = await getByCategoryAndLocation(categoryParam, locationParam);
      } else if (categoryParam && categoryParam !== 'All') {
        filtered = await getByCategory(categoryParam);
      } else if (locationParam) {
        filtered = await getByLocation(locationParam);
      } else {
        // For homepage without filters, show only top 50 featured businesses for performance
        filtered = businesses.slice(0, 50);
      }
      
      setFilteredBusinesses(filtered);
    };
    
    filterBusinesses();
  }, [categoryParam, locationParam, businesses, getByCategory, getByLocation, getByCategoryAndLocation]);
  const pageTitle = categoryParam && categoryParam !== 'All' 
    ? `${categoryParam} Businesses in Cotonou | Intelysia Business Directory`
    : 'Intelysia - Cotonou Business Directory | Find Local Businesses in Benin';
  
  const description = categoryParam && categoryParam !== 'All'
    ? `Find the best ${categoryParam.toLowerCase()} businesses in Cotonou, Benin. Browse verified local ${categoryParam.toLowerCase()} services, read reviews, and get contact information.`
    : 'Discover the best businesses in Cotonou, Benin. Find restaurants, shops, services, and more in your local area. Connect with trusted local businesses today.';
  
  const keywords = categoryParam && categoryParam !== 'All'
    ? `${categoryParam} Cotonou, ${categoryParam} Benin, ${categoryParam} businesses, local ${categoryParam}, Cotonou ${categoryParam} directory`
    : 'Cotonou businesses, Benin directory, local businesses, restaurants Cotonou, shops Benin, services Cotonou, business directory';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Intelysia",
    "description": "Cotonou Business Directory - Find Local Businesses in Benin",
    "url": "https://intelysia.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://intelysia.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": filteredBusinesses.length,
      "itemListElement": filteredBusinesses.slice(0, 10).map((business, index) => ({
        "@type": "LocalBusiness",
        "position": index + 1,
        "name": business.name,
        "description": business.description,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": business.location,
          "addressCountry": "BJ"
        },
        "telephone": business.phone,
        "url": `https://intelysia.com/business/${business.id}`
      }))
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading businesses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading businesses: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <SEOHead
        title={pageTitle}
        description={description}
        keywords={keywords}
        canonicalUrl="https://intelysia.com/"
        structuredData={structuredData}
      />
      {usingFallback && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="container mx-auto">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Using sample data:</strong> We're showing you sample businesses while our full database loads. Check back soon for the complete directory!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Hero />
      <CategorySection />
      <BusinessGrid businesses={filteredBusinesses} title={categoryParam && categoryParam !== 'All' ? `${categoryParam} in Cotonou` : 'Featured Businesses in Benin'} />
      {/* Add the BusinessByLocation component before MapView */}
      <BusinessByLocation />
      <MapView businesses={filteredBusinesses} />
      {/* Add the PopularSearches component after MapView */}
      <PopularSearches />
      {/* Call to Action */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Own a Business in Cotonou?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join our directory to increase your visibility and connect with more
            customers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="/claim-business" className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition">
              Claim Your Business
            </a>
            <a href="/contact" className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-blue-700 transition">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;