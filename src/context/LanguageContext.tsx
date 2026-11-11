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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('bdla_lang');
    return saved === 'bn' ? 'bn' : 'en';
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('bdla_lang', l);
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
