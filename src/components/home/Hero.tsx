import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { categories } from '../../utils/data';
const Hero: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchTerm, 'in category:', selectedCategory);
  };
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Find the Best Businesses in Cotonou
        </h1>
        <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Discover top-rated restaurants, hotels, services, and more in Cotonou,
          Benin's vibrant economic capital.
        </p>
        <div className="max-w-3xl mx-auto bg-white p-2 rounded-lg shadow-lg">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row">
            <div className="flex-1 flex items-center px-3 mb-2 md:mb-0">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <input type="text" placeholder="Search for businesses, services..." className="w-full py-2 px-1 focus:outline-none text-gray-700" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex items-center px-3 mb-2 md:mb-0 md:border-l border-gray-300">
              <select className="w-full py-2 px-1 focus:outline-none text-gray-700 bg-transparent" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                {categories.map(category => <option key={category} value={category}>
                    {category}
                  </option>)}
              </select>
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition duration-200">
              Search
            </button>
          </form>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <p className="text-white font-medium mr-2">Popular:</p>
          <a href="/?category=Restaurant" className="text-blue-100 hover:text-white hover:underline">
            Restaurants
          </a>
          <span className="text-blue-300">•</span>
          <a href="/?category=Hotel" className="text-blue-100 hover:text-white hover:underline">
            Hotels
          </a>
          <span className="text-blue-300">•</span>
          <a href="/?category=Services" className="text-blue-100 hover:text-white hover:underline">
            Services
          </a>
          <span className="text-blue-300">•</span>
          <a href="/?category=Shopping" className="text-blue-100 hover:text-white hover:underline">
            Shopping
          </a>
        </div>
      </div>
    </section>
  );
};
export default Hero;