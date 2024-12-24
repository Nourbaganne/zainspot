"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language } from "../lib/translate";

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("USA");  
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedLanguage = typeof window !== "undefined" ? localStorage.getItem("preferredLanguage") : null;
    const defaultLanguage = storedLanguage ? (storedLanguage as Language) : "USA";
    setLanguageState(defaultLanguage);
    setLoading(false);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferredLanguage", lang);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, loading }}>
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
