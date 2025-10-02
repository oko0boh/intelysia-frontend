// Business Claim System Types

export type ClaimStatus = 'pending' | 'under_review' | 'verified' | 'approved' | 'rejected' | 'incomplete';

export type VerificationStep = 'business_identification' | 'contact_verification' | 'document_upload' | 'admin_review' | 'completed';

export type DocumentType = 'business_license' | 'tax_id' | 'ownership_proof' | 'id_document' | 'utility_bill' | 'other';

export interface BusinessClaim {
  id: string;
  businessId: string;
  claimantName: string;
  claimantEmail: string;
  claimantPhone: string;
  status: ClaimStatus;
  currentStep: VerificationStep;
  submittedAt: string;
  reviewedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  adminNotes?: string;
  rejectionReason?: string;
}

export interface ClaimDocument {
  id: string;
  claimId: string;
  type: DocumentType;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  verified: boolean;
  adminNotes?: string;
}

export interface ClaimVerification {
  claimId: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  documentsVerified: boolean;
  adminApproved: boolean;
  verificationCode?: string;
  phoneVerificationCode?: string;
  emailVerificationSent: boolean;
  phoneVerificationSent: boolean;
}

export interface BusinessOwner {
  id: string;
  businessId: string;
  userId: string;
  claimId: string;
  name: string;
  email: string;
  phone: string;
  role: 'owner' | 'manager' | 'representative';
  verifiedAt: string;
  permissions: BusinessPermission[];
}

export interface BusinessPermission {
  id: string;
  ownerId: string;
  permission: 'update_info' | 'manage_photos' | 'respond_reviews' | 'view_analytics' | 'manage_hours' | 'all';
  granted: boolean;
}

export interface ClaimFormData {
  // Step 1: Business Identification
  businessId: string;
  businessName: string;
  businessAddress: string;
  
  // Step 2: Claimant Information
  claimantName: string;
  claimantEmail: string;
  claimantPhone: string;
  relationshipToBusiness: 'owner' | 'manager' | 'authorized_representative';
  
  // Step 3: Contact Verification
  emailVerificationCode?: string;
  phoneVerificationCode?: string;
  
  // Step 4: Document Upload
  documents: ClaimDocumentUpload[];
  
  // Step 5: Additional Information
  additionalNotes?: string;
  preferredContactMethod: 'email' | 'phone';
}

export interface ClaimDocumentUpload {
  type: DocumentType;
  file: File;
  description?: string;
}

export interface BusinessUpdateRequest {
  businessId: string;
  ownerId: string;
  updates: {
    name?: string;
    description?: string;
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
    hours?: string;
    socialLinks?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      linkedin?: string;
      whatsapp?: string;
    };
  };
  updateReason: string;
}

export interface OwnerDashboardStats {
  businessViews: number;
  callClicks: number;
  websiteClicks: number;
  directionClicks: number;
  monthlyGrowth: number;
  averageRating: number;
  totalReviews: number;
  lastUpdated: string;
}

export interface ClaimSearchCriteria {
  businessName?: string;
  location?: string;
  category?: string;
  exact?: boolean;
}

export interface ClaimValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

// API Response Types
export interface ClaimApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  validationErrors?: string[];
}

export interface ClaimSubmissionResponse {
  claimId: string;
  status: ClaimStatus;
  nextStep: VerificationStep;
  message: string;
  estimatedReviewTime: string; // e.g., "2-5 business days"
}

export interface VerificationResponse {
  success: boolean;
  verified: boolean;
  message: string;
  nextStep?: VerificationStep;
}

// Form Validation Rules
export interface ClaimValidationRules {
  businessId: {
    required: true;
  };
  claimantName: {
    required: true;
    minLength: 2;
    maxLength: 100;
  };
  claimantEmail: {
    required: true;
    pattern: RegExp;
  };
  claimantPhone: {
    required: true;
    pattern: RegExp;
  };
  relationshipToBusiness: {
    required: true;
    allowedValues: ('owner' | 'manager' | 'authorized_representative')[];
  };
  documents: {
    required: true;
    minFiles: 2;
    maxFileSize: number; // in bytes
    allowedTypes: string[];
  };
}

// Constants
export const CLAIM_STEPS: Record<VerificationStep, { title: string; description: string; order: number }> = {
  business_identification: {
    title: 'Identify Your Business',
    description: 'Find and select your business from our directory',
    order: 1
  },
  contact_verification: {
    title: 'Verify Contact Information',
    description: 'Confirm your email and phone number',
    order: 2
  },
  document_upload: {
    title: 'Upload Verification Documents',
    description: 'Provide proof of business ownership',
    order: 3
  },
  admin_review: {
    title: 'Admin Review',
    description: 'Our team will review your claim',
    order: 4
  },
  completed: {
    title: 'Claim Complete',
    description: 'Your business is now verified and under your management',
    order: 5
  }
};

export const DOCUMENT_TYPES: Record<DocumentType, { label: string; description: string; required: boolean }> = {
  business_license: {
    label: 'Business License',
    description: 'Official business registration or license',
    required: true
  },
  tax_id: {
    label: 'Tax ID Document',
    description: 'Tax identification number document',
    required: false
  },
  ownership_proof: {
    label: 'Proof of Ownership',
    description: 'Documents showing business ownership',
    required: true
  },
  id_document: {
    label: 'Government ID',
    description: 'Valid government-issued identification',
    required: true
  },
  utility_bill: {
    label: 'Utility Bill',
    description: 'Recent utility bill showing business address',
    required: false
  },
  other: {
    label: 'Other Document',
    description: 'Any other relevant business documentation',
    required: false
  }
};

export const CLAIM_STATUS_LABELS: Record<ClaimStatus, { label: string; color: string; description: string }> = {
  pending: {
    label: 'Pending Submission',
    color: 'yellow',
    description: 'Claim form is being filled out'
  },
  under_review: {
    label: 'Under Review',
    color: 'blue',
    description: 'Our team is reviewing your claim'
  },
  verified: {
    label: 'Verified',
    color: 'green',
    description: 'Information has been verified'
  },
  approved: {
    label: 'Approved',
    color: 'green',
    description: 'Claim approved - you can now manage your business'
  },
  rejected: {
    label: 'Rejected',
    color: 'red',
    description: 'Claim was rejected - see notes for details'
  },
  incomplete: {
    label: 'Incomplete',
    color: 'orange',
    description: 'Additional information needed'
  }
};