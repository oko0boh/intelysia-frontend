import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Tag } from 'lucide-react';

interface RelatedContentProps {
  currentPage: 'business' | 'category' | 'location' | 'blog';
  currentId?: string;
  category?: string;
  location?: string;
}

const RelatedContent: React.FC<RelatedContentProps> = ({
  currentPage,
  currentId,
  category,
  location
}) => {
  const getRelatedLinks = () => {
    const links = [];

    switch (currentPage) {
      case 'business':
        if (category) {
          links.push({
            title: `More ${category} Businesses`,
            href: `/category/${category.toLowerCase()}`,
            icon: Tag,
            description: `Explore other ${category.toLowerCase()} businesses in the area`
          });
        }
        if (location) {
          links.push({
            title: `Businesses in ${location}`,
            href: `/location/${location.toLowerCase()}`,
            icon: MapPin,
            description: `Discover more businesses in ${location}`
          });
        }
        break;

      case 'category':
        links.push(
          {
            title: 'All Categories',
            href: '/',
            icon: Tag,
            description: 'Browse all business categories'
          },
          {
            title: 'Popular Searches',
            href: '/search',
            icon: ArrowRight,
            description: 'Find what others are looking for'
          }
        );
        break;

      case 'location':
        links.push(
          {
            title: 'All Locations',
            href: '/',
            icon: MapPin,
            description: 'Explore businesses in other areas'
          },
          {
            title: 'Featured Businesses',
            href: '/',
            icon: ArrowRight,
            description: 'Top-rated businesses across Cotonou'
          }
        );
        break;

      case 'blog':
        links.push(
          {
            title: 'Business Directory',
            href: '/',
            icon: ArrowRight,
            description: 'Find local businesses in Cotonou'
          },
          {
            title: 'All Blog Posts',
            href: '/blog',
            icon: Tag,
            description: 'Read more business insights and guides'
          }
        );
        break;
    }

    return links;
  };

  const relatedLinks = getRelatedLinks();

  if (relatedLinks.length === 0) return null;

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          You Might Also Like
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {relatedLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <Link
                key={index}
                to={link.href}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-lg p-3 group-hover:bg-blue-200 transition-colors">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {link.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedContent;
