"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { Language } from "../lib/translate";

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const storedLanguage =
      typeof window !== "undefined"
        ? localStorage.getItem("preferredLanguage")
        : null;
    return (storedLanguage as Language) || "usa";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);

    localStorage.setItem("preferredLanguage", lang);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("preferredLanguage");
    if (storedLanguage && storedLanguage !== language) {
      setLanguageState(storedLanguage as Language);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
