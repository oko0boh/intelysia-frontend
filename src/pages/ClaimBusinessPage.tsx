import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ChevronLeft, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import ClaimVerification from '../components/business/ClaimVerification';
import { claimApiService } from '../services/claimApi';
import { ProcessedBusiness } from '../utils/csvDataLoader';
import { ClaimSearchCriteria } from '../types/claim';

type ClaimStep = 'search' | 'verify' | 'complete';

const ClaimBusinessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState<ClaimStep>('search');
  const [searchCriteria, setSearchCriteria] = useState<ClaimSearchCriteria>({
    businessName: searchParams.get('businessName') || '',
    location: '',
    category: ''
  });
  const [searchResults, setSearchResults] = useState<ProcessedBusiness[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<ProcessedBusiness | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [claimId, setClaimId] = useState<string | null>(null);

  // Pre-select business if businessId is provided in URL
  useEffect(() => {
    const businessId = searchParams.get('businessId');
    if (businessId) {
      // Search for this specific business
      handleSearch({ businessName: searchParams.get('businessName') || '', exact: true });
    }
  }, [searchParams]);

  const handleSearch = async (criteria: ClaimSearchCriteria) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await claimApiService.searchBusinesses(criteria);
      if (response.success) {
        setSearchResults(response.data);
        
        // If searching for a specific business by ID, auto-select it
        const businessId = searchParams.get('businessId');
        if (businessId && response.data.length > 0) {
          const targetBusiness = response.data.find(b => b.id === businessId);
          if (targetBusiness) {
            setSelectedBusiness(targetBusiness);
          }
        }
      } else {
        setError(response.error || 'Failed to search businesses');
      }
    } catch (err) {
      setError('Failed to search businesses');
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessSelect = (business: ProcessedBusiness) => {
    setSelectedBusiness(business);
    setCurrentStep('verify');
  };

  const handleClaimComplete = (completedClaimId: string) => {
    setClaimId(completedClaimId);
    setCurrentStep('complete');
  };

  const renderSearchStep = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Claim Your Business
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Find your business in our directory and claim it to manage your information
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Name
            </label>
            <input
              type="text"
              value={searchCriteria.businessName}
              onChange={(e) => setSearchCriteria({...searchCriteria, businessName: e.target.value})}
              placeholder="Enter business name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location (Optional)
            </label>
            <input
              type="text"
              value={searchCriteria.location}
              onChange={(e) => setSearchCriteria({...searchCriteria, location: e.target.value})}
              placeholder="City or area"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category (Optional)
            </label>
            <input
              type="text"
              value={searchCriteria.category}
              onChange={(e) => setSearchCriteria({...searchCriteria, category: e.target.value})}
              placeholder="Business category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={() => handleSearch(searchCriteria)}
          disabled={!searchCriteria.businessName.trim() || loading}
          className="flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              Search Businesses
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Found {searchResults.length} businesses
            </h3>
            <p className="text-sm text-gray-600">
              Click on your business to proceed with claiming it
            </p>
          </div>
          <div className="divide-y divide-gray-200">
            {searchResults.map((business) => (
              <div
                key={business.id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition"
                onClick={() => handleBusinessSelect(business)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900">
                      {business.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {business.address}
                    </p>
                    <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {business.category}
                      </span>
                      <span>{business.location}</span>
                      {business.phone && <span>{business.phone}</span>}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchResults.length === 0 && searchCriteria.businessName && !loading && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-yellow-800 mb-2">
            Business Not Found
          </h3>
          <p className="text-yellow-700 mb-4">
            We couldn't find "{searchCriteria.businessName}" in our directory.
          </p>
          <div className="space-y-2 text-sm text-yellow-700">
            <p>Try:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Different spelling or shorter business name</li>
              <li>Adding location information</li>
              <li>Checking if the business is listed under a different category</li>
            </ul>
          </div>
          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition"
            >
              Contact us to add your business
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  const renderCompleteStep = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-green-50 rounded-lg p-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-800 mb-4">
          Claim Submitted Successfully!
        </h1>
        <p className="text-lg text-green-700 mb-6">
          Your business claim has been submitted and is now under review.
        </p>
        
        <div className="bg-white rounded-lg p-6 mb-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center justify-center font-semibold mr-3">1</span>
              <div>
                <p className="font-medium">Email & Phone Verification</p>
                <p className="text-gray-600">We'll send verification codes to confirm your contact information.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center justify-center font-semibold mr-3">2</span>
              <div>
                <p className="font-medium">Document Review</p>
                <p className="text-gray-600">Our team will review your uploaded documents to verify ownership.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center justify-center font-semibold mr-3">3</span>
              <div>
                <p className="font-medium">Final Approval</p>
                <p className="text-gray-600">Once verified, you'll get full access to manage your business listing.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            <strong>Claim ID:</strong> {claimId}
          </p>
          <p className="text-gray-600">
            <strong>Estimated Review Time:</strong> 2-5 business days
          </p>
        </div>

        <div className="mt-8 space-x-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
          <Link
            to={`/business/${selectedBusiness?.id}`}
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition"
          >
            View Business Page
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <SEOHead
        title="Claim Your Business - Intelysia Business Directory"
        description="Claim your business listing on Intelysia to manage your information, respond to reviews, and connect with customers in Benin."
        keywords={['claim business', 'business owner', 'verify business', 'manage listing', 'Benin business directory']}
      />
      
      <div className="container mx-auto px-4">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Directory
          </Link>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[
              { step: 'search', label: 'Find Business', number: 1 },
              { step: 'verify', label: 'Verify Ownership', number: 2 },
              { step: 'complete', label: 'Complete', number: 3 }
            ].map(({ step, label, number }) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm ${
                  currentStep === step
                    ? 'bg-blue-600 text-white'
                    : currentStep === 'verify' && step === 'search' || currentStep === 'complete' && (step === 'search' || step === 'verify')
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep === 'complete' && (step === 'search' || step === 'verify') ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    number
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep === step ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {label}
                </span>
                {step !== 'complete' && (
                  <div className="w-12 h-px bg-gray-300 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 'search' && renderSearchStep()}
        {currentStep === 'verify' && selectedBusiness && (
          <ClaimVerification
            business={selectedBusiness}
            onComplete={handleClaimComplete}
            onBack={() => setCurrentStep('search')}
          />
        )}
        {currentStep === 'complete' && renderCompleteStep()}
      </div>
    </div>
  );
};

export default ClaimBusinessPage;