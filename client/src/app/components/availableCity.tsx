import Image from "next/image";
import Link from "next/link";
import React from "react";

interface City {
  slug: string;
  title: string;
  desc: string;
  image: string;
}

const AvailableCity = ({ city, index }: { city: City; index: number }) => {
  return (
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
  );
};

export default AvailableCity;
