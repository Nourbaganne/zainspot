"use client";

import Image from "next/image";
import { useState, useEffect, useRef, MouseEvent } from "react";
import Link from "next/link";
import { useCurrency } from "../contexts/CurrencyContext";
import { useLanguage } from "../contexts/LanguageContext";
import Translation from "./translation";
import logo from "@/app/assets/navbar/logo-zainspot.svg";
import chevron from "@/app/assets/navbar/chevron-down-outline.svg";
import menu from "@/app/assets/navbar/menu.svg";
import close from "@/app/assets/navbar/close-icon.svg";
import { Currency } from "../lib/currencyConvert";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openLanguagesMenu, setOpenLanguagesMenu] = useState(false);
  const [openCurrencyMenu, setOpenCurrencyMenu] = useState(false);

  const { setLanguage } = useLanguage();
  const { setCurrency } = useCurrency();

  const languagesMenuRef = useRef<HTMLDivElement>(null);
  const currencyMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    window.addEventListener("click", handleClickOutside as unknown as EventListener);

    return () => {
      window.removeEventListener("click", handleClickOutside as unknown as EventListener);
    };
  }, []);

  const handleCurrencyChanges = (cur: Currency) => {
    setCurrency(cur);
    setOpenCurrencyMenu(false);
  };

  const handleLanguageChanges = (lang: "en" | "fr") => {
    setLanguage(lang);
    setOpenLanguagesMenu(false);
  };

  return (
    <div className="flex justify-between md:px-10 px-5 py-2">
      <Link href="/">
        <Image src={logo} alt="logo-zainspot" />
      </Link>

      <div className="hidden md:flex gap-10 font-sans font-bold items-center">
        <div className="flex gap-4 text-text-foreground h-full items-end text-sm pb-3">
          <button>
            <Translation translationKey={`navbar_titles[${0}]`} />
          </button>
          <div className="relative" ref={currencyMenuRef}>
            <button
              className="flex gap-1"
              onClick={() => setOpenCurrencyMenu(!openCurrencyMenu)}
            >
              <Translation translationKey={`navbar_titles[${1}]`} />
              <Image src={chevron} alt="currency" />
            </button>
            {openCurrencyMenu && (
              <div className="absolute flex flex-col z-40 bg-background p-2 w-full gap-2">
                <button
                  onClick={() => handleCurrencyChanges("EUR")}
                  className="hover:text-primary"
                >
                  Euro
                </button>
                <button
                  onClick={() => handleCurrencyChanges("USD")}
                  className="hover:text-primary"
                >
                  Dollar
                </button>
                <button
                  onClick={() => handleCurrencyChanges("GBP")}
                  className="hover:text-primary"
                >
                  Pound
                </button>
              </div>
            )}
          </div>
          <div className="relative" ref={languagesMenuRef}>
            <button
              className="flex gap-1"
              onClick={() => setOpenLanguagesMenu(!openLanguagesMenu)}
            >
              <Translation translationKey={`navbar_titles[${2}]`} />
              <Image src={chevron} alt="language" />
            </button>
            {openLanguagesMenu && (
              <div className="absolute flex flex-col z-40 bg-background p-2 w-full gap-2">
                <button
                  className="hover:text-primary"
                  onClick={() => handleLanguageChanges("en")}
                >
                  English
                </button>
                <button
                  className="hover:text-primary"
                  onClick={() => handleLanguageChanges("fr")}
                >
                  Français
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 text-primary text-xl">
            <Link href={"/register"}>
              <Translation translationKey="join" />
            </Link>
            <button>
              <Translation translationKey="login" />
            </button>
          </div>
          <button className="text-secondary text-sm">
            <Translation translationKey="secure_checkout" />{" "}
            <span className="bg-secondary rounded-full text-background px-1">
              3
            </span>
          </button>
        </div>
      </div>
      <div className="md:hidden flex relative">
        <Image
          src={isOpen ? close : menu}
          alt="menu-bar"
          width={isOpen ? 20 : 30}
          className="cursor-pointer transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div className="absolute bg-gray-300 top-14 right-5 z-20 w-44 text-center py-4 rounded-md">
            <button>How it works </button>
            <button>How it works </button>
            <button>How it works </button>
            <button>How it works </button>
            <button>How it works </button>
            <button>How it works </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
