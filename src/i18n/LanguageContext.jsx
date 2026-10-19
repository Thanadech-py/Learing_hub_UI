import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  isThai: false,
  t: (en, th) => en,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('ls_lang') : null;
      return saved === 'th' || saved === 'en' ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ls_lang', lang);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    } catch {
      // ignore storage errors
    }
  }, [lang]);

  const setLang = (nextLang) => {
    if (nextLang === 'en' || nextLang === 'th') {
      setLangState(nextLang);
    }
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'en' ? 'th' : 'en'));
  };

  const isThai = lang === 'th';
  const t = (enText, thText) => (isThai && thText ? thText : enText);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isThai, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
