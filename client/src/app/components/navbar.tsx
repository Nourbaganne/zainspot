'use client'

import Image from "next/image";

import logo from "@/app/assets/navbar/logo-zainspot.svg";
import chevron from "@/app/assets/navbar/chevron-down-outline.svg";
import menu from "@/app/assets/navbar/menu.svg";
import close from "@/app/assets/navbar/close-icon.svg";
import { useState } from "react";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between md:px-10 px-5  py-2">
      <Image src={logo} alt="logo-zainspot" />
      <div className="hidden md:flex gap-10 font-sans font-bold items-center">
        <div className="flex gap-4 text-text-foreground h-full items-end text-sm pb-3">
          <button>HOW IT WORKS</button>
          <button className="flex gap-1">
            SWITCH CURRENCY
            <Image src={chevron} alt="currency" />
          </button>
          <button className="flex gap-1">
            SWITCH LANGUAGE
            <Image src={chevron} alt="language" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 text-primary">
            <button>JOIN</button>
            <button>LOGIN</button>
          </div>
          <button className="text-secondary">
            SECURE CHECKOUT{" "}
            <span className="bg-secondary rounded-full text-background px-1">
              3
            </span>
          </button>
        </div>
      </div>
      <div className="md:hidden flex relative ">
        <Image src={isOpen ? close : menu} alt="menu-bar" width={isOpen ? 20 : 30} className="cursor-pointer transition-all duration-300" onClick={() =>setIsOpen(!isOpen) } />
        {
          isOpen && (
            <div className="absolute bg-gray-300 top-14 right-5 z-20 w-44 text-center py-4 rounded-md " > 
              <button>How it works </button>
              <button>How it works </button>
              <button>How it works </button>
              <button>How it works </button>
              <button>How it works </button>
              <button>How it works </button>
            </div>
          )
        }
      
      </div>
    </div>
  );
};

export default Navbar;
