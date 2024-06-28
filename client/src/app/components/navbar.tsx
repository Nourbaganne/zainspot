import Image from "next/image";

import logo from "@/app/assets/navbar/logo-zainspot.svg";
import chevron from "@/app/assets/navbar/chevron-down-outline.svg";

const Navbar = () => {
  return (
    <div className="flex justify-between px-10 py-2">
      <Image src={logo} alt="logo-zainspot" />
      <div className="flex gap-10 font-sans font-bold items-center">
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
    </div>
  );
};

export default Navbar;
