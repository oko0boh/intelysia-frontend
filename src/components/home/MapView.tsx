import React from 'react';
import { ProcessedBusiness } from '../../utils/csvDataLoader';
import { MapPin, Building2, Star } from 'lucide-react';

interface MapViewProps {
  businesses: ProcessedBusiness[];
}

const MapView: React.FC<MapViewProps> = ({ businesses }) => {
  // Get unique cities from businesses
  const cities = [...new Set(businesses.map(b => b.location))].slice(0, 6);
  
  // Get business counts by category
  const categoryStats = businesses.reduce((acc, business) => {
    acc[business.category] = (acc[business.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 4);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-0">
            Business Locations Across Benin
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Building2 className="w-4 h-4" />
            <span>{businesses.length} Total Businesses</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Cities Overview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Major Cities
            </h3>
            <div className="space-y-3">
              {cities.map((city, index) => {
                const cityBusinesses = businesses.filter(b => b.location === city);
                return (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium text-gray-700">{city}</span>
                    <span className="text-sm text-gray-500">{cityBusinesses.length} businesses</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Categories Overview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-green-600" />
              Top Categories
            </h3>
            <div className="space-y-3">
              {topCategories.map(([category, count], index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium text-gray-700">{category}</span>
                  <span className="text-sm text-gray-500">{count} businesses</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Businesses */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-500" />
            Featured Businesses
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {businesses.slice(0, 6).map((business) => (
              <div key={business.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-800 mb-2 truncate">{business.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{business.category}</p>
                <p className="text-sm text-gray-500 mb-2 truncate">{business.address}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">{business.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">{business.reviews} reviews</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default MapView;