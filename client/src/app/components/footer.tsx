import React from "react";
import Image from "next/image";
import logo from "@/app/assets/footer/zainspot.svg";
import { FOOTER_DATA } from "@/app/constants/footer";
import Translation from "./translation";
import Link from "next/link";


const Footer = () => {

  return (
    <div className="flex flex-col gap-10 bg-primary text-background md:py-5 md:pt-10 md:px-20 justify-center p-6">
      <div className="flex justify-between w-full  items-center">
        <Image src={logo} alt="zainspot-logo" />
        <div className="hidden md:grid grid-cols-4 gap-5 w-2/3">
          {FOOTER_DATA.map((data, index) => (
            <Link
              href={data.link}
              key={index}
              className={`${
                index < 4
                  ? "font-semibold font-sans text-2xl"
                  : "text-secondary-foreground cursor-pointer hover:underline"
              }`}
            >
              <Translation translationKey={`footer_titles[${index}]`} />
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col text-sm md:flex-row gap-8 text-secondary-foreground items-center font-regular">
        <p>© 2024 ZainSpot</p>
        <p>
          <Translation translationKey="footer_privacy_policy" />
        </p>
      </div>
    </div>
  );
};

export default Footer;
