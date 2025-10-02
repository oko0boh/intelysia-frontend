import React, { useState } from 'react';
import { Copy, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { emailService } from '../../services/emailService';

const EmailSetupGuide: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const emailTemplate = `
Subject: Verify your business claim - Intelysia

Hi {{to_name}},

Thank you for claiming {{business_name}} on Intelysia Business Directory!

To complete your business claim verification, please enter this 6-digit code:

**{{verification_code}}**

This code will expire in {{expiry_time}}.

If you didn't request this verification, please ignore this email.

Best regards,
The {{company_name}} Team

---
Need help? Contact us at {{support_email}}
  `.trim();

  const isConfigured = emailService.isEmailServiceAvailable();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          📧 EmailJS Setup Guide
        </h2>
        <div className="flex items-center space-x-2">
          {isConfigured ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-700 font-medium">EmailJS is configured and ready!</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span className="text-orange-700 font-medium">EmailJS setup required for live email verification</span>
            </>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Step 1 */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold mr-3">
              1
            </span>
            <h3 className="text-lg font-semibold">Create EmailJS Account</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Sign up for a free EmailJS account to send up to 200 emails per month.
          </p>
          <a
            href="https://www.emailjs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Go to EmailJS.com
          </a>
        </div>

        {/* Step 2 */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold mr-3">
              2
            </span>
            <h3 className="text-lg font-semibold">Connect Email Service</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Add your email provider (Gmail, Outlook, Yahoo, etc.) and note the <strong>Service ID</strong>.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Recommended:</strong> Use Gmail for best delivery rates. Make sure to enable 2-factor authentication 
              and create an app password for EmailJS.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold mr-3">
              3
            </span>
            <h3 className="text-lg font-semibold">Create Email Template</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Create a new email template with the following content and note the <strong>Template ID</strong>:
          </p>
          <div className="bg-gray-50 border rounded-lg p-4 relative">
            <button
              onClick={() => copyToClipboard(emailTemplate, 'template')}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
            >
              {copied === 'template' ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap pr-8">
              {emailTemplate}
            </pre>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Make sure to include all the variables in double curly braces (e.g., {`{{verification_code}}`})
          </p>
        </div>

        {/* Step 4 */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold mr-3">
              4
            </span>
            <h3 className="text-lg font-semibold">Get Public Key</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Go to Account → API Keys in your EmailJS dashboard and copy your <strong>Public Key</strong>.
          </p>
        </div>

        {/* Step 5 */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold mr-3">
              5
            </span>
            <h3 className="text-lg font-semibold">Update Configuration</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Update the configuration in <code className="bg-gray-100 px-2 py-1 rounded">src/services/emailService.ts</code>:
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative overflow-x-auto">
            <button
              onClick={() => copyToClipboard(`export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id_here',
  TEMPLATE_ID: 'your_template_id_here', 
  PUBLIC_KEY: 'your_public_key_here',
};`, 'config')}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-200"
            >
              {copied === 'config' ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
            <pre className="text-sm">
{`export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id_here',
  TEMPLATE_ID: 'your_template_id_here', 
  PUBLIC_KEY: 'your_public_key_here',
};`}
            </pre>
          </div>
        </div>

        {/* Step 6 */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <span className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-bold mr-3">
              6
            </span>
            <h3 className="text-lg font-semibold">Test the Setup</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Once configured, test the email verification in the business claim flow. 
            Check your browser console for any error messages.
          </p>
          {isConfigured ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-700 font-medium">
                  EmailJS is properly configured! Email verification should work now.
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-orange-700">
                  Currently using development mode. Verification codes will be logged to console.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Current Status */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Current Status</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Email Service:</span>
            <span className={`ml-2 ${isConfigured ? 'text-green-600' : 'text-orange-600'}`}>
              {isConfigured ? 'Configured & Ready' : 'Development Mode'}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Monthly Limit:</span>
            <span className="ml-2 text-gray-600">200 emails (Free tier)</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Cost:</span>
            <span className="ml-2 text-green-600">FREE</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Setup Time:</span>
            <span className="ml-2 text-gray-600">~15 minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSetupGuide;