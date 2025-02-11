'use client'

import { useEffect, useState } from 'react';
import { Work_Sans } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { LanguageProvider } from './contexts/LanguageContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { QueryProvider } from './queryProvider';
import { AuthContextProvider } from './contexts/authContext';
import { Toaster } from 'react-hot-toast';
import { RolesProvider } from './contexts/RoleContext';
import CookieBanner from './components/cookieBanner';

const workSans = Work_Sans({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [lang, setLang] = useState<string | null>(null);

  useEffect(() => {
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    if (preferredLanguage) {
      setLang(preferredLanguage);
    } else {
      setLang('EN'); 
    }
  }, []);

  
  return (
    <html lang={lang}>
      <head>
        <title>ZainSpot</title>
        <meta name="description" content="Welcome to ZainSpot" />
      </head>
      <body className={workSans.className}>
        <QueryProvider>
          <AuthContextProvider>
            <LanguageProvider>
              <CurrencyProvider>
                <RolesProvider>
                  <Navbar />
                  <Toaster position="top-right" />
                  <CookieBanner />
                  <main>{children}</main>
                  <Footer />
                </RolesProvider>
              </CurrencyProvider>
            </LanguageProvider>
          </AuthContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
