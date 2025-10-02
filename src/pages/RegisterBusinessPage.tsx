import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, AlertCircle, Building2, Users, Shield } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import BusinessRegistrationForm from '../components/business/BusinessRegistrationForm';

interface BusinessRegistrationData {
  businessName: string;
  description: string;
  formattedAddress: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  phone: string;
  email: string;
  website: string;
  category: string;
}

interface UploadedDocument {
  id: string;
  file: File;
  documentType: string;
  preview?: string;
}

const RegisterBusinessPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    message: string;
    submissionId?: string;
  } | null>(null);
  const navigate = useNavigate();

  const handleSubmission = async (
    formData: BusinessRegistrationData,
    documents: UploadedDocument[]
  ) => {
    setIsSubmitting(true);
    
    try {
      // Create form data for API submission
      const apiFormData = new FormData();
      
      // Add business data
      apiFormData.append('businessData', JSON.stringify(formData));
      
      // Add documents
      documents.forEach((doc, index) => {
        apiFormData.append(`document_${index}`, doc.file);
        apiFormData.append(`documentType_${index}`, doc.documentType);
      });

      // For now, simulate API call since we haven't implemented the backend yet
      await simulateApiCall(apiFormData);

      setSubmissionResult({
        success: true,
        message: 'Your business registration has been submitted successfully! We will review it within 2-5 business days.',
        submissionId: `SUB-${Date.now()}`
      });

    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionResult({
        success: false,
        message: 'There was an error submitting your registration. Please try again or contact support.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simulate API call - replace with actual API call later
  const simulateApiCall = async (formData: FormData): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success most of the time
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Simulated error'));
        }
      }, 2000);
    });
  };

  const handleStartOver = () => {
    setSubmissionResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToDirectory = () => {
    navigate('/');
  };

  // If submission is complete, show result page
  if (submissionResult) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <SEOHead
          title="Business Registration Submitted - Intelysia"
          description="Your business registration has been submitted successfully."
        />
        
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className={`rounded-lg p-8 text-center ${
              submissionResult.success ? 'bg-green-50' : 'bg-red-50'
            }`}>
              {submissionResult.success ? (
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              ) : (
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              )}
              
              <h1 className={`text-3xl font-bold mb-4 ${
                submissionResult.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {submissionResult.success ? 'Registration Submitted!' : 'Submission Failed'}
              </h1>
              
              <p className={`text-lg mb-6 ${
                submissionResult.success ? 'text-green-700' : 'text-red-700'
              }`}>
                {submissionResult.message}
              </p>

              {submissionResult.success && submissionResult.submissionId && (
                <div className="bg-white rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600">
                    <strong>Submission ID:</strong> {submissionResult.submissionId}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Save this ID for your records
                  </p>
                </div>
              )}

              {submissionResult.success && (
                <div className="bg-white rounded-lg p-6 mb-6 text-left">
                  <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center justify-center font-semibold mr-3">1</span>
                      <div>
                        <p className="font-medium">Initial Review</p>
                        <p className="text-gray-600">Our team will review your submission and documents within 24 hours.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center justify-center font-semibold mr-3">2</span>
                      <div>
                        <p className="font-medium">Verification Process</p>
                        <p className="text-gray-600">We may contact you for additional information or verification.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center justify-center font-semibold mr-3">3</span>
                      <div>
                        <p className="font-medium">Approval & Publication</p>
                        <p className="text-gray-600">Once approved, your business will be live on our directory.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {submissionResult.success ? (
                  <>
                    <button
                      onClick={handleGoToDirectory}
                      className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
                    >
                      Browse Directory
                    </button>
                    <button
                      onClick={handleStartOver}
                      className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition"
                    >
                      Register Another Business
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleStartOver}
                      className="w-full px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={handleGoToDirectory}
                      className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition"
                    >
                      Back to Directory
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <SEOHead
        title="Register Your Business - Intelysia Business Directory"
        description="Register your business with Intelysia to reach more customers in Cotonou and throughout Benin. Get started today!"
        keywords={['register business', 'add business', 'Benin business directory', 'Cotonou business listing']}
      />
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Directory
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Register Your Business
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join Intelysia and connect with thousands of potential customers in Benin. 
              Registration is free and takes just a few minutes.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Increase Visibility</h3>
              <p className="text-sm text-gray-600">
                Get discovered by customers searching for businesses like yours
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-lg p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Connect with Customers</h3>
              <p className="text-sm text-gray-600">
                Receive calls, messages, and reviews from potential customers
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-lg p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Build Trust</h3>
              <p className="text-sm text-gray-600">
                Verified business listings build credibility with customers
              </p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <BusinessRegistrationForm
          onSubmit={handleSubmission}
          isSubmitting={isSubmitting}
        />

        {/* Help Section */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-blue-700 text-sm mb-4">
              Have questions about registering your business? Our support team is here to help.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-blue-700">
                📧 Email: <a href="mailto:support@intelysia.com" className="underline">support@intelysia.com</a>
              </p>
              <p className="text-blue-700">
                📞 Phone: <a href="tel:+22996123456" className="underline">+229 96 12 34 56</a>
              </p>
            </div>
          </div>
        </div>

        {/* Existing Business Section */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <h3 className="font-semibold text-yellow-900 mb-2">Already Listed?</h3>
            <p className="text-yellow-700 text-sm mb-4">
              If your business is already in our directory, you can claim it instead of creating a new listing.
            </p>
            <Link
              to="/claim-business"
              className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition"
            >
              Claim Existing Business
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterBusinessPage;