import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Star, ExternalLink } from 'lucide-react';
import { ProcessedBusiness } from '../../utils/csvDataLoader';
import { enhanceBusinessWithFrench, getLocalizedDescription, getLocalizedCategory, EnhancedBusiness } from '../../utils/businessEnhancer';
import { getLanguageFromPath } from '../../i18n';
import { t } from '../../i18n';

interface BusinessGridProps {
  businesses: ProcessedBusiness[];
  title?: string;
}

const BusinessGrid: React.FC<BusinessGridProps> = ({
  businesses,
  title = 'Featured Businesses'
}) => {
  const location = useLocation();
  const currentLanguage = getLanguageFromPath(location.pathname);
  
  // Enhance businesses with French content
  const enhancedBusinesses: EnhancedBusiness[] = businesses.map(business => 
    enhanceBusinessWithFrench(business)
  );
  
  // Get localized title
  const getLocalizedTitle = () => {
    if (currentLanguage === 'fr') {
      if (title === 'Featured Businesses') {
        return 'Entreprises Recommandées';
      }
      if (title.includes('in Cotonou')) {
        return title.replace('in Cotonou', 'à Cotonou');
      }
      if (title.includes('in Benin')) {
        return title.replace('in Benin', 'au Bénin');
      }
    }
    return title;
  };
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
          {getLocalizedTitle()}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enhancedBusinesses.map(business => {
            const businessSlug = business.name.toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '');
            const businessUrl = currentLanguage === 'fr' ? 
              `/fr/business/${business.id}/${businessSlug}` : 
              `/business/${business.id}/${businessSlug}`;
            
            return (
              <div key={business.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Link to={businessUrl}>
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={business.images?.[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'} 
                      alt={business.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                    />
                  </div>
                </Link>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <Link to={businessUrl} className="text-lg font-bold text-gray-800 hover:text-blue-600">
                      {business.name}
                    </Link>
                    <div className="flex flex-col items-end space-y-1">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                        {getLocalizedCategory(business, currentLanguage)}
                      </span>
                      {business.hasEnrichedData && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                          ✓ {currentLanguage === 'fr' ? 'Vérifié' : 'Verified'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(business.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {business.rating} ({business.reviews} {currentLanguage === 'fr' ? 'avis' : 'reviews'})
                    </span>
                  </div>
                  <div className="mb-3 flex items-start">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                    <span className="ml-2 text-sm text-gray-600">
                      {business.address}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    {/* Show enriched phone if available, otherwise fallback */}
                    {(business.enrichedPhones?.length > 0 || (business.phone && business.phone !== 'Phone not available')) ? (
                      <a 
                        href={`tel:${business.enrichedPhones?.[0] || business.phone}`} 
                        className="flex items-center text-sm text-gray-700 hover:text-blue-600"
                      >
                        <Phone className={`h-4 w-4 mr-1 ${business.enrichedPhones?.length > 0 ? 'text-green-600' : ''}`} /> 
                        {currentLanguage === 'fr' ? 'Appeler' : 'Call'}
                      </a>
                    ) : (
                      <span className="flex items-center text-sm text-gray-400">
                        <Phone className="h-4 w-4 mr-1" /> {currentLanguage === 'fr' ? 'Pas de Téléphone' : 'No Phone'}
                      </span>
                    )}
                    
                    {/* Show enriched website if available, otherwise fallback */}
                    {(business.enrichedWebsites?.length > 0 || (business.website && !business.website.includes('business-'))) ? (
                      <a 
                        href={business.enrichedWebsites?.[0] || business.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center text-sm text-gray-700 hover:text-blue-600"
                      >
                        <ExternalLink className={`h-4 w-4 mr-1 ${business.enrichedWebsites?.length > 0 ? 'text-green-600' : ''}`} /> 
                        {currentLanguage === 'fr' ? 'Site Web' : 'Website'}
                      </a>
                    ) : (
                      <span className="flex items-center text-sm text-gray-400">
                        <ExternalLink className="h-4 w-4 mr-1" /> {currentLanguage === 'fr' ? 'Pas de Site' : 'No Website'}
                      </span>
                    )}
                    
                    <Link to={businessUrl} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      {currentLanguage === 'fr' ? 'Voir Détails' : 'View Details'}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {businesses.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg">
              {currentLanguage === 'fr' 
                ? 'Aucune entreprise trouvée correspondant à vos critères.'
                : 'No businesses found matching your criteria.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BusinessGrid;