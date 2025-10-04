import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  businessName?: string;
  location?: string;
  category?: string;
  language?: 'en' | 'fr';
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  businessName,
  location = 'Cotonou',
  category,
  language = 'en',
  loading = 'lazy',
  priority = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate comprehensive ALT text with geo-modifiers
  const generateAltText = (): string => {
    if (alt && alt.trim() !== '') {
      return alt;
    }

    // Auto-generate descriptive ALT text
    const parts = [];
    
    if (businessName) {
      parts.push(businessName);
    }
    
    if (category) {
      parts.push(category.toLowerCase());
    }
    
    // Add location geo-modifier
    parts.push(`in ${location}`);
    
    // Add country context
    parts.push('Benin');
    
    // Language-specific descriptive text
    const descriptiveText = language === 'fr' 
      ? 'Photo professionnelle de' 
      : 'Professional photo of';
    
    return `${descriptiveText} ${parts.join(' ')}`;
  };

  // Generate WebP and fallback sources
  const generateSources = (originalSrc: string) => {
    // If already WebP, return as is
    if (originalSrc.includes('.webp')) {
      return { webp: originalSrc, fallback: originalSrc };
    }
    
    // For Unsplash images, add format conversion
    if (originalSrc.includes('unsplash.com')) {
      const webpSrc = originalSrc.includes('?') 
        ? `${originalSrc}&fm=webp&q=80`
        : `${originalSrc}?fm=webp&q=80`;
      return { webp: webpSrc, fallback: originalSrc };
    }
    
    // For local images, assume WebP conversion will be handled by build process
    const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    return { webp: webpSrc, fallback: originalSrc };
  };

  const sources = generateSources(src);
  const optimizedAlt = generateAltText();

  // Fallback image for errors
  const fallbackSrc = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&fm=webp&q=80';

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {!imageLoaded && !imageError && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="text-gray-400 text-sm">
            {language === 'fr' ? 'Chargement...' : 'Loading...'}
          </div>
        </div>
      )}
      
      <picture>
        {/* WebP source for modern browsers */}
        <source 
          srcSet={sources.webp} 
          type="image/webp"
        />
        
        {/* Fallback for older browsers */}
        <img
          src={imageError ? fallbackSrc : sources.fallback}
          alt={optimizedAlt}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          onError={handleImageError}
          onLoad={handleImageLoad}
          className={`${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ${className}`}
          // Add importance hint for LCP optimization
          fetchPriority={priority ? 'high' : 'auto'}
          // Add size hints for better browser optimization
          sizes={width && height ? `${width}px` : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        />
      </picture>
      
      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <div className="text-xs">
              {language === 'fr' ? 'Image non disponible' : 'Image unavailable'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;