import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import SEOHead from '../components/SEO/SEOHead';
import BusinessGrid from '../components/home/BusinessGrid';
import CategorySection from '../components/home/CategorySection';
import { useRealBusinessData } from '../hooks/useRealBusinessData';
import { generateRestaurantArticle } from '../utils/seoContentGenerator';

const LocationPage: React.FC = () => {
  const { location } = useParams<{ location: string }>();
  const [searchParams] = useSearchParams();
  const { businesses, loading, error, getByLocation, getByCategoryAndLocation } = useRealBusinessData();
  const [filteredBusinesses, setFilteredBusinesses] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [locationLoading, setLocationLoading] = useState(true);

  // Load businesses for this location
  useEffect(() => {
    const loadLocationData = async () => {
      if (!location) return;
      
      setLocationLoading(true);
      try {
        const [locationBusinesses, locationRestaurants] = await Promise.all([
          getByLocation(location),
          getByCategoryAndLocation('Restaurant', location)
        ]);
        
        setFilteredBusinesses(locationBusinesses);
        setRestaurants(locationRestaurants);
      } catch (err) {
        console.error('Error loading location data:', err);
        setFilteredBusinesses([]);
        setRestaurants([]);
      } finally {
        setLocationLoading(false);
      }
    };

    loadLocationData();
  }, [location, getByLocation, getByCategoryAndLocation]);

  const seoArticle = restaurants.length > 0 ? generateRestaurantArticle(restaurants, location || '') : null;

  const locationTitle = location ? location.charAt(0).toUpperCase() + location.slice(1) : 'Location';
  const pageTitle = seoArticle?.title || `Businesses in ${location} | Intelysia`;
  const description = seoArticle?.metaDescription || `Discover local businesses in ${location}, Benin. Find restaurants, hotels, services, and more with verified contact information and customer reviews.`;
  const keywords = seoArticle?.keywords || [`businesses ${location}`, `${location} Benin`, `directory ${location}`, `services ${location}`, `restaurants ${location}`];
  const structuredData = seoArticle?.structuredData || {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": description,
    "url": `https://intelysia.com/location/${location}`,
    "about": {
      "@type": "Place",
      "name": locationTitle,
      "containedInPlace": {
        "@type": "Country",
        "name": "Benin"
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": filteredBusinesses.length,
      "itemListElement": filteredBusinesses.map((business, index) => ({
        "@type": "LocalBusiness",
        "position": index + 1,
        "name": business.name,
        "description": business.description,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": business.location,
          "addressCountry": "BJ"
        }
      }))
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEOHead
        title={pageTitle}
        description={description}
        keywords={keywords}
        canonicalUrl={`https://intelysia.com/location/${location}`}
        structuredData={structuredData}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {filteredBusinesses.length} Businesses in {locationTitle}
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Discover verified local businesses and services in {locationTitle}, Benin
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="text-2xl font-bold text-white">{filteredBusinesses.length}</div>
              <div className="text-blue-100 text-sm">Total Businesses</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="text-2xl font-bold text-white">
                {new Set(filteredBusinesses.map(b => b.category)).size}
              </div>
              <div className="text-blue-100 text-sm">Categories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="text-2xl font-bold text-white">4.5★</div>
              <div className="text-blue-100 text-sm">Avg Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li><a href="/" className="text-blue-600 hover:text-blue-800">Home</a></li>
            <li className="text-gray-400">/</li>
            <li><span className="text-gray-600">Locations</span></li>
            <li className="text-gray-400">/</li>
            <li><span className="text-gray-900 font-medium">{locationTitle}</span></li>
          </ol>
        </div>
      </nav>

      {/* Categories for this location */}
      <CategorySection />

      {/* Business Listings */}
      {locationLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading businesses in {locationTitle}...</p>
        </div>
      ) : filteredBusinesses.length > 0 ? (
        <>
          <BusinessGrid 
            businesses={filteredBusinesses} 
            title={`${filteredBusinesses.length} Businesses in ${locationTitle}`}
          />
          
          {/* Restaurant SEO Article */}
          {seoArticle && restaurants.length > 0 && (
            <div className="mt-12 bg-white rounded-lg shadow-md p-8">
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: seoArticle.content.replace(/\n/g, '<br/>') }} />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            No businesses found in {locationTitle}
          </h3>
          <p className="text-gray-600 mb-8">
            We're constantly adding new businesses. Check back soon!
          </p>
          <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Browse All Locations
          </a>
        </div>
      )}

      {/* Location Information */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              About {locationTitle}, Benin
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="prose prose-lg text-gray-700">
                <p>
                  {locationTitle} is a vibrant area in Benin known for its diverse business 
                  community and economic activity. Whether you're looking for traditional 
                  services or modern amenities, {locationTitle} offers a wide range of 
                  business opportunities and services.
                </p>
                <p>
                  Our directory features verified businesses in {locationTitle}, making it 
                  easy for residents and visitors to find exactly what they need. From 
                  restaurants and shops to professional services, discover the best that 
                  {locationTitle} has to offer.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Popular Categories in {locationTitle}
                </h3>
                <div className="space-y-2">
                  {Array.from(new Set(filteredBusinesses.map(b => b.category)))
                    .slice(0, 6)
                    .map(category => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-gray-700">{category}</span>
                      <span className="text-blue-600 font-medium">
                        {filteredBusinesses.filter(b => b.category === category).length}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationPage;
