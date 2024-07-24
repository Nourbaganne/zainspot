import Link from 'next/link';
import React, { useContext, useRef } from 'react';
import Translation from './translation';
import Image from 'next/image';
import openLeftMenu from "@/app/assets/navbar/openLeftMenu.svg";
import closeLeftMenu from "@/app/assets/navbar/closeLeftMenu.svg";
import { AuthContext } from '../contexts/authContext';
import close from "@/app/assets/navbar/close-icon.svg";
import { LANGUAGES_DATA, CURRENCIES_DATA } from "../constants/navbar";
import MenuButton from './menuButton';
import { Language } from "../lib/translate";
import { Currency } from "../lib/currencyConvert";

interface MenubarProps {
    isOpen: boolean;
    handleLogout: () => void;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openCurrencyMenu: boolean;
    setOpenCurrencyMenu: React.Dispatch<React.SetStateAction<boolean>>;
    openLanguagesMenu: boolean;
    setOpenLanguagesMenu: React.Dispatch<React.SetStateAction<boolean>>;
    currencyMenuRef: React.RefObject<HTMLDivElement>;
    languagesMenuRef: React.RefObject<HTMLDivElement>;
}

const Menubar: React.FC<MenubarProps> = ({
    isOpen,
    handleLogout,
    setIsOpen,
    openCurrencyMenu,
    setOpenCurrencyMenu,
    openLanguagesMenu,
    setOpenLanguagesMenu,
    currencyMenuRef,
    languagesMenuRef
}) => {
    const { user } = useContext(AuthContext);

    return (
        <div className={`fixed h-full top-0 right-0 w-52 px-4 flex flex-col gap-5 bg-background transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-20 shadow-lg`}>
            <div className="py-4 flex justify-end">
                <Image
                    src={close}
                    alt='close-menu'
                    className="cursor-pointer"
                    onClick={() => setIsOpen(false)}
                />
            </div>
            <div className="flex flex-col items-start justify-start gap-8 border-b-2 pb-5">
                <button className="h-3">
                    <Translation translationKey={`navbar_titles[0]`} />
                </button>
                <div className="relative min-w-[150px]" ref={currencyMenuRef}>
                    <button
                        className="flex gap-1 items-center justify-between"
                        onClick={() => setOpenCurrencyMenu(!openCurrencyMenu)}
                    >
                        {openCurrencyMenu ? (
                            <Image src={closeLeftMenu} alt="language" className='h-3' />

                        ) : (
                            <Image src={openLeftMenu} alt="language" className='h-3' />
                        )}
                        <Translation translationKey={`navbar_titles[1]`} />
                    </button>
                    {openCurrencyMenu && (
                        <div className="absolute flex flex-col z-40 bg-white p-2 w-full gap-2 max-h-36 overflow-auto shadow-lg rounded-md right-[180px] top-2">
                            {CURRENCIES_DATA.map((currency) => (
                                <MenuButton
                                    key={currency.key}
                                    lang={currency.key as Currency}
                                    title={currency.title}
                                    setOpenLanguagesMenu={setOpenCurrencyMenu}
                                    type="currency"
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="relative min-w-[150px]" ref={languagesMenuRef}>
                    <button
                        className="flex gap-1 items-center justify-between"
                        onClick={() => setOpenLanguagesMenu(!openLanguagesMenu)}
                    >
                        {openLanguagesMenu ? (
                            <Image src={closeLeftMenu} alt="language" className='h-3' />

                        ) : (
                            <Image src={openLeftMenu} alt="language" className='h-3' />
                        )}
                        <Translation translationKey={`navbar_titles[2]`} />
                    </button>
                    {openLanguagesMenu && (
                        <div className="absolute flex flex-col z-40 bg-white p-2 w-full gap-2 max-h-36 overflow-auto shadow-lg rounded-md right-[180px] top-2">
                            {LANGUAGES_DATA.map((language, index) => (
                                <MenuButton
                                    key={index}
                                    lang={language.key as Language}
                                    title={language.title}
                                    setOpenLanguagesMenu={setOpenLanguagesMenu}
                                    type="language"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                {user ? (
                    <button className="text-alert text-lg font-semibold" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <div className='flex flex-col text-lg gap-3 text-primary font-semibold '>
                        <Link href="/register" className="" onClick={() => setIsOpen(false)}>
                            <Translation translationKey="join" />
                        </Link>
                        <Link href="/login" className="" onClick={() => setIsOpen(false)}>
                            <Translation translationKey="login" />
                        </Link>
                    </div>
                )}
                <button className="text-secondary text-base">
                    <Translation translationKey="secure_checkout" />{" "}
                    <span className="bg-secondary rounded-full text-background px-1">
                        3
                    </span>
                </button>
            </div>
        </div>
    );
}

export default Menubar;
