import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import EmailSetupGuide from '../components/admin/EmailSetupGuide';

const EmailSetupPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <SEOHead
        title="Email Setup Guide - Intelysia Admin"
        description="Set up EmailJS for business claim email verification in Intelysia Business Directory"
        keywords={['email setup', 'emailjs', 'business verification', 'admin']}
      />
      
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Directory
          </Link>
        </div>

        <EmailSetupGuide />
      </div>
    </div>
  );
};

export default EmailSetupPage;