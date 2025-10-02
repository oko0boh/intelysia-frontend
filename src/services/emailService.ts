import emailjs from '@emailjs/browser';

// EmailJS Configuration
// You'll need to get these from https://www.emailjs.com/
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id_here', // Replace with your EmailJS service ID (e.g., 'service_abc123')
  TEMPLATE_ID: 'your_template_id_here', // Replace with your EmailJS template ID (e.g., 'template_xyz789')
  PUBLIC_KEY: 'your_public_key_here', // Replace with your EmailJS public key (e.g., 'user_abcdef123456')
};

export class EmailService {
  private static instance: EmailService;
  private verificationCodes = new Map<string, { code: string; timestamp: number; email: string }>();

  constructor() {
    // Initialize EmailJS with your public key
    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      console.log('📧 EmailJS initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize EmailJS:', error);
    }
  }

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  // Generate a 6-digit verification code
  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send verification email using EmailJS
  async sendVerificationEmail(claimId: string, email: string, businessName?: string): Promise<{
    success: boolean;
    message: string;
    error?: string;
  }> {
    try {
      // Generate verification code
      const code = this.generateVerificationCode();
      
      // Store code with expiration (10 minutes)
      this.verificationCodes.set(claimId, {
        code,
        timestamp: Date.now(),
        email
      });

      console.log(`📧 Sending verification email to ${email} with code: ${code}`);

      // Check if EmailJS is properly configured
      if (EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key_here') {
        console.warn('⚠️ EmailJS not configured yet - using development mode');
        
        // Development mode - just log the code
        console.log(`
🔧 DEVELOPMENT MODE - EMAIL VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
To: ${email}
Subject: Verify your business claim - Intelysia
Code: ${code}
Expires: ${new Date(Date.now() + 10 * 60 * 1000).toLocaleTimeString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `);

        return {
          success: true,
          message: `Development mode: Verification code sent to ${email}. Check console for code: ${code}`
        };
      }

      // Production mode - send actual email via EmailJS
      const templateParams = {
        to_email: email,
        to_name: 'Business Owner',
        verification_code: code,
        business_name: businessName || 'your business',
        expiry_time: '10 minutes',
        company_name: 'Intelysia',
        support_email: 'support@intelysia.com'
      };

      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log('✅ EmailJS response:', response);

      return {
        success: true,
        message: `Verification email sent successfully to ${email}`
      };

    } catch (error) {
      console.error('❌ Failed to send verification email:', error);
      
      return {
        success: false,
        message: 'Failed to send verification email',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Verify the email code
  verifyEmailCode(claimId: string, inputCode: string): {
    success: boolean;
    message: string;
    verified: boolean;
  } {
    const storedData = this.verificationCodes.get(claimId);
    
    if (!storedData) {
      return {
        success: false,
        message: 'No verification code found for this claim',
        verified: false
      };
    }

    // Check if code has expired (10 minutes)
    const TEN_MINUTES = 10 * 60 * 1000;
    if (Date.now() - storedData.timestamp > TEN_MINUTES) {
      this.verificationCodes.delete(claimId);
      return {
        success: false,
        message: 'Verification code has expired. Please request a new one.',
        verified: false
      };
    }

    // Check if code matches
    if (storedData.code === inputCode.trim()) {
      // Code is correct - remove it to prevent reuse
      this.verificationCodes.delete(claimId);
      console.log(`✅ Email verified successfully for claim ${claimId}`);
      
      return {
        success: true,
        message: 'Email verified successfully!',
        verified: true
      };
    } else {
      console.log(`❌ Invalid code for claim ${claimId}. Expected: ${storedData.code}, Got: ${inputCode}`);
      
      return {
        success: false,
        message: 'Invalid verification code. Please check and try again.',
        verified: false
      };
    }
  }

  // Resend verification email
  async resendVerificationEmail(claimId: string): Promise<{
    success: boolean;
    message: string;
  }> {
    const storedData = this.verificationCodes.get(claimId);
    
    if (!storedData) {
      return {
        success: false,
        message: 'No previous verification request found'
      };
    }

    // Send new email with same claim ID
    return this.sendVerificationEmail(claimId, storedData.email);
  }

  // Check if email verification is available
  isEmailServiceAvailable(): boolean {
    return EMAILJS_CONFIG.PUBLIC_KEY !== 'your_public_key_here';
  }

  // Get setup instructions
  getSetupInstructions(): string {
    return `
🔧 EMAILJS SETUP INSTRUCTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Create a FREE EmailJS account at: https://www.emailjs.com/

2. Set up your email service:
   - Connect your Gmail, Outlook, or other email provider
   - Create a new service (note the Service ID)

3. Create an email template:
   - Template variables to include:
     * {{to_email}} - Recipient email
     * {{verification_code}} - 6-digit code
     * {{business_name}} - Business name
     * {{company_name}} - "Intelysia"

4. Get your credentials:
   - Service ID (e.g., "service_xyz123")
   - Template ID (e.g., "template_abc456") 
   - Public Key (from Account settings)

5. Update emailService.ts with your credentials

6. Test the service!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;
  }
}

// Export singleton instance
export const emailService = EmailService.getInstance();