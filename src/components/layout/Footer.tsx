import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import { CONTACT_INFO, formatPhoneForTel, getWhatsAppLink } from '../../utils/contactInfo';
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/intelysia-logo.png" 
                alt="Intelysia Logo" 
                className="h-8 w-auto mr-3 brightness-0 invert"
              />
              <div>
                <h3 className="text-xl font-semibold">Intelysia</h3>
                <p className="text-sm text-gray-400">Business Directory</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              {CONTACT_INFO.description}
            </p>
            <div className="flex space-x-4">
              <a 
                href={CONTACT_INFO.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-500 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href={CONTACT_INFO.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-500 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={CONTACT_INFO.social.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href={CONTACT_INFO.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-600 transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href={CONTACT_INFO.social.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-500 transition-colors"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/Restaurants" className="text-gray-300 hover:text-white">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/category/Hotels" className="text-gray-300 hover:text-white">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/category/Services" className="text-gray-300 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/category/Beauty" className="text-gray-300 hover:text-white">
                  Beauty & Salon
                </Link>
              </li>
              <li>
                <Link to="/category/Health" className="text-gray-300 hover:text-white">
                  Health & Medical
                </Link>
              </li>
              <li>
                <Link to="/register-business" className="text-green-400 hover:text-green-300 font-medium">
                  Add Your Business
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  {CONTACT_INFO.address.city}, {CONTACT_INFO.address.country}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-blue-400" />
                <a 
                  href={`tel:${formatPhoneForTel(CONTACT_INFO.phone)}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-blue-400" />
                <a 
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5 text-blue-400" />
                <a 
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Intelysia Cotonou Business
            Directory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;