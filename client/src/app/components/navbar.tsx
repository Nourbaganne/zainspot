'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, MouseEvent, useContext } from 'react';
import Link from 'next/link';
import Translation from './translation';
import logo from '@/app/assets/navbar/logo-zainspot.svg';
import chevron from '@/app/assets/navbar/chevron-down-outline.svg';
import menu from '@/app/assets/navbar/menu.svg';
import close from '@/app/assets/navbar/close-icon.svg';
import MenuButton from './menuButton';
import { LANGUAGES_DATA, CURRENCIES_DATA } from '../constants/navbar';
import { Language } from '../lib/translate';
import { Currency } from '../lib/currencyConvert';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../contexts/authContext';
import Menubar from './menubar';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [openLanguagesMenu, setOpenLanguagesMenu] = useState(false);
	const [openCurrencyMenu, setOpenCurrencyMenu] = useState(false);
	const [isClient, setIsClient] = useState(false);
	const router = useRouter();
	const { user, dispatch } = useContext(AuthContext);

	const languagesMenuRef = useRef<HTMLDivElement>(null);
	const currencyMenuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setIsClient(true);
		const handleClickOutside = (event: MouseEvent) => {
			if (
				languagesMenuRef.current &&
				!languagesMenuRef.current.contains(event.target as Node)
			) {
				setOpenLanguagesMenu(false);
			}
			if (
				currencyMenuRef.current &&
				!currencyMenuRef.current.contains(event.target as Node)
			) {
				setOpenCurrencyMenu(false);
			}
		};

		window.addEventListener(
			'click',
			handleClickOutside as unknown as EventListener,
		);

		return () => {
			window.removeEventListener(
				'click',
				handleClickOutside as unknown as EventListener,
			);
		};
	}, []);

	if (!isClient) {
		return null;
	}

	const handleLogout = () => {
		dispatch({ type: 'LOGOUT', payload: undefined });
		router.push('/login');
		setIsOpen(false);
	};

	return (
		<div className='flex justify-between md:px-10 px-5 py-2 border border-b-gray-200'>
			<Link href='/'>
				<Image src={logo} alt='logo-zainspot' className='w-52 md:w-full' />
			</Link>

			<div className='hidden md:flex gap-10 font-sans font-bold items-center'>
				<div className='flex gap-4 text-text-foreground h-full items-end text-sm pb-3'>
					<button className='min-w-[150px]'>
						<Translation translationKey={`navbar_titles[0]`} />
					</button>
					<div className='relative min-w-[150px]' ref={currencyMenuRef}>
						<button
							className='flex gap-1 items-center justify-between'
							onClick={() => setOpenCurrencyMenu(!openCurrencyMenu)}
						>
							<Translation translationKey={`navbar_titles[1]`} />
							<Image src={chevron} alt='currency' />
						</button>
						{openCurrencyMenu && (
							<div className='absolute flex flex-col z-40 bg-white p-2 w-full gap-2 max-h-36 overflow-auto shadow-lg rounded-md left-0'>
								{CURRENCIES_DATA.map((currency) => (
									<MenuButton
										key={currency.key}
										lang={currency.key as Currency}
										title={currency.title}
										setOpenLanguagesMenu={setOpenCurrencyMenu}
										type='currency'
									/>
								))}
							</div>
						)}
					</div>
					<div className='relative min-w-[150px]' ref={languagesMenuRef}>
						<button
							className='flex gap-1 items-center justify-between'
							onClick={() => setOpenLanguagesMenu(!openLanguagesMenu)}
						>
							<Translation translationKey={`navbar_titles[2]`} />
							<Image src={chevron} alt='language' />
						</button>
						{openLanguagesMenu && (
							<div className='absolute flex flex-col z-40 bg-white p-2 w-full gap-2 max-h-36 overflow-auto shadow-lg rounded-md left-0'>
								{LANGUAGES_DATA.map((language, index) => (
									<MenuButton
										key={index}
										lang={language.key as Language}
										title={language.title}
										setOpenLanguagesMenu={setOpenLanguagesMenu}
										type='language'
									/>
								))}
							</div>
						)}
					</div>
				</div>

				<div className='flex flex-col gap-2'>
					{user ? (
						<button
							className='text-alert font-semibold text-start'
							onClick={handleLogout}
						>
							<Translation translationKey='logout' />
						</button>
					) : (
						<div className='flex gap-2 text-primary text-xl'>
							<Link href={'/register'}>
								<Translation translationKey='join' />
							</Link>
							<Link href='/login'>
								<Translation translationKey='login' />
							</Link>
						</div>
					)}

					<Link href='/cart' className='text-secondary text-sm uppercase'>
						<Translation translationKey='secure_checkout' />{' '}
						<span className='bg-secondary rounded-full text-background px-1'>
							3
						</span>
					</Link>
				</div>
			</div>
			<div className='md:hidden flex relative'>
				<Image
					src={isOpen ? close : menu}
					alt='menu-bar'
					width={isOpen ? 20 : 30}
					className='cursor-pointer transition-all duration-300'
					onClick={() => setIsOpen(!isOpen)}
				/>
				{isOpen && (
					<>
						<div
							className='fixed inset-0 bg-black bg-opacity-50 z-20'
							onClick={() => setIsOpen(false)}
						/>
						<Menubar
							isOpen={isOpen}
							handleLogout={handleLogout}
							setIsOpen={setIsOpen}
							openCurrencyMenu={openCurrencyMenu}
							setOpenCurrencyMenu={setOpenCurrencyMenu}
							openLanguagesMenu={openLanguagesMenu}
							setOpenLanguagesMenu={setOpenLanguagesMenu}
							currencyMenuRef={currencyMenuRef}
							languagesMenuRef={languagesMenuRef}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default Navbar;
