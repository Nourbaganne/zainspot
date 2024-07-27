import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { QueryProvider } from "./queryProvider";
import { AuthContextProvider } from "./contexts/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zainspot",
  description: "E-commerce website to help business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <QueryProvider>
            <LanguageProvider>
              <CurrencyProvider>
                <Navbar />
                {children}
                <Footer />
              </CurrencyProvider>
            </LanguageProvider>
          </QueryProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
