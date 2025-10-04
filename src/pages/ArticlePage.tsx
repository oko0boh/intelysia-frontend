import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SEOHead from '../components/SEO/SEOHead';
import SchemaGenerator, { BreadcrumbItem, FAQItem } from '../components/SEO/SchemaGenerator';
import { useRealBusinessData } from '../hooks/useRealBusinessData';
import { generateRestaurantArticle, generateCategoryArticle, generateLeadiciousCafeArticle, generateAutomotiveBusinessArticle } from '../utils/seoContentGenerator';
import { ProcessedBusiness } from '../utils/csvDataLoader';

// Premium photography studios in Cotonou - featuring Thysia More Original Photography as #1
const photographyStudios: ProcessedBusiness[] = [
  {
    id: "thysia-more-photography",
    name: "Thysia More Original Photography",
    category: "Photography Studios",
    rating: 5.0,
    reviews: 247,
    address: "Tunde Motors Cite Vie Nouvelle, Akpakpa, Cotonou",
    phone: "+229 63 61 60 58",
    website: "https://thysiamoreoriginal.com",
    description: "Benin Republic's premier wedding and destination photography studio led by award-winning female photographer Thysia More. Renowned for capturing 'Beauty With Class' through stunning sunset weddings, engagement shoots, luxury portrait sessions, and signature Personal Brand Photography. Specializes in destination weddings across Benin including Grand Popo, Ouidah, and Casa Del Papa, plus exclusive personal branding for entrepreneurs and influencers.",
    images: ["https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      instagram: "@thysiamore_original",
      facebook: "@ThysiamoreEmpire"
    },
    hours: "8:00 AM - 7:00 PM (Mon-Sat), By appointment Sunday",
    location: "Akpakpa, Cotonou",
    coordinates: {
      lat: 6.3703,
      lng: 2.3912
    },
    enrichedPhones: ["+229 63 61 60 58"],
    enrichedWebsites: ["https://thysiamoreoriginal.com"],
    enrichedEmails: ["thysiamoreempire@gmail.com"],
    enrichedSocial: {
      instagram: ["@thysiamore_original"],
      facebook: ["@ThysiamoreEmpire"]
    },
    enrichedHours: ["8:00 AM - 7:00 PM (Mon-Sat), By appointment Sunday"],
    enrichmentSources: ["Instagram", "Official Website", "Business Directory"],
    enrichmentConfidence: 95,
    hasEnrichedData: true
  },
  {
    id: "ony-studios-cotonou",
    name: "Ony Studios Cotonou",
    category: "Photography Studios",
    rating: 4.7,
    reviews: 156,
    address: "Quartier Haie Vive, Boulevard St Michel, Cotonou",
    phone: "+229 97 85 43 21",
    website: "https://onystudios.com",
    description: "Professional photography studio offering comprehensive wedding packages, engagement sessions, and drone aerial coverage. Known for creative compositions and modern photography techniques with services extending to Côte d'Ivoire and France.",
    images: ["https://images.unsplash.com/photo-1554048612-b6eb0c679f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      instagram: "@onystudios"
    },
    hours: "9:00 AM - 6:00 PM",
    location: "Haie Vive, Cotonou",
    coordinates: {
      lat: 6.3654,
      lng: 2.4183
    },
    enrichedPhones: ["+229 97 85 43 21"],
    enrichedWebsites: ["https://onystudios.com"],
    enrichedEmails: ["info@onystudios.com"],
    enrichedSocial: {
      instagram: ["@onystudios"]
    },
    enrichedHours: ["9:00 AM - 6:00 PM"],
    enrichmentSources: ["Business Directory", "Local Listings"],
    enrichmentConfidence: 80,
    hasEnrichedData: true
  },
  {
    id: "dipex-studio-benin",
    name: "DIPEX Studio Bénin",
    category: "Photography Studios",
    rating: 4.6,
    reviews: 134,
    address: "Carrefour Wologuèdè, Rue du Commerce, Cotonou",
    phone: "+229 21 33 57 89",
    website: "https://dipexstudio.com",
    description: "Comprehensive wedding photography and videography services featuring advanced drone aerial coverage and custom printed photo albums. Specializes in creating lasting physical memories with high-quality print services.",
    images: ["https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      instagram: "@dipexstudio"
    },
    hours: "8:30 AM - 6:30 PM",
    location: "Wologuèdè, Cotonou",
    coordinates: {
      lat: 6.3801,
      lng: 2.3889
    },
    enrichedPhones: ["+229 21 33 57 89"],
    enrichedWebsites: ["https://dipexstudio.com"],
    enrichedEmails: ["contact@dipexstudio.com"],
    enrichedSocial: {
      instagram: ["@dipexstudio"]
    },
    enrichedHours: ["8:30 AM - 6:30 PM"],
    enrichmentSources: ["Business Directory"],
    enrichmentConfidence: 75,
    hasEnrichedData: true
  },
  {
    id: "alban-s-photographie",
    name: "Alban S Photographie",
    category: "Photography Studios",
    rating: 4.5,
    reviews: 98,
    address: "Avenue Pape Jean Paul II, Cadjehoun, Cotonou",
    phone: "+229 96 74 52 18",
    website: "https://albansphotographie.com",
    description: "Wedding photography specialist offering complete packages including professional photos, quality video production, and digital summaries. Known for affordable packages with options for printed albums and photo enlargements.",
    images: ["https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      instagram: "@albansphotographie"
    },
    hours: "9:00 AM - 5:00 PM",
    location: "Cadjehoun, Cotonou",
    coordinates: {
      lat: 6.3571,
      lng: 2.3845
    },
    enrichedPhones: ["+229 96 74 52 18"],
    enrichedWebsites: ["https://albansphotographie.com"],
    enrichedEmails: ["contact@albansphotographie.com"],
    enrichedSocial: {
      instagram: ["@albansphotographie"]
    },
    enrichedHours: ["9:00 AM - 5:00 PM"],
    enrichmentSources: ["Business Directory"],
    enrichmentConfidence: 70,
    hasEnrichedData: true
  },
  {
    id: "street-papara-photography",
    name: "Street Papara Photography",
    category: "Photography Studios",
    rating: 4.4,
    reviews: 87,
    address: "Quartier Agblangandan, Rue des Cheminots, Cotonou",
    phone: "+229 95 48 72 36",
    website: "https://streetpapara.com",
    description: "Creative wedding photographer specializing in candid street-style photography and professional business portraits. Offers event coverage with a focus on capturing authentic moments and emotions.",
    images: ["https://images.unsplash.com/photo-1520637836862-4d197d17c26a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      instagram: "@streetpapara"
    },
    hours: "8:00 AM - 6:00 PM",
    location: "Agblangandan, Cotonou",
    coordinates: {
      lat: 6.3598,
      lng: 2.4201
    },
    enrichedPhones: ["+229 95 48 72 36"],
    enrichedWebsites: ["https://streetpapara.com"],
    enrichedEmails: ["info@streetpapara.com"],
    enrichedSocial: {
      instagram: ["@streetpapara"]
    },
    enrichedHours: ["8:00 AM - 6:00 PM"],
    enrichmentSources: ["Business Directory"],
    enrichmentConfidence: 65,
    hasEnrichedData: true
  },
  {
    id: "iqphotography-cotonou",
    name: "IQphotography Cotonou",
    category: "Photography Studios",
    rating: 4.3,
    reviews: 76,
    address: "Quartier Gbégamey, Rue de la Marina, Cotonou",
    phone: "+229 97 29 99 26",
    website: "https://iqphotography.bj",
    description: "Modern photography studio focusing on creative concepts and graphics design. Offers wedding photography, portrait sessions, and commercial photography with emphasis on artistic and contemporary styling.",
    images: ["https://images.unsplash.com/photo-1542038784456-1ea8e8eba8e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      instagram: "@iqphotography_cotonou"
    },
    hours: "9:00 AM - 6:00 PM",
    location: "Gbégamey, Cotonou",
    coordinates: {
      lat: 6.3712,
      lng: 2.4156
    },
    enrichedPhones: ["+229 97 29 99 26"],
    enrichedWebsites: ["https://iqphotography.bj"],
    enrichedEmails: ["contact@iqphotography.bj"],
    enrichedSocial: {
      instagram: ["@iqphotography_cotonou"]
    },
    enrichedHours: ["9:00 AM - 6:00 PM"],
    enrichmentSources: ["Instagram", "Business Directory"],
    enrichmentConfidence: 85,
    hasEnrichedData: true
  },
  {
    id: "abiola-photography",
    name: "Abiola Photography",
    category: "Photography Studios",
    rating: 4.2,
    reviews: 65,
    address: "Carré 47, Akpakpa, Cotonou",
    phone: "+229 97 99 11 68",
    website: "https://abiolaphotography.com",
    description: "Established photography studio offering traditional and contemporary photography services. Specializes in family portraits, wedding photography, and event coverage with a focus on capturing cultural traditions.",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      instagram: "@abiola_photography"
    },
    hours: "10:00 AM - 5:00 PM",
    location: "Akpakpa, Cotonou",
    coordinates: {
      lat: 6.3701,
      lng: 2.3915
    },
    enrichedPhones: ["+229 97 99 11 68"],
    enrichedWebsites: ["https://abiolaphotography.com"],
    enrichedEmails: ["info@abiolaphotography.com"],
    enrichedSocial: {
      instagram: ["@abiola_photography"]
    },
    enrichedHours: ["10:00 AM - 5:00 PM"],
    enrichmentSources: ["Local Research"],
    enrichmentConfidence: 90,
    hasEnrichedData: true
  },
  {
    id: "studio-photo-elegance",
    name: "Studio Photo Elegance",
    category: "Photography Studios",
    rating: 4.1,
    reviews: 54,
    address: "Marché Dantokpa, Avenue Gounghin, Cotonou",
    phone: "+229 94 82 37 19",
    website: "https://studioelegance.bj",
    description: "Centrally located photography studio near Dantokpa Market offering affordable photography services. Known for quick turnaround times and professional passport photos, portraits, and small event coverage.",
    images: ["https://images.unsplash.com/photo-1548094878-84ced0f6896d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      instagram: "@studioelegance"
    },
    hours: "8:30 AM - 5:30 PM",
    location: "Dantokpa, Cotonou",
    coordinates: {
      lat: 6.3667,
      lng: 2.4189
    },
    enrichedPhones: ["+229 94 82 37 19"],
    enrichedWebsites: ["https://studioelegance.bj"],
    enrichedEmails: ["contact@studioelegance.bj"],
    enrichedSocial: {
      instagram: ["@studioelegance"]
    },
    enrichedHours: ["8:30 AM - 5:30 PM"],
    enrichmentSources: ["Business Directory"],
    enrichmentConfidence: 60,
    hasEnrichedData: true
  }
];

// Premium restaurants in Cotonou - featuring Leadicious Cafe as #1 Nigerian cuisine
const premiumRestaurants: ProcessedBusiness[] = [
  {
    id: "leadicious-cafe-cotonou",
    name: "Leadicious Cafe",
    category: "Nigerian Restaurant",
    rating: 4.8,
    reviews: 195,
    address: "Tunde Motors Carrefour JNP Filling station, 4th street by Cite vie Nouvelle, Cotonou",
    phone: "+229 61 39 80 86",
    website: "https://www.facebook.com/leadiciousCafe",
    description: "Cotonou's premier Nigerian food restaurant, acclaimed as the 'meeting place of the strong and rich.' Renowned for authentic Nigerian cuisine including the best Jollof Rice in Cotonou, served in a modern trendy interior with serene atmosphere. Popular among diplomats, business elites, and Nigerian expats seeking genuine Nigerian flavors and professional dining experience.",
    images: ["https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      facebook: "@leadiciousCafe"
    },
    hours: "9:00 AM - 8:00 PM (Mon-Fri)",
    location: "Cite vie Nouvelle, Cotonou",
    coordinates: {
      lat: 6.3703,
      lng: 2.3912
    },
    enrichedPhones: ["+229 61 39 80 86"],
    enrichedWebsites: ["https://www.facebook.com/leadiciousCafe"],
    enrichedEmails: ["leadiciouscafe@gmail.com"],
    enrichedSocial: {
      facebook: ["@leadiciousCafe"]
    },
    enrichedHours: ["9:00 AM - 8:00 PM (Monday to Friday)"],
    enrichmentSources: ["Facebook", "Leadpreneur Academy", "Business Directory"],
    enrichmentConfidence: 95,
    hasEnrichedData: true,
    specialties: [
      "Nigerian Jollof Rice (Best in Cotonou)",
      "Fried Rice",
      "Egusi soup",
      "Ogbono soup", 
      "Vegetable soup",
      "Wainna/Masa",
      "Fufu",
      "Eba",
      "Pounded Yam"
    ],
    clientele: "Diplomats, business elites, Nigerian expats, power lunch meetings",
    atmosphere: "Modern trendy interior, serene environment, professional dining"
  }
];

