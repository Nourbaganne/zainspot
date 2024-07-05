import React from "react";
import Image from "next/image";
import logo from "@/app/assets/footer/zainspot.svg";
import { FOOTER_DATA } from "@/app/constants/footer";
import Translation from "./Translation"; // Adjust import path as per your project structure


const Footer = () => {

  return (
    <div className="flex flex-col gap-10 bg-primary text-background md:py-5 md:pt-10 md:px-20 justify-center items-center p-6">
      <div className="flex justify-between w-full">
        <Image src={logo} alt="zainspot-logo" />
        <div className="hidden md:grid grid-cols-4 gap-5 w-2/3">
          {FOOTER_DATA.map((_, index) => (
            <h1
              key={index}
              className={`${
                index < 4
                  ? "font-semibold font-sans text-2xl"
                  : "text-secondary-foreground cursor-pointer hover:underline"
              }`}
            >
              <Translation translationKey={`footer_titles[${index}]`} />
            </h1>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 text-secondary-foreground md:text-lg text-center">
        <p>© 2024 ZainSpot</p>
        <p>
          <Translation translationKey="footer_privacy_policy" />
        </p>
      </div>
    </div>
  );
};

export default Footer;
