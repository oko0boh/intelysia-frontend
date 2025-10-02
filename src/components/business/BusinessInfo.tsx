import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Globe, Clock, Facebook, Instagram, Twitter, Star, Shield, User } from 'lucide-react';
import { ProcessedBusiness } from '../../utils/csvDataLoader';
import { claimApiService } from '../../services/claimApi';
interface BusinessInfoProps {
  business: ProcessedBusiness;
}
const BusinessInfo: React.FC<BusinessInfoProps> = ({
  business
}) => {
  const [claimStatus, setClaimStatus] = useState<{
    isClaimed: boolean;
    claimStatus?: string;
    claimId?: string;
  } | null>(null);
  const [checkingClaim, setCheckingClaim] = useState(false);

  useEffect(() => {
    // Check if this business is already claimed
    const checkClaimStatus = async () => {
      setCheckingClaim(true);
      try {
        const response = await claimApiService.checkBusinessClaimStatus(business.id);
        if (response.success) {
          setClaimStatus(response.data);
        }
      } catch (error) {
        console.error('Failed to check claim status:', error);
      } finally {
        setCheckingClaim(false);
      }
    };

    checkClaimStatus();
  }, [business.id]);

  const handleClaimBusiness = () => {
    // Navigate to claim page with pre-filled business info
    const claimUrl = `/claim-business?businessId=${encodeURIComponent(business.id)}&businessName=${encodeURIComponent(business.name)}`;
    window.location.href = claimUrl;
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Header */}
      <div className="relative h-64 overflow-hidden">
        <img src={business.images?.[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'} alt={business.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded mb-2 inline-block">
            {business.category}
          </span>
          <h1 className="text-3xl font-bold text-white">{business.name}</h1>
        </div>
      </div>
      {/* Rating and Actions */}
      <div className="border-b border-gray-200">
        <div className="container flex flex-col md:flex-row justify-between items-start md:items-center py-4 px-6">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < Math.floor(business.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
              <span className="ml-2 text-gray-700 font-medium">
                {business.rating} ({business.reviews} reviews)
              </span>
            </div>
          </div>
          <div className="flex space-x-3">
            {(business.enrichedPhones?.length > 0 || (business.phone && business.phone !== 'Phone not available')) && (
              <a href={`tel:${business.enrichedPhones?.[0] || business.phone}`} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                <Phone className="h-4 w-4 mr-2" /> Call Now
              </a>
            )}
            {(business.enrichedWebsites?.length > 0 || (business.website && !business.website.includes('business-'))) && (
              <a href={business.enrichedWebsites?.[0] || business.website} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition">
                <Globe className="h-4 w-4 mr-2" /> Website
              </a>
            )}
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${business.coordinates.lat},${business.coordinates.lng}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              <MapPin className="h-4 w-4 mr-2" /> Get Directions
            </a>
            
            {/* Business Claim Button */}
            {!checkingClaim && (
              <>
                {claimStatus?.isClaimed ? (
                  <div className="flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-md">
                    <Shield className="h-4 w-4 mr-2" />
                    Owner Verified
                  </div>
                ) : claimStatus?.claimStatus === 'under_review' || claimStatus?.claimStatus === 'pending' ? (
                  <div className="flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md">
                    <Clock className="h-4 w-4 mr-2" />
                    Claim Pending
                  </div>
                ) : (
                  <button
                    onClick={handleClaimBusiness}
                    className="flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition"
                    title="Claim this business if you are the owner"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Claim Business
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {/* Details */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Contact Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Contact Information
              </h3>
              {business.hasEnrichedData && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Verified ✓
                </span>
              )}
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
              <span className="ml-3 text-gray-600">{business.address}</span>
            </div>

            {/* Phone Numbers - Show all enriched numbers */}
            {business.enrichedPhones?.length > 0 ? (
              <div className="space-y-2">
                {business.enrichedPhones.map((phone, index) => (
                  <div key={index} className="flex items-center">
                    <Phone className="h-5 w-5 text-green-600" />
                    <a href={`tel:${phone}`} className="ml-3 text-gray-600 hover:text-blue-600 font-medium">
                      {phone}
                    </a>
                    {index === 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                        Primary
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : business.phone && business.phone !== 'Phone not available' ? (
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-500" />
                <a href={`tel:${business.phone}`} className="ml-3 text-gray-600 hover:text-blue-600">
                  {business.phone}
                </a>
              </div>
            ) : null}

            {/* Websites - Show all enriched websites */}
            {business.enrichedWebsites?.length > 0 ? (
              <div className="space-y-2">
                {business.enrichedWebsites.map((website, index) => (
                  <div key={index} className="flex items-center">
                    <Globe className="h-5 w-5 text-green-600" />
                    <a href={website} target="_blank" rel="noopener noreferrer" className="ml-3 text-gray-600 hover:text-blue-600 font-medium">
                      {website.replace(/^https?:\/\//, '')}
                    </a>
                    {index === 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                        Primary
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : business.website && !business.website.includes('business-') ? (
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-500" />
                <a href={business.website} target="_blank" rel="noopener noreferrer" className="ml-3 text-gray-600 hover:text-blue-600">
                  {business.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            ) : null}

            {/* Emails - Show enriched emails */}
            {business.enrichedEmails?.length > 0 && (
              <div className="space-y-2">
                {business.enrichedEmails.map((email, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${email}`} className="ml-3 text-gray-600 hover:text-blue-600 font-medium">
                      {email}
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* Show no contact info message only if no enriched data */}
            {!business.hasEnrichedData && !business.phone && !business.website && (
              <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-yellow-700">
                  <p className="text-sm font-medium">Contact information not available</p>
                  <p className="text-xs">You can still get directions to this business</p>
                </div>
              </div>
            )}

            {/* Business Hours */}
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
              <div className="ml-3">
                {business.enrichedHours?.length > 0 ? (
                  <div>
                    <span className="text-gray-600 font-medium">{business.enrichedHours[0]}</span>
                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                      Verified
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-600">{business.hours}</span>
                )}
              </div>
            </div>

            {/* Data source confidence */}
            {business.hasEnrichedData && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-700">Contact Data Quality</span>
                  <span className="text-sm text-blue-600">{business.enrichmentConfidence}% Verified</span>
                </div>
                {business.enrichmentSources?.length > 0 && (
                  <p className="text-xs text-blue-600 mt-1">
                    Sources: {business.enrichmentSources.join(', ')}
                  </p>
                )}
              </div>
            )}
            {/* Social Links */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">
                Follow on Social Media
              </h4>
              <div className="flex space-x-3">
                {business.social_links.facebook && <a href={business.social_links.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full text-blue-600 hover:bg-blue-100 transition">
                    <Facebook className="h-5 w-5" />
                  </a>}
                {business.social_links.instagram && <a href={business.social_links.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full text-pink-600 hover:bg-pink-100 transition">
                    <Instagram className="h-5 w-5" />
                  </a>}
                {business.social_links.twitter && <a href={business.social_links.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full text-blue-400 hover:bg-blue-100 transition">
                    <Twitter className="h-5 w-5" />
                  </a>}
              </div>
            </div>
          </div>
          {/* Right Column - Description and Map */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              About {business.name}
            </h3>
            <p className="text-gray-600 mb-6">{business.description}</p>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Location
            </h3>
            <div className="h-64 bg-gray-100 rounded-lg overflow-hidden relative">
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=${encodeURIComponent(business.name + ', ' + business.address)}&center=${business.coordinates.lat},${business.coordinates.lng}&zoom=15`}
                allowFullScreen
                title={`Map location of ${business.name}`}
              ></iframe>
              <div className="absolute top-2 right-2">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${business.coordinates.lat},${business.coordinates.lng}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white shadow-md rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  View in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BusinessInfo;