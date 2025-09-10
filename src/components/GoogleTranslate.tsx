import React, { useState } from 'react';
import { LanguageIcon } from '@heroicons/react/24/outline';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const GoogleTranslate: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
    { code: 'mai', name: 'Maithili', nativeName: 'मैथिली' },
    { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्' }
  ];

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setIsOpen(false);
    
    // In a real implementation, this would integrate with Google Translate API
    // For demo purposes, we'll show an alert
    const selectedLang = languages.find(lang => lang.code === languageCode);
    
    if (languageCode === 'en') {
      // Reset to original language
      alert('Language reset to English');
    } else {
      alert(`Translation to ${selectedLang?.nativeName} (${selectedLang?.name}) would be activated here.\n\nIn a real application, this would integrate with Google Translate API to translate the entire interface.`);
    }
  };

  const selectedLang = languages.find(lang => lang.code === selectedLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
        aria-label="Select Language"
      >
        <LanguageIcon className="w-4 h-4 text-gray-600" />
        <span className="text-gray-700">{selectedLang?.nativeName}</span>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          <div className="py-1">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
              Select Language
            </div>
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors ${
                  selectedLanguage === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{language.nativeName}</span>
                  <span className="text-xs text-gray-500">{language.name}</span>
                </div>
              </button>
            ))}
          </div>
          
          <div className="border-t border-gray-200 px-3 py-2">
            <p className="text-xs text-gray-500">
              Powered by Google Translate
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleTranslate;
