import Image from "next/image";

import header from "./assets/home/header-image.svg";
import check from "./assets/home/check-icon.svg";
import close from "./assets/home/close-icon.svg";
import arrow from "./assets/home/arrow-right.png";

import {
  zainspotFeatures,
  ignoredFeatures,
  cities,
} from "@/app/constants/home";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <div className="relative flex flex-col">
        <Image
          className="absolute z-0 w-full h-full object-cover"
          src={header}
          alt="header-image"
        />
        <div className="flex flex-col z-10 w-full pt-[400px] pl-14 gap-5 ">
          <h1 className="text-[56px] font-sans font-bold text-background">
            Your Overseas Offices from{" "}
            <span className="text-primary">30¢ a day</span>
          </h1>
          <div className="flex flex-col bg-background p-4 max-w-3xl ml-10 gap-5 font-semibold font-sans">
            <div className="grid grid-cols-2  gap-4">
              {zainspotFeatures.map((feature, index) => (
                <div
                  className="flex items-center gap-2 text-primar"
                  key={index}
                >
                  <Image src={check} alt="check-feature" />
                  <h1>{feature}</h1>
                </div>
              ))}
            </div>
            <div className="flex gap-7">
              {ignoredFeatures.map((igf, index) => (
                <div className="flex gap-1 " key={index}>
                  <Image src={close} alt="ignore-feature" />
                  <h1 className="text-span">{igf}</h1>
                </div>
              ))}
            </div>
          </div>
          <h1 className="text-[36px] font-semibold font-sans text-secondary pl-6 pb-12">
            The world is full of opportunities. Reach the world with ZainSpot!
          </h1>
        </div>
      </div>

      {/* Description section */}
      <div className="bg-primary pl-20 py-3 font-semibold font-sans text-background text-[45px]">
        5-Star CBD Addresses in the World’s Top Cities
      </div>

      <div className="flex flex-col py-12 px-14 gap-9 ">
        <p className="font-sans font-semibold text-text-foreground text-2xl ">
          Turn your business into a global company for just cents a day. With
          your 5-star addresses to promote your business on your website,
          business cards and letterheads, and to receive your mail, plus your
          local phone numbers answered in your name, you will be in the
          worldwide spotlight with international business offices in as many
          cities as you want.
        </p>
        <div className="flex flex-col pl-12 gap-5">
          <h1 className="text-span text-4xl font-semibold font-sans">
            Select Your Cities <span className="text-primary">Go Global!</span>
          </h1>
          <div className="grid grid-cols-3 gap-6 pl-4">
            {cities.map((city, index) => (
              <Link
                href={{
                  pathname: `/${city.slug}`,
                  query: {
                    id: index,
                  },
                }}
                className="relative flex gap-4 items-center cursor-pointer hover:bg-zinc-400 p-4"
                key={index}
              >
                <Image src={city.image} alt={city.title} className="w-48" />

                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold font-sans text-text-foreground">
                    {city.title}
                  </h1>
                  <p className="text-primary font-sans">{city.desc}</p>
                </div>
                <div className="absolute text-background inset-0  flex items-center justify-center bg-zinc-400 bg-opacity-85 opacity-0 hover:opacity-100 transition-opacity duration-300 gap-4">
                  <span className=" font-bold text-3xl">View More</span>

                  <Image src={arrow} alt="view-more" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
