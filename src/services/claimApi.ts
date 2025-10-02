import { 
  BusinessClaim, 
  ClaimFormData, 
  ClaimApiResponse,
  ClaimSubmissionResponse,
  VerificationResponse,
  ClaimSearchCriteria,
  ClaimValidationResult,
  BusinessUpdateRequest,
  OwnerDashboardStats,
  ClaimDocument
} from '../types/claim';
import { ProcessedBusiness } from '../utils/csvDataLoader';
import { emailService } from './emailService';

// Mock API service for business claims
class ClaimApiService {
  private baseUrl = '/api/claims'; // This would be your actual API endpoint
  private mockClaims: Map<string, BusinessClaim> = new Map();
  private mockDocuments: Map<string, ClaimDocument[]> = new Map();

  constructor() {
    // Initialize with some mock data for development
    this.initializeMockData();
  }

  private initializeMockData() {
    // Add some mock claims for testing
    const mockClaim: BusinessClaim = {
      id: 'claim-1',
      businessId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
      claimantName: 'John Doe',
      claimantEmail: 'john.doe@example.com',
      claimantPhone: '+22996123456',
      status: 'under_review',
      currentStep: 'admin_review',
      submittedAt: new Date().toISOString(),
      adminNotes: 'Documents under review'
    };
    this.mockClaims.set(mockClaim.id, mockClaim);
  }

  // Search for businesses to claim
  async searchBusinesses(criteria: ClaimSearchCriteria): Promise<ClaimApiResponse<ProcessedBusiness[]>> {
    try {
      // For now, we'll use the existing business data
      const { loadBusinessData } = await import('../utils/csvDataLoader');
      const businesses = await loadBusinessData('/data/enriched_businesses.csv');
      
      console.log(`🔍 Searching ${businesses.length} businesses for criteria:`, criteria);
      
      let filteredBusinesses = businesses;
      
      if (criteria.businessName) {
        const searchTerm = criteria.businessName.toLowerCase().trim();
        console.log(`🔍 Searching for business name containing: "${searchTerm}"`);
        
        filteredBusinesses = filteredBusinesses.filter(business => {
          const businessName = business.name.toLowerCase();
          const matches = businessName.includes(searchTerm);
          if (matches) {
            console.log(`✅ Found match: "${business.name}" matches "${searchTerm}"`);
          }
          return matches;
        });
        
        console.log(`🔍 After name filter: ${filteredBusinesses.length} businesses`);
        
        // If no exact matches, try partial matching with individual words
        if (filteredBusinesses.length === 0) {
          const searchWords = searchTerm.split(' ').filter(word => word.length > 2);
          console.log(`🔍 Trying word-based search with words:`, searchWords);
          
          filteredBusinesses = businesses.filter(business => {
            const businessName = business.name.toLowerCase();
            return searchWords.some(word => businessName.includes(word));
          });
          
          console.log(`🔍 After word-based search: ${filteredBusinesses.length} businesses`);
        }
      }
      
      if (criteria.location) {
        const searchLocation = criteria.location.toLowerCase().trim();
        console.log(`🔍 Filtering by location: "${searchLocation}"`);
        filteredBusinesses = filteredBusinesses.filter(business => 
          business.location?.toLowerCase().includes(searchLocation) ||
          business.address?.toLowerCase().includes(searchLocation)
        );
        console.log(`🔍 After location filter: ${filteredBusinesses.length} businesses`);
      }
      
      if (criteria.category) {
        const searchCategory = criteria.category.toLowerCase().trim();
        console.log(`🔍 Filtering by category: "${searchCategory}"`);
        filteredBusinesses = filteredBusinesses.filter(business => 
          business.category.toLowerCase().includes(searchCategory)
        );
        console.log(`🔍 After category filter: ${filteredBusinesses.length} businesses`);
      }

      console.log(`🎯 Final results: ${filteredBusinesses.length} businesses found`);
      
      // Show first few results for debugging
      if (filteredBusinesses.length > 0) {
        console.log(`📋 First few results:`, filteredBusinesses.slice(0, 3).map(b => ({
          name: b.name,
          location: b.location,
          address: b.address
        })));
      }

      return {
        success: true,
        data: filteredBusinesses.slice(0, 10), // Limit to 10 results
        message: `Found ${filteredBusinesses.length} businesses`
      };
    } catch (error) {
      console.error('❌ Search failed:', error);
      return {
        success: false,
        data: [],
        error: 'Failed to search businesses'
      };
    }
  }

