'use client';

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
	const [lang, setLang] = useState('en');

	useEffect(() => {
		const preferredLanguage = localStorage.getItem('preferredLanguage');
		if (preferredLanguage) {
			setLang(preferredLanguage);
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