// Premium automotive services in Benin - comprehensive automotive expansion
const premiumAutomotiveServices: ProcessedBusiness[] = [
  // AUTO REPAIR SHOPS & GARAGES
  {
    id: "autopro-cotonou",
    name: "AutoPro Cotonou",
    category: "Auto Repair",
    rating: 4.6,
    reviews: 116,
    address: "Carrefour Aéroport, Cotonou",
    phone: "+229 21 30 15 40",
    website: "https://www.facebook.com/AutoProCotonou",
    description: "Cotonou's premier automotive repair center specializing in luxury vehicles (Mercedes, BMW, Audi, Volkswagen, Skoda). Expert electronic diagnostics, complex mechanical repairs with transparent communication and advanced technical skills. Certified technicians with manufacturer-approved equipment.",
    images: ["https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      facebook: "@AutoProCotonou"
    },
    hours: "8:00 AM - 5:30 PM (Mon-Fri), 8:00 AM - 12:30 PM (Sat)",
    location: "Aéroport, Cotonou",
    coordinates: {
      lat: 6.3573,
      lng: 2.3844
    },
    enrichedPhones: ["+229 21 30 15 40"],
    enrichedWebsites: ["https://www.facebook.com/AutoProCotonou"],
    enrichedEmails: ["contact@autoprocotonou.bj"],
    enrichedSocial: {
      facebook: ["@AutoProCotonou"]
    },
    enrichedHours: ["8:00 AM - 5:30 PM (Monday to Friday)", "8:00 AM - 12:30 PM (Saturday)"],
    enrichmentSources: ["AutoMag.bj", "Facebook", "Local Directory"],
    enrichmentConfidence: 92,
    hasEnrichedData: true,
    specialties: [
      "Mercedes-Benz Service",
      "BMW Repairs", 
      "Audi Maintenance",
      "Volkswagen Service",
      "Electronic Diagnostics",
      "Luxury Vehicle Specialists"
    ],
    clientele: "Luxury vehicle owners, embassies, corporate fleets",
    atmosphere: "Professional service center with advanced diagnostic equipment"
  },
  {
    id: "ctba-cotonou",
    name: "Centre Technique Bénin Auto (CTBA)",
    category: "Auto Repair",
    rating: 4.4,
    reviews: 89,
    address: "Akpakpa, Cotonou",
    phone: "+229 21 33 45 67",
    website: "https://www.ctba-benin.com",
    description: "Established 2018, CTBA is Cotonou's trusted automotive center specializing in Toyota, Hyundai, Kia, Peugeot, and Renault. Offers comprehensive maintenance with 6-month warranty, emergency response within 45 minutes. Competitive packages starting from 45,000 FCFA.",
    images: ["https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      facebook: "@CTBABenin"
    },
    hours: "8:00 AM - 12:30 PM, 2:00 PM - 5:30 PM (Mon-Fri)",
    location: "Akpakpa, Cotonou",
    coordinates: {
      lat: 6.3408,
      lng: 2.4183
    },
    enrichedPhones: ["+229 21 33 45 67", "+229 97 45 67 89"],
    enrichedWebsites: ["https://www.ctba-benin.com"],
    enrichedEmails: ["info@ctba-benin.com"],
    enrichedSocial: {
      facebook: ["@CTBABenin"]
    },
    enrichedHours: ["8:00 AM - 12:30 PM, 2:00 PM - 5:30 PM (Monday to Friday)"],
    enrichmentSources: ["AutoMag.bj", "Business Directory"],
    enrichmentConfidence: 90,
    hasEnrichedData: true,
    specialties: [
      "Toyota Service Center",
      "Hyundai Repairs",
      "Kia Maintenance", 
      "Peugeot Service",
      "Emergency Repairs",
      "Electronic Diagnostics"
    ],
    clientele: "Toyota/Hyundai/Kia owners, fleet operators, individual car owners",
    atmosphere: "Modern service facility with transparent pricing and warranty"
  },
  {
    id: "garage-excellence-cotonou",
    name: "Garage Excellence Mécanique",
    category: "Auto Repair",
    rating: 4.5,
    reviews: 73,
    address: "Cadjehoun, Cotonou",
    phone: "+229 21 30 78 90",
    website: "https://www.facebook.com/GarageExcellenceBenin",
    description: "Specialists in automatic transmission repair and hybrid system maintenance. Offers standard and premium service packages with warranty on major repairs. Expert technicians trained on latest automotive technologies.",
    images: ["https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      facebook: "@GarageExcellenceBenin"
    },
    hours: "7:30 AM - 6:00 PM (Mon-Fri), 8:00 AM - 1:00 PM (Sat)",
    location: "Cadjehoun, Cotonou",
    coordinates: {
      lat: 6.3692,
      lng: 2.3889
    },
    enrichedPhones: ["+229 21 30 78 90"],
    enrichedWebsites: ["https://www.facebook.com/GarageExcellenceBenin"],
    enrichedEmails: ["contact@garageexcellence.bj"],
    enrichedSocial: {
      facebook: ["@GarageExcellenceBenin"]
    },
    enrichedHours: ["7:30 AM - 6:00 PM (Monday to Friday)", "8:00 AM - 1:00 PM (Saturday)"],
    enrichmentSources: ["AutoMag.bj", "Local Business Directory"],
    enrichmentConfidence: 88,
    hasEnrichedData: true,
    specialties: [
      "Automatic Transmission Repair",
      "Hybrid Vehicle Service",
      "CVT Transmission",
      "Transmission Diagnostics",
      "Hybrid Battery Service",
      "Electronic Systems"
    ],
    clientele: "Hybrid vehicle owners, automatic transmission vehicles, modern car owners",
    atmosphere: "Technical excellence center with specialized equipment"
  },
  {
    id: "garage-elite-cotonou",
    name: "Garage Élite Cotonou",
    category: "Auto Repair",
    rating: 4.7,
    reviews: 95,
    address: "Fidjrossè, Cotonou",
    phone: "+229 21 38 92 15",
    website: "https://www.facebook.com/GarageEliteCotonou",
    description: "Advanced electronic systems and hybrid vehicle specialists. Expert ECU reprogramming, ADAS calibration, and modern automotive technology. Diagnostic services starting from 35,000 FCFA with 12-month warranty.",
    images: ["https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      facebook: "@GarageEliteCotonou"
    },
    hours: "8:00 AM - 6:00 PM (Mon-Fri), 8:00 AM - 2:00 PM (Sat)",
    location: "Fidjrossè, Cotonou",
    coordinates: {
      lat: 6.3847,
      lng: 2.3958
    },
    enrichedPhones: ["+229 21 38 92 15", "+229 96 38 92 15"],
    enrichedWebsites: ["https://www.facebook.com/GarageEliteCotonou"],
    enrichedEmails: ["info@garage-elite.bj"],
    enrichedSocial: {
      facebook: ["@GarageEliteCotonou"]
    },
    enrichedHours: ["8:00 AM - 6:00 PM (Monday to Friday)", "8:00 AM - 2:00 PM (Saturday)"],
    enrichmentSources: ["AutoMag.bj", "Professional Network"],
    enrichmentConfidence: 93,
    hasEnrichedData: true,
    specialties: [
      "ECU Reprogramming",
      "ADAS Calibration", 
      "Electronic Diagnostics",
      "Hybrid Systems",
      "Advanced Vehicle Technology",
      "Computer Diagnostics"
    ],
    clientele: "Modern vehicle owners, luxury cars, technology-focused automotive needs",
    atmosphere: "High-tech facility with latest diagnostic equipment"
  },
  // CAR DEALERSHIPS
  {
    id: "tunde-motors-cotonou",
    name: "Tunde Motors",
    category: "Car Dealership",
    rating: 4.3,
    reviews: 127,
    address: "06 BP 1130, Cotonou",
    phone: "+229 21 33 35 18",
    website: "https://www.tundemotors.bj",
    description: "Established car dealership offering new and used vehicles across multiple brands. Comprehensive automotive solutions including sales, financing, insurance, and after-sales service. Trusted dealer for over 15 years in Benin market.",
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      facebook: "@TundeMotorsBenin"
    },
    hours: "8:00 AM - 6:00 PM (Mon-Fri), 8:00 AM - 4:00 PM (Sat)",
    location: "Akpakpa, Cotonou",
    coordinates: {
      lat: 6.3456,
      lng: 2.4234
    },
    enrichedPhones: ["+229 21 33 35 18", "+229 97 33 35 18"],
    enrichedWebsites: ["https://www.tundemotors.bj"],
    enrichedEmails: ["sales@tundemotors.bj", "info@tundemotors.bj"],
    enrichedSocial: {
      facebook: ["@TundeMotorsBenin"]
    },
    enrichedHours: ["8:00 AM - 6:00 PM (Monday to Friday)", "8:00 AM - 4:00 PM (Saturday)"],
    enrichmentSources: ["BeninyP.com", "Business Directory"],
    enrichmentConfidence: 91,
    hasEnrichedData: true,
    specialties: [
      "New Vehicle Sales",
      "Used Car Deals",
      "Auto Financing",
      "Trade-in Services",
      "Extended Warranties",
      "Insurance Services"
    ],
    clientele: "Individual buyers, fleet customers, business owners",
    atmosphere: "Professional showroom with comprehensive automotive services"
  },
  {
    id: "cfao-motors-benin",
    name: "CFAO Motors Benin", 
    category: "Car Dealership",
    rating: 4.2,
    reviews: 156,
    address: "01 BP 147, Cotonou",
    phone: "+229 21 38 16 01",
    website: "https://www.cfaomotors.bj",
    description: "Major automotive group representing multiple international brands. Authorized dealer for Toyota, Mitsubishi, and other major manufacturers. Comprehensive services including sales, maintenance, spare parts, and customer support.",
    images: ["https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      facebook: "@CFAOMotorsBenin"
    },
    hours: "8:00 AM - 6:00 PM (Mon-Fri), 8:00 AM - 1:00 PM (Sat)",
    location: "Centre-ville, Cotonou",
    coordinates: {
      lat: 6.3650,
      lng: 2.4183
    },
    enrichedPhones: ["+229 21 38 16 01", "+229 97 38 16 01"],
    enrichedWebsites: ["https://www.cfaomotors.bj"],
    enrichedEmails: ["contact@cfaomotors.bj"],
    enrichedSocial: {
      facebook: ["@CFAOMotorsBenin"]
    },
    enrichedHours: ["8:00 AM - 6:00 PM (Monday to Friday)", "8:00 AM - 1:00 PM (Saturday)"],
    enrichmentSources: ["BeninyP.com", "Corporate Website"],
    enrichmentConfidence: 94,
    hasEnrichedData: true,
    specialties: [
      "Toyota Dealership",
      "Mitsubishi Sales",
      "Authorized Service Center", 
      "Genuine Parts",
      "Corporate Fleet Sales",
      "After-Sales Support"
    ],
    clientele: "Corporate clients, government agencies, individual customers",
    atmosphere: "Modern dealership with international standards"
  },
  {
    id: "bavarian-motors-benin",
    name: "Bavarian Motors Benin",
    category: "Car Dealership", 
    rating: 4.4,
    reviews: 82,
    address: "01 BP 7950, Cotonou",
    phone: "+229 21 07 97 68",
    website: "https://www.bavarianmotors.bj",
    description: "Luxury vehicle specialist focusing on BMW, Mercedes-Benz, and premium European brands. Authorized dealer with certified technicians, genuine parts supply, and premium customer service. Exclusive showroom for luxury automotive segment.",
    images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      facebook: "@BavarianMotorsBenin"
    },
    hours: "8:30 AM - 6:00 PM (Mon-Fri), 9:00 AM - 2:00 PM (Sat)",
    location: "Haie Vive, Cotonou",
    coordinates: {
      lat: 6.3789,
      lng: 2.4056
    },
    enrichedPhones: ["+229 21 07 97 68"],
    enrichedWebsites: ["https://www.bavarianmotors.bj"],
    enrichedEmails: ["sales@bavarianmotors.bj"],
    enrichedSocial: {
      facebook: ["@BavarianMotorsBenin"]
    },
    enrichedHours: ["8:30 AM - 6:00 PM (Monday to Friday)", "9:00 AM - 2:00 PM (Saturday)"],
    enrichmentSources: ["BeninyP.com", "Luxury Auto Network"],
    enrichmentConfidence: 89,
    hasEnrichedData: true,
    specialties: [
      "BMW Dealership",
      "Mercedes-Benz Sales",
      "Luxury Vehicle Import",
      "Premium Service Center",
      "Exclusive Parts Supply",
      "VIP Customer Service"
    ],
    clientele: "High-net-worth individuals, executives, luxury car enthusiasts", 
    atmosphere: "Premium showroom with luxury vehicle experience"
  },
  // AUTO PARTS STORES
  {
    id: "auto-moto-benin",
    name: "Auto Moto Benin",
    category: "Auto Parts",
    rating: 4.1,
    reviews: 64,
    address: "01 BP 7949, Cotonou",
    phone: "+229 21 07 97 68",
    website: "https://www.automotobenin.com",
    description: "Comprehensive auto parts supplier offering engines, body parts, electrical components, truck parts, bus parts, mechanical parts, and accessories. Specializes in both new and used spare parts for all vehicle types.",
    images: ["https://images.unsplash.com/photo-1486754735734-325b5831c3ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      facebook: "@AutoMotoBenin"
    },
    hours: "7:30 AM - 6:00 PM (Mon-Fri), 7:30 AM - 3:00 PM (Sat)",
    location: "Dantokpa, Cotonou",
    coordinates: {
      lat: 6.3692,
      lng: 2.4281
    },
    enrichedPhones: ["+229 21 07 97 68", "+229 96 07 97 68"],
    enrichedWebsites: ["https://www.automotobenin.com"],
    enrichedEmails: ["parts@automotobenin.com"],
    enrichedSocial: {
      facebook: ["@AutoMotoBenin"]
    },
    enrichedHours: ["7:30 AM - 6:00 PM (Monday to Friday)", "7:30 AM - 3:00 PM (Saturday)"],
    enrichmentSources: ["Japanese Car Trade", "Parts Directory"],
    enrichmentConfidence: 86,
    hasEnrichedData: true,
    specialties: [
      "Engine Parts",
      "Body Parts", 
      "Electrical Components",
      "Truck Parts",
      "Bus Components",
      "Automotive Accessories"
    ],
    clientele: "Mechanics, garage owners, vehicle owners, fleet operators",
    atmosphere: "Large parts warehouse with extensive inventory"
  },
  {
    id: "heloma-benin",
    name: "Heloma",
    category: "Auto Parts",
    rating: 4.0,
    reviews: 47,
    address: "01 BP 4117, Cotonou",
    phone: "+229 21 33 30 76",
    website: "https://www.heloma.bj",
    description: "Established auto parts dealer specializing in used vehicles and spare parts. Strong commitment to quality and customer service across all regions. Comprehensive inventory for various vehicle makes and models.",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      facebook: "@HelomaBenin"
    },
    hours: "8:00 AM - 5:30 PM (Mon-Fri), 8:00 AM - 1:00 PM (Sat)",
    location: "Tokpa, Cotonou",
    coordinates: {
      lat: 6.3834,
      lng: 2.4456
    },
    enrichedPhones: ["+229 21 33 30 76"],
    enrichedWebsites: ["https://www.heloma.bj"],
    enrichedEmails: ["info@heloma.bj"],
    enrichedSocial: {
      facebook: ["@HelomaBenin"]
    },
    enrichedHours: ["8:00 AM - 5:30 PM (Monday to Friday)", "8:00 AM - 1:00 PM (Saturday)"],
    enrichmentSources: ["Japanese Car Trade", "Business Directory"],
    enrichmentConfidence: 82,
    hasEnrichedData: true,
    specialties: [
      "Used Auto Parts",
      "Vehicle Spare Parts",
      "Import Services",
      "Parts Sourcing",
      "Quality Used Components",
      "Multi-brand Support"
    ],
    clientele: "Repair shops, individual car owners, parts dealers",
    atmosphere: "Reliable parts supplier with regional coverage"
  },
  // SPECIALIZED SERVICES
  {
    id: "garage-kuabo",
    name: "Garage Kuabo",
    category: "Auto Service", 
    rating: 4.8,
    reviews: 134,
    address: "Abomey-Calavi & Cotonou",
    phone: "+229 97 22 33 33",
    website: "https://www.facebook.com/Garage-Kuabo",
    description: "International standard workshop offering 50+ automotive services including air conditioning recharge, 3D alignment, electromechanical diagnosis/repair. Garage-school providing free professional training for youth integration.",
    images: ["https://images.unsplash.com/photo-1632823471565-1ecdf3d11a41?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      facebook: "@GarageKuabo"
    },
    hours: "7:00 AM - 6:00 PM (Mon-Fri), 7:00 AM - 2:00 PM (Sat)",
    location: "Abomey-Calavi & Cotonou",
    coordinates: {
      lat: 6.4419,
      lng: 2.3570
    },
    enrichedPhones: ["+229 97 22 33 33"],
    enrichedWebsites: ["https://www.facebook.com/Garage-Kuabo"],
    enrichedEmails: ["contact@garagekyabo.bj"],
    enrichedSocial: {
      facebook: ["@GarageKuabo"]
    },
    enrichedHours: ["7:00 AM - 6:00 PM (Monday to Friday)", "7:00 AM - 2:00 PM (Saturday)"],
    enrichmentSources: ["GoAfrica Online", "Facebook Business"],
    enrichmentConfidence: 96,
    hasEnrichedData: true,
    specialties: [
      "50+ Automotive Services",
      "3D Wheel Alignment",
      "Air Conditioning Service",
      "Electromechanical Diagnostics",
      "Professional Training",
      "International Standards"
    ],
    clientele: "All vehicle types, professional training students, comprehensive service needs",
    atmosphere: "Modern training facility with comprehensive service center"
  },
  {
    id: "gia-services-cotonou",
    name: "GIA Services",
    category: "Auto Service",
    rating: 4.5,
    reviews: 78,
    address: "Centre-ville, Cotonou",
    phone: "+229 21 31 45 78",
    website: "http://www.garagegiaservices.com",
    description: "Professional private garage specializing in gasoline and diesel vehicles (thermal and hybrid engines) of all brands. Advanced diagnostic scanners, express maintenance, bodywork, painting, air conditioning, insurance, and expertise.",
    images: ["https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      website: "garagegiaservices.com"
    },
    hours: "8:00 AM - 6:00 PM (Mon-Fri), 8:00 AM - 1:00 PM (Sat)",
    location: "Centre-ville, Cotonou",
    coordinates: {
      lat: 6.3650,
      lng: 2.4183
    },
    enrichedPhones: ["+229 21 31 45 78"],
    enrichedWebsites: ["http://www.garagegiaservices.com"],
    enrichedEmails: ["contact@garagegiaservices.com"],
    enrichedSocial: {
      website: ["garagegiaservices.com"]
    },
    enrichedHours: ["8:00 AM - 6:00 PM (Monday to Friday)", "8:00 AM - 1:00 PM (Saturday)"],
    enrichmentSources: ["Company Website", "Professional Network"],
    enrichmentConfidence: 88,
    hasEnrichedData: true,
    specialties: [
      "Professional Diagnostic Scanners",
      "Hybrid Engine Service",
      "Express Maintenance",
      "Bodywork & Painting",
      "Air Conditioning Service",
      "Insurance & Expertise"
    ],
    clientele: "All vehicle brands, hybrid vehicles, comprehensive automotive needs",
    atmosphere: "Professional service center with latest technology"
  }
];

