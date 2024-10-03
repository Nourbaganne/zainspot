import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { LanguageProvider } from './contexts/LanguageContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { QueryProvider } from './queryProvider';
import { AuthContextProvider } from './contexts/authContext';
import { CartProvider } from './contexts/CartContext';
import { Toaster } from 'react-hot-toast';

const workSans = Work_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Zainspot',
	description: 'E-commerce website to help business',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={workSans.className}>
				<QueryProvider>
					<AuthContextProvider>
						<LanguageProvider>
							<CurrencyProvider>
								<CartProvider>
									<Navbar />
									<Toaster position='top-right' />
									<main>{children}</main>
									<Footer />
								</CartProvider>
							</CurrencyProvider>
						</LanguageProvider>
					</AuthContextProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
