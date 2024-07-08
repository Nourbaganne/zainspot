"use client"

import Image from "next/image";
import header from "./assets/home/header-image.svg";
import check from "./assets/home/check-icon.svg";
import close from "./assets/home/close-icon.svg";
import axios from "axios";

import {
  zainspotFeatures,
  ignoredFeatures,
  cities,
} from "@/app/constants/home";
import Link from "next/link"; 
import Translation from "./components/translation";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["cities"],
    queryFn: () => axios.get("http://localhost:3001/cities/1")
  });

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (isError){
    return <div>{error.message}</div>
  }
  
  console.log("cities :", data);
  
  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <div className="relative flex flex-col">
        <Image
          className="absolute z-0 w-full h-full object-cover"
          src={header}
          alt="header-image"
        />
        <div className="flex flex-col z-10 md:w-full md:pt-[400px] md:pl-14 md:gap-10 px-12 py-14 gap-4">
          <h1 className="md:text-[56px] text-3xl  font-sans font-bold text-background">
            <Translation translationKey="homepage_header_title" />
            <span className="text-primary">
              <Translation translationKey="homepage_header_span" />
            </span>
          </h1>
          <div className="flex flex-col bg-background rounded-md p-4 md:max-w-fit md:pt-8 gap-5 font-semibold font-sans md:ml-20">
            <div className="grid grid-cols-1 md:grid-cols-2 text-primary gap-3">
              {zainspotFeatures.map((feature, index) => (
                <div
                  className="flex items-center gap-2 text-primar"
                  key={index}
                >
                  <Image src={check} alt="check-feature" />
                  <Translation
                    translationKey={`homepage_header_features[${index}]`}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:gap-7">
              {ignoredFeatures.map((igf, index) => (
                <div className="flex gap-1" key={index}>
                  <Image src={close} alt="ignore-feature" />
                  <h1 className="text-span">
                    <Translation
                      translationKey={`homepage_header_ignoredFeatures[${index}]`}
                    />
                  </h1>
                </div>
              ))}
            </div>
          </div>
          <h1 className="md:text-[36px] text-2xl font-semibold font-sans text-secondary pl-8 ">
            <Translation translationKey="homepage_header_summary" />
          </h1>
        </div>
      </div>

      {/* Description section */}
      <div className="bg-primary p-6  md:pl-20 md:py-10 font-semibold font-sans text-background text-2xl md:text-[45px]">
        <Translation translationKey="homepage_description" />
      </div>

      <div className="flex flex-col py-12 md:px-14 px-5 gap-9 ">
        <p className="font-sans font-semibold text-text-foreground text-xl md:text-2xl ">
          <Translation translationKey="homepage_cities_description" />
        </p>
        <div className="flex flex-col md:pl-12 gap-5">
          <h1 className="text-span text-4xl font-semibold font-sans flex gap-2">
            <Translation translationKey="homepage_cities_title" />
            <span className="text-primary">
              <Translation translationKey="homepage_cities_title_span" />
            </span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:pl-4">
            {cities.map((city, index) =>
              city.desc !== "Opening Soon" ? (
                <Link
                  href={`/${city.slug}/${index}`}
                  className={`relative flex gap-4 items-center cursor-pointer p-2 group
                  hover:shadow-lg 
                  `}
                  key={index}
                >
                  <Image src={city.image} alt={city.title} className="w-48" />

                  <div className="flex flex-col gap-2">
                    <h1 className="font-semibold font-sans text-text-foreground">
                      {city.title}
                    </h1>
                    <p className="text-primary font-sans font-medium text-sm">
                      {city.desc}
                    </p>

                    <p className="text-primary hidden group-hover:block underline">
                      Buy it now!
                    </p>
                  </div>
                </Link>
              ) : (
                <div key={index} className="relative flex gap-4 items-center p-2 ">
                  <Image src={city.image} alt={city.title} className="w-48" />
                  <div className="flex flex-col gap-2">
                    <h1 className="font-semibold font-sans text-text-foreground">
                      {city.title}
                    </h1>
                    <p className="text-primary font-sans font-medium text-sm">
                      {city.desc}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
