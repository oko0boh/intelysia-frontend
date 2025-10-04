import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { t, getLanguageFromPath } from '../../i18n';

const Header: React.FC = () => {
  const location = useLocation();
  const currentLanguage = getLanguageFromPath(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">Intelysia</span>
            <span className="ml-1 text-sm text-gray-600">
              Cotonou Business Directory
            </span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button 
                className="text-gray-700 hover:text-blue-600 font-medium flex items-center px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-50" 
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                onMouseEnter={() => {
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current);
                  }
                  setIsCategoriesOpen(true);
                }}
                onMouseLeave={() => {
                  hoverTimeoutRef.current = setTimeout(() => setIsCategoriesOpen(false), 200);
                }}
              >
                Categories
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-[100] transition-all duration-200 ${isCategoriesOpen ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'}`}
                onMouseEnter={() => {
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current);
                  }
                  setIsCategoriesOpen(true);
                }}
                onMouseLeave={() => {
                  hoverTimeoutRef.current = setTimeout(() => setIsCategoriesOpen(false), 200);
                }}
              >
                <Link 
                  to="/category/Restaurants" 
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
                  onClick={() => setIsCategoriesOpen(false)}
                >
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3 group-hover:scale-110 transition-transform"></span>
                  Restaurants
                </Link>
                <Link 
                  to="/category/Hotels" 
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
                  onClick={() => setIsCategoriesOpen(false)}
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover:scale-110 transition-transform"></span>
                  Hotels
                </Link>
                <Link 
                  to="/category/Services" 
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
                  onClick={() => setIsCategoriesOpen(false)}
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-110 transition-transform"></span>
                  Services
                </Link>
                <Link 
                  to="/category/Shopping" 
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
                  onClick={() => setIsCategoriesOpen(false)}
                >
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3 group-hover:scale-110 transition-transform"></span>
                  Shopping
                </Link>
                <Link 
                  to="/category/Entertainment" 
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
                  onClick={() => setIsCategoriesOpen(false)}
                >
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 group-hover:scale-110 transition-transform"></span>
                  Entertainment
                </Link>
                <Link 
                  to="/category/Health" 
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
                  onClick={() => setIsCategoriesOpen(false)}
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:scale-110 transition-transform"></span>
                  Health
                </Link>
                <div className="border-t border-gray-100 my-2"></div>
                <Link 
                  to="/category/Education" 
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
                  onClick={() => setIsCategoriesOpen(false)}
                >
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 group-hover:scale-110 transition-transform"></span>
                  Education
                </Link>
                <Link 
                  to="/category/Agriculture" 
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
                  onClick={() => setIsCategoriesOpen(false)}
                >
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3 group-hover:scale-110 transition-transform"></span>
                  Agriculture
                </Link>
                <Link 
                  to="/category/Finance" 
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
                  onClick={() => setIsCategoriesOpen(false)}
                >
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 group-hover:scale-110 transition-transform"></span>
                  Finance
                </Link>
                <Link 
                  to="/category/Transportation" 
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
                  onClick={() => setIsCategoriesOpen(false)}
                >
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 group-hover:scale-110 transition-transform"></span>
                  Transportation
                </Link>
                <Link 
                  to="/category/Cafes" 
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
                  onClick={() => setIsCategoriesOpen(false)}
                >
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3 group-hover:scale-110 transition-transform"></span>
                  Cafes
                </Link>
              </div>
            </div>
            <Link to="/blog" className="text-gray-700 hover:text-blue-600 font-medium">
              Blog
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>
          </nav>
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 rounded-full hover:bg-gray-100" aria-label="Search">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <Link to="/register-business" className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition">
              {t('nav.addBusiness', currentLanguage)}
            </Link>
            <Link to="/claim-business" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
              {t('nav.claimBusiness', currentLanguage)}
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 mr-2 rounded-full hover:bg-gray-100" aria-label="Search">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none" aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {/* Mobile Search */}
        {isSearchOpen && <div className="mt-4 relative">
            <input type="text" placeholder="Search businesses, locations..." className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>}
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-3 space-y-1">
            <Link to="/" className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              Home
            </Link>
            <div className="py-2">
              <button 
                className="flex items-center justify-between w-full text-left text-gray-700 hover:bg-gray-100 rounded-md py-3 px-3"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              >
                <span className="font-medium">Categories</span>
                <svg 
                  className={`h-4 w-4 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`pl-4 mt-1 space-y-1 transition-all duration-200 ${isCategoriesOpen ? 'block' : 'hidden'}`}>
                <Link to="/category/Restaurants" className="block py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md px-3">
                  Restaurants
                </Link>
                <Link to="/category/Hotels" className="block py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md px-3">
                  Hotels
                </Link>
                <Link to="/category/Services" className="block py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md px-3">
                  Services
                </Link>
                <Link to="/category/Shopping" className="block py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md px-3">
                  Shopping
                </Link>
                <Link to="/category/Entertainment" className="block py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md px-3">
                  Entertainment
                </Link>
                <Link to="/category/Health" className="block py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md px-3">
                  Health
                </Link>
                <Link to="/category/Education" className="block py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md px-3">
                  Education
                </Link>
                <Link to="/category/Agriculture" className="block py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md px-3">
                  Agriculture
                </Link>
                <Link to="/category/Finance" className="block py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md px-3">
                  Finance
                </Link>
                <Link to="/category/Transportation" className="block py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md px-3">
                  Transportation
                </Link>
                <Link to="/category/Cafes" className="block py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md px-3">
                  Cafes
                </Link>
              </div>
            </div>
            <Link to="/blog" className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              Blog
            </Link>
            <Link to="/about" className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              About
            </Link>
            <Link to="/register-business" className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              Add Business
            </Link>
            <Link to="/claim-business" className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              Claim Business
            </Link>
          </div>
        </div>}
    </header>
  );
};
export default Header;