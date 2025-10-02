import React from 'react';
import { Link } from 'react-router-dom';
// SEO Articles data from our article generation system
const seoArticles = [
  {
    title: 'Best Photography Studios in Cotonou',
    category: 'Services',
    slug: 'best-photography-studios-cotonou',
    description: 'Discover the top photography studios in Cotonou with professional services for weddings, portraits, and events.',
    image: 'https://images.unsplash.com/photo-1554048612-b6eb0c679f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    title: 'Top Restaurants in Cotonou - Complete Dining Guide 2025',
    category: 'Restaurants',
    slug: 'top-restaurants-cotonou',
    description: 'Complete guide to the best restaurants in Cotonou with authentic Beninese cuisine and international dishes.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    title: 'Best Hotels in Porto-Novo',
    category: 'Hotels',
    slug: 'best-hotels-porto-novo',
    description: 'Find the perfect accommodation in Porto-Novo with our comprehensive hotel guide.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    title: 'Top Tourist Agencies in Parakou',
    category: 'Services',
    slug: 'tourist-agencies-parakou',
    description: 'Explore Benin with the best tourist agencies offering cultural experiences and guided tours.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    title: 'Top Logistic Companies in Benin',
    category: 'Transportation',
    slug: 'top-logistic-companies-benin',
    description: 'Professional logistics and transportation services for your shipping needs across Benin.',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    title: 'Digital Marketing Agencies in Cotonou',
    category: 'Services',
    slug: 'digital-marketing-agencies-cotonou',
    description: 'Grow your business with top digital marketing agencies specializing in social media and SEO.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    title: 'Fashion Boutiques in Cotonou',
    category: 'Shopping',
    slug: 'fashion-boutiques-cotonou',
    description: 'Discover the latest fashion trends at Cotonou\'s best boutiques and clothing stores.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    title: 'Auto Repair Shops in Cotonou',
    category: 'Services',
    slug: 'auto-repair-cotonou',
    description: 'Professional auto repair services for all vehicle types in Cotonou.',
    image: 'https://images.unsplash.com/photo-1632823469434-e2a5e6025ec8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    title: 'Wedding Venues in Cotonou',
    category: 'Entertainment',
    slug: 'wedding-venues-cotonou',
    description: 'Perfect wedding venues and event spaces for your special day in Cotonou.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    title: 'Pharmacies in Abomey',
    category: 'Health',
    slug: 'pharmacies-abomey',
    description: 'Find reliable pharmacies and medical supplies in Abomey.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    title: 'Electronics Stores in Cotonou',
    category: 'Shopping',
    slug: 'electronics-stores-cotonou',
    description: 'Best electronics and technology stores for phones, computers, and appliances.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    title: 'Construction Companies in Benin',
    category: 'Services',
    slug: 'construction-companies-benin',
    description: 'Professional construction and building services for residential and commercial projects.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  }
];

const BlogPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Benin Business Directory Articles
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Comprehensive guides to businesses across Benin. Find the best services, restaurants, hotels, and more with detailed reviews and contact information.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seoArticles.map((article, index) => (
              <Link 
                key={index}
                to={`/articles/${article.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-medium hover:text-blue-800">
                      Read Guide →
                    </span>
                    <span className="text-sm text-gray-500">
                      Updated 2025
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Looking for a Specific Business?
              </h2>
              <p className="text-gray-600 mb-6">
                Our comprehensive directory includes thousands of businesses across Benin. 
                Search by category or location to find exactly what you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Browse All Businesses
                </Link>
                <Link
                  to="/register-business"
                  className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Add Your Business
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default BlogPage;