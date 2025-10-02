import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Mail, 
  Phone, 
  Upload, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  User,
  Building,
  Shield
} from 'lucide-react';
import { ProcessedBusiness } from '../../utils/csvDataLoader';
import { claimApiService } from '../../services/claimApi';
import { 
  ClaimFormData, 
  ClaimDocumentUpload, 
  DocumentType,
  DOCUMENT_TYPES 
} from '../../types/claim';

interface ClaimVerificationProps {
  business: ProcessedBusiness;
  onComplete: (claimId: string) => void;
  onBack: () => void;
}

type VerificationStep = 'info' | 'contact' | 'documents' | 'review' | 'submitting';

const ClaimVerification: React.FC<ClaimVerificationProps> = ({
  business,
  onComplete,
  onBack
}) => {
  const [currentStep, setCurrentStep] = useState<VerificationStep>('info');
  const [formData, setFormData] = useState<ClaimFormData>({
    businessId: business.id,
    businessName: business.name,
    businessAddress: business.address,
    claimantName: '',
    claimantEmail: '',
    claimantPhone: '',
    relationshipToBusiness: 'owner',
    documents: [],
    additionalNotes: '',
    preferredContactMethod: 'email'
  });
  
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [phoneVerificationCode, setPhoneVerificationCode] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);

  const updateFormData = (updates: Partial<ClaimFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear related errors
    Object.keys(updates).forEach(key => {
      if (errors[key]) {
        setErrors(prev => ({ ...prev, [key]: undefined }));
      }
    });
  };

  const validateStep = (step: VerificationStep): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 'info') {
      if (!formData.claimantName.trim()) {
        newErrors.claimantName = 'Full name is required';
      }
      if (!formData.claimantEmail.trim()) {
        newErrors.claimantEmail = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.claimantEmail)) {
        newErrors.claimantEmail = 'Please enter a valid email address';
      }
      if (!formData.claimantPhone.trim()) {
        newErrors.claimantPhone = 'Phone number is required';
      } else if (!/^[\+]?[0-9\s\-\(\)]{8,15}$/.test(formData.claimantPhone)) {
        newErrors.claimantPhone = 'Please enter a valid phone number';
      }
    }

    if (step === 'contact') {
      if (!emailVerified && !phoneVerified) {
        newErrors.verification = 'Please verify at least your email or phone number';
      }
    }

    if (step === 'documents') {
      if (formData.documents.length < 1) {
        newErrors.documents = 'Please upload at least one document to verify business ownership';
      }
      // Check for required document types
      const hasBusinessLicense = formData.documents.some(doc => doc.type === 'business_license');
      const hasOwnershipProof = formData.documents.some(doc => doc.type === 'ownership_proof');
      const hasId = formData.documents.some(doc => doc.type === 'id_document');
      
      if (!hasBusinessLicense && !hasOwnershipProof) {
        newErrors.documents = 'Please upload either a business license or proof of ownership';
      }
      if (!hasId) {
        newErrors.documents = (newErrors.documents ? newErrors.documents + '. Also, please' : 'Please') + ' upload a government-issued ID';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    const steps: VerificationStep[] = ['info', 'contact', 'documents', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: VerificationStep[] = ['info', 'contact', 'documents', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    } else {
      onBack();
    }
  };

  const sendEmailVerification = async () => {
    try {
      const response = await claimApiService.sendVerificationEmail(
        'temp-claim-id', 
        formData.claimantEmail,
        business.name // Pass business name for personalized email
      );
      if (response.success) {
        setEmailSent(true);
      } else {
        setErrors(prev => ({ ...prev, emailSend: response.error || 'Failed to send email' }));
      }
    } catch (error) {
      console.error('Failed to send email verification:', error);
      setErrors(prev => ({ ...prev, emailSend: 'Failed to send verification email' }));
    }
  };

  const sendSMSVerification = async () => {
    try {
      const response = await claimApiService.sendVerificationSMS('temp-claim-id', formData.claimantPhone);
      if (response.success) {
        setSmsSent(true);
      }
    } catch (error) {
      console.error('Failed to send SMS verification:', error);
    }
  };

  const verifyEmail = async () => {
    try {
      const response = await claimApiService.verifyEmail('temp-claim-id', emailVerificationCode);
      if (response.success && response.data.verified) {
        setEmailVerified(true);
        setErrors(prev => ({ ...prev, emailVerificationCode: undefined }));
      } else {
        setErrors(prev => ({ ...prev, emailVerificationCode: 'Invalid verification code' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, emailVerificationCode: 'Failed to verify email' }));
    }
  };

  const verifyPhone = async () => {
    try {
      const response = await claimApiService.verifyPhone('temp-claim-id', phoneVerificationCode);
      if (response.success && response.data.verified) {
        setPhoneVerified(true);
        setErrors(prev => ({ ...prev, phoneVerificationCode: undefined }));
      } else {
        setErrors(prev => ({ ...prev, phoneVerificationCode: 'Invalid verification code' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, phoneVerificationCode: 'Failed to verify phone' }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, documentType: DocumentType) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, documents: 'File size must be less than 5MB' }));
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, documents: 'Only PDF, JPG, and PNG files are allowed' }));
      return;
    }

    const newDocument: ClaimDocumentUpload = {
      type: documentType,
      file,
      description: DOCUMENT_TYPES[documentType].label
    };

    // Remove existing document of same type and add new one
    const updatedDocuments = formData.documents.filter(doc => doc.type !== documentType);
    updatedDocuments.push(newDocument);
    
    updateFormData({ documents: updatedDocuments });
    setErrors(prev => ({ ...prev, documents: undefined }));
  };

  const removeDocument = (index: number) => {
    const updatedDocuments = formData.documents.filter((_, i) => i !== index);
    updateFormData({ documents: updatedDocuments });
  };

  const submitClaim = async () => {
    if (!validateStep('review')) return;

    setCurrentStep('submitting');
    
    try {
      const response = await claimApiService.submitClaim(formData);
      if (response.success) {
        onComplete(response.data.claimId);
      } else {
        setErrors(prev => ({ ...prev, submit: response.error || 'Failed to submit claim' }));
        setCurrentStep('review');
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, submit: 'Failed to submit claim' }));
      setCurrentStep('review');
    }
  };

  const renderInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Tell us about yourself</h2>
        <p className="text-gray-600 mt-2">We need to verify your connection to this business</p>
      </div>

      {/* Business Info Display */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Business you're claiming:</h3>
        <p className="font-medium text-gray-800">{business.name}</p>
        <p className="text-sm text-gray-600">{business.address}</p>
        <p className="text-xs text-gray-500 mt-1">{business.category} • {business.location}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Full Name *
          </label>
          <input
            type="text"
            value={formData.claimantName}
            onChange={(e) => updateFormData({ claimantName: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.claimantName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.claimantName && (
            <p className="mt-1 text-sm text-red-600">{errors.claimantName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Relationship to Business *
          </label>
          <select
            value={formData.relationshipToBusiness}
            onChange={(e) => updateFormData({ relationshipToBusiness: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="owner">Business Owner</option>
            <option value="manager">Manager</option>
            <option value="authorized_representative">Authorized Representative</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Email Address *
          </label>
          <input
            type="email"
            value={formData.claimantEmail}
            onChange={(e) => updateFormData({ claimantEmail: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.claimantEmail ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="your@email.com"
          />
          {errors.claimantEmail && (
            <p className="mt-1 text-sm text-red-600">{errors.claimantEmail}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Phone Number *
          </label>
          <input
            type="tel"
            value={formData.claimantPhone}
            onChange={(e) => updateFormData({ claimantPhone: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.claimantPhone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+229 XX XX XX XX"
          />
          {errors.claimantPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.claimantPhone}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Information (Optional)
        </label>
        <textarea
          value={formData.additionalNotes}
          onChange={(e) => updateFormData({ additionalNotes: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Any additional details that would help verify your ownership..."
        />
      </div>
    </div>
  );

  const renderContactStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Verify Your Contact Information</h2>
        <p className="text-gray-600 mt-2">We'll send you verification codes to confirm your identity</p>
      </div>

      {/* Email Verification */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-blue-600 mr-2" />
            <span className="font-medium">Email Verification</span>
          </div>
          {emailVerified ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <Clock className="h-5 w-5 text-yellow-500" />
          )}
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{formData.claimantEmail}</p>
        
        {!emailVerified && (
          <div className="space-y-3">
            {!emailSent ? (
              <button
                onClick={sendEmailVerification}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Verification Email
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-green-600">Verification email sent! Check your inbox.</p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={emailVerificationCode}
                    onChange={(e) => setEmailVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.emailVerificationCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    maxLength={6}
                  />
                  <button
                    onClick={verifyEmail}
                    disabled={emailVerificationCode.length < 6}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 transition"
                  >
                    Verify
                  </button>
                </div>
                {errors.emailVerificationCode && (
                  <p className="text-sm text-red-600">{errors.emailVerificationCode}</p>
                )}
              </div>
            )}
          </div>
        )}
        
        {emailVerified && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span className="text-sm">Email verified successfully!</span>
          </div>
        )}
      </div>

      {/* Phone Verification */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-blue-600 mr-2" />
            <span className="font-medium">Phone Verification</span>
          </div>
          {phoneVerified ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <Clock className="h-5 w-5 text-yellow-500" />
          )}
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{formData.claimantPhone}</p>
        
        {!phoneVerified && (
          <div className="space-y-3">
            {!smsSent ? (
              <button
                onClick={sendSMSVerification}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                <Phone className="h-4 w-4 mr-2" />
                Send SMS Code
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-green-600">SMS sent! Enter the code you received.</p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={phoneVerificationCode}
                    onChange={(e) => setPhoneVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phoneVerificationCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    maxLength={6}
                  />
                  <button
                    onClick={verifyPhone}
                    disabled={phoneVerificationCode.length < 6}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 transition"
                  >
                    Verify
                  </button>
                </div>
                {errors.phoneVerificationCode && (
                  <p className="text-sm text-red-600">{errors.phoneVerificationCode}</p>
                )}
              </div>
            )}
          </div>
        )}
        
        {phoneVerified && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span className="text-sm">Phone verified successfully!</span>
          </div>
        )}
      </div>

      {errors.verification && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{errors.verification}</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderDocumentsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Upload Verification Documents</h2>
        <p className="text-gray-600 mt-2">Provide proof of business ownership to complete verification</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3" />
          <div className="text-sm">
            <p className="font-medium text-yellow-800">Required Documents:</p>
            <ul className="list-disc list-inside text-yellow-700 mt-1 space-y-1">
              <li>Business License OR Proof of Ownership</li>
              <li>Government-issued ID (passport, driver's license, etc.)</li>
            </ul>
            <p className="text-yellow-700 mt-2">Max file size: 5MB. Formats: PDF, JPG, PNG</p>
          </div>
        </div>
      </div>

      {/* Document Upload Areas */}
      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(DOCUMENT_TYPES).map(([type, config]) => {
          const existingDoc = formData.documents.find(doc => doc.type === type as DocumentType);
          
          return (
            <div key={type} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">{config.label}</h3>
                {config.required && (
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Required</span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-4">{config.description}</p>
              
              {existingDoc ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-800 font-medium">
                        {existingDoc.file.name}
                      </span>
                    </div>
                    <button
                      onClick={() => removeDocument(formData.documents.indexOf(existingDoc))}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    {(existingDoc.file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <label className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-800">Choose file</span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e, type as DocumentType)}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {errors.documents && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{errors.documents}</p>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> All uploaded documents will be reviewed by our team. 
          Please ensure documents are clear and readable. We typically respond within 2-5 business days.
        </p>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Review Your Claim</h2>
        <p className="text-gray-600 mt-2">Please verify all information before submitting</p>
      </div>

      {/* Business Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Business Name:</span>
            <p className="text-gray-900">{business.name}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Address:</span>
            <p className="text-gray-900">{business.address}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Category:</span>
            <p className="text-gray-900">{business.category}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Location:</span>
            <p className="text-gray-900">{business.location}</p>
          </div>
        </div>
      </div>

      {/* Claimant Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Full Name:</span>
            <p className="text-gray-900">{formData.claimantName}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Relationship:</span>
            <p className="text-gray-900 capitalize">{formData.relationshipToBusiness.replace('_', ' ')}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Email:</span>
            <div className="flex items-center">
              <p className="text-gray-900 mr-2">{formData.claimantEmail}</p>
              {emailVerified && <CheckCircle className="h-4 w-4 text-green-600" />}
            </div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Phone:</span>
            <div className="flex items-center">
              <p className="text-gray-900 mr-2">{formData.claimantPhone}</p>
              {phoneVerified && <CheckCircle className="h-4 w-4 text-green-600" />}
            </div>
          </div>
        </div>
        {formData.additionalNotes && (
          <div className="mt-4">
            <span className="font-medium text-gray-700">Additional Notes:</span>
            <p className="text-gray-900 mt-1">{formData.additionalNotes}</p>
          </div>
        )}
      </div>

      {/* Documents */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h3>
        <div className="space-y-2">
          {formData.documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{DOCUMENT_TYPES[doc.type].label}</p>
                  <p className="text-xs text-gray-600">{doc.file.name}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">
                {(doc.file.size / 1024 / 1024).toFixed(1)} MB
              </span>
            </div>
          ))}
        </div>
      </div>

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{errors.submit}</p>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          By submitting this claim, you confirm that all information provided is accurate and that you have 
          the authority to claim this business listing. Our team will review your submission within 2-5 business days.
        </p>
      </div>
    </div>
  );

  const renderSubmittingStep = () => (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Submitting Your Claim</h2>
      <p className="text-gray-600">Please wait while we process your business claim...</p>
    </div>
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case 'info': return 'Personal Information';
      case 'contact': return 'Contact Verification';
      case 'documents': return 'Document Upload';
      case 'review': return 'Review & Submit';
      case 'submitting': return 'Processing...';
      default: return '';
    }
  };

  const getStepNumber = () => {
    switch (currentStep) {
      case 'info': return 1;
      case 'contact': return 2;
      case 'documents': return 3;
      case 'review': return 4;
      case 'submitting': return 4;
      default: return 1;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Step {getStepNumber()} of 4</span>
          <span>{getStepTitle()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(getStepNumber() / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-md p-8">
        {currentStep === 'info' && renderInfoStep()}
        {currentStep === 'contact' && renderContactStep()}
        {currentStep === 'documents' && renderDocumentsStep()}
        {currentStep === 'review' && renderReviewStep()}
        {currentStep === 'submitting' && renderSubmittingStep()}

        {/* Navigation Buttons */}
        {currentStep !== 'submitting' && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              className="flex items-center px-6 py-3 text-gray-600 font-medium rounded-md hover:text-gray-800 hover:bg-gray-100 transition"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            
            {currentStep === 'review' ? (
              <button
                onClick={submitClaim}
                className="flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition"
              >
                Submit Claim
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
              >
                Continue
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimVerification;