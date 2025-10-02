import React from 'react';
import { Link } from 'react-router-dom';
interface LocationItem {
  name: string;
  image: string;
  businessCount: number;
  slug: string;
}
const locations: LocationItem[] = [{
  name: 'Cotonou',
  image: 'https://images.unsplash.com/photo-1602001313318-7696e03f575c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  businessCount: 450,
  slug: 'cotonou'
}, {
  name: 'Porto-Novo',
  image: 'https://images.unsplash.com/photo-1612889042726-4a384e3e9a1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  businessCount: 320,
  slug: 'porto-novo'
}, {
  name: 'Parakou',
  image: 'https://images.unsplash.com/photo-1594406313594-1623f4182e92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  businessCount: 210,
  slug: 'parakou'
}, {
  name: 'Abomey',
  image: 'https://images.unsplash.com/photo-1596005554384-d293674c91d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  businessCount: 175,
  slug: 'abomey'
}, {
  name: 'Bohicon',
  image: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  businessCount: 145,
  slug: 'bohicon'
}, {
  name: 'Natitingou',
  image: 'https://images.unsplash.com/photo-1601662528567-526cd06f6582?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  businessCount: 130,
  slug: 'natitingou'
}, {
  name: 'Ouidah',
  image: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  businessCount: 120,
  slug: 'ouidah'
}, {
  name: 'Djougou',
  image: 'https://images.unsplash.com/photo-1596005554384-d293674c91d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  businessCount: 110,
  slug: 'djougou'
}];
const BusinessByLocation: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
          Businesses by Location
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map(location => <Link key={location.name} to={`/?location=${location.slug}`} className="group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <img src={location.image} alt={`Businesses in ${location.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-xl font-bold text-white">
                    {location.name}
                  </h3>
                  <p className="text-sm text-gray-200">
                    {location.businessCount}+ businesses
                  </p>
                </div>
              </div>
            </Link>)}
        </div>
        <div className="mt-8 text-center">
          <Link to="/locations" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            View all locations
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default BusinessByLocation;