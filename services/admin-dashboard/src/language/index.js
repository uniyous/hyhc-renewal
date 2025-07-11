import ko from './ko.json';
import en from './en.json';
import zh from './zh.json';

export const messages = {
  ko,
  en,
  zh,
};

export const supportedLocales = ['ko', 'en', 'zh'];

export const defaultLocale = 'ko';

export const getLocale = () => {
  const savedLocale = localStorage.getItem('locale');
  if (savedLocale && supportedLocales.includes(savedLocale)) {
    return savedLocale;
  }
  
  const browserLocale = navigator.language.split('-')[0];
  if (supportedLocales.includes(browserLocale)) {
    return browserLocale;
  }
  
  return defaultLocale;
};

export const setLocale = (locale) => {
  if (supportedLocales.includes(locale)) {
    localStorage.setItem('locale', locale);
    return locale;
  }
  return defaultLocale;
};