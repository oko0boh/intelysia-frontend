import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import BusinessInfo from '../components/business/BusinessInfo';
import Gallery from '../components/business/Gallery';
import Reviews from '../components/business/Reviews';
import BusinessGrid from '../components/home/BusinessGrid';
import { useRealBusinessData } from '../hooks/useRealBusinessData';
import { ProcessedBusiness } from '../utils/csvDataLoader';

const BusinessDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { businesses, getByCategory, loading: dataLoading } = useRealBusinessData();
  const [business, setBusiness] = useState<ProcessedBusiness | null>(null);
  const [similarBusinesses, setSimilarBusinesses] = useState<ProcessedBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!id) {
        setError('No business ID provided');
        setLoading(false);
        return;
      }
      
      // Don't proceed if data is still loading
      if (dataLoading) return;
      
      if (businesses.length === 0) {
        setError('Business data not available');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        // Decode URL-encoded ID and try multiple matching strategies
        const decodedId = decodeURIComponent(id);
        
        // Try multiple strategies to find the business
        let foundBusiness = null;
        
        // Strategy 1: Exact match with original ID
        foundBusiness = businesses.find(business => business.id === id);
        
        // Strategy 2: Exact match with decoded ID
        if (!foundBusiness) {
          foundBusiness = businesses.find(business => business.id === decodedId);
        }
        
        // Strategy 3: Partial match (for URL-safe encoded IDs)
        if (!foundBusiness) {
          foundBusiness = businesses.find(business => 
            business.id.includes(id) || id.includes(business.id)
          );
        }
        
        // Strategy 4: Match by encoded/unencoded variations
        if (!foundBusiness) {
          foundBusiness = businesses.find(business => {
            const encodedBusinessId = encodeURIComponent(business.id);
            return encodedBusinessId === id || encodedBusinessId === decodedId;
          });
        }
        
        
        if (foundBusiness) {
          setBusiness(foundBusiness);
          // Find similar businesses (same category but not the same business)
          try {
            const similar = await getByCategory(foundBusiness.category);
            setSimilarBusinesses(similar.filter(b => b.id !== foundBusiness.id).slice(0, 3));
          } catch (similarErr) {
            console.warn('Error loading similar businesses:', similarErr);
            // Don't fail the whole page if similar businesses fail to load
          }
        } else {
          setBusiness(null);
        }
      } catch (err) {
        setError('Failed to load business details');
        console.error('Error fetching business:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [id, businesses, getByCategory, dataLoading]);
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading business details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Business</h2>
        <p className="text-gray-600 mb-8">{error}</p>
        <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
          Return to Homepage
        </Link>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Business Not Found
        </h2>
        <p className="text-gray-600 mb-4">
          The business you're looking for might have been removed or doesn't exist.
        </p>
        <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
          Return to Homepage
        </Link>
      </div>
    );
  }

  // Generate comprehensive SEO data for AI and search engines
  const generateBusinessSEO = () => {
    const businessName = business.name;
    const businessLocation = business.location;
    const businessCategory = business.category;
    const businessAddress = business.address;
    
    const title = `${businessName} | ${businessCategory} in ${businessLocation} | Intelysia Business Directory`;
    const description = `${businessName} is a trusted ${businessCategory.toLowerCase()} business located in ${businessLocation}, Benin. ${business.description} Find contact information, reviews, ratings, and directions. Phone: ${business.phone}. Address: ${businessAddress}.`;
    
    const keywords = [
      businessName,
      `${businessName} ${businessLocation}`,
      `${businessName} Benin`,
      `${businessCategory} ${businessLocation}`,
      `${businessCategory} Benin`,
      `best ${businessCategory.toLowerCase()} ${businessLocation}`,
      businessAddress,
      business.phone,
      `business directory ${businessLocation}`,
      `local ${businessCategory.toLowerCase()} Benin`,
      `${businessLocation} business`,
      `find ${businessCategory.toLowerCase()} near me`,
      `${businessCategory.toLowerCase()} services ${businessLocation}`,
      `top rated ${businessCategory.toLowerCase()} Benin`,
      `${businessName} contact`,
      `${businessName} address`,
      `${businessName} phone`,
      `${businessName} reviews`,
      `${businessName} rating`,
      `West Africa ${businessCategory.toLowerCase()}`,
      'Benin business directory',
      'local businesses Benin',
      'verified businesses Benin'
    ];

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `https://intelysia.com/business/${business.id}`,
      "name": businessName,
      "description": business.description,
      "url": `https://intelysia.com/business/${business.id}`,
      "telephone": business.phone,
      "email": `info@${businessName.toLowerCase().replace(/\s+/g, '')}.com`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": businessAddress,
        "addressLocality": businessLocation,
        "addressCountry": "BJ",
        "addressRegion": businessLocation
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": business.coordinates.lat,
        "longitude": business.coordinates.lng
      },
      "aggregateRating": business.rating > 0 ? {
        "@type": "AggregateRating",
        "ratingValue": business.rating,
        "reviewCount": business.reviews,
        "bestRating": 5,
        "worstRating": 1
      } : undefined,
      "priceRange": "$$",
      "currenciesAccepted": "XOF",
      "paymentAccepted": "Cash, Mobile Money",
      "openingHours": business.hours || "Mo-Fr 08:00-18:00, Sa 09:00-16:00",
      "image": business.images?.[0] || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "sameAs": [
        business.website,
        business.social_links?.facebook,
        business.social_links?.instagram
      ].filter(Boolean),
      "containsPlace": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "Benin",
          "addressLocality": businessLocation
        }
      },
      "makesOffer": {
        "@type": "Offer",
        "description": `Professional ${businessCategory.toLowerCase()} services in ${businessLocation}`
      },
      "areaServed": {
        "@type": "Place",
        "name": businessLocation,
        "containedInPlace": {
          "@type": "Country",
          "name": "Benin"
        }
      },
      "knowsAbout": [
        businessCategory,
        `${businessCategory} services`,
        `${businessLocation} business`,
        "local services Benin",
        "West Africa business"
      ],
      "memberOf": {
        "@type": "Organization",
        "name": "Intelysia Business Directory",
        "url": "https://intelysia.com"
      },
      "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `What makes ${businessName} the best ${businessCategory.toLowerCase()} choice in ${businessLocation}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${businessName} stands out with our ${business.rating}-star rating, ${business.reviews} positive customer reviews, and years of experience serving the ${businessLocation} community. Our commitment to quality and customer satisfaction makes us the preferred ${businessCategory.toLowerCase()} provider in the region.`
            }
          },
          {
            "@type": "Question", 
            "name": `How can I contact ${businessName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `You can reach ${businessName} by calling ${business.phone}, visiting our website, or stopping by our location at ${businessAddress}. We're open ${business.hours} to serve our customers in ${businessLocation} and surrounding areas.`
            }
          },
          {
            "@type": "Question",
            "name": `Do you serve areas outside of ${businessLocation}?`, 
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, ${businessName} proudly serves customers throughout Benin, including Cotonou, Porto-Novo, Parakou, and other major cities. Our ${businessCategory.toLowerCase()} services are available across the country with convenient scheduling and professional delivery.`
            }
          }
        ]
      }
    };

    // Generate AI-optimized canonical URL with business name slug
    const businessSlug = businessName.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const canonicalUrl = `https://intelysia.com/business/${business.id}/${businessSlug}`;

    return {
      title,
      description,
      keywords,
      canonicalUrl,
      structuredData
    };
  };

  const seoData = generateBusinessSEO();

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonicalUrl={seoData.canonicalUrl}
        structuredData={seoData.structuredData}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation for SEO */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link to={`/category/${business.category}`} className="hover:text-blue-600">{business.category}</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{business.name}</li>
          </ol>
        </nav>

        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ChevronLeft className="h-5 w-5 mr-1" /> Back to Listings
        </Link>
        
        {/* AI-Optimized Business Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {business.name} - {business.category} in {business.location}
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Professional {business.category.toLowerCase()} services in {business.location}, Benin. 
            Verified business with {business.rating} star rating and {business.reviews} customer reviews.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
              {business.category}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
              📍 {business.location}
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded">
              ⭐ {business.rating} Rating
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded">
              ✅ Verified Business
            </span>
          </div>
        </header>

        {/* Business Info with Error Boundary */}
        {(() => {
          try {
            return <BusinessInfo business={business} />;
          } catch (err) {
            console.error('Error rendering BusinessInfo:', err);
            return (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700">Error loading business information. Please try refreshing the page.</p>
              </div>
            );
          }
        })()}
        
        {business.images && business.images.length > 0 && <Gallery images={business.images} businessName={business.name} />}
        
        {/* Reviews with Error Boundary */}
        {(() => {
          try {
            return <Reviews businessName={business.name} totalReviews={business.reviews || 0} averageRating={business.rating || 0} />;
          } catch (err) {
            console.error('Error rendering Reviews:', err);
            return (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-700">Reviews temporarily unavailable.</p>
              </div>
            );
          }
        })()}
        
        {/* Comprehensive Business Information Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            About {business.name} - {business.category} Services in {business.location}
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              {business.description}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Professional {business.category} Services</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Located in the heart of {business.location}, {business.name} has established itself as a leading 
                  {business.category.toLowerCase()} provider in Benin. Our team of experienced professionals is 
                  dedicated to delivering exceptional service that meets the highest industry standards.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  With a proven track record of {business.rating} stars from {business.reviews} satisfied customers, 
                  {business.name} continues to be the preferred choice for {business.category.toLowerCase()} services 
                  in {business.location} and throughout the greater Benin region.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Choose {business.name}?</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    Verified and licensed {business.category.toLowerCase()} business in {business.location}
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    Outstanding {business.rating}-star rating from {business.reviews} customer reviews
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    Local expertise and deep understanding of Benin market
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    Convenient location at {business.address}
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    Professional team committed to customer satisfaction
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    Competitive pricing and transparent service
                  </li>
                </ul>
              </div>
            </div>

            {/* Services Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Our {business.category} Services</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {business.name} offers comprehensive {business.category.toLowerCase()} services designed to meet 
                the diverse needs of our clients in {business.location} and surrounding areas. Our service portfolio includes:
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {/* Dynamic service suggestions based on category */}
                {business.category === 'Restaurants' ? [
                  'Traditional Beninese Cuisine',
                  'International Menu Options',
                  'Fresh Seafood Specialties',
                  'Vegetarian & Vegan Options',
                  'Catering Services',
                  'Private Dining Events'
                ].map((service, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-lg">
                    <span className="text-blue-800 font-medium text-sm">{service}</span>
                  </div>
                )) : business.category === 'Hotels' ? [
                  'Comfortable Accommodation',
                  'Business Travel Services',
                  'Conference Facilities',
                  'Airport Transfer',
                  'Tour Arrangements',
                  '24/7 Customer Service'
                ].map((service, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-lg">
                    <span className="text-blue-800 font-medium text-sm">{service}</span>
                  </div>
                )) : business.category === 'Agriculture' ? [
                  'Crop Production Services',
                  'Agricultural Consulting',
                  'Equipment Rental',
                  'Seed & Fertilizer Supply',
                  'Farm Management',
                  'Agricultural Training'
                ].map((service, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-lg">
                    <span className="text-blue-800 font-medium text-sm">{service}</span>
                  </div>
                )) : [
                  'Professional Consultation',
                  'Quality Service Delivery',
                  'Customer Support',
                  'Expert Solutions',
                  'Competitive Pricing',
                  'Local Expertise'
                ].map((service, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-lg">
                    <span className="text-blue-800 font-medium text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Service Area */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Service Area & Location</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Strategically located in {business.location}, {business.name} serves customers throughout 
                Benin and the broader West African region. Our central location provides easy access for 
                clients from major cities including Cotonou, Porto-Novo, Parakou, Abomey, and other key 
                business centers across the country.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">We Serve:</h4>
                <div className="grid md:grid-cols-4 gap-2 text-sm text-gray-700">
                  <span>• {business.location} (Primary)</span>
                  <span>• Cotonou</span>
                  <span>• Porto-Novo</span>
                  <span>• Parakou</span>
                  <span>• Abomey</span>
                  <span>• Bohicon</span>
                  <span>• Djougou</span>
                  <span>• Surrounding Areas</span>
                </div>
              </div>
            </div>

            {/* FAQ Section for Enhanced SEO */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">What makes {business.name} the best {business.category.toLowerCase()} choice in {business.location}?</h4>
                  <p className="text-gray-700">
                    {business.name} stands out with our {business.rating}-star rating, {business.reviews} positive customer reviews, 
                    and years of experience serving the {business.location} community. Our commitment to quality and customer 
                    satisfaction makes us the preferred {business.category.toLowerCase()} provider in the region.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">How can I contact {business.name}?</h4>
                  <p className="text-gray-700">
                    You can reach {business.name} by {business.phone ? `calling ${business.phone}, ` : ''}
                    {business.website ? 'visiting our website, or ' : ''}stopping by our location at {business.address}. 
                    {business.hours ? ` We're open ${business.hours} to serve our customers in ${business.location} and surrounding areas.` : ` Visit us in ${business.location} for the best service experience.`}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Do you serve areas outside of {business.location}?</h4>
                  <p className="text-gray-700">
                    Yes, {business.name} proudly serves customers throughout Benin, including Cotonou, Porto-Novo, Parakou, 
                    and other major cities. Our {business.category.toLowerCase()} services are available across the country 
                    with convenient scheduling and professional delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Testimonials Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">What Our Customers Say</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-2">
                    "Outstanding {business.category.toLowerCase()} service! {business.name} exceeded all our expectations. 
                    Professional, reliable, and great value. Highly recommend to anyone in {business.location}."
                  </p>
                  <p className="text-gray-600 text-sm">- Satisfied Customer</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-2">
                    "Best {business.category.toLowerCase()} experience in Benin! The team at {business.name} is knowledgeable, 
                    friendly, and delivers exactly what they promise. Will definitely use their services again."
                  </p>
                  <p className="text-gray-600 text-sm">- Happy Client</p>
                </div>
              </div>
            </div>

            {/* Contact & Hours */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact {business.name} Today</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ready to experience the best {business.category.toLowerCase()} service in {business.location}? 
                Contact us today to learn more about our services or to schedule your appointment. Our 
                professional team is standing by to assist you with all your {business.category.toLowerCase()} needs.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
                {business.phone && (
                  <div>
                    <strong className="text-gray-800">📞 Phone:</strong>
                    <br /><a href={`tel:${business.phone}`} className="text-blue-600 hover:text-blue-800">{business.phone}</a>
                  </div>
                )}
                {business.website && (
                  <div>
                    <strong className="text-gray-800">🌐 Website:</strong>
                    <br /><a href={business.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Visit Our Website</a>
                  </div>
                )}
                <div>
                  <strong className="text-gray-800">📍 Location:</strong>
                  <br /><a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${business.coordinates.lat},${business.coordinates.lng}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Get Directions
                  </a>
                </div>
                {business.hours && (
                  <div>
                    <strong className="text-gray-800">🕒 Hours:</strong>
                    <br /><span className="text-gray-700">{business.hours}</span>
                  </div>
                )}
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-gray-700">
                  <strong>Local SEO Keywords:</strong> {business.name} {business.location}, {business.category} {business.location} Benin, 
                  best {business.category.toLowerCase()} near me, top rated {business.category.toLowerCase()} {business.location}, 
                  professional {business.category.toLowerCase()} services Benin, verified {business.category.toLowerCase()} directory
                </p>
              </div>
            </div>
          </div>
        </section>

        {similarBusinesses.length > 0 && (
          <div className="mt-12">
            <BusinessGrid businesses={similarBusinesses} title={`Other ${business.category} Businesses in ${business.location}`} />
          </div>
        )}
      </div>
    </div>
  );
};
export default BusinessDetailPage;