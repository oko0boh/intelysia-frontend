import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { trackNewsletterSignup } from '../Analytics/TrackingEvents';

interface NewsletterSignupProps {
  source?: string;
  className?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ 
  source = 'general', 
  className = '' 
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Here you would integrate with your email service (Mailchimp, ConvertKit, etc.)
      // For now, we'll simulate the signup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      trackNewsletterSignup(source);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center ${className}`}>
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          Thank you for subscribing!
        </h3>
        <p className="text-green-700">
          You'll receive updates about new businesses and local insights.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <Mail className="h-6 w-6 text-blue-600 mr-3" />
        <h3 className="text-lg font-semibold text-gray-900">
          Stay Updated
        </h3>
      </div>
      
      <p className="text-gray-600 mb-4">
        Get weekly updates about new businesses, local events, and business insights in Cotonou.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isLoading ? 'Subscribing...' : 'Subscribe to Updates'}
        </button>
      </form>
      
      <p className="text-xs text-gray-500 mt-3">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default NewsletterSignup;
