import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { translations, type Lang, type TranslationKey } from '@/data/translations';

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: TranslationKey) => string;
  isBn: boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function readSavedLanguage(): Lang {
  try {
    return localStorage.getItem('bdla_lang') === 'bn' ? 'bn' : 'en';
  } catch {
    // Storage can be unavailable in some browser privacy configurations.
    return 'en';
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readSavedLanguage);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('bdla_lang', l);
    } catch {
      // Keep the selected language for this session even if storage is blocked.
    }
  };

  const toggle = () => setLang(lang === 'en' ? 'bn' : 'en');

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.classList.toggle('bn', lang === 'bn');
  }, [lang]);

  const t = (key: TranslationKey) => translations[lang][key] ?? translations.en[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t, isBn: lang === 'bn' }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
