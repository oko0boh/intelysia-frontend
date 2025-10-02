import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Coffee, Hotel, Briefcase, Utensils, Tv, Heart, GraduationCap, Car, Wheat, CreditCard } from 'lucide-react';
import { useRealBusinessData } from '../../hooks/useRealBusinessData';
import { getUniqueCategories } from '../../utils/csvDataLoader';

const categoryIcons: { [key: string]: { icon: JSX.Element; color: string } } = {
  'Restaurants': {
    icon: <Utensils className="h-6 w-6" />,
    color: 'bg-red-100 text-red-600'
  },
  'Hotels': {
    icon: <Hotel className="h-6 w-6" />,
    color: 'bg-blue-100 text-blue-600'
  },
  'Services': {
    icon: <Briefcase className="h-6 w-6" />,
    color: 'bg-green-100 text-green-600'
  },
  'Shopping': {
    icon: <ShoppingBag className="h-6 w-6" />,
    color: 'bg-purple-100 text-purple-600'
  },
  'Entertainment': {
    icon: <Tv className="h-6 w-6" />,
    color: 'bg-yellow-100 text-yellow-600'
  },
  'Health': {
    icon: <Heart className="h-6 w-6" />,
    color: 'bg-pink-100 text-pink-600'
  },
  'Education': {
    icon: <GraduationCap className="h-6 w-6" />,
    color: 'bg-indigo-100 text-indigo-600'
  },
  'Cafes': {
    icon: <Coffee className="h-6 w-6" />,
    color: 'bg-amber-100 text-amber-600'
  },
  'Transportation': {
    icon: <Car className="h-6 w-6" />,
    color: 'bg-orange-100 text-orange-600'
  },
  'Agriculture': {
    icon: <Wheat className="h-6 w-6" />,
    color: 'bg-lime-100 text-lime-600'
  },
  'Finance': {
    icon: <CreditCard className="h-6 w-6" />,
    color: 'bg-emerald-100 text-emerald-600'
  }
};

const CategorySection: React.FC = () => {
  const { businesses, loading } = useRealBusinessData();
  
  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-full mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const availableCategories = getUniqueCategories(businesses);
  
  const categoriesWithCounts = availableCategories.map(categoryName => {
    const count = businesses.filter(business => business.category === categoryName).length;
    const categoryConfig = categoryIcons[categoryName] || {
      icon: <Briefcase className="h-6 w-6" />,
      color: 'bg-gray-100 text-gray-600'
    };
    
    return {
      name: categoryName,
      count,
      ...categoryConfig
    };
  }).filter(category => category.count > 0);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categoriesWithCounts.map(category => (
            <Link 
              key={category.name} 
              to={`/category/${category.name}`} 
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className={`p-3 rounded-full ${category.color} mb-3`}>
                {category.icon}
              </div>
              <span className="text-gray-800 font-medium">{category.name}</span>
              <span className="text-xs text-gray-500 mt-1">{category.count} listings</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CategorySection;