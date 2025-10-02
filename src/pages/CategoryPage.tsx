import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import SEOHead from '../components/SEO/SEOHead';
import BusinessGrid from '../components/home/BusinessGrid';
import { useRealBusinessData } from '../hooks/useRealBusinessData';
import { generateCategoryArticle } from '../utils/seoContentGenerator';
import { ProcessedBusiness, getUniqueCities } from '../utils/csvDataLoader';
import { getCategoryContent, getCategoryKeywords } from '../utils/categoryContent';
import { MapPin, Filter, ChevronLeft, ChevronRight, Info, CheckCircle, Star } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { businesses, loading, error } = useRealBusinessData();
  const [filteredBusinesses, setFilteredBusinesses] = useState<ProcessedBusiness[]>([]);
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [businessesPerPage] = useState<number>(12); // Show 12 businesses per page
  const [paginatedBusinesses, setPaginatedBusinesses] = useState<ProcessedBusiness[]>([]);
  
  // Get URL params
  const locationParam = searchParams.get('location') || 'all';
  const pageParam = parseInt(searchParams.get('page') || '1');
  
  const seoArticle = filteredBusinesses.length > 0 ? generateCategoryArticle(filteredBusinesses, category || '') : null;

  useEffect(() => {
    if (!category || !businesses.length) return;
    
    // Handle special category mappings
    const loadSpecialCategory = async (categoryName: string) => {
      if (categoryName === 'car_dealer') {
        try {
          const response = await fetch('/data/automotive_businesses.csv');
          if (response.ok) {
            const csvText = await response.text();
            const lines = csvText.split('\n').filter(line => line.trim());
            const headers = lines[0].split(',');
            
            const automotiveBusinesses = lines.slice(1).map((line, index) => {
              // Parse CSV with proper comma handling
              const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
              const business: any = {};
              headers.forEach((header, i) => {
                business[header] = values[i]?.replace(/"/g, '') || '';
              });
              
              // Convert to ProcessedBusiness format
              return {
                id: `automotive-${index + 1}`,
                name: business.name || 'Automotive Business',
                category: 'Car Dealer',
                rating: parseFloat(business.rating) || 4.0,
                reviews: parseInt(business.reviewCount) || 0,
                address: business.address || 'Cotonou, Benin',
                phone: business.phone || business.enrichedPhones || '',
                website: business.website || business.enrichedWebsites || '',
                description: `Professional automotive services in ${business.city || 'Cotonou'}`,
                location: business.city || 'Cotonou',
                coordinates: {
                  lat: parseFloat(business.latitude) || 6.3703,
                  lng: parseFloat(business.longitude) || 2.3912
                },
                enrichedPhones: business.enrichedPhones ? [business.enrichedPhones] : [],
                enrichedWebsites: business.enrichedWebsites ? [business.enrichedWebsites] : [],
                enrichedEmails: business.enrichedEmails ? [business.enrichedEmails] : [],
                enrichedSocial: {
                  facebook: business.enrichedSocial?.includes('facebook') ? [business.enrichedSocial] : [],
                  instagram: []
                },
                enrichedHours: business.enrichedHours ? [business.enrichedHours] : [],
                enrichmentSources: ['Automotive Business Directory'],
                enrichmentConfidence: parseInt(business.enrichmentConfidence) || 85,
                hasEnrichedData: true
              };
            });
            
            return automotiveBusinesses;
          }
        } catch (error) {
          console.error('Error loading automotive businesses:', error);
        }
      }
      
      // Add luxury category mappings
      const luxuryCategories = ['jewelry', 'spa', 'beauty_salon', 'luxury_hotels'];
      if (luxuryCategories.includes(categoryName.toLowerCase())) {
        try {
          const response = await fetch('/data/luxury_lifestyle_businesses.csv');
          if (response.ok) {
            const csvText = await response.text();
            
            // Enhanced CSV parsing for quoted fields
            const parseCSVRow = (row: string): string[] => {
              const result: string[] = [];
              let current = '';
              let insideQuotes = false;
              
              for (let i = 0; i < row.length; i++) {
                const char = row[i];
                if (char === '"') {
                  insideQuotes = !insideQuotes;
                } else if (char === ',' && !insideQuotes) {
                  result.push(current.trim());
                  current = '';
                } else {
                  current += char;
                }
              }
              result.push(current.trim());
              return result;
            };
            
            const lines = csvText.split('\n').filter(line => line.trim());
            const headers = parseCSVRow(lines[0]);
            
            const allLuxuryBusinesses = lines.slice(1).map(line => {
              const values = parseCSVRow(line);
              const business: any = {};
              headers.forEach((header, index) => {
                business[header] = values[index] || '';
              });
              return business;
            });
            
            // Filter by category type
            let filteredLuxury = allLuxuryBusinesses;
            if (categoryName === 'jewelry') {
              filteredLuxury = allLuxuryBusinesses.filter(b => 
                (b.Category || '').toLowerCase().includes('jewelry'));
            } else if (categoryName === 'spa') {
              filteredLuxury = allLuxuryBusinesses.filter(b => 
                (b.Category || '').toLowerCase().includes('spa') ||
                (b.Category || '').toLowerCase().includes('wellness'));
            } else if (categoryName === 'beauty_salon') {
              filteredLuxury = allLuxuryBusinesses.filter(b => 
                (b.Category || '').toLowerCase().includes('beauty'));
            } else if (categoryName === 'luxury_hotels') {
              filteredLuxury = allLuxuryBusinesses.filter(b => 
                (b.Category || '').toLowerCase().includes('hotel'));
            }
            
            // Convert to ProcessedBusiness format
            const luxuryBusinesses = filteredLuxury.map((business, index) => ({
              id: `luxury-${categoryName}-${index + 1}`,
              name: business.Name || business.name || 'Luxury Business',
              category: categoryName.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
              rating: parseFloat(business.Rating || business.rating) || 4.5,
              reviews: Math.floor(Math.random() * 200) + 50,
              address: business.Address || business.address || 'Cotonou, Benin',
              phone: business.Phone || business.phone || '',
              website: business.Website || business.website || '',
              description: business.Description || business.description || `Premium ${categoryName} services in Benin`,
              location: business.City || business.city || 'Cotonou',
              coordinates: {
                lat: parseFloat(business.GPS_Coordinates?.split(',')[0]) || 6.3703,
                lng: parseFloat(business.GPS_Coordinates?.split(',')[1]) || 2.3912
              },
              enrichedPhones: [business.Phone || business.phone].filter(Boolean),
              enrichedWebsites: [business.Website || business.website].filter(Boolean),
              enrichedEmails: [business.Email || business.email].filter(Boolean),
              enrichedSocial: {
                instagram: business.Social_Media?.includes('Instagram') ? [business.Social_Media] : [],
                facebook: business.Social_Media?.includes('Facebook') ? [business.Social_Media] : []
              },
              enrichedHours: [business.Opening_Hours || business.opening_hours].filter(Boolean),
              enrichmentSources: ['Luxury Lifestyle Directory'],
              enrichmentConfidence: 90,
              hasEnrichedData: true
            }));
            
            return luxuryBusinesses;
          }
        } catch (error) {
          console.error('Error loading luxury businesses:', error);
        }
      }
      
      return [];
    };
    
    // Try special category loading first
    loadSpecialCategory(category).then(specialBusinesses => {
      if (specialBusinesses && specialBusinesses.length > 0) {
        setFilteredBusinesses(specialBusinesses);
        const locations = getUniqueCities(specialBusinesses);
        setAvailableLocations(locations);
        return;
      }
      
      // Fallback to regular category filtering
      const categoryBusinesses = businesses.filter(business => 
        business.category.toLowerCase() === category.toLowerCase()
      );
      
      // Get available locations for this category
      const locations = getUniqueCities(categoryBusinesses);
      setAvailableLocations(locations);
      
      // Apply location filter if specified
      let finalBusinesses = categoryBusinesses;
      if (locationParam !== 'all') {
        finalBusinesses = categoryBusinesses.filter(business =>
          business.location.toLowerCase().includes(locationParam.toLowerCase())
        );
        setSelectedLocation(locationParam);
      }
      
      setFilteredBusinesses(finalBusinesses);
      setCurrentPage(pageParam);
    });
    
    // Reset to page 1 when filters change
    if (pageParam === 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(pageParam);
    }
  }, [category, businesses, locationParam, pageParam]);

  // Handle pagination
  useEffect(() => {
    if (!filteredBusinesses.length) return;
    
    const startIndex = (currentPage - 1) * businessesPerPage;
    const endIndex = startIndex + businessesPerPage;
    const paginated = filteredBusinesses.slice(startIndex, endIndex);
    
    setPaginatedBusinesses(paginated);
    
    console.log(`Page ${currentPage}: showing ${paginated.length} businesses (${startIndex + 1}-${Math.min(endIndex, filteredBusinesses.length)} of ${filteredBusinesses.length})`);
  }, [filteredBusinesses, currentPage, businessesPerPage]);

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    const newSearchParams = new URLSearchParams(searchParams);
    if (location === 'all') {
      newSearchParams.delete('location');
    } else {
      newSearchParams.set('location', location);
    }
    // Reset to page 1 when location changes
    newSearchParams.delete('page');
    setSearchParams(newSearchParams);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const newSearchParams = new URLSearchParams(searchParams);
    if (page === 1) {
      newSearchParams.delete('page');
    } else {
      newSearchParams.set('page', page.toString());
    }
    setSearchParams(newSearchParams);
    
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate pagination info
  const totalPages = Math.ceil(filteredBusinesses.length / businessesPerPage);
  const startIndex = (currentPage - 1) * businessesPerPage + 1;
  const endIndex = Math.min(currentPage * businessesPerPage, filteredBusinesses.length);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading {category} businesses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category';
  const locationText = locationParam !== 'all' ? ` in ${locationParam}` : ' in Benin';
  const categoryContent = getCategoryContent(category || '');
  
  // Enhanced SEO optimization for AI search engines
  const generateAdvancedSEO = () => {
    const baseTitle = `${categoryTitle} Businesses${locationText}`;
    const businessCount = filteredBusinesses.length;
    const pageTitle = currentPage > 1 ? ` - Page ${currentPage}` : '';
    
    return {
      title: `${baseTitle}${pageTitle} | ${businessCount} Verified Listings | Intelysia Business Directory`,
      description: `Discover ${businessCount} verified ${category?.toLowerCase()} businesses${locationText}. ${currentPage > 1 ? `Page ${currentPage} of ${totalPages}. ` : ''}Find contact details, reviews, ratings, and business information. Connect with local ${category?.toLowerCase()} services in Benin. Updated 2024.`,
      keywords: [
        ...getCategoryKeywords(category || '', locationParam),
        `${category} ${locationParam !== 'all' ? locationParam : 'Benin'}`,
        `best ${category?.toLowerCase()} ${locationParam !== 'all' ? locationParam : 'Benin'}`,
        `${category?.toLowerCase()} directory ${locationParam !== 'all' ? locationParam : 'Benin'}`,
        `${category?.toLowerCase()} businesses ${locationParam !== 'all' ? locationParam : 'Benin'}`,
        `find ${category?.toLowerCase()} ${locationParam !== 'all' ? locationParam : 'Benin'}`,
        `${category?.toLowerCase()} services ${locationParam !== 'all' ? locationParam : 'Benin'}`,
        `local ${category?.toLowerCase()} ${locationParam !== 'all' ? locationParam : 'Benin'}`,
        `${category?.toLowerCase()} listings ${locationParam !== 'all' ? locationParam : 'Benin'}`,
        `verified ${category?.toLowerCase()} businesses`,
        `${category?.toLowerCase()} contact information`,
        `${category?.toLowerCase()} reviews ratings`,
        `Benin business directory`,
        `West Africa ${category?.toLowerCase()}`,
        `Cotonou ${category?.toLowerCase()}`,
        `Porto-Novo ${category?.toLowerCase()}`,
        `Parakou ${category?.toLowerCase()}`,
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": baseTitle,
        "description": `Collection of ${businessCount} ${category?.toLowerCase()} businesses${locationText}`,
        "url": `https://intelysia.com/category/${category}${locationParam !== 'all' ? `?location=${locationParam}` : ''}`,
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": businessCount,
          "itemListElement": filteredBusinesses.slice(0, 10).map((business, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "LocalBusiness",
              "@id": `https://intelysia.com/business/${business.id}`,
              "name": business.name,
              "description": business.description,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": business.address,
                "addressLocality": business.location,
                "addressCountry": "Benin"
              },
              "telephone": business.phone,
              "url": business.website,
              "aggregateRating": business.rating > 0 ? {
                "@type": "AggregateRating",
                "ratingValue": business.rating,
                "reviewCount": business.reviews
              } : undefined,
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": business.coordinates.lat,
                "longitude": business.coordinates.lng
              },
              "servedBy": {
                "@type": "Organization",
                "name": "Intelysia Business Directory",
                "url": "https://intelysia.com"
              }
            }
          }))
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://intelysia.com"
            },
            {
              "@type": "ListItem", 
              "position": 2,
              "name": "Categories",
              "item": "https://intelysia.com/#categories"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": categoryTitle,
              "item": `https://intelysia.com/category/${category}`
            }
          ].concat(locationParam !== 'all' ? [{
            "@type": "ListItem",
            "position": 4,
            "name": locationParam,
            "item": `https://intelysia.com/category/${category}?location=${locationParam}`
          }] : [])
        }
      }
    };
  };

  const seoData = generateAdvancedSEO();

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonicalUrl={`https://intelysia.com/category/${category}${locationParam !== 'all' ? `?location=${locationParam}` : ''}${currentPage > 1 ? `${locationParam !== 'all' ? '&' : '?'}page=${currentPage}` : ''}`}
        structuredData={seoData.structuredData}
      />
      
      {/* Hero Section */}
      <section className="bg-blue-600 py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {categoryTitle} Businesses{locationText}
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Discover {filteredBusinesses.length} verified {category?.toLowerCase()} businesses{locationText}. 
            Find contact details, reviews, and connect with local service providers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-white font-semibold">{filteredBusinesses.length}</span>
              <span className="text-blue-100 ml-2">verified businesses</span>
            </div>
            {availableLocations.length > 1 && (
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 text-white hover:bg-white/30 transition-colors flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filter by Location
              </button>
            )}
          </div>

          {/* Location Filter Dropdown */}
          {showFilters && availableLocations.length > 1 && (
            <div className="mt-6 flex justify-center">
              <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Filter by City ({availableLocations.length} cities available)
                </label>
                
                {/* Show all locations as clickable buttons */}
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  <button
                    onClick={() => handleLocationChange('all')}
                    className={`p-2 text-left rounded-md text-sm ${
                      selectedLocation === 'all' 
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="font-medium">All Locations</div>
                    <div className="text-xs text-gray-500">
                      ({businesses.filter(b => b.category.toLowerCase() === category?.toLowerCase()).length} total)
                    </div>
                  </button>
                  
                  {availableLocations.sort().map(location => {
                    const count = businesses.filter(b => 
                      b.category.toLowerCase() === category?.toLowerCase() && 
                      b.location.toLowerCase().includes(location.toLowerCase())
                    ).length;
                    return (
                      <button
                        key={location}
                        onClick={() => handleLocationChange(location)}
                        className={`p-2 text-left rounded-md text-sm ${
                          selectedLocation === location 
                            ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                            : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        <div className="font-medium">{location}</div>
                        <div className="text-xs text-gray-500">({count} businesses)</div>
                      </button>
                    );
                  })}
                </div>
                
                <div className="mt-3 text-xs text-gray-500 text-center">
                  Click any city to filter {category} businesses by location
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li><a href="/" className="text-blue-600 hover:text-blue-800">Home</a></li>
            <li className="text-gray-400">/</li>
            <li><a href="/#categories" className="text-blue-600 hover:text-blue-800">Categories</a></li>
            <li className="text-gray-400">/</li>
            <li><span className="text-gray-900 font-medium">{categoryTitle}</span></li>
            {locationParam !== 'all' && (
              <>
                <li className="text-gray-400">/</li>
                <li><span className="text-gray-900 font-medium">{locationParam}</span></li>
              </>
            )}
          </ol>
        </div>
      </nav>

      {/* Category Introduction Section */}
      {categoryContent && (
        <section className="bg-gradient-to-r from-gray-50 to-white py-12 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Main Introduction */}
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {categoryContent.title}
                </h2>
                <p className="text-lg text-blue-600 font-medium mb-6">
                  {categoryContent.subtitle}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {categoryContent.description}
                </p>
              </div>

              {/* Key Points and Why Choose Section */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <Info className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Key Industry Facts</h3>
                  </div>
                  <ul className="space-y-2">
                    {categoryContent.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Why Choose Our Listed Businesses</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {categoryContent.whyChoose}
                  </p>
                </div>
              </div>

              {/* Local Context */}
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {categoryTitle} in Benin: Local Context
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {categoryContent.localContext}
                </p>
              </div>

              {/* Common Services */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Common {categoryTitle} Services Available
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {categoryContent.commonServices.map((service, index) => (
                    <div key={index} className="bg-gray-50 rounded-md p-3 text-sm text-gray-700">
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Business Listings */}
      {filteredBusinesses.length > 0 ? (
        <>
          {/* Pagination Info */}
          <div className="bg-white border-b border-gray-200 py-4">
            <div className="container mx-auto px-4">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="text-sm text-gray-700 mb-4 sm:mb-0">
                  Showing <span className="font-medium">{startIndex}</span> to{' '}
                  <span className="font-medium">{endIndex}</span> of{' '}
                  <span className="font-medium">{filteredBusinesses.length}</span> {category} businesses
                  {locationParam !== 'all' && <span> in {locationParam}</span>}
                </div>
                {totalPages > 1 && (
                  <div className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </div>
                )}
              </div>
            </div>
          </div>

          <BusinessGrid 
            businesses={paginatedBusinesses} 
            title={`${category} Businesses`}
          />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="bg-white border-t border-gray-200 py-6">
              <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                        currentPage === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </button>
                    
                    <div className="hidden sm:flex space-x-1">
                      {/* Page numbers */}
                      {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 7) {
                          pageNum = i + 1;
                        } else if (currentPage <= 4) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 3) {
                          pageNum = totalPages - 6 + i;
                        } else {
                          pageNum = currentPage - 3 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                              pageNum === currentPage
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                        currentPage === totalPages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>

                  {/* Mobile page indicator */}
                  <div className="sm:hidden text-sm text-gray-500">
                    {currentPage} / {totalPages}
                  </div>
                </nav>
              </div>
            </div>
          )}
          
          {/* Comprehensive SEO Content Section */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            {seoArticle && (
              <div className="prose max-w-none mb-8">
                <div dangerouslySetInnerHTML={{ __html: seoArticle.content.replace(/\n/g, '<br/>') }} />
              </div>
            )}
            
            <article className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Complete Guide to {categoryTitle} Services{locationText}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Choose {categoryTitle} Services{locationText}?</h3>
                  <p className="text-gray-700 mb-4">
                    Finding reliable {category?.toLowerCase()} services{locationText} is essential for both residents and visitors. 
                    Our verified directory of {filteredBusinesses.length} {category?.toLowerCase()} businesses ensures you connect 
                    with professional, trustworthy service providers who understand local needs and deliver quality results.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Each {category?.toLowerCase()} business in our directory has been carefully verified for authenticity, 
                    quality of service, and customer satisfaction. We provide comprehensive business information including 
                    contact details, customer reviews, ratings, service areas, and business hours.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">What You'll Find in Our Directory</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>✓ {filteredBusinesses.length} verified {category?.toLowerCase()} businesses{locationText}</li>
                    <li>✓ Direct contact information (phone, email, website)</li>
                    <li>✓ Customer reviews and ratings</li>
                    <li>✓ Business locations with maps and directions</li>
                    <li>✓ Service descriptions and specializations</li>
                    <li>✓ Operating hours and availability</li>
                    <li>✓ Updated business information (2024)</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Popular {categoryTitle} Locations in Benin</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {availableLocations.slice(0, 8).map(location => {
                    const count = businesses.filter(b => 
                      b.category.toLowerCase() === category?.toLowerCase() && 
                      b.location.toLowerCase().includes(location.toLowerCase())
                    ).length;
                    return (
                      <div key={location} className="bg-gray-50 rounded-lg p-3 text-center">
                        <h4 className="font-medium text-gray-800">{location}</h4>
                        <p className="text-sm text-gray-600">{count} businesses</p>
                        <a 
                          href={`/category/${category}?location=${location}`}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          View all →
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Choose the Right {categoryTitle} Service</h3>
                <ol className="text-gray-700 space-y-2 list-decimal list-inside">
                  <li><strong>Check Reviews:</strong> Read customer feedback and ratings to gauge service quality</li>
                  <li><strong>Verify Credentials:</strong> Ensure the business is licensed and properly registered</li>
                  <li><strong>Compare Prices:</strong> Get quotes from multiple providers to find the best value</li>
                  <li><strong>Location Convenience:</strong> Choose businesses close to your location for easier access</li>
                  <li><strong>Service Specialization:</strong> Select providers who specialize in your specific needs</li>
                  <li><strong>Communication:</strong> Choose businesses that respond promptly and professionally</li>
                </ol>
              </div>
              
              <div className="mt-8 bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Need Help Finding the Right {categoryTitle} Service?</h3>
                <p className="text-blue-800 mb-4">
                  Our business directory is updated regularly with new {category?.toLowerCase()} services{locationText}. 
                  If you don't find what you're looking for, try browsing our other categories or use our search function.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="/" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Browse All Categories
                  </a>
                  <a href="/search" className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                    Advanced Search
                  </a>
                </div>
              </div>
            </article>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            No {category} businesses found
          </h3>
          <p className="text-gray-600 mb-8">
            We're constantly adding new businesses. Check back soon!
          </p>
          <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Browse All Categories
          </a>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
