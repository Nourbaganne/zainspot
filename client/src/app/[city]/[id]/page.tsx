"use client";

import Image from "next/image";
import Link from "next/link";
import returnIcon from "@/app/assets/city-details/return-icon.svg";
import locationLogo from "@/app/assets/city-details/location-logo.svg";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import Translation from "@/app/components/translation";
import ZsGold from "../components/zgGold";
import ZsClassic from "../components/zsClassic";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/lib/axios/axiosInstance";

const CityDetails = ({ params }: { params: { city: string; id: string } }) => {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/map"), {
        loading: () => <p>A map is loading.</p>,
        ssr: false,
      }),
    []
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["city", params.id],
    queryFn: () => axiosInstance.get(`/city/${params.id}`),
  });

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  const city = data?.data;

  return (
    <div className="flex flex-col md:grid md:grid-cols-5 font-sans md:pt-5 text-text-foreground ">
      <div className="flex flex-col md:col-span-2 py-2 md:py-0 gap-8">
        <Link
          href={"/"}
          className="px-4 text-sm flex gap-1  hover:underline"
        >
          <Image src={returnIcon} alt="return-back-icon" />
          <Translation translationKey="citypage_return_button" />
        </Link>
        <div>
          <div className="px-4 text-text-foreground">
            <h1 className="text-3xl font-bold">{city?.city} ZainSpot</h1>
            <h1 className="text-2xl font-semibold text-end">
              {city?.location?.title.split(',')[0]}
            </h1>
          </div>
          <div className="relative w-full h-[360px] md:h-[480px]">
            <Image src={city?.imageUrl} alt="image" layout="fill" />
          </div>
          <div className="flex flex-col px-4 gap-7 pt-7">
            <p className="text-description font-semibold">
              {city?.description}
            </p>
            <h1 className="text-center font-extrabold text-text text-xl">
              Get the global edge from this rich heritage with your{" "}
              <span className="text-primary"> ZainSpot </span>
              <Translation translationKey="citypage_subtitle" />
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
          git   </p>
            <div className="flex flex-col gap-3 bg-white-700 mx-auto my-5 w-full h-[480px] rounded-lg overflow-hidden">
              <div className="flex gap-1 items-center">
                <Image src={locationLogo} alt="location-logo" />
                <h1>{city?.location?.title}</h1>
              </div>
              <Map address={city?.location?.locationLink} />

            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:col-span-3 gap-7 md:px-10">
        <ZsGold amount={city?.goldPrice.value} />
        <ZsClassic amounts={city?.classicPrice} />
        <div className="flex flex-col justify-center items-center gap-5 py-10">
          <div className="flex flex-col justify-center items-center gap-5 md:flex-row md:justify-between w-full">
            <div className="flex gap-7 text-xl font-bold text-primary">
              <button className="hover:underline">JOIN</button>
              <button className="hover:underline">LOGIN</button>
            </div>
            <button className="flex flex-col items-center font-semibold text-secondary border-2 border-secondary rounded-md px-12">
              Go to <span className="text-xl">Secure Checkout</span>
            </button>
          </div>

          <button className="text-lg font-bold text-primary hover:underline">
            SELECT MORE CITIES
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityDetails;
