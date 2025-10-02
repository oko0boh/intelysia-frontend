import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp } from 'lucide-react';
interface PopularSearch {
  title: string;
  category: string;
  slug: string;
}
const popularSearches: PopularSearch[] = [{
  title: 'Best Photography Studios in Cotonou',
  category: 'Photography',
  slug: 'best-photography-studios-cotonou'
}, {
  title: 'Top 10 Restaurants in Cotonou',
  category: 'Dining',
  slug: 'top-restaurants-cotonou'
}, {
  title: 'Best Hotels in Porto-Novo',
  category: 'Accommodation',
  slug: 'best-hotels-porto-novo'
}, {
  title: 'Top Tourist Agencies in Parakou',
  category: 'Tourism',
  slug: 'tourist-agencies-parakou'
}, {
  title: 'Top 10 Logistic Companies in Benin Republic',
  category: 'Logistics',
  slug: 'top-logistic-companies-benin'
}, {
  title: 'Best Digital Marketing Agencies in Cotonou',
  category: 'Marketing',
  slug: 'digital-marketing-agencies-cotonou'
}, {
  title: 'Top Fashion Boutiques in Cotonou',
  category: 'Fashion',
  slug: 'fashion-boutiques-cotonou'
}, {
  title: 'Best Auto Repair Shops in Parakou',
  category: 'Automotive',
  slug: 'auto-repair-parakou'
}, {
  title: 'Top Wedding Venues in Porto-Novo',
  category: 'Events',
  slug: 'wedding-venues-porto-novo'
}, {
  title: 'Best Pharmacies in Abomey',
  category: 'Healthcare',
  slug: 'pharmacies-abomey'
}, {
  title: 'Top Electronics Stores in Cotonou',
  category: 'Retail',
  slug: 'electronics-stores-cotonou'
}, {
  title: 'Best Schools in Parakou',
  category: 'Education',
  slug: 'schools-parakou'
}, {
  title: 'Top Legal Services in Cotonou',
  category: 'Legal',
  slug: 'legal-services-cotonou'
}, {
  title: 'Best Beauty Salons in Porto-Novo',
  category: 'Beauty',
  slug: 'beauty-salons-porto-novo'
}, {
  title: 'Top Construction Companies in Benin Republic',
  category: 'Construction',
  slug: 'construction-companies-benin'
}, {
  title: 'Best Real Estate Agencies in Cotonou',
  category: 'Real Estate',
  slug: 'real-estate-cotonou'
}, {
  title: 'Top IT Service Providers in Parakou',
  category: 'Technology',
  slug: 'it-services-parakou'
}, {
  title: 'Best Fitness Centers in Cotonou',
  category: 'Health & Fitness',
  slug: 'fitness-centers-cotonou'
}, {
  title: 'Top Supermarkets in Porto-Novo',
  category: 'Retail',
  slug: 'supermarkets-porto-novo'
}, {
  title: 'Best Banks in Benin Republic',
  category: 'Finance',
  slug: 'banks-benin-republic'
}];
const PopularSearches: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Popular Articles & Searches
          </h2>
          <div className="flex items-center text-blue-600">
            <TrendingUp className="h-5 w-5 mr-2" />
            <span className="font-medium">Trending Now</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularSearches.map((search, index) => <Link key={index} to={`/articles/${search.slug}`} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 rounded-md text-blue-600 mr-4">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1 hover:text-blue-600 transition-colors">
                    {search.title}
                  </h3>
                  <p className="text-sm text-gray-500">{search.category}</p>
                </div>
              </div>
            </Link>)}
        </div>
        <div className="mt-8 text-center">
          <Link to="/articles" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            View all articles
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default PopularSearches;