  // Submit a business claim
  async submitClaim(claimData: ClaimFormData): Promise<ClaimApiResponse<ClaimSubmissionResponse>> {
    try {
      // Validate claim data
      const validation = this.validateClaimData(claimData);
      if (!validation.isValid) {
        return {
          success: false,
          data: {} as ClaimSubmissionResponse,
          error: 'Validation failed',
          validationErrors: validation.errors
        };
      }

      // Create new claim
      const claimId = `claim-${Date.now()}`;
      const newClaim: BusinessClaim = {
        id: claimId,
        businessId: claimData.businessId,
        claimantName: claimData.claimantName,
        claimantEmail: claimData.claimantEmail,
        claimantPhone: claimData.claimantPhone,
        status: 'under_review',
        currentStep: 'admin_review',
        submittedAt: new Date().toISOString()
      };

      // Store the claim (in real app, this would be in database)
      this.mockClaims.set(claimId, newClaim);

      // Store documents if provided
      if (claimData.documents && claimData.documents.length > 0) {
        const documents: ClaimDocument[] = claimData.documents.map((doc, index) => ({
          id: `doc-${claimId}-${index}`,
          claimId: claimId,
          type: doc.type,
          fileName: doc.file.name,
          fileUrl: `mock://documents/${doc.file.name}`,
          uploadedAt: new Date().toISOString(),
          verified: false
        }));
        this.mockDocuments.set(claimId, documents);
      }

      const response: ClaimSubmissionResponse = {
        claimId,
        status: newClaim.status,
        nextStep: newClaim.currentStep,
        message: 'Your claim has been submitted successfully. We will review it within 2-5 business days.',
        estimatedReviewTime: '2-5 business days'
      };

      return {
        success: true,
        data: response,
        message: 'Claim submitted successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: {} as ClaimSubmissionResponse,
        error: 'Failed to submit claim'
      };
    }
  }

  // Get claim status
  async getClaimStatus(claimId: string): Promise<ClaimApiResponse<BusinessClaim>> {
    try {
      const claim = this.mockClaims.get(claimId);
      if (!claim) {
        return {
          success: false,
          data: {} as BusinessClaim,
          error: 'Claim not found'
        };
      }

      return {
        success: true,
        data: claim,
        message: 'Claim status retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: {} as BusinessClaim,
        error: 'Failed to retrieve claim status'
      };
    }
  }

  // Verify email using EmailJS service
  async verifyEmail(claimId: string, verificationCode: string): Promise<ClaimApiResponse<VerificationResponse>> {
    try {
      console.log(`🔍 Verifying email code for claim ${claimId}: ${verificationCode}`);
      
      const result = emailService.verifyEmailCode(claimId, verificationCode);
      
      if (result.verified) {
        // Update claim status
        const claim = this.mockClaims.get(claimId);
        if (claim) {
          claim.currentStep = 'document_upload';
          this.mockClaims.set(claimId, claim);
        }
      }

      return {
        success: result.success,
        data: {
          success: result.verified,
          verified: result.verified,
          message: result.message,
          nextStep: result.verified ? 'document_upload' : 'contact_verification'
        }
      };
    } catch (error) {
      console.error('❌ Email verification error:', error);
      return {
        success: false,
        data: {
          success: false,
          verified: false,
          message: 'Failed to verify email'
        },
        error: 'Email verification failed'
      };
    }
  }

  // Verify phone
  async verifyPhone(claimId: string, verificationCode: string): Promise<ClaimApiResponse<VerificationResponse>> {
    try {
      // Mock phone verification
      const isValidCode = verificationCode === '654321'; // Mock verification code
      
      if (isValidCode) {
        const claim = this.mockClaims.get(claimId);
        if (claim) {
          claim.currentStep = 'document_upload';
          this.mockClaims.set(claimId, claim);
        }
      }

      return {
        success: true,
        data: {
          success: isValidCode,
          verified: isValidCode,
          message: isValidCode ? 'Phone verified successfully' : 'Invalid verification code',
          nextStep: isValidCode ? 'document_upload' : 'contact_verification'
        }
      };
    } catch (error) {
      return {
        success: false,
        data: {
          success: false,
          verified: false,
          message: 'Failed to verify phone'
        },
        error: 'Phone verification failed'
      };
    }
  }

  // Send verification email using EmailJS
  async sendVerificationEmail(claimId: string, email: string, businessName?: string): Promise<ClaimApiResponse<{ sent: boolean; code?: string }>> {
    try {
      console.log(`📧 Sending verification email to ${email} for claim ${claimId}`);
      
      const result = await emailService.sendVerificationEmail(claimId, email, businessName);
      
      if (result.success) {
        return {
          success: true,
          data: { sent: true },
          message: result.message
        };
      } else {
        return {
          success: false,
          data: { sent: false },
          error: result.error || 'Failed to send verification email'
        };
      }
    } catch (error) {
      console.error('❌ Email sending error:', error);
      return {
        success: false,
        data: { sent: false },
        error: 'Failed to send verification email'
      };
    }
  }

