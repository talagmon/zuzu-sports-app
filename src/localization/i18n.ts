import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';

// Import translation files
import en from './locales/en.json';
import he from './locales/he.json';

// Get device locale
const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';

// RTL languages
const RTL_LANGUAGES = ['he', 'ar', 'fa'];

// Check if language is RTL
export const isRTL = (language: string): boolean => {
  return RTL_LANGUAGES.includes(language);
};

// Get text direction
export const getTextDirection = (language: string): 'ltr' | 'rtl' => {
  return isRTL(language) ? 'rtl' : 'ltr';
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: en,
      },
      he: {
        translation: he,
      },
    },
    lng: deviceLanguage === 'he' ? 'he' : 'en', // Default to Hebrew if device is Hebrew, otherwise English
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