// Premium Professional Services in Benin - Phase 2 Expansion
const premiumProfessionalServices: ProcessedBusiness[] = [
  // ACCOUNTING FIRMS & FINANCIAL SERVICES
  {
    id: "exco-fidaf-cotonou",
    name: "EXCO FIDAF (Fiduciaire d'Afrique)",
    category: "Accounting",
    rating: 4.7,
    reviews: 85,
    address: "Rue Lagunaire n°840, 01 BP 663, Cotonou",
    phone: "+229 21 30 52 55",
    website: "https://excoafrique.com",
    description: "Established 1975, EXCO FIDAF is Benin's premier accounting, audit and consulting firm with 60+ employees and 5 certified public accountants. Member of Kreston International network with 40+ hours annual continuing education. Serves entrepreneurs, SMEs, and public/private groups with SAARI management software implementation.",
    images: ["https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      linkedin: "@ExcoAfrique"
    },
    hours: "8:00 AM - 5:30 PM (Mon-Fri)",
    location: "Centre-ville, Cotonou",
    coordinates: {
      lat: 6.3654,
      lng: 2.4183
    },
    enrichedPhones: ["+229 21 30 52 55"],
    enrichedWebsites: ["https://excoafrique.com"],
    enrichedEmails: ["contact@excoafrique.com"],
    enrichedSocial: {
      linkedin: ["@ExcoAfrique"]
    },
    enrichedHours: ["8:00 AM - 5:30 PM (Monday to Friday)"],
    enrichmentSources: ["Official Website", "Kreston International", "OECCA-BENIN"],
    enrichmentConfidence: 95,
    hasEnrichedData: true,
    specialties: [
      "Certified Public Accounting",
      "Financial Audit",
      "Business Consulting",
      "Tax Advisory",
      "SAARI Software Implementation",
      "International Network"
    ],
    clientele: "Entrepreneurs, SMEs, public organizations, international clients",
    atmosphere: "Professional accounting firm with international standards"
  },
  {
    id: "bmac-associes-abomey-calavi",
    name: "BMAC & Associés",
    category: "Accounting",
    rating: 4.5,
    reviews: 94,
    address: "Ilot: 326 N, Zone de la Béninoise, Rue face FECECAM Aïtchédji, Abomey-Calavi",
    phone: "+229 0155 47 4141",
    website: "https://bmac-associes.com",
    description: "BMAC & Associés is a leading accounting expertise, audit and business consulting firm registered with OECCA-BENIN under No. 112-SE. Specializes in business creation, legal support, statutory audit, social management, and taxation with secure document archiving.",
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      facebook: "@BMACAssocies",
      linkedin: "@BMACAssocies"
    },
    hours: "8:00 AM - 6:00 PM (Mon-Fri)",
    location: "Abomey-Calavi",
    coordinates: {
      lat: 6.4419,
      lng: 2.3419
    },
    enrichedPhones: ["+229 0155 47 4141"],
    enrichedWebsites: ["https://bmac-associes.com"],
    enrichedEmails: ["Contact@bmac-associes.com"],
    enrichedSocial: {
      facebook: ["@BMACAssocies"],
      linkedin: ["@BMACAssocies"]
    },
    enrichedHours: ["8:00 AM - 6:00 PM (Monday to Friday)"],
    enrichmentSources: ["Official Website", "OECCA-BENIN", "Business Directory"],
    enrichmentConfidence: 92,
    hasEnrichedData: true,
    specialties: [
      "Business Creation",
      "Legal Support", 
      "Contractual Audit",
      "Statutory Audit",
      "Social Management & Payroll",
      "Management Consulting"
    ],
    clientele: "Businesses, entrepreneurs, corporations requiring audit services",
    atmosphere: "Professional accounting firm with rigorous service and secure archiving"
  },
  // LAW FIRMS & LEGAL SERVICES
  {
    id: "scpa-gama-cotonou",
    name: "SCPA GAMA & Associés",
    category: "Legal Services",
    rating: 4.8,
    reviews: 73,
    address: "C/756 Parcelle F Cadjehoun 2, rue face à la Clinique Aupiais (Clinique CICA)",
    phone: "+229 01 69 00 09 99",
    website: "https://gama-avocatsafrique.com",
    description: "Civil Professional Law Firm formed by merger of four law offices led by experienced attorneys. Specializes in OHADA business law, international contract law, PPP contracts, arbitration, and debt collection. Features mobile app and serves 10+ legal professionals.",
    images: ["https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      facebook: "@GAMAAvocats"
    },
    hours: "8:00 AM - 6:00 PM (Mon-Fri)",
    location: "Cadjehoun, Cotonou",
    coordinates: {
      lat: 6.3721,
      lng: 2.4289
    },
    enrichedPhones: ["+229 01 69 00 09 99"],
    enrichedWebsites: ["https://gama-avocatsafrique.com"],
    enrichedEmails: ["contact@gama-avocatsafrique.com"],
    enrichedSocial: {
      facebook: ["@GAMAAvocats"]
    },
    enrichedHours: ["8:00 AM - 6:00 PM (Monday to Friday)"],
    enrichmentSources: ["Official Website", "Benin Bar Association", "App Stores"],
    enrichmentConfidence: 94,
    hasEnrichedData: true,
    specialties: [
      "OHADA Business Law",
      "International Contract Law",
      "Public-Private Partnership Contracts",
      "Commercial Corporate Law",
      "Securities Law",
      "Arbitration"
    ],
    clientele: "Corporations, international businesses, government entities",
    atmosphere: "Modern law firm with mobile app and 4 founding partners"
  },
  {
    id: "cabinet-yabit-cotonou",
    name: "Cabinet d'Avocats Yabit",
    category: "Legal Services",
    rating: 4.6,
    reviews: 89,
    address: "Carré numéro 750 Cotonou Gbegamey - 03 BP 303 Cotonou",
    phone: "+229 96 15 13 44",
    website: "https://avocatyabit.bj",
    description: "Led by Maître Armel Timothée YABIT with 10+ years experience. Flexible, open, multidisciplinary law firm specializing in business law, tax law, civil law, criminal law, and family law. Philosophy: 'The lawyer should be an integral part of your daily life.'",
    images: ["https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      linkedin: "@timothe-yabit",
      facebook: "@cabinetavocatsyabit",
      twitter: "@avocat_yabit"
    },
    hours: "8:00 AM - 6:30 PM (Mon-Fri)",
    location: "Gbegamey, Cotonou",
    coordinates: {
      lat: 6.3828,
      lng: 2.4196
    },
    enrichedPhones: ["+229 96 15 13 44"],
    enrichedWebsites: ["https://avocatyabit.bj"],
    enrichedEmails: ["contact@avocatyabit.bj"],
    enrichedSocial: {
      linkedin: ["@timothe-yabit"],
      facebook: ["@cabinetavocatsyabit"],
      twitter: ["@avocat_yabit"]
    },
    enrichedHours: ["8:00 AM - 6:30 PM (Monday to Friday)"],
    enrichmentSources: ["Official Website", "Social Media", "Benin Bar Association"],
    enrichmentConfidence: 91,
    hasEnrichedData: true,
    specialties: [
      "Business Law",
      "Administrative Law",
      "Tax Law",
      "Criminal Law",
      "Civil Law",
      "Family Law"
    ],
    clientele: "Businesses, individuals, families requiring comprehensive legal support",
    atmosphere: "Multidisciplinary firm with daily legal support philosophy"
  },
  // IT SERVICES & TECHNOLOGY COMPANIES
  {
    id: "hgtech-cotonou",
    name: "HGTech",
    category: "IT Services",
    rating: 4.9,
    reviews: 127,
    address: "Rue 2172B Menontin Cotonou, Lot 2134, Immeuble Pâtisserie Excellence",
    phone: "+229 6701 0909",
    website: "https://hgtech.bj",
    description: "Digital Services Enterprise (ESN) specializing in web/mobile development, custom software, AI solutions, and IT consulting. Serves notable clients including PNUD, Ministère du Travail, and Cour Constitutionnelle. Expert in Microsoft Azure administration and system integration.",
    images: ["https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      facebook: "@HGTechBenin",
      linkedin: "@HGTech"
    },
    hours: "8:00 AM - 6:00 PM (Mon-Fri)",
    location: "Menontin, Cotonou",
    coordinates: {
      lat: 6.3812,
      lng: 2.4256
    },
    enrichedPhones: ["+229 6701 0909"],
    enrichedWebsites: ["https://hgtech.bj"],
    enrichedEmails: ["contact@hgtech.bj"],
    enrichedSocial: {
      facebook: ["@HGTechBenin"],
      linkedin: ["@HGTech"]
    },
    enrichedHours: ["8:00 AM - 6:00 PM (Monday to Friday)"],
    enrichmentSources: ["Official Website", "Government Contracts", "Business Directory"],
    enrichmentConfidence: 96,
    hasEnrichedData: true,
    specialties: [
      "Web & Mobile Development",
      "Custom Software Solutions",
      "AI Integration",
      "Microsoft Azure Administration",
      "Network Administration",
      "Digital Dematerialization"
    ],
    clientele: "Government agencies, international organizations, enterprises",
    atmosphere: "Enterprise-level IT services with government and international clients"
  },
  {
    id: "olasoft-cotonou",
    name: "OlaSoft",
    category: "IT Services",
    rating: 4.7,
    reviews: 98,
    address: "Agla Hlazounto quarter, 1st floor of National Lottery building",
    phone: "+229 66 54 21 24",
    website: "https://olasoft.net",
    description: "Software development company registered in Benin's commercial registry (RCCM RB/COT/18 B 21298). Specializes in desktop, web, and mobile applications with 24/7 client support. Expert team in C++, PHP, JavaScript, and database administration.",
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
    social_links: {
      twitter: "@OlaSoftBenin",
      facebook: "@OlaSoft"
    },
    hours: "8:00 AM - 6:30 PM (Mon-Fri)",
    location: "Agla, Cotonou",
    coordinates: {
      lat: 6.3785,
      lng: 2.4189
    },
    enrichedPhones: ["+229 66 54 21 24", "+229 65 01 91 23"],
    enrichedWebsites: ["https://olasoft.net"],
    enrichedEmails: ["contact@olasoft.net"],
    enrichedSocial: {
      twitter: ["@OlaSoftBenin"],
      facebook: ["@OlaSoft"]
    },
    enrichedHours: ["8:00 AM - 6:30 PM (Monday to Friday)"],
    enrichmentSources: ["Official Website", "Commercial Registry", "Social Media"],
    enrichmentConfidence: 89,
    hasEnrichedData: true,
    specialties: [
      "Desktop Applications",
      "Web Applications", 
      "Mobile App Development",
      "Database Solutions",
      "Digital Marketing",
      "24/7 Support"
    ],
    clientele: "Businesses requiring custom software solutions and digital marketing",
    atmosphere: "Innovative software company with quick delivery and 24/7 support"
  }
];

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  console.log(`🚀 ArticlePage component mounted with slug: "${slug}"`);
  const { businesses, loading, error, getByLocation, getByCategoryAndLocation, getByCategory } = useRealBusinessData();
  
  // All hooks must be at the top level
  const [article, setArticle] = useState<any>(null);
  const [articleLoading, setArticleLoading] = useState(true);

  useEffect(() => {
    const generateArticleContent = async () => {
      if (!slug) {
        console.log(`❌ No slug provided to ArticlePage`);
        return;
      }
      console.log(`📄 Starting article generation for slug: "${slug}"`);
      
      // Wait for business data to load before generating articles
      if (loading) {
        console.log('⏳ Still loading business data, waiting...');
        return;
      }
      
      setArticleLoading(true);
      let generatedArticle = null;

      try {
        // Article pattern mapping based on PopularSearches data
        const articlePatterns = [
          // 🏛️ PORTO-NOVO PATTERNS FIRST (High Priority)
          { pattern: /best-hotels-porto-novo-(.+)/, category: 'Hotels', hasCity: 'porto-novo' },
          { pattern: /hotels-porto-novo-(.+)/, category: 'Hotels', hasCity: 'porto-novo' },
          { pattern: /best-restaurants-porto-novo-(.+)/, category: 'Restaurants', hasCity: 'porto-novo' },
          { pattern: /restaurants-porto-novo-(.+)/, category: 'Restaurants', hasCity: 'porto-novo' },
          { pattern: /banks-porto-novo-(.+)/, category: 'Banks', hasCity: 'porto-novo' },
          { pattern: /best-banks-porto-novo-(.+)/, category: 'Banks', hasCity: 'porto-novo' },
          
          // 💎 LUXURY & LIFESTYLE PATTERNS (Phase 4 - High Priority)
          // Jewelry Stores
          { pattern: /luxury-jewelry-stores-(.+)/, category: 'Jewelry', hasCity: true },
          { pattern: /best-jewelry-stores-(.+)/, category: 'Jewelry', hasCity: true },
          { pattern: /jewelry-stores-(.+)/, category: 'Jewelry', hasCity: true },
          { pattern: /diamond-jewelry-(.+)/, category: 'Jewelry', hasCity: true },
          { pattern: /gold-jewelry-(.+)/, category: 'Jewelry', hasCity: true },
          { pattern: /luxury-watches-(.+)/, category: 'Jewelry', hasCity: true },
          { pattern: /precious-stones-(.+)/, category: 'Jewelry', hasCity: true },
          { pattern: /custom-jewelry-(.+)/, category: 'Jewelry', hasCity: true },
          
          // Spa & Wellness Centers
          { pattern: /luxury-spa-centers-(.+)/, category: 'Spa & Wellness', hasCity: true },
          { pattern: /best-spa-centers-(.+)/, category: 'Spa & Wellness', hasCity: true },
          { pattern: /spa-wellness-(.+)/, category: 'Spa & Wellness', hasCity: true },
          { pattern: /wellness-centers-(.+)/, category: 'Spa & Wellness', hasCity: true },
          { pattern: /spa-treatments-(.+)/, category: 'Spa & Wellness', hasCity: true },
          { pattern: /massage-therapy-(.+)/, category: 'Spa & Wellness', hasCity: true },
          { pattern: /medical-spa-(.+)/, category: 'Spa & Wellness', hasCity: true },
          
          // High-End Beauty Salons (Distinct from general beauty)
          { pattern: /luxury-beauty-salons-(.+)/, category: 'Beauty Salon', hasCity: true },
          { pattern: /high-end-beauty-(.+)/, category: 'Beauty Salon', hasCity: true },
          { pattern: /premium-beauty-salons-(.+)/, category: 'Beauty Salon', hasCity: true },
          { pattern: /elite-beauty-salon-(.+)/, category: 'Beauty Salon', hasCity: true },
          { pattern: /luxury-hair-salon-(.+)/, category: 'Beauty Salon', hasCity: true },
          { pattern: /vip-beauty-services-(.+)/, category: 'Beauty Salon', hasCity: true },
          
          // Luxury Hotels (Premium segment)
          { pattern: /luxury-hotels-(.+)/, category: 'Hotels', hasCity: true },
          { pattern: /five-star-hotels-(.+)/, category: 'Hotels', hasCity: true },
          { pattern: /premium-hotels-(.+)/, category: 'Hotels', hasCity: true },
          { pattern: /boutique-hotels-(.+)/, category: 'Hotels', hasCity: true },
          
          // Fine Dining (Premium restaurants)
          { pattern: /fine-dining-restaurants-(.+)/, category: 'Restaurants', hasCity: true },
          { pattern: /luxury-restaurants-(.+)/, category: 'Restaurants', hasCity: true },
          { pattern: /gourmet-restaurants-(.+)/, category: 'Restaurants', hasCity: true },
          { pattern: /upscale-dining-(.+)/, category: 'Restaurants', hasCity: true },
          
          // Luxury Shopping (General luxury retail)
          { pattern: /luxury-shopping-(.+)/, category: 'Shopping', hasCity: true },
          { pattern: /luxury-services-(.+)/, category: 'Services', hasCity: true },
          { pattern: /premium-shopping-(.+)/, category: 'Shopping', hasCity: true },
          { pattern: /luxury-lifestyle-(.+)/, category: 'Services', hasCity: true },
          
          // Photography Studios
          { pattern: /best-photography-studios-(.+)/, category: 'Services', hasCity: true },
          { pattern: /photography-studios-(.+)/, category: 'Services', hasCity: true },
          
          // Restaurants 
          { pattern: /top-restaurants-(.+)/, category: 'Restaurants', hasCity: true },
          { pattern: /best-restaurants-(.+)/, category: 'Restaurants', hasCity: true },
          
          // Hotels
          { pattern: /best-hotels-(.+)/, category: 'Hotels', hasCity: true },
          { pattern: /hotels-(.+)/, category: 'Hotels', hasCity: true },
          
          // Tourist Agencies
          { pattern: /tourist-agencies-(.+)/, category: 'Services', hasCity: true },
          { pattern: /top-tourist-agencies-(.+)/, category: 'Services', hasCity: true },
          
          // Logistics
          { pattern: /top-logistic-companies-(.+)/, category: 'Transportation', hasCity: false },
          { pattern: /logistic-companies-(.+)/, category: 'Transportation', hasCity: false },
          
          // Digital Marketing
          { pattern: /digital-marketing-agencies-(.+)/, category: 'Services', hasCity: true },
          { pattern: /best-digital-marketing-agencies-(.+)/, category: 'Services', hasCity: true },
          
          // Fashion Boutiques & Clothing Stores (specific clothing focus)
          { pattern: /fashion-boutiques-(.+)/, category: 'ClothingStores', hasCity: true },
          { pattern: /top-fashion-boutiques-(.+)/, category: 'ClothingStores', hasCity: true },
          { pattern: /clothing-stores-(.+)/, category: 'ClothingStores', hasCity: true },
          { pattern: /best-clothing-stores-(.+)/, category: 'ClothingStores', hasCity: true },
          { pattern: /top-clothing-stores-(.+)/, category: 'ClothingStores', hasCity: true },
          
          // General Shopping & Marketplaces
          { pattern: /best-shopping-(.+)/, category: 'Shopping', hasCity: true },
          { pattern: /shopping-centers-(.+)/, category: 'Shopping', hasCity: true },
          { pattern: /marketplaces-(.+)/, category: 'Shopping', hasCity: true },
          { pattern: /best-markets-(.+)/, category: 'Shopping', hasCity: true },
          
          // Auto Repair
          { pattern: /auto-repair-(.+)/, category: 'Services', hasCity: true },
          { pattern: /best-auto-repair-shops-(.+)/, category: 'Services', hasCity: true },
          
          // Wedding Venues
          { pattern: /wedding-venues-(.+)/, category: 'Entertainment', hasCity: true },
          { pattern: /top-wedding-venues-(.+)/, category: 'Entertainment', hasCity: true },
          
          // Pharmacies
          { pattern: /pharmacies-(.+)/, category: 'Health', hasCity: true },
          { pattern: /best-pharmacies-(.+)/, category: 'Health', hasCity: true },
          
          // Electronics Stores
          { pattern: /electronics-stores-(.+)/, category: 'Shopping', hasCity: true },
          { pattern: /top-electronics-stores-(.+)/, category: 'Shopping', hasCity: true },
          
          // Schools
          { pattern: /schools-(.+)/, category: 'Education', hasCity: true },
          { pattern: /best-schools-(.+)/, category: 'Education', hasCity: true },
          
          // Legal Services
          { pattern: /legal-services-(.+)/, category: 'Services', hasCity: true },
          { pattern: /top-legal-services-(.+)/, category: 'Services', hasCity: true },
          
          // Beauty & Hair Salons (specialized beauty category)
          { pattern: /beauty-salons-(.+)/, category: 'BeautyServices', hasCity: true },
          { pattern: /best-beauty-salons-(.+)/, category: 'BeautyServices', hasCity: true },
          { pattern: /hair-salons-(.+)/, category: 'BeautyServices', hasCity: true },
          { pattern: /best-hair-salons-(.+)/, category: 'BeautyServices', hasCity: true },
          { pattern: /top-hair-salons-(.+)/, category: 'BeautyServices', hasCity: true },
          
          // Construction Companies
          { pattern: /construction-companies-(.+)/, category: 'Services', hasCity: false },
          { pattern: /best-construction-companies-(.+)/, category: 'Services', hasCity: true },
          { pattern: /top-construction-companies-(.+)/, category: 'Services', hasCity: false },
          
          // Real Estate
          { pattern: /real-estate-(.+)/, category: 'Services', hasCity: true },
          { pattern: /best-real-estate-agencies-(.+)/, category: 'Services', hasCity: true },
          
          // IT Services
          { pattern: /it-services-(.+)/, category: 'Services', hasCity: true },
          { pattern: /top-it-service-providers-(.+)/, category: 'Services', hasCity: true },
          
          // Fitness Centers
          { pattern: /fitness-centers-(.+)/, category: 'Health', hasCity: true },
          { pattern: /best-fitness-centers-(.+)/, category: 'Health', hasCity: true },
          
          // Supermarkets
          { pattern: /supermarkets-(.+)/, category: 'Shopping', hasCity: true },
          { pattern: /top-supermarkets-(.+)/, category: 'Shopping', hasCity: true },
          
          // Banks
          { pattern: /banks-(.+)/, category: 'Finance', hasCity: false },
          { pattern: /best-banks-(.+)/, category: 'Finance', hasCity: false },
          
          // PHASE 1: HIGH-IMPACT CITY ARTICLES
          // Clothing Stores
          { pattern: /best-clothing-stores-(.+)/, category: 'Shopping', hasCity: true },
          { pattern: /clothing-stores-(.+)/, category: 'Shopping', hasCity: true },
          
          // Technology & IT Services
          { pattern: /it-services-(.+)/, category: 'TechnologyServices', hasCity: true },
          { pattern: /best-it-services-(.+)/, category: 'TechnologyServices', hasCity: true },
          { pattern: /tech-companies-(.+)/, category: 'TechnologyServices', hasCity: true },
          { pattern: /software-development-(.+)/, category: 'TechnologyServices', hasCity: true },
          { pattern: /digital-services-(.+)/, category: 'TechnologyServices', hasCity: true },
          
          // Construction Companies  
          { pattern: /best-construction-companies-(.+)/, category: 'Services', hasCity: true },
          
          // Health Services
          { pattern: /best-health-services-(.+)/, category: 'Health', hasCity: true },
          { pattern: /health-services-(.+)/, category: 'Health', hasCity: true },
          { pattern: /medical-directory-(.+)/, category: 'Health', hasCity: true },
          
          // Bakeries
          { pattern: /best-bakeries-(.+)/, category: 'Food', hasCity: true },
          { pattern: /bakeries-(.+)/, category: 'Food', hasCity: true },
          
          // Bars & Nightlife
          { pattern: /best-bars-(.+)/, category: 'Entertainment', hasCity: true },
          { pattern: /bars-(.+)/, category: 'Entertainment', hasCity: true },
          { pattern: /nightlife-(.+)/, category: 'Entertainment', hasCity: true },
          
          // Education/Schools
          { pattern: /education-directory-(.+)/, category: 'Education', hasCity: true },
          { pattern: /education-(.+)/, category: 'Education', hasCity: true },
          
          // Wedding Services
          { pattern: /wedding-services-(.+)/, category: 'Services', hasCity: true },
          { pattern: /best-wedding-(.+)/, category: 'Services', hasCity: true },
          
          // Premium Business Guides
          { pattern: /premium-businesses-(.+)/, category: 'Services', hasCity: true },
          { pattern: /five-star-(.+)/, category: 'Services', hasCity: true },
          
          // Cultural & Tourism (Abomey specific)
          { pattern: /cultural-heritage-(.+)/, category: 'Tourism', hasCity: true },
          { pattern: /tourism-services-(.+)/, category: 'Tourism', hasCity: true },
          
          // PHASE 2: NATIONAL CATEGORY ARTICLES
          { pattern: /(.+)-benin-republic-(.+)/, category: 'Services', hasCity: false },
          { pattern: /benin-(.+)-directory/, category: 'Services', hasCity: false },
          { pattern: /best-(.+)-benin-(.+)/, category: 'Services', hasCity: false },
          
          // PHASE 3: GEOGRAPHIC EXPANSION - Porto-Novo (Capital City)
          
          // Government & Administrative Services
          { pattern: /government-services-porto-novo-(.+)/, category: 'Government Services', hasCity: 'porto-novo' },
          { pattern: /administrative-services-porto-novo-(.+)/, category: 'Government Services', hasCity: 'porto-novo' },
          { pattern: /prefecture-services-porto-novo-(.+)/, category: 'Government Services', hasCity: 'porto-novo' },
          { pattern: /ministry-offices-porto-novo-(.+)/, category: 'Government Services', hasCity: 'porto-novo' },
          { pattern: /city-hall-services-porto-novo-(.+)/, category: 'Government Services', hasCity: 'porto-novo' },
          
          // Hotels & Hospitality
          { pattern: /best-hotels-porto-novo-(.+)/, category: 'Hotels', hasCity: 'porto-novo' },
          { pattern: /hotels-porto-novo-(.+)/, category: 'Hotels', hasCity: 'porto-novo' },
          { pattern: /accommodations-porto-novo-(.+)/, category: 'Hotels', hasCity: 'porto-novo' },
          { pattern: /guesthouses-porto-novo-(.+)/, category: 'Hotels', hasCity: 'porto-novo' },
          { pattern: /boutique-hotels-porto-novo-(.+)/, category: 'Hotels', hasCity: 'porto-novo' },
          
          // Restaurants & Dining
          { pattern: /best-restaurants-porto-novo-(.+)/, category: 'Restaurants', hasCity: 'porto-novo' },
          { pattern: /restaurants-porto-novo-(.+)/, category: 'Restaurants', hasCity: 'porto-novo' },
          { pattern: /african-restaurants-porto-novo-(.+)/, category: 'Restaurants', hasCity: 'porto-novo' },
          { pattern: /fine-dining-porto-novo-(.+)/, category: 'Restaurants', hasCity: 'porto-novo' },
          { pattern: /traditional-food-porto-novo-(.+)/, category: 'Restaurants', hasCity: 'porto-novo' },
          { pattern: /vegan-restaurants-porto-novo-(.+)/, category: 'Restaurants', hasCity: 'porto-novo' },
          
          // Tourism & Cultural Attractions
          { pattern: /tourism-porto-novo-(.+)/, category: 'Tourism', hasCity: 'porto-novo' },
          { pattern: /cultural-attractions-porto-novo-(.+)/, category: 'Tourism', hasCity: 'porto-novo' },
          { pattern: /museums-porto-novo-(.+)/, category: 'Tourism', hasCity: 'porto-novo' },
          { pattern: /tour-guides-porto-novo-(.+)/, category: 'Tourism', hasCity: 'porto-novo' },
          { pattern: /heritage-sites-porto-novo-(.+)/, category: 'Tourism', hasCity: 'porto-novo' },
          { pattern: /travel-agencies-porto-novo-(.+)/, category: 'Tourism', hasCity: 'porto-novo' },
          
          // Banking & Financial Services
          { pattern: /banks-porto-novo-(.+)/, category: 'Banks', hasCity: 'porto-novo' },
          { pattern: /best-banks-porto-novo-(.+)/, category: 'Banks', hasCity: 'porto-novo' },
          { pattern: /microfinance-porto-novo-(.+)/, category: 'Microfinance', hasCity: 'porto-novo' },
          { pattern: /financial-services-porto-novo-(.+)/, category: 'Banks', hasCity: 'porto-novo' },
          { pattern: /commercial-banks-porto-novo-(.+)/, category: 'Banks', hasCity: 'porto-novo' },
          
          // Commercial & Retail
          { pattern: /supermarkets-porto-novo-(.+)/, category: 'Supermarkets', hasCity: 'porto-novo' },
          { pattern: /pharmacies-porto-novo-(.+)/, category: 'Pharmacies', hasCity: 'porto-novo' },
          { pattern: /electronics-stores-porto-novo-(.+)/, category: 'Electronics', hasCity: 'porto-novo' },
          { pattern: /clothing-stores-porto-novo-(.+)/, category: 'Clothing', hasCity: 'porto-novo' },
          { pattern: /fashion-boutiques-porto-novo-(.+)/, category: 'Clothing', hasCity: 'porto-novo' },
          { pattern: /shopping-porto-novo-(.+)/, category: 'Supermarkets', hasCity: 'porto-novo' },
          
          // Telecommunications
          { pattern: /telecommunications-porto-novo-(.+)/, category: 'Telecommunications', hasCity: 'porto-novo' },
          { pattern: /mobile-services-porto-novo-(.+)/, category: 'Telecommunications', hasCity: 'porto-novo' },
          { pattern: /internet-providers-porto-novo-(.+)/, category: 'Telecommunications', hasCity: 'porto-novo' },
          
          // Transportation & Logistics
          { pattern: /transportation-porto-novo-(.+)/, category: 'Transportation', hasCity: 'porto-novo' },
          { pattern: /taxi-services-porto-novo-(.+)/, category: 'Transportation', hasCity: 'porto-novo' },
          { pattern: /zemijan-services-porto-novo-(.+)/, category: 'Transportation', hasCity: 'porto-novo' },
          { pattern: /logistics-porto-novo-(.+)/, category: 'Logistics', hasCity: 'porto-novo' },
          { pattern: /shipping-services-porto-novo-(.+)/, category: 'Logistics', hasCity: 'porto-novo' },
          { pattern: /freight-services-porto-novo-(.+)/, category: 'Logistics', hasCity: 'porto-novo' },
          
          // General Porto-Novo Business Directory
          { pattern: /business-directory-porto-novo-(.+)/, category: 'Services', hasCity: 'porto-novo' },
          { pattern: /porto-novo-business-guide-(.+)/, category: 'Services', hasCity: 'porto-novo' },
          { pattern: /capital-city-services-porto-novo-(.+)/, category: 'Services', hasCity: 'porto-novo' },
          { pattern: /best-businesses-porto-novo-(.+)/, category: 'Services', hasCity: 'porto-novo' },
          
          // PHASE 2: GEOGRAPHIC EXPANSION - Parakou (Northern Hub)
          { pattern: /best-businesses-parakou-(.+)/, category: 'Services', hasCity: true },
          { pattern: /agricultural-services-parakou-(.+)/, category: 'Agriculture', hasCity: true },
          { pattern: /transport-services-parakou-(.+)/, category: 'Transportation', hasCity: true },
          { pattern: /best-restaurants-parakou-(.+)/, category: 'Restaurants', hasCity: true },
          { pattern: /trading-companies-parakou-(.+)/, category: 'Services', hasCity: true },
          { pattern: /logistics-parakou-(.+)/, category: 'Transportation', hasCity: true },
          
          // PHASE 2: GEOGRAPHIC EXPANSION - Bohicon (Regional Center)  
          { pattern: /best-businesses-bohicon-(.+)/, category: 'Services', hasCity: true },
          { pattern: /cultural-services-bohicon-(.+)/, category: 'Entertainment', hasCity: true },
          { pattern: /best-restaurants-bohicon-(.+)/, category: 'Restaurants', hasCity: true },
          { pattern: /schools-bohicon-(.+)/, category: 'Education', hasCity: true },
          { pattern: /healthcare-bohicon-(.+)/, category: 'Health', hasCity: true },

          // PHASE 2: GEOGRAPHIC EXPANSION - Natitingou (Tourism Gateway)
          { pattern: /best-businesses-natitingou-(.+)/, category: 'Services', hasCity: true },
          { pattern: /safari-tours-natitingou-(.+)/, category: 'Tourism', hasCity: true },
          { pattern: /wildlife-tours-natitingou-(.+)/, category: 'Tourism', hasCity: true },
          { pattern: /pendjari-tours-natitingou-(.+)/, category: 'Tourism', hasCity: true },
          { pattern: /eco-lodges-natitingou-(.+)/, category: 'Hotels', hasCity: true },
          { pattern: /best-restaurants-natitingou-(.+)/, category: 'Restaurants', hasCity: true },
          { pattern: /adventure-tourism-natitingou-(.+)/, category: 'Tourism', hasCity: true },
          
          // PHASE 2: GEOGRAPHIC EXPANSION - Djougou (Commercial Center)
          { pattern: /best-businesses-djougou-(.+)/, category: 'Services', hasCity: true },
          { pattern: /commercial-services-djougou-(.+)/, category: 'Services', hasCity: true },
          { pattern: /trading-companies-djougou-(.+)/, category: 'Services', hasCity: true },
          { pattern: /best-restaurants-djougou-(.+)/, category: 'Restaurants', hasCity: true },
          { pattern: /logistics-djougou-(.+)/, category: 'Transportation', hasCity: true },
          { pattern: /wholesale-markets-djougou-(.+)/, category: 'Shopping', hasCity: true },
          { pattern: /transport-services-djougou-(.+)/, category: 'Transportation', hasCity: true },
          
          // PHASE 2: GEOGRAPHIC EXPANSION - Ouidah (Historical Coastal City)
          { pattern: /best-businesses-ouidah-(.+)/, category: 'Services', hasCity: true },
          { pattern: /heritage-tours-ouidah-(.+)/, category: 'Tourism', hasCity: true },
          { pattern: /historical-sites-ouidah-(.+)/, category: 'Tourism', hasCity: true },
          { pattern: /voodoo-cultural-tours-ouidah-(.+)/, category: 'Tourism', hasCity: true },
          { pattern: /door-of-no-return-tours-ouidah-(.+)/, category: 'Tourism', hasCity: true },
          { pattern: /best-restaurants-ouidah-(.+)/, category: 'Restaurants', hasCity: true },
          { pattern: /beach-resorts-ouidah-(.+)/, category: 'Hotels', hasCity: true },
          { pattern: /coastal-tourism-ouidah-(.+)/, category: 'Tourism', hasCity: true },
          { pattern: /art-galleries-ouidah-(.+)/, category: 'Entertainment', hasCity: true },
          
          // PHASE 3: PREMIUM BUSINESS SPOTLIGHTS
          { pattern: /thysia-more-(.+)/, category: 'Services', hasCity: false },
          { pattern: /leadicious-cafe-(.+)/, category: 'Restaurants', hasCity: false },
          { pattern: /m-natural-(.+)/, category: 'Services', hasCity: false },
          { pattern: /clinique-benin-(.+)/, category: 'Health', hasCity: false },
          { pattern: /nokque-tour-(.+)/, category: 'Tourism', hasCity: false },
          
          // PHASE 3B: AUTOMOTIVE SERVICES EXPANSION
          { pattern: /best-auto-repair-(.+)/, category: 'Auto Repair', hasCity: true },
          { pattern: /auto-repair-shops-(.+)/, category: 'Auto Repair', hasCity: true },
          { pattern: /car-mechanics-(.+)/, category: 'Auto Repair', hasCity: true },
          { pattern: /automotive-services-(.+)/, category: 'Auto Service', hasCity: true },
          { pattern: /best-car-dealerships-(.+)/, category: 'Car Dealership', hasCity: true },
          { pattern: /car-dealers-(.+)/, category: 'Car Dealership', hasCity: true },
          { pattern: /auto-parts-stores-(.+)/, category: 'Auto Parts', hasCity: true },
          { pattern: /car-parts-(.+)/, category: 'Auto Parts', hasCity: true },
          { pattern: /automotive-directory-(.+)/, category: 'Automotive', hasCity: true },
          { pattern: /luxury-car-dealers-(.+)/, category: 'Car Dealership', hasCity: true },
          { pattern: /hybrid-car-service-(.+)/, category: 'Auto Repair', hasCity: true },
          { pattern: /transmission-repair-(.+)/, category: 'Auto Repair', hasCity: true },
          
          // PHASE 2: PROFESSIONAL SERVICES EXPANSION
          { pattern: /accounting-firms-(.+)/, category: 'Accounting', hasCity: true },
          { pattern: /best-accounting-firms-(.+)/, category: 'Accounting', hasCity: true },
          { pattern: /certified-accountants-(.+)/, category: 'Accounting', hasCity: true },
          { pattern: /financial-services-(.+)/, category: 'Accounting', hasCity: true },
          { pattern: /audit-services-(.+)/, category: 'Accounting', hasCity: true },
          { pattern: /tax-advisors-(.+)/, category: 'Accounting', hasCity: true },
          
          { pattern: /law-firms-(.+)/, category: 'Legal Services', hasCity: true },
          { pattern: /best-law-firms-(.+)/, category: 'Legal Services', hasCity: true },
          { pattern: /business-lawyers-(.+)/, category: 'Legal Services', hasCity: true },
          { pattern: /legal-consultants-(.+)/, category: 'Legal Services', hasCity: true },
          { pattern: /ohada-lawyers-(.+)/, category: 'Legal Services', hasCity: true },
          { pattern: /corporate-lawyers-(.+)/, category: 'Legal Services', hasCity: true },
          
          { pattern: /it-companies-(.+)/, category: 'IT Services', hasCity: true },
          { pattern: /software-companies-(.+)/, category: 'IT Services', hasCity: true },
          { pattern: /web-development-(.+)/, category: 'IT Services', hasCity: true },
          { pattern: /mobile-development-(.+)/, category: 'IT Services', hasCity: true },
          { pattern: /digital-agencies-(.+)/, category: 'IT Services', hasCity: true },
          { pattern: /tech-consultants-(.+)/, category: 'IT Services', hasCity: true },
          
          // PHASE 3C: INDIVIDUAL AUTOMOTIVE BUSINESS PAGES
          { pattern: /autopro-cotonou-(.+)/, category: 'Business Page', hasCity: false },
          { pattern: /ctba-cotonou-(.+)/, category: 'Business Page', hasCity: false },
          { pattern: /garage-excellence-cotonou-(.+)/, category: 'Business Page', hasCity: false },
          { pattern: /tunde-motors-cotonou-(.+)/, category: 'Business Page', hasCity: false },
          
          // PHASE 4: EMERGING MARKETS (Bohicon)
          { pattern: /bohicon-(.+)/, category: 'Services', hasCity: true },
          { pattern: /best-businesses-bohicon/, category: 'Services', hasCity: true },
          
          // Seasonal & Trending
          { pattern: /wedding-season-(.+)/, category: 'Services', hasCity: false },
          { pattern: /back-to-school-(.+)/, category: 'Education', hasCity: false },
          { pattern: /new-year-(.+)/, category: 'Entertainment', hasCity: false },
          { pattern: /festive-season-(.+)/, category: 'Shopping', hasCity: false },
          
          // SPECIALIZED TOURISM & TRAVEL
          { pattern: /eco-tourism-(.+)/, category: 'Tourism', hasCity: true },
          { pattern: /cultural-tourism-(.+)/, category: 'Tourism', hasCity: true },
          { pattern: /business-travel-(.+)/, category: 'Tourism', hasCity: true },
          { pattern: /tour-operators-(.+)/, category: 'Tourism', hasCity: true },
          { pattern: /tourist-attractions-(.+)/, category: 'Tourism', hasCity: true },
          
          // AGRICULTURE & AGRIBUSINESS FOCUS
          { pattern: /agricultural-cooperatives-(.+)/, category: 'Agriculture', hasCity: true },
          { pattern: /modern-farming-(.+)/, category: 'Agriculture', hasCity: true },
          { pattern: /agribusiness-(.+)/, category: 'Agriculture', hasCity: true },
          { pattern: /farming-equipment-(.+)/, category: 'Agriculture', hasCity: true },
          { pattern: /agricultural-exports-(.+)/, category: 'Agriculture', hasCity: false },
          
          // PHASE 5: SPECIALIZED DIRECTORIES
          { pattern: /accounting-services-(.+)/, category: 'Services', hasCity: false },
          { pattern: /consulting-firms-(.+)/, category: 'Services', hasCity: false },
          { pattern: /marketing-agencies-(.+)/, category: 'Services', hasCity: false },
          { pattern: /graphic-design-(.+)/, category: 'Services', hasCity: false },
          { pattern: /translation-services-(.+)/, category: 'Services', hasCity: false },
          { pattern: /event-planning-(.+)/, category: 'Services', hasCity: false },
          { pattern: /security-services-(.+)/, category: 'Services', hasCity: false },
          { pattern: /cleaning-services-(.+)/, category: 'Services', hasCity: false },
          { pattern: /insurance-agencies-(.+)/, category: 'Finance', hasCity: false },
          { pattern: /courier-services-(.+)/, category: 'Services', hasCity: false },
          
          // Emerging Industries
          { pattern: /solar-energy-(.+)/, category: 'Services', hasCity: false },
          { pattern: /coworking-spaces-(.+)/, category: 'Services', hasCity: false },
          { pattern: /mobile-money-(.+)/, category: 'Finance', hasCity: false },
          { pattern: /food-delivery-(.+)/, category: 'Food', hasCity: false },
          { pattern: /online-shopping-(.+)/, category: 'Shopping', hasCity: false },
          { pattern: /ride-sharing-(.+)/, category: 'Transportation', hasCity: false },
          { pattern: /fitness-centers-(.+)/, category: 'Health', hasCity: false },
          { pattern: /language-schools-(.+)/, category: 'Education', hasCity: false },
          { pattern: /art-galleries-(.+)/, category: 'Entertainment', hasCity: false },
          { pattern: /music-studios-(.+)/, category: 'Entertainment', hasCity: false },
        ];

        // Removed debug article temporarily to fix variable scope issue

        // Try to match against all patterns
        console.log(`🔍 PATTERN MATCHING: Testing slug "${slug}" against ${articlePatterns.length} patterns`);
        for (const { pattern, category, hasCity } of articlePatterns) {
          const match = slug.match(pattern);
          if (match) {
            console.log(`✅ PATTERN MATCHED: ${pattern} -> category: ${category}, hasCity: ${hasCity}`);
            const locationPart = match[1];
            
            // Determine if location part is a city or country identifier
            const isCountryLevel = locationPart.includes('benin') || locationPart.includes('republic');
            
            // Handle Porto-Novo specific routing where hasCity is the city name
            let city;
            if (typeof hasCity === 'string') {
              city = hasCity; // For Porto-Novo patterns, hasCity = 'porto-novo'
            } else {
              city = (hasCity && !isCountryLevel) ? locationPart.replace(/-/g, ' ') : undefined;
            }
            
            console.log(`🔍 Generating article for category: ${category}, city: ${city}, slug: ${slug}`);
            
            // 🏛️ PORTO-NOVO BUSINESS ROUTING - Handle Porto-Novo specific articles first
            if (city === 'porto-novo') {
              console.error(`🏛️ PORTO-NOVO ROUTE DETECTED! Category: ${category}, City: ${city}`);
              console.log(`🏛️ Porto-Novo business request detected for category: ${category}, city: ${city}`);
              
              try {
                const response = await fetch('/data/porto_novo_businesses.csv');
                if (response.ok) {
                  const csvText = await response.text();
                  console.log(`📄 Porto-Novo CSV text length: ${csvText.length} characters`);
                  
                  // Enhanced CSV parsing to handle quoted values with commas
                  const parseCSVRow = (row: string): string[] => {
                    const result: string[] = [];
                    let current = '';
                    let insideQuotes = false;
                    
                    for (let i = 0; i < row.length; i++) {
                      const char = row[i];
                      if (char === '"') {
                        insideQuotes = !insideQuotes;
                      } else if (char === ',' && !insideQuotes) {
                        result.push(current.trim());
                        current = '';
                      } else {
                        current += char;
                      }
                    }
                    result.push(current.trim());
                    return result;
                  };
                  
                  const lines = csvText.split('\n').filter(line => line.trim());
                  const headers = parseCSVRow(lines[0]);
                  console.log(`📊 Porto-Novo CSV headers: ${headers.join(', ')}`);
                  
                  const portoNovoBusinesses = lines.slice(1).map(line => {
                    const values = parseCSVRow(line);
                    const business: any = {};
                    headers.forEach((header, index) => {
                      business[header] = values[index] || '';
                    });
                    return business;
                  }).filter(business => business.name && business.name.trim() !== '');
                  
                  console.log(`📊 Loaded ${portoNovoBusinesses.length} Porto-Novo businesses`);
                  
                  // Filter by category if specified
                  let filteredBusinesses = portoNovoBusinesses;
                  if (category && category !== 'Services') {
                    console.log(`🔍 Filtering Porto-Novo businesses by category: ${category}`);
                    filteredBusinesses = portoNovoBusinesses.filter(business => {
                      const businessCategory = business.category?.toLowerCase() || '';
                      const searchCategory = category.toLowerCase();
                      
                      const matches = businessCategory.includes(searchCategory) ||
                                     searchCategory.includes(businessCategory) ||
                                     (searchCategory === 'hotels' && businessCategory.includes('hotel')) ||
                                     (searchCategory === 'restaurants' && businessCategory.includes('restaurant')) ||
                                     (searchCategory === 'banks' && businessCategory.includes('bank'));
                      
                      if (matches) {
                        console.log(`✅ Porto-Novo business matched: ${business.name} (${business.category})`);
                      }
                      return matches;
                    });
                    console.log(`📊 After category filtering: ${filteredBusinesses.length} businesses`);
                  }
                  
                  if (filteredBusinesses.length > 0) {
                    // Convert to ProcessedBusiness format
                    const processedBusinesses: ProcessedBusiness[] = filteredBusinesses.map((business: any, index: number) => ({
                      id: `porto-novo-${index}`,
                      name: business.name || 'Unknown Business',
                      category: business.category || 'Services',
                      rating: parseFloat(business.rating) || 4.0,
                      reviews: parseInt(business.reviews) || 0,
                      address: business.address || 'Porto-Novo, Benin',
                      phone: business.phone || '',
                      website: business.website || '',
                      description: business.description || `Professional ${business.category} services in Porto-Novo.`,
                      images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
                      hours: business.hours || 'Contact for hours',
                      location: 'Porto-Novo',
                      coordinates: {
                        lat: parseFloat(business.latitude) || 6.4969,
                        lng: parseFloat(business.longitude) || 2.6283
                      },
                      enrichedPhones: business.phone ? [business.phone] : [],
                      enrichedWebsites: business.website ? [business.website] : [],
                      enrichedEmails: business.email ? [business.email] : [],
                      enrichedHours: business.hours ? [business.hours] : [],
                      enrichmentSources: ['Porto-Novo Business Directory'],
                      enrichmentConfidence: 85,
                      hasEnrichedData: true
                    }));
                    
                    // Generate Porto-Novo specific article
                    generatedArticle = generateCategoryArticle(processedBusinesses, category, 'Porto-Novo', slug);
                    break;
                  }
                }
              } catch (error) {
                console.error('❌ Error loading Porto-Novo businesses:', error);
              }
            }
            
            // 💎 LUXURY & LIFESTYLE BUSINESS ROUTING - Handle luxury categories  
            const luxuryCategories = ['Jewelry', 'Spa & Wellness', 'Beauty Salon'];
            if (luxuryCategories.includes(category)) {
              // Luxury route detected
              
              try {
                const response = await fetch('/data/luxury_lifestyle_businesses.csv');
                if (response.ok) {
                  const csvText = await response.text();
                  console.log(`📄 Luxury CSV text length: ${csvText.length} characters`);
                  
                  // Enhanced CSV parsing to handle quoted values with commas
                  const parseCSVRow = (row: string): string[] => {
                    const result: string[] = [];
                    let current = '';
                    let insideQuotes = false;
                    
                    for (let i = 0; i < row.length; i++) {
                      const char = row[i];
                      if (char === '"') {
                        insideQuotes = !insideQuotes;
                      } else if (char === ',' && !insideQuotes) {
                        result.push(current.trim());
                        current = '';
                      } else {
                        current += char;
                      }
                    }
                    result.push(current.trim());
                    return result;
                  };
                  
                  const lines = csvText.split('\n').filter(line => line.trim());
                  const headers = parseCSVRow(lines[0]);
                  console.log(`📊 Luxury CSV headers:`, headers);
                  
                  const allLuxuryBusinesses = lines.slice(1).map(line => {
                    const values = parseCSVRow(line);
                    const business: any = {};
                    headers.forEach((header, index) => {
                      business[header] = values[index] || '';
                    });
                    return business;
                  });
                  
                  // Total luxury businesses loaded: ${allLuxuryBusinesses.length}
                  
                  // Filter by category and city if specified
                  let filteredBusinesses = allLuxuryBusinesses.filter(business => {
                    const businessCategory = business.Category || business.category || '';
                    const subCategory = business.Sub_Category || business.sub_category || '';
                    
                    // Map luxury categories to match business data (enhanced matching)
                    const categoryLower = businessCategory.toLowerCase();
                    const categoryMatch = 
                      (category === 'Jewelry' && categoryLower.includes('jewelry')) ||
                      (category === 'Spa & Wellness' && (categoryLower.includes('spa') || categoryLower.includes('wellness'))) ||
                      (category === 'Beauty Salon' && (categoryLower.includes('beauty') || categoryLower === 'beauty salon'));
                    
                    return categoryMatch;
                  });
                  
                  // Filter by city if specified
                  if (city && city !== 'benin') {
                    filteredBusinesses = filteredBusinesses.filter(business => {
                      const businessCity = (business.City || business.city || '').toLowerCase();
                      const businessAddress = (business.Address || business.address || '').toLowerCase();
                      const cityMatch = businessCity.includes(city.toLowerCase()) || 
                                       businessAddress.includes(city.toLowerCase());
                      return cityMatch;
                    });
                  }
                  
                  // Filtered luxury businesses: ${filteredBusinesses.length}
                  
                  if (filteredBusinesses.length > 0) {
                    // Convert to ProcessedBusiness format
                    const processedBusinesses = filteredBusinesses.map((business, index) => ({
                      id: `luxury-${category.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`,
                      name: business.Name || business.name || 'Luxury Business',
                      category: category,
                      rating: parseFloat(business.Rating || business.rating) || 4.5,
                      reviews: Math.floor(Math.random() * 200) + 50,
                      address: business.Address || business.address || 'Cotonou, Benin',
                      phone: business.Phone || business.phone || '',
                      website: business.Website || business.website || '',
                      description: business.Description || business.description || `Premium ${category.toLowerCase()} services in Benin`,
                      location: city || 'Cotonou',
                      coordinates: {
                        lat: parseFloat(business.GPS_Coordinates?.split(',')[0]) || 6.3703,
                        lng: parseFloat(business.GPS_Coordinates?.split(',')[1]) || 2.3912
                      },
                      enrichedPhones: [business.Phone || business.phone].filter(Boolean),
                      enrichedWebsites: [business.Website || business.website].filter(Boolean),
                      enrichedEmails: [business.Email || business.email].filter(Boolean),
                      enrichedSocial: {
                        instagram: business.Social_Media?.includes('Instagram') ? [business.Social_Media] : [],
                        facebook: business.Social_Media?.includes('Facebook') ? [business.Social_Media] : []
                      },
                      enrichedHours: [business.Opening_Hours || business.opening_hours].filter(Boolean),
                      enrichmentSources: ['Luxury Lifestyle Directory'],
                      enrichmentConfidence: 90,
                      hasEnrichedData: true
                    }));
                    
                    // Generate luxury-specific article
                    const cityName = city === 'cotonou' ? 'Cotonou' : (city || 'Benin');
                    generatedArticle = generateCategoryArticle(processedBusinesses, category, cityName, slug);
                    break;
                  }
                }
              } catch (error) {
                console.error('❌ Error loading luxury businesses:', error);
              }
            }
            
            // Special handling for photography studios
            if (slug.includes('photography-studios') || slug.includes('photography')) {
              const cityFilteredStudios = city ? 
                photographyStudios.filter(studio => 
                  studio.address.toLowerCase().includes(city.toLowerCase())
                ) : 
                photographyStudios;
              
              const studiosToUse = cityFilteredStudios.length > 0 ? cityFilteredStudios : photographyStudios;
              generatedArticle = generateCategoryArticle(studiosToUse, 'Photography Studios', city, slug);
              break;
            }
            
            // Special handling for restaurants - combine premium restaurants with CSV data
            if (slug.includes('restaurant') && (slug.includes('cotonou') || slug.includes('benin')) && !slug.includes('porto-novo')) {
              console.log(`🍽️ Using premium restaurants data featuring Leadicious Cafe for ${city || 'Benin'}`);
              
              // Get regular restaurants from CSV
              let csvRestaurants = city 
                ? await getByCategoryAndLocation('Restaurants', city)
                : await getByCategory('Restaurants');
              
              // If no exact match, try alternative category names
              if (csvRestaurants.length === 0) {
                const altBusinesses1 = await getByCategory('Restaurant');
                const altBusinesses2 = await getByCategory('Food');
                csvRestaurants = city 
                  ? [...altBusinesses1, ...altBusinesses2].filter(b => b.address.toLowerCase().includes(city.toLowerCase()))
                  : [...altBusinesses1, ...altBusinesses2];
              }
              
              // Filter premium restaurants by city if specified
              const cityFilteredPremium = city ? 
                premiumRestaurants.filter(restaurant => 
                  restaurant.address.toLowerCase().includes(city.toLowerCase())
                ) : 
                premiumRestaurants;
              
              // Combine premium restaurants first, then CSV data
              const combinedRestaurants = [...cityFilteredPremium, ...csvRestaurants];
              
              if (combinedRestaurants.length > 0) {
                generatedArticle = generateCategoryArticle(combinedRestaurants, 'Restaurants', city, slug);
                break;
              }
            }
            
            // Special handling for Leadicious Cafe dedicated business page
            if (slug.includes('leadicious-cafe')) {
              console.log(`🍽️ Using dedicated Leadicious Cafe business page data`);
              
              generatedArticle = generateLeadiciousCafeArticle(slug);
              break;
            }
            
            // Special handling for automotive business dedicated pages
            if (slug.includes('autopro-cotonou') || slug.includes('ctba-cotonou') || 
                slug.includes('garage-excellence-cotonou') || slug.includes('tunde-motors-cotonou')) {
              console.log(`🚗 Using dedicated automotive business page data for ${slug}`);
              
              // Extract business slug from URL - find the base business identifier
              let businessSlug = '';
              if (slug.includes('autopro-cotonou')) {
                businessSlug = 'autopro-cotonou';
              } else if (slug.includes('ctba-cotonou')) {
                businessSlug = 'ctba-cotonou';
              } else if (slug.includes('garage-excellence-cotonou')) {
                businessSlug = 'garage-excellence-cotonou';
              } else if (slug.includes('tunde-motors-cotonou')) {
                businessSlug = 'tunde-motors-cotonou';
              }
              
              console.log(`🚗 Extracted businessSlug: ${businessSlug}`);
              generatedArticle = generateAutomotiveBusinessArticle(businessSlug);
              break;
            }
            
            // Special handling for automotive services - combine premium automotive with CSV data
            if (slug.includes('auto') || slug.includes('car') || slug.includes('automotive') || 
                category === 'Auto Repair' || category === 'Car Dealership' || category === 'Auto Parts' || 
                category === 'Auto Service' || category === 'Automotive') {
              console.log(`🚗 Using premium automotive services data for ${city || 'Benin'}`);
              
              // Get regular automotive businesses from CSV
              let csvAutomotive = [];
              if (category === 'Auto Repair' || slug.includes('repair') || slug.includes('mechanic')) {
                csvAutomotive = city 
                  ? await getByCategoryAndLocation('Auto Repair', city)
                  : await getByCategory('Auto Repair');
                if (csvAutomotive.length === 0) {
                  const altAuto = await getByCategory('Garage');
                  csvAutomotive = city 
                    ? altAuto.filter(b => b.address.toLowerCase().includes(city.toLowerCase()))
                    : altAuto;
                }
              } else if (category === 'Car Dealership' || slug.includes('dealer')) {
                csvAutomotive = city 
                  ? await getByCategoryAndLocation('Car Dealership', city)
                  : await getByCategory('Car Dealership');
              } else if (category === 'Auto Parts' || slug.includes('parts')) {
                csvAutomotive = city 
                  ? await getByCategoryAndLocation('Auto Parts', city)
                  : await getByCategory('Auto Parts');
              } else {
                // General automotive search
                const autoRepair = await getByCategory('Auto Repair');
                const carDealers = await getByCategory('Car Dealership');
                const autoParts = await getByCategory('Auto Parts');
                csvAutomotive = city 
                  ? [...autoRepair, ...carDealers, ...autoParts].filter(b => b.address.toLowerCase().includes(city.toLowerCase()))
                  : [...autoRepair, ...carDealers, ...autoParts];
              }
              
              // Filter premium automotive services by city if specified
              const cityFilteredPremium = city ? 
                premiumAutomotiveServices.filter(auto => 
                  auto.address.toLowerCase().includes(city.toLowerCase()) ||
                  auto.location.toLowerCase().includes(city.toLowerCase())
                ) : 
                premiumAutomotiveServices;
              
              // Filter by specific category if needed - smart automotive category matching
              const categoryFilteredPremium = category && 
                category !== 'Automotive' && 
                category !== 'Automotive Services' && 
                category !== 'Auto Service' ?
                cityFilteredPremium.filter(auto => auto.category === category) :
                cityFilteredPremium;
              
              // Combine premium automotive first, then CSV data
              const combinedAutomotive = [...categoryFilteredPremium, ...csvAutomotive];
              
              if (combinedAutomotive.length > 0) {
                const categoryName = category === 'Auto Repair' ? 'Auto Repair Shops' :
                                   category === 'Car Dealership' ? 'Car Dealerships' :
                                   category === 'Auto Parts' ? 'Auto Parts Stores' :
                                   'Automotive Services';
                generatedArticle = generateCategoryArticle(combinedAutomotive, categoryName, city, slug);
                break;
              }
            }
            
            // PHASE 2: PROFESSIONAL SERVICES EXPANSION - Handle accounting, legal, and IT services
            if (category === 'Accounting' || category === 'Legal Services' || category === 'IT Services') {
              console.log(`🏢 Using premium professional services data for ${city || 'Benin'} - Category: ${category}`);
              
              // Get professional services from premiumProfessionalServices array
              const categoryFilteredProfessional = premiumProfessionalServices.filter(ps => ps.category === category);
              
              // Get city-filtered professional services
              const cityFilteredProfessional = city 
                ? categoryFilteredProfessional.filter(ps => 
                    ps.location.toLowerCase().includes(city.toLowerCase()) ||
                    ps.address.toLowerCase().includes(city.toLowerCase())
                  )
                : categoryFilteredProfessional;
              
              // Get CSV data for this professional services category
              let csvProfessional = [];
              try {
                csvProfessional = city 
                  ? await getByCategoryAndLocation(category, city)
                  : await getByCategory(category);
                  
                if (csvProfessional.length === 0) {
                  // Try broader professional services categories
                  const altCategories = ['Services', 'Professional Services', 'Business Services'];
                  for (const altCat of altCategories) {
                    csvProfessional = city 
                      ? await getByCategoryAndLocation(altCat, city)
                      : await getByCategory(altCat);
                    if (csvProfessional.length > 0) break;
                  }
                }
              } catch (error) {
                console.log(`📊 No CSV data for ${category} in ${city || 'Benin'}`);
                csvProfessional = [];
              }
              
              const combinedProfessional = [...cityFilteredProfessional, ...csvProfessional];
              
              if (combinedProfessional.length > 0) {
                const categoryName = category === 'Accounting' ? 'Accounting Firms & Financial Services' :
                                   category === 'Legal Services' ? 'Law Firms & Legal Services' :
                                   category === 'IT Services' ? 'IT Services & Technology Companies' :
                                   'Professional Services';
                generatedArticle = generateCategoryArticle(combinedProfessional, categoryName, city, slug);
                break;
              }
            }
            
            // PHASE 3: PORTO-NOVO BUSINESS HANDLING - Load from dedicated CSV
            // THIS MUST COME BEFORE GENERAL CATEGORY LOGIC TO PREVENT FALLBACK
            console.log(`🔍 DEBUGGING: city="${city}", category="${category}", slug="${slug}"`);
            if (city && city.toLowerCase().includes('porto-novo')) {
              console.log(`🏛️ PORTO-NOVO LOGIC TRIGGERED for category: ${category}, city: ${city}`);
              
              try {
                // Load Porto-Novo businesses from dedicated CSV
                const portoNovoBusinesses = await fetch('/data/porto_novo_businesses.csv')
                  .then(response => {
                    console.log(`📥 Fetching Porto-Novo CSV, status: ${response.status}`);
                    return response.text();
                  })
                  .then(csvText => {
                    console.log(`📄 CSV length: ${csvText.length} characters`);
                    const lines = csvText.split('\n').filter(line => line.trim());
                    console.log(`📊 CSV lines: ${lines.length}`);
                    
                    // Better CSV parsing to handle quoted values with commas
                    const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, ''));
                    
                    return lines.slice(1).map(line => {
                      // Simple CSV parsing - split by comma but handle quoted values
                      const values = [];
                      let current = '';
                      let inQuotes = false;
                      
                      for (let i = 0; i < line.length; i++) {
                        const char = line[i];
                        if (char === '"') {
                          inQuotes = !inQuotes;
                        } else if (char === ',' && !inQuotes) {
                          values.push(current.trim());
                          current = '';
                        } else {
                          current += char;
                        }
                      }
                      values.push(current.trim()); // Add the last value
                      
                      const business: any = {};
                      headers.forEach((header, index) => {
                        business[header] = values[index] || '';
                      });
                      return business;
                    });
                  });
                
                console.log(`📊 Loaded ${portoNovoBusinesses.length} Porto-Novo businesses`);
                console.log(`🔍 Sample business:`, portoNovoBusinesses[0]);
                
                // Filter by category if specified
                let filteredBusinesses = portoNovoBusinesses;
                if (category !== 'Services' && category !== 'All') {
                  filteredBusinesses = portoNovoBusinesses.filter(business => {
                    const bizCategory = business.category?.toLowerCase() || '';
                    const searchCategory = category.toLowerCase();
                    
                    // Map categories to business types
                    if (searchCategory.includes('hotel') || searchCategory.includes('accommodation')) {
                      return bizCategory.includes('hotel') || business.types?.includes('lodging');
                    }
                    if (searchCategory.includes('restaurant') || searchCategory.includes('food')) {
                      return bizCategory.includes('restaurant') || business.types?.includes('restaurant');
                    }
                    if (searchCategory.includes('tourism') || searchCategory.includes('tour')) {
                      return bizCategory.includes('tourism') || business.category?.includes('Tourism');
                    }
                    if (searchCategory.includes('bank') || searchCategory.includes('finance')) {
                      return bizCategory.includes('bank') || bizCategory.includes('microfinance') || business.category?.includes('Banks');
                    }
                    if (searchCategory.includes('government')) {
                      return bizCategory.includes('government') || business.category?.includes('Government');
                    }
                    if (searchCategory.includes('transport') || searchCategory.includes('logistics')) {
                      return bizCategory.includes('transport') || bizCategory.includes('logistics') || business.category?.includes('Transportation');
                    }
                    if (searchCategory.includes('supermarket') || searchCategory.includes('shopping')) {
                      return bizCategory.includes('supermarket') || bizCategory.includes('retail') || business.category?.includes('Supermarkets');
                    }
                    if (searchCategory.includes('telecom') || searchCategory.includes('mobile')) {
                      return bizCategory.includes('telecom') || business.category?.includes('Telecommunications');
                    }
                    if (searchCategory.includes('pharmacy') || searchCategory.includes('health')) {
                      return bizCategory.includes('pharmacy') || business.category?.includes('Pharmacies');
                    }
                    if (searchCategory.includes('electronics') || searchCategory.includes('computer')) {
                      return bizCategory.includes('electronics') || business.category?.includes('Electronics');
                    }
                    if (searchCategory.includes('clothing') || searchCategory.includes('fashion')) {
                      return bizCategory.includes('clothing') || business.category?.includes('Clothing');
                    }
                    
                    return bizCategory.includes(searchCategory) || business.category?.toLowerCase().includes(searchCategory);
                  });
                }
                
                console.log(`🎯 Filtered to ${filteredBusinesses.length} Porto-Novo businesses for category: ${category}`);
                
                if (filteredBusinesses.length > 0) {
                  // Convert to expected format
                  const convertedBusinesses = filteredBusinesses.map(business => ({
                    id: business.placeId || `porto-novo-${business.name?.replace(/\s+/g, '-').toLowerCase()}`,
                    name: business.name || '',
                    category: business.category || category,
                    rating: parseFloat(business.rating || '4.0'),
                    reviews: parseInt(business.reviewCount || '50'),
                    address: business.address || 'Porto-Novo, Benin',
                    phone: business.phone || business.enrichedPhones || '',
                    website: business.website || business.enrichedWebsites || '',
                    description: business.description || business.reviewSummary || '',
                    hours: business.hours || business.enrichedHours || business.openingHours || '',
                    location: 'Porto-Novo',
                    coordinates: {
                      lat: parseFloat(business.latitude || '6.4969'),
                      lng: parseFloat(business.longitude || '2.6289')
                    },
                    hasEnrichedData: true,
                    enrichedPhones: business.enrichedPhones ? [business.enrichedPhones] : [business.phone || ''],
                    enrichedEmails: business.enrichedEmails ? [business.enrichedEmails] : [],
                    enrichedHours: business.enrichedHours ? [business.enrichedHours] : [business.hours || ''],
                    enrichmentConfidence: parseInt(business.enrichmentConfidence || '85')
                  }));
                  
                  generatedArticle = generateCategoryArticle(convertedBusinesses, `${category} in Porto-Novo`, 'Porto-Novo', slug);
                  generatedArticle.title = `🏛️ PORTO-NOVO: ${generatedArticle.title}`; // Clear visual indicator
                  console.log(`✅ Generated Porto-Novo article with ${convertedBusinesses.length} businesses`);
                  break;
                }
              } catch (error) {
                console.error(`❌ Error loading Porto-Novo businesses:`, error);
                // Set a visual indicator that Porto-Novo logic failed
                if (window && typeof window !== 'undefined') {
                  (window as any).portoNovoError = `Porto-Novo logic failed: ${error.message}`;
                }
              }
            }
            
            // GENERAL CATEGORY LOGIC - Skip for Porto-Novo URLs (they should use dedicated CSV)
            if (!(city && city.toLowerCase().includes('porto-novo'))) {
              // Get businesses for this category and location (for non-photography articles)
              let categoryBusinesses = city 
                ? await getByCategoryAndLocation(category, city)
                : await getByCategory(category);
            
            // ENHANCED FIX: For all categories, try broader search if no exact matches
            if (categoryBusinesses.length === 0) {
              console.log(`🔍 No exact matches for ${category}, trying broader search...`);
              const allBusinesses = await getByCategory('All');
              let matchedBusinesses = [];
              
              if (category === 'Restaurants') {
                // Find businesses with restaurant-related keywords
                matchedBusinesses = allBusinesses.filter(b => {
                  const name = b.name.toLowerCase();
                  const category = b.category.toLowerCase();
                  
                  return (
                    category.includes('restaurant') ||
                    category.includes('food') ||
                    category.includes('dining') ||
                    name.includes('restaurant') ||
                    (name.includes('bar') && name.includes('restaurant'))
                  );
                });
              } else if (category === 'ClothingStores') {
                // Find businesses specifically for clothing stores and fashion
                matchedBusinesses = allBusinesses.filter(b => {
                  const name = b.name.toLowerCase();
                  const businessCategory = b.category.toLowerCase();
                  
                  return (
                    businessCategory.includes('clothing') ||
                    businessCategory.includes('boutique') ||
                    businessCategory.includes('fashion') ||
                    name.includes('boutique') ||
                    name.includes('clothing') ||
                    name.includes('fashion') ||
                    name.includes('apparel') ||
                    name.includes('wear') ||
                    name.includes('textile')
                  );
                });
              } else if (category === 'BeautyServices') {
                // Find businesses specifically for beauty and hair services
                matchedBusinesses = allBusinesses.filter(b => {
                  const name = b.name.toLowerCase();
                  const businessCategory = b.category.toLowerCase();
                  
                  return (
                    businessCategory.includes('beauty') ||
                    businessCategory.includes('salon') ||
                    businessCategory.includes('hair') ||
                    businessCategory.includes('spa') ||
                    name.includes('salon') ||
                    name.includes('beauty') ||
                    name.includes('hair') ||
                    name.includes('coiffure') ||
                    name.includes('barbershop') ||
                    name.includes('spa') ||
                    name.includes('makeup') ||
                    name.includes('nail')
                  );
                });
              } else if (category === 'TechnologyServices') {
                // Find businesses specifically for technology and IT services
                matchedBusinesses = allBusinesses.filter(b => {
                  const name = b.name.toLowerCase();
                  const businessCategory = b.category.toLowerCase();
                  
                  return (
                    businessCategory.includes('technology') ||
                    businessCategory.includes('software') ||
                    businessCategory.includes('computer') ||
                    businessCategory.includes('digital') ||
                    name.includes('tech') ||
                    name.includes('software') ||
                    name.includes('digital') ||
                    name.includes('computer') ||
                    name.includes('web') ||
                    name.includes('app') ||
                    name.includes('cyber') ||
                    name.includes('data')
                  );
                });
              } else if (category === 'Shopping' || category.includes('shopping') || category.includes('marketplace')) {
                // Find businesses with general shopping/marketplace keywords
                matchedBusinesses = allBusinesses.filter(b => {
                  const name = b.name.toLowerCase();
                  const businessCategory = b.category.toLowerCase();
                  
                  return (
                    businessCategory.includes('shopping') ||
                    businessCategory.includes('store') ||
                    businessCategory.includes('market') ||
                    name.includes('store') ||
                    name.includes('shop') ||
                    name.includes('market') ||
                    name.includes('mall') ||
                    name.includes('plaza')
                  );
                });
              } else if (category === 'Tourism' || category.includes('tourism') || category.includes('tour')) {
                // Find businesses specifically for tourism and travel services
                matchedBusinesses = allBusinesses.filter(b => {
                  const name = b.name.toLowerCase();
                  const businessCategory = b.category.toLowerCase();
                  
                  return (
                    businessCategory.includes('tourism') ||
                    businessCategory.includes('tour') ||
                    businessCategory.includes('travel') ||
                    businessCategory.includes('hotel') ||
                    businessCategory.includes('guide') ||
                    name.includes('tour') ||
                    name.includes('travel') ||
                    name.includes('tourism') ||
                    name.includes('guide') ||
                    name.includes('heritage') ||
                    name.includes('cultural') ||
                    name.includes('safari') ||
                    name.includes('excursion')
                  );
                });
              } else if (category === 'Agriculture' || category.includes('agriculture') || category.includes('farming')) {
                // Find businesses specifically for agriculture and farming services
                matchedBusinesses = allBusinesses.filter(b => {
                  const name = b.name.toLowerCase();
                  const businessCategory = b.category.toLowerCase();
                  
                  return (
                    businessCategory.includes('agriculture') ||
                    businessCategory.includes('farming') ||
                    businessCategory.includes('agri') ||
                    businessCategory.includes('livestock') ||
                    businessCategory.includes('crop') ||
                    name.includes('farm') ||
                    name.includes('agriculture') ||
                    name.includes('agri') ||
                    name.includes('livestock') ||
                    name.includes('crop') ||
                    name.includes('seed') ||
                    name.includes('harvest') ||
                    name.includes('cooperative')
                  );
                });
              } else if (category.includes('hair') || category.includes('salon') || category === 'Services') {
                // Find businesses with hair salon/beauty-related keywords
                matchedBusinesses = allBusinesses.filter(b => {
                  const name = b.name.toLowerCase();
                  const category = b.category.toLowerCase();
                  
                  return (
                    category.includes('services') ||
                    category.includes('beauty') ||
                    category.includes('salon') ||
                    name.includes('salon') ||
                    name.includes('coiffure') ||
                    name.includes('beauty') ||
                    name.includes('hair')
                  );
                });
              } else {
                // For other categories, try partial matching
                matchedBusinesses = allBusinesses.filter(b => {
                  const businessCategory = b.category.toLowerCase();
                  const searchCategory = category.toLowerCase();
                  
                  return (
                    businessCategory.includes(searchCategory) ||
                    searchCategory.includes(businessCategory)
                  );
                });
              }
              
              console.log(`🔍 Found ${matchedBusinesses.length} ${category}-related businesses total`);
              
              // Filter by city if needed
              if (city && matchedBusinesses.length > 0) {
                categoryBusinesses = matchedBusinesses.filter(b => 
                  b.address.toLowerCase().includes(city.toLowerCase())
                );
                console.log(`🔍 Found ${categoryBusinesses.length} ${category} businesses in ${city}`);
              } else {
                categoryBusinesses = matchedBusinesses;
              }
            }
            
            console.log(`📊 Found ${categoryBusinesses.length} businesses for ${category}${city ? ` in ${city}` : ''}`);
            
            // Debug: Show all unique categories in the loaded data
            if (categoryBusinesses.length === 0) {
              const allBusinesses = await getByCategory('All');
              const uniqueCategories = [...new Set(allBusinesses.map(b => b.category))];
              console.log(`🔍 Available categories: ${uniqueCategories.join(', ')}`);
              console.log(`🔍 Looking for category: "${category}"`);
              console.log(`🔍 Total businesses loaded: ${allBusinesses.length}`);
              
              // Try alternative category names for restaurants
              if (category === 'Restaurants') {
                console.log('🍽️ Trying alternative restaurant category names...');
                const altBusinesses1 = await getByCategory('Restaurant');
                const altBusinesses2 = await getByCategory('Food');
                const altBusinesses3 = await getByCategory('Dining');
                
                console.log(`🔍 Found ${altBusinesses1.length} with "Restaurant" category`);
                console.log(`🔍 Found ${altBusinesses2.length} with "Food" category`);
                console.log(`🔍 Found ${altBusinesses3.length} with "Dining" category`);
                
                // Use the first alternative that has businesses
                if (altBusinesses1.length > 0) {
                  categoryBusinesses = city ? altBusinesses1.filter(b => b.address.toLowerCase().includes(city.toLowerCase())) : altBusinesses1;
                  console.log(`✅ Using "Restaurant" category instead, found ${categoryBusinesses.length} businesses`);
                } else if (altBusinesses2.length > 0) {
                  categoryBusinesses = city ? altBusinesses2.filter(b => b.address.toLowerCase().includes(city.toLowerCase())) : altBusinesses2;
                  console.log(`✅ Using "Food" category instead, found ${categoryBusinesses.length} businesses`);
                } else if (altBusinesses3.length > 0) {
                  categoryBusinesses = city ? altBusinesses3.filter(b => b.address.toLowerCase().includes(city.toLowerCase())) : altBusinesses3;
                  console.log(`✅ Using "Dining" category instead, found ${categoryBusinesses.length} businesses`);
                }
              }
              
              // Show some sample businesses for debugging
              if (categoryBusinesses.length === 0) {
                const sampleBusinesses = allBusinesses.slice(0, 5);
                console.log(`🔍 Sample businesses:`, sampleBusinesses.map(b => `${b.name} (${b.category}) - ${b.address}`));
              }
            }
            
            // If no businesses found in specific city, try without city filter for country-level articles
            if (categoryBusinesses.length === 0 && city) {
              console.log(`🔄 No businesses found in ${city}, trying country-level for ${category}...`);
              const countryBusinesses = await getByCategory(category);
              console.log(`📊 Found ${countryBusinesses.length} businesses country-wide for ${category}`);
              
              if (countryBusinesses.length > 0) {
                generatedArticle = generateCategoryArticle(countryBusinesses, category, undefined, slug);
                break;
              }
            }
            
            if (categoryBusinesses.length > 0) {
              // Use restaurant generator for dining category, otherwise use category generator
              if (category === 'Restaurant' && city) {
                generatedArticle = generateRestaurantArticle(categoryBusinesses, city);
              } else {
                generatedArticle = generateCategoryArticle(categoryBusinesses, category, city, slug);
                generatedArticle.title = `🌍 GENERAL: ${generatedArticle.title}`; // Clear visual indicator
              }
              break;
            } else {
              // If still no businesses, show debug info temporarily
              const allBusinesses = await getByCategory('All');
              const uniqueCategories = [...new Set(allBusinesses.map(b => b.category))];
              
              generatedArticle = {
                title: `Debug: No businesses found for ${category}${city ? ` in ${city}` : ''}`,
                content: `
# Debug: No Businesses Found

## Issue
Looking for **${category}** businesses${city ? ` in **${city}**` : ''} but found **0** results.

## Available Data
- **Total businesses loaded:** ${allBusinesses.length}
- **Available categories:** ${uniqueCategories.join(', ')}

## Sample Businesses (first 10):
${allBusinesses.slice(0, 10).map((b, i) => `${i+1}. **${b.name}** (${b.category}) - ${b.address}`).join('\n')}

## Restaurants/Food Businesses:
${allBusinesses.filter(b => 
  b.category.toLowerCase().includes('restaurant') || 
  b.category.toLowerCase().includes('food') ||
  b.name.toLowerCase().includes('restaurant')
).slice(0, 10).map((b, i) => `${i+1}. **${b.name}** (${b.category}) - ${b.address}`).join('\n')}

## Businesses in ${city || 'any location'}:
${city ? allBusinesses.filter(b => b.address.toLowerCase().includes(city.toLowerCase())).slice(0, 10).map((b, i) => `${i+1}. **${b.name}** (${b.category}) - ${b.address}`).join('\n') : 'No city filter applied'}
                `,
                meta: {
                  title: `Debug: No ${category} found`,
                  description: `Debug information for ${category} search`
                }
              };
              break;
            }
          }
        }

        // Fallback: Try generic patterns if no specific match found
        if (!generatedArticle) {
          const genericMatch = slug.match(/(.+)-(.+)/) || slug.match(/(.+)/);
          if (genericMatch) {
            console.log('🔄 Trying generic pattern matching...');
            
            // Try to extract category and city from generic pattern
            const parts = slug.split('-');
            let possibleCategory = '';
            let possibleCity = '';
            
            // Look for business category keywords
            const categoryKeywords = ['photography', 'restaurant', 'hotel', 'tourist', 'logistic', 'marketing', 'fashion', 'auto', 'wedding', 'pharmacy', 'electronics', 'school', 'legal', 'beauty', 'construction', 'real-estate', 'it', 'fitness', 'supermarket', 'bank'];
            const cityKeywords = ['cotonou', 'porto-novo', 'parakou', 'abomey', 'bohicon', 'natitingou', 'ouidah', 'djougou'];
            
            for (const part of parts) {
              if (categoryKeywords.some(keyword => part.includes(keyword))) {
                possibleCategory = part;
              }
              if (cityKeywords.includes(part)) {
                possibleCity = part;
              }
            }
            
            if (possibleCategory) {
              const fallbackBusinesses = possibleCity 
                ? await getByCategoryAndLocation(possibleCategory, possibleCity)
                : await getByCategory(possibleCategory);
              
              if (fallbackBusinesses.length > 0) {
                generatedArticle = generateCategoryArticle(fallbackBusinesses, possibleCategory, possibleCity, slug);
              }
            }
          }
        }
        
        } // Close for loop
      } catch (err) {
        console.error('Error generating article:', err);
      }

      setArticle(generatedArticle);
      setArticleLoading(false);
    };

    generateArticleContent();
  }, [slug, loading, getByCategoryAndLocation, getByCategory]);

  // Handle loading states
  if (loading || articleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
          <div className="mt-8 p-4 bg-yellow-100 rounded-lg max-w-md">
            <h3 className="font-bold text-yellow-800 mb-2">Debug Info:</h3>
            <div className="text-left text-sm space-y-1">
              <p><strong>Slug:</strong> {slug || 'undefined'}</p>
              <p><strong>Business Loading:</strong> {loading ? 'true' : 'false'}</p>
              <p><strong>Article Loading:</strong> {articleLoading ? 'true' : 'false'}</p>
              <p><strong>Error:</strong> {error || 'none'}</p>
              <p><strong>Businesses Count:</strong> {businesses.length}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle errors
  if (error || !slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Article not found</p>
          <a href="/blog" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Porto-Novo Article Debug</h2>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or we don't have enough business data to generate it yet.</p>
          <div className="mt-8 p-4 bg-red-100 rounded-lg max-w-md mx-auto">
            <h3 className="font-bold text-red-800 mb-2">Debug Info:</h3>
            <div className="text-left text-sm space-y-1">
              <p><strong>Slug:</strong> {slug || 'undefined'}</p>
              <p><strong>Business Loading:</strong> {loading ? 'true' : 'false'}</p>
              <p><strong>Article Loading:</strong> {articleLoading ? 'true' : 'false'}</p>
              <p><strong>Error:</strong> {error || 'none'}</p>
              <p><strong>Businesses Count:</strong> {businesses.length}</p>
              <p><strong>Article State:</strong> {article ? 'exists' : 'null'}</p>
            </div>
          </div>
          <div className="space-y-4">
            <a href="/blog" className="block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Browse All Articles
            </a>
            <a href="/" className="block px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
              Back to Directory
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Generate breadcrumbs for schema
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    { name: 'Articles', url: '/blog' },
    { name: article.title, url: `/articles/${slug}` }
  ];

  // Generate FAQs for schema (sample - can be made dynamic)
  const faqs: FAQItem[] = [
    {
      question: `What are the best ${article.title.toLowerCase().includes('restaurant') ? 'restaurants' : 'businesses'} in this area?`,
      answer: `Our comprehensive guide features the top-rated ${article.title.toLowerCase().includes('restaurant') ? 'restaurants' : 'businesses'} with verified reviews, contact information, and detailed descriptions to help you make the best choice.`
    },
    {
      question: 'How are these businesses selected?',
      answer: 'We select businesses based on customer ratings, reviews, service quality, and local reputation to ensure you get the best recommendations.'
    },
    {
      question: 'Can I contact these businesses directly?',
      answer: 'Yes, we provide complete contact information including phone numbers, addresses, and websites for all listed businesses.'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEOHead
        title={article.title}
        description={article.metaDescription}
        keywords={article.keywords}
        canonicalUrl={`https://intelysia.com/articles/${slug}`}
        structuredData={article.structuredData}
        hreflang={{
          'en': `https://intelysia.com/articles/${slug}`,
          'fr': `https://intelysia.com/fr/articles/${slug}`,
          'x-default': `https://intelysia.com/articles/${slug}`
        }}
      />
      
      {/* Schema Markup */}
      <SchemaGenerator 
        type="BreadcrumbList" 
        breadcrumbs={breadcrumbs} 
      />
      <SchemaGenerator 
        type="FAQPage" 
        faqs={faqs} 
      />
      {/* ItemList schema will be added when we have the businesses data */}
      
      {/* Article Header */}
      <section className="bg-white py-12 px-4 border-b">
        <div className="container mx-auto max-w-4xl">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
              <li><a href="/" className="text-blue-600 hover:text-blue-800">Home</a></li>
              <li className="text-gray-400">/</li>
              <li><a href="/blog" className="text-blue-600 hover:text-blue-800">Articles</a></li>
              <li className="text-gray-400">/</li>
              <li><span className="text-gray-600">{article.title}</span></li>
            </ol>
          </nav>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          
          <div className="flex items-center text-gray-600 text-sm mb-6">
            <span>Published by Intelysia Team</span>
            <span className="mx-2">•</span>
            <time dateTime={article.lastUpdated}>
              {new Date(article.lastUpdated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          
          <p className="text-xl text-gray-700 leading-relaxed">
            {article.metaDescription}
          </p>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <article className="prose prose-lg max-w-none">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: article.content
                  // Convert headings with proper multiline matching
                  .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">$1</h3>')
                  .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>')
                  .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 mt-8 mb-6">$1</h1>')
                  // Convert markdown links to HTML links with styling
                  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>')
                  // Convert bold and italic text
                  .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
                  .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
                  // Convert horizontal rules
                  .replace(/^---$/gm, '<hr class="my-8 border-gray-300" />')
                  // Convert unordered lists
                  .replace(/^• (.+)$/gm, '<li class="ml-4 mb-2 text-gray-700">• $1</li>')
                  // Convert bullet lists with different symbols
                  .replace(/^- (.+)$/gm, '<li class="ml-4 mb-2 text-gray-700">• $1</li>')
                  // Convert paragraphs (double line breaks)
                  .replace(/\n\n/g, '</p>\n<p class="mb-4 text-gray-700 leading-relaxed">')
                  // Convert single line breaks to <br>
                  .replace(/\n/g, '<br/>')
                  // Wrap content in initial paragraph
                  .replace(/^/, '<p class="mb-4 text-gray-700 leading-relaxed">')
                  .replace(/$/, '</p>')
              }} 
            />
          </article>
          
          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Looking for More Business Information?
              </h3>
              <p className="text-blue-800 mb-4">
                Explore our comprehensive business directory to find more local businesses, 
                read reviews, and get contact information for all your needs.
              </p>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="/" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Browse All Businesses
                </a>
                <a 
                  href="/blog" 
                  className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition"
                >
                  Read More Articles
                </a>
              </div>
            </div>
          </div>
          
          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Business Directory Guide
                </h4>
                <p className="text-gray-600 mb-4">
                  Learn how to make the most of our business directory and find exactly what you need.
                </p>
                <a href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
                  Read More →
                </a>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Local Business Tips
                </h4>
                <p className="text-gray-600 mb-4">
                  Discover tips for supporting local businesses and finding quality services in Benin.
                </p>
                <a href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
                  Read More →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
