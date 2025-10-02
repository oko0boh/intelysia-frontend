export interface Business {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  address: string;
  phone: string;
  website: string;
  description: string;
  images?: string[];
  social_links: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  hours: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}
export const businesses: Business[] = [{
  id: 1,
  name: 'Cotonou Eatery',
  category: 'Restaurant',
  rating: 4.8,
  reviews: 120,
  address: '123 Main St, Cotonou, Benin',
  phone: '+229 123 4567',
  website: 'https://cotoneatery.com',
  description: 'A top-rated restaurant offering local and international dishes. Known for its authentic Beninese cuisine and friendly service. The restaurant features outdoor seating with a view of the city.',
  images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'],
  social_links: {
    facebook: 'https://facebook.com/cotoneatery',
    instagram: 'https://instagram.com/cotoneatery',
    twitter: 'https://twitter.com/cotoneatery'
  },
  hours: 'Mon-Sun: 8 AM - 10 PM',
  location: 'Cotonou',
  coordinates: {
    lat: 6.36536,
    lng: 2.41833
  }
}, {
  id: 2,
  name: 'Cotonou Inn',
  category: 'Hotel',
  rating: 4.5,
  reviews: 80,
  address: '45 Beach Rd, Cotonou, Benin',
  phone: '+229 987 6543',
  website: 'https://cotonouinn.com',
  description: 'A cozy hotel near the beach, perfect for tourists and locals. Featuring comfortable rooms, a swimming pool, and a restaurant that serves both local and international cuisine.',
  images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'],
  social_links: {
    facebook: 'https://facebook.com/cotonouinn',
    instagram: 'https://instagram.com/cotonouinn'
  },
  hours: '24/7',
  location: 'Cotonou',
  coordinates: {
    lat: 6.37536,
    lng: 2.42833
  }
}, {
  id: 3,
  name: 'Tech Hub Cotonou',
  category: 'Services',
  rating: 4.7,
  reviews: 65,
  address: '78 Innovation Ave, Cotonou, Benin',
  phone: '+229 456 7890',
  website: 'https://techhubcotonou.com',
  description: 'A modern co-working space and technology center offering IT services, training, and workspace for entrepreneurs and tech enthusiasts in Cotonou.',
  images: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80', 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80', 'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'],
  social_links: {
    facebook: 'https://facebook.com/techhubcotonou',
    instagram: 'https://instagram.com/techhubcotonou',
    twitter: 'https://twitter.com/techhubcotonou'
  },
  hours: 'Mon-Fri: 8 AM - 8 PM, Sat: 9 AM - 5 PM',
  location: 'Cotonou',
  coordinates: {
    lat: 6.35536,
    lng: 2.40833
  }
}, {
  id: 4,
  name: 'Marché de Dantokpa',
  category: 'Shopping',
  rating: 4.3,
  reviews: 210,
  address: 'Dantokpa Market, Cotonou, Benin',
  phone: '+229 234 5678',
  website: 'https://dantokpamarket.bj',
  description: 'The largest market in West Africa, offering a wide variety of goods including textiles, electronics, food, and traditional crafts. A must-visit destination in Cotonou.',
  images: ['https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', 'https://images.unsplash.com/photo-1473187983305-f615310e7daa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'],
  social_links: {
    facebook: 'https://facebook.com/dantokpamarket',
    instagram: 'https://instagram.com/dantokpamarket'
  },
  hours: 'Mon-Sat: 7 AM - 7 PM, Sun: 8 AM - 3 PM',
  location: 'Cotonou',
  coordinates: {
    lat: 6.36936,
    lng: 2.43033
  }
}];
export const categories = ['All', 'Restaurant', 'Hotel', 'Services', 'Shopping', 'Entertainment', 'Health', 'Education'];
export const blogPosts: BlogPost[] = [{
  id: 1,
  title: 'Top 10 Restaurants in Cotonou You Must Try',
  excerpt: 'Discover the best dining experiences that Cotonou has to offer, from local cuisine to international flavors.',
  content: 'Cotonou, the vibrant economic capital of Benin, is home to a diverse culinary scene that reflects its rich cultural heritage and international influences...',
  author: 'Marie Kouassi',
  date: '2023-05-15',
  image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
  category: 'Food & Dining'
}, {
  id: 2,
  title: "A Guide to Cotonou's Business District",
  excerpt: "Navigate through Cotonou's bustling business hub with our comprehensive guide to services, shops, and more.",
  content: "The business district of Cotonou is the beating heart of Benin's economy, hosting a variety of enterprises from traditional markets to modern office buildings...",
  author: 'Jean Kpoton',
  date: '2023-04-28',
  image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  category: 'Business'
}, {
  id: 3,
  title: 'The Hidden Gems of Cotonou: Unexplored Tourist Attractions',
  excerpt: 'Beyond the popular tourist spots, Cotonou has several hidden gems that offer unique experiences.',
  content: 'While Cotonou is known for its vibrant markets and beautiful beaches, there are many lesser-known attractions that deserve your attention...',
  author: 'Sophie Adebayo',
  date: '2023-03-12',
  image: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  category: 'Travel'
}];