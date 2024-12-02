import { useState, useEffect } from "react";

export const useCookieConsent = () => {
  const [isConsentGiven, setIsConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent") === "true";
    setIsConsentGiven(consent);
  }, []);

  const giveConsent = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsConsentGiven(true);
  };

  return { isConsentGiven, giveConsent };
};
