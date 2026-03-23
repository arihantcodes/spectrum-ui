'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../messages/en.json';
import es from '../messages/es.json';
import pt from '../messages/pt.json';
import zh from '../messages/zh.json';
import fr from '../messages/fr.json';
import de from '../messages/de.json';
import hi from '../messages/hi.json';
import tr from '../messages/tr.json';

const translations = { en, es, pt, zh, fr, de, hi, tr };

type Language = 'en' | 'es' | 'pt' | 'zh' | 'fr' | 'de' | 'hi' | 'tr';
type Translations = typeof en;

interface I18nContextProps {
  locale: Language;
  setLocale: (locale: Language) => void;
  t: (key: string) => any;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Language>('en');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Language;
    if (savedLocale && translations[savedLocale]) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Language) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = (path: string) => {
    const keys = path.split('.');
    let current: any = translations[locale];
    for (const key of keys) {
      if (current[key] === undefined) return path;
      current = current[key];
    }
    return current;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
