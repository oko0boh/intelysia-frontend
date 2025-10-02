import React from 'react';
import { Mail, Phone, MapPin, Clock, Users, Shield, Globe } from 'lucide-react';
const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About Intelysia
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            The premier business directory connecting people with businesses in
            Cotonou.
          </p>
        </div>
      </section>
      {/* About Us Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80" alt="Cotonou cityscape" className="w-full h-full object-cover" />
              </div>
              <div className="p-8 md:w-1/2">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Our Story
                </h2>
                <p className="text-gray-600 mb-6">
                  Intelysia was founded in 2023 with a simple mission: to
                  connect the people of Cotonou with the businesses that serve
                  them. We recognized the need for a comprehensive,
                  user-friendly platform that would showcase the vibrant
                  business community of Benin's economic capital.
                </p>
                <p className="text-gray-600">
                  Today, we're proud to be the go-to resource for residents and
                  visitors looking to discover the best that Cotonou has to
                  offer. From restaurants and hotels to services and shopping,
                  our directory provides detailed, up-to-date information to
                  help users make informed decisions.
                </p>
              </div>
            </div>
          </div>
          {/* Our Mission */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Our Mission
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Connect
                </h3>
                <p className="text-gray-600">
                  We aim to bridge the gap between businesses and consumers,
                  creating meaningful connections that benefit both parties.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Promote
                </h3>
                <p className="text-gray-600">
                  We showcase the diverse business landscape of Cotonou, helping
                  local enterprises gain visibility and reach new customers.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Inform
                </h3>
                <p className="text-gray-600">
                  We provide reliable, comprehensive information that empowers
                  consumers to make confident decisions about where to spend
                  their time and money.
                </p>
              </div>
            </div>
          </div>
          {/* Contact Information */}
          <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Contact Us
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 mb-6">
                    Have questions or suggestions? We'd love to hear from you!
                    Reach out to our team using the contact information below.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span className="ml-3 text-gray-600">
                        123 Business Avenue, Cotonou, Benin
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <a href="tel:+22912345678" className="ml-3 text-gray-600 hover:text-blue-600">
                        +229 123 456 789
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <a href="mailto:info@intelysia.com" className="ml-3 text-gray-600 hover:text-blue-600">
                        info@intelysia.com
                      </a>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span className="ml-3 text-gray-600">
                        Monday - Friday: 9 AM - 5 PM
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AboutPage;