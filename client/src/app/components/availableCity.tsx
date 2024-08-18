import Image from "next/image";
import Link from "next/link";
import React from "react";
import Translation from "./translation";

interface City {
  id: number;
  city: string;
  imageUrl: string;
}

const AvailableCity = ({ city, index }: { city: City; index: number }) => {
  return (
    <Link
      href={`/${city.city}/${city?.id}`}
      className={`relative flex bg-secondary-foreground hover:bg-background gap-4 items-center cursor-pointer p-2 group hover:shadow-lg `}
      key={index}
    >
      <div className="w-44 h-40 relative">
        <Image
          src={city.imageUrl}
          alt={city.city}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-semibold font-sans text-text-foreground">
          {city.city}
        </h1>
        <p className="text-primary font-sans font-medium text-sm">
          <Translation translationKey="citypage_available_city" />
        </p>

        <p className="text-primary hidden group-hover:block underline">
          <Translation translationKey="citypage_available_hovering" />
        </p>
      </div>
    </Link>
  );
};

export default AvailableCity;
