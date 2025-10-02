import React from 'react';
import { Helmet } from 'react-helmet-async';

interface GoogleAnalyticsProps {
  trackingId?: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ trackingId = 'GA_MEASUREMENT_ID' }) => {
  if (!trackingId || trackingId === 'GA_MEASUREMENT_ID') {
    // Return null in development or when no tracking ID is provided
    return null;
  }

  return (
    <Helmet>
      {/* Google Analytics */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </script>
    </Helmet>
  );
};

export default GoogleAnalytics;
