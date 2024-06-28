import Image from "next/image";

import logo from "@/app/assets/footer/zainspot.svg";

import { FOOTER_DATA } from "@/app/constants/footer";

const Footer = () => {
  return (
    <div className="flex flex-col gap-10 bg-primary text-background py-5 pt-10 px-20">
      <div className="flex justify-between">
        <Image src={logo} alt="zainspot-logo" />
        <div className="grid grid-cols-4 gap-5 w-2/3 ">
          {FOOTER_DATA.map((data, index) => (
            <h1
              className={`${
                index < 4
                  ? "font-semibold font-sans text-2xl"
                  : "text-secondary-foreground cursor-pointer hover:underline"
              }`}
            >
              {data}
            </h1>
          ))}
        </div>
      </div>
      <div className="flex gap-4 text-secondary-foreground text-lg">
        <p>© 2024 ZainSpot</p>
        <p>
          ZainSpot.com website is protected by reCAPTCHA and the Google Privacy
          Policy and Terms of Service apply.
        </p>
      </div>
    </div>
  );
};

export default Footer;
