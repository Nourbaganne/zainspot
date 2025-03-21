"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language } from "../lib/translate";

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("EN");
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    // Simulate a delay for fetching the language
    const preferredLanguage = localStorage.getItem("preferredLanguage");
    setLanguage(preferredLanguage ? (preferredLanguage as Language) : "EN");

    // Once the language is set, stop the loading state
    setLoading(false);
  }, []);

  useEffect(() => {
    if (language) {
      localStorage.setItem("preferredLanguage", language);
    }
  }, [language]);

  if (loading) {
    return;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