  // Send verification SMS
  async sendVerificationSMS(claimId: string, phone: string): Promise<ClaimApiResponse<{ sent: boolean }>> {
    try {
      // Mock sending verification SMS
      console.log(`Sending verification SMS to ${phone} for claim ${claimId}`);
      console.log(`Verification code: 654321`); // In real app, this would be random and not logged
      
      return {
        success: true,
        data: { sent: true },
        message: 'Verification SMS sent successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: { sent: false },
        error: 'Failed to send verification SMS'
      };
    }
  }

  // Upload documents
  async uploadDocuments(claimId: string, files: File[]): Promise<ClaimApiResponse<{ uploaded: number }>> {
    try {
      // Mock document upload
      const uploadedDocs: ClaimDocument[] = files.map((file, index) => ({
        id: `doc-${claimId}-${Date.now()}-${index}`,
        claimId: claimId,
        type: 'other', // In real app, this would be determined by file analysis
        fileName: file.name,
        fileUrl: `mock://documents/${file.name}`,
        uploadedAt: new Date().toISOString(),
        verified: false
      }));

      const existingDocs = this.mockDocuments.get(claimId) || [];
      this.mockDocuments.set(claimId, [...existingDocs, ...uploadedDocs]);

      return {
        success: true,
        data: { uploaded: files.length },
        message: `${files.length} documents uploaded successfully`
      };
    } catch (error) {
      return {
        success: false,
        data: { uploaded: 0 },
        error: 'Failed to upload documents'
      };
    }
  }

  // Update business information (for claimed businesses)
  async updateBusinessInfo(updateRequest: BusinessUpdateRequest): Promise<ClaimApiResponse<{ updated: boolean }>> {
    try {
      // Mock business update - in real app, this would update the database
      console.log(`Updating business ${updateRequest.businessId} by owner ${updateRequest.ownerId}`);
      console.log('Updates:', updateRequest.updates);
      console.log('Reason:', updateRequest.updateReason);

      return {
        success: true,
        data: { updated: true },
        message: 'Business information updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: { updated: false },
        error: 'Failed to update business information'
      };
    }
  }

  // Get owner dashboard stats
  async getOwnerDashboardStats(businessId: string): Promise<ClaimApiResponse<OwnerDashboardStats>> {
    try {
      // Mock dashboard stats
      const stats: OwnerDashboardStats = {
        businessViews: Math.floor(Math.random() * 1000) + 100,
        callClicks: Math.floor(Math.random() * 50) + 10,
        websiteClicks: Math.floor(Math.random() * 30) + 5,
        directionClicks: Math.floor(Math.random() * 80) + 20,
        monthlyGrowth: Math.floor(Math.random() * 20) - 10, // -10 to +10%
        averageRating: 4.2 + Math.random() * 0.8, // 4.2 to 5.0
        totalReviews: Math.floor(Math.random() * 100) + 10,
        lastUpdated: new Date().toISOString()
      };

      return {
        success: true,
        data: stats,
        message: 'Dashboard stats retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: {} as OwnerDashboardStats,
        error: 'Failed to retrieve dashboard stats'
      };
    }
  }

  // Validate claim data
  private validateClaimData(claimData: ClaimFormData): ClaimValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Required field validation
    if (!claimData.businessId) errors.push('Business must be selected');
    if (!claimData.claimantName?.trim()) errors.push('Claimant name is required');
    if (!claimData.claimantEmail?.trim()) errors.push('Email address is required');
    if (!claimData.claimantPhone?.trim()) errors.push('Phone number is required');
    if (!claimData.relationshipToBusiness) errors.push('Relationship to business is required');

    // Email validation
    if (claimData.claimantEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(claimData.claimantEmail)) {
      errors.push('Invalid email address format');
    }

    // Phone validation (basic international format)
    if (claimData.claimantPhone && !/^[\+]?[0-9\s\-\(\)]{8,15}$/.test(claimData.claimantPhone)) {
      errors.push('Invalid phone number format');
    }

    // Document validation
    if (claimData.documents && claimData.documents.length < 2) {
      warnings.push('At least 2 documents are recommended for faster verification');
    }

    // Suggestions
    if (claimData.relationshipToBusiness === 'owner') {
      suggestions.push('As a business owner, please upload official ownership documents for faster approval');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions
    };
  }

  // Check if business is already claimed
  async checkBusinessClaimStatus(businessId: string): Promise<ClaimApiResponse<{ 
    isClaimed: boolean; 
    claimStatus?: string; 
    claimId?: string 
  }>> {
    try {
      // Check if business is already claimed
      const existingClaim = Array.from(this.mockClaims.values()).find(
        claim => claim.businessId === businessId
      );

      return {
        success: true,
        data: {
          isClaimed: !!existingClaim && existingClaim.status === 'approved',
          claimStatus: existingClaim?.status,
          claimId: existingClaim?.id
        },
        message: 'Business claim status checked'
      };
    } catch (error) {
      return {
        success: false,
        data: { isClaimed: false },
        error: 'Failed to check business claim status'
      };
    }
  }
}

export const claimApiService = new ClaimApiService();
export default claimApiService;