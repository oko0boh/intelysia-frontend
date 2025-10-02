import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOHead from '../components/SEO/SEOHead';
import BusinessGrid from '../components/home/BusinessGrid';
import { businesses } from '../utils/data';
import { Search } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const location = searchParams.get('location') || '';
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);
  const [searchTerm, setSearchTerm] = useState(query);

  useEffect(() => {
    let filtered = businesses;

    if (query) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(query.toLowerCase()) ||
        business.description.toLowerCase().includes(query.toLowerCase()) ||
        business.category.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category && category !== 'All') {
      filtered = filtered.filter(business => business.category === category);
    }

    if (location) {
      filtered = filtered.filter(business =>
        business.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredBusinesses(filtered);
  }, [query, category, location]);

  const pageTitle = query 
    ? `Search Results for "${query}"` 
    : 'Search Businesses in Cotonou';
  
  const description = query
    ? `Find businesses matching "${query}" in Cotonou, Benin. Browse ${filteredBusinesses.length} search results and connect with local service providers.`
    : 'Search for local businesses in Cotonou, Benin. Find restaurants, shops, services, and more in your area.';

  const keywords = query
    ? `${query} Cotonou, ${query} Benin, ${query} businesses, search ${query}`
    : 'search businesses Cotonou, find businesses Benin, business search';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('q', searchTerm.trim());
      window.location.search = newParams.toString();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEOHead
        title={pageTitle}
        description={description}
        keywords={keywords}
        canonicalUrl={`https://intelysia.com/search${query ? `?q=${encodeURIComponent(query)}` : ''}`}
      />
      
      {/* Search Header */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              {query ? `Search Results for "${query}"` : 'Search Local Businesses'}
            </h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search businesses, services, or categories..."
                className="w-full p-4 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {query ? `Results for "${query}"` : 'All Businesses'}
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredBusinesses.length} business{filteredBusinesses.length !== 1 ? 'es' : ''} found
                {location && ` in ${location}`}
                {category && category !== 'All' && ` in ${category}`}
              </p>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              {category && category !== 'All' && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {category}
                </span>
              )}
              {location && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {location}
                </span>
              )}
            </div>
          </div>

          {filteredBusinesses.length > 0 ? (
            <BusinessGrid businesses={filteredBusinesses} />
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No businesses found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or browse our categories to find what you're looking for.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Browse All Businesses
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SEO Content */}
      {query && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                About "{query}" in Cotonou
              </h2>
              <div className="prose prose-lg text-gray-700">
                <p>
                  Looking for {query.toLowerCase()} in Cotonou? Our comprehensive business 
                  directory helps you find exactly what you need. We've found {filteredBusinesses.length} 
                  businesses related to "{query}" in the Cotonou area.
                </p>
                <p>
                  Each business listing includes verified contact information, customer reviews, 
                  and detailed service descriptions to help you make the best choice for your needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SearchPage;
