import Image from "next/image";
import Link from "next/link";
import React from "react";
import Translation from "./translation";

interface City {
  id: number;
  name: string;
  imageUrl: string;
}

const AvailableCity = ({ city, index }: { city: City; index: number }) => {
  return (
    <Link
      href={`/${city.name}/${city?.id}`}
      className={`relative flex gap-4 items-center cursor-pointer p-2 group hover:shadow-lg`}
      key={index}
    >
      <div className="w-40 h-36 relative">
        <Image
          src={city.imageUrl}
          alt={city.name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-semibold font-sans text-text-foreground">
          {city.name}
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
