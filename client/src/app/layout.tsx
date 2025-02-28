'use client';

// import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { QueryProvider } from './queryProvider';
import { AuthContextProvider } from './contexts/authContext';
import { Toaster } from 'react-hot-toast';
import { RolesProvider } from './contexts/RoleContext';
import CookieBanner from './components/cookieBanner';
import Chatbot from './components/Chatbot';
import { useState, useEffect } from 'react';

const workSans = Work_Sans({ subsets: ['latin'] });

// export const metadata: Metadata = {
// 	title: 'Zainspot',
// 	description: 'E-commerce website to help business',
// };

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	const [lang, setLang] = useState('en');

	useEffect(() => {
		const storedLang = localStorage.getItem('preferredLanguage');
		if (storedLang) {
			setLang(storedLang);
		}
	}, []);

	return (
		<html lang={lang}>
			<body className={workSans.className}>
				<QueryProvider>
					<AuthContextProvider>
						<LanguageProvider>
							<CurrencyProvider>
								<RolesProvider>
									<Navbar />
									<Toaster position='top-right' />
									<CookieBanner />
									<Chatbot />
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
