import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { localizedPath, getLanguageFromPath } from '../../i18n';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentLanguage = getLanguageFromPath(location.pathname);

  const switchLanguage = (targetLanguage: 'en' | 'fr') => {
    if (targetLanguage === currentLanguage) return;
    
    const newPath = localizedPath(location.pathname, targetLanguage);
    navigate(newPath);
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <button
        onClick={() => switchLanguage('en')}
        className={`px-2 py-1 text-sm rounded ${
          currentLanguage === 'en'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => switchLanguage('fr')}
        className={`px-2 py-1 text-sm rounded ${
          currentLanguage === 'fr'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
        }`}
        aria-label="Passer au français"
      >
        FR
      </button>
    </div>
  );
};

export default LanguageSwitcher;