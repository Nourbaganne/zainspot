"use client";

import Image from "next/image";
import Link from "next/link";
import returnIcon from "@/app/assets/city-details/return-icon.svg";
import testImage from "@/app/assets/city-details/test-image.svg";
import locationLogo from "@/app/assets/city-details/location-logo.svg";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { MoneyValue } from "@/app/components/MoneyValue";
import { useCurrency } from "@/app/contexts/CurrencyContext";
import Translation from "@/app/components/translation";
import { Currency } from "@/app/lib/currencyConvert";

const CityDetails = ({ params }: { params: { city: string; id: string } }) => {
  const { currency } = useCurrency();

  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  const PAYMENT_METHODS = [
    { duration: "12 months", price: 23 },
    { duration: "6 months", price: 25 },
    { duration: "1 month", price: 36 },
  ];

  return (
    <div className="flex flex-col md:grid md:grid-cols-5 font-sans">
      <div className="flex flex-col md:col-span-2 py-8 md:py-0 gap-8">
        <Link
          href={"/"}
          className="px-4 flex gap-1 text-text-foreground hover:underline"
        >
          <Image src={returnIcon} alt="return-back-icon" />
          <Translation translationKey="citypage_return_button" />
        </Link>
        <div>
          <div className="px-4">
            <h1 className="text-3xl font-bold">London ZainSpot</h1>
            <h1 className="text-2xl font-semibold text-end">
              Mayfair 14 Berkeley Square
            </h1>
          </div>
          <div className="relative w-full h-[480px]">
            <Image
              src={testImage}
              alt="test-image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col px-4 gap-7 pt-7">
            <p className="text-description font-semibold">
              The world&apos;s largest foreign exchange centre with 40% of
              worldwide transactions makes London a financial powerhouse of
              entrepreneurship for aspiring business owners from every country
              and your perfect Business Address to Go Global. Historic ties to
              Asia&apos;s financial hubs and modern-day time-zone convenience to
              Europe are right for you to expand your company.
            </p>
            <h1 className="text-center font-extrabold text-text text-2xl">
              Get the global edge from this rich heritage with your{" "}
              <span className="text-primary"> ZainSpot </span>
              Business Address!
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="flex flex-col gap-3 bg-white-700 mx-auto my-5 w-full h-[480px] rounded-lg overflow-hidden">
              <div className="flex gap-1 items-center">
                <Image src={locationLogo} alt="location-logo" />
                <h1>Berkeley House 14 Berkeley Square, London W1J 6AF</h1>
              </div>
              <Map posix={[51.509865, -0.1419]} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:col-span-3 gap-7 md:px-10">
        <div className="flex flex-col gap-4 border-2 rounded-md border-secondary p-2 text-xl">
          <div className="flex justify-between text-text font-bold">
            <h1>ZS Gold</h1>
            <h1 className="text-alert">
              <Translation translationKey="citypage_zg_gold_alert" />
            </h1>
          </div>
          <p className="text-primary font-bold">
            <Translation translationKey="citypage_zg_gold_title" />
          </p>
          <p className="font-semibold">
            <Translation translationKey="citypage_zg_gold_description" />
          </p>

          <h1 className="text-center font-semibold">
            Now you&apos;re ready to promote your business and Go Global!
          </h1>

          <div className="flex justify-between">
            <h1 className="flex gap-4">
              1 year single payment{" "}
              <span className="text-primary">
                <MoneyValue
                  value={260}
                  fromCurrency="USD"
                  toCurrency={currency}
                  decimals={0}
                />
              </span>
            </h1>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="buy"
                name="buy"
                className={`w-5 h-5 accent-primary 
                  `}
              />
              <label htmlFor="buy">Buy Now</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-2 rounded-md border-secondary p-2 text-xl">
          <div className="flex text-text font-bold">
            <h1>ZS Classic</h1>
          </div>
          <p className="text-primary font-bold">
            <Translation translationKey="citypage_zg_classic_title" />
          </p>
          <p className="font-semibold">
            <Translation translationKey="citypage_zg_classic_description" />
          </p>

          <h1 className="text-center font-semibold">
            Now you&apos;re ready to promote your business and Go Global!
          </h1>

          <div className="flex justify-between">
            <h1 className="flex gap-4">
              1 year single payment{" "}
              <span className="text-primary">
                <MoneyValue
                  value={260}
                  fromCurrency="USD"
                  toCurrency={currency}
                  decimals={0}
                />
              </span>
            </h1>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="buy"
                name="buy"
                className={`w-5 h-5 accent-primary 
                  `}
              />
              <label htmlFor="buy">Buy Now</label>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-4">
            <p className="font-light text-sm text-end pr-16">Per month</p>
            {PAYMENT_METHODS.map((pm, index) => (
              <div key={index} className="flex justify-between">
                <h1>{pm.duration}</h1>
                <h1 className="text-primary">
                  <MoneyValue
                    value={260}
                    fromCurrency="USD"
                    toCurrency={currency}
                    decimals={0}
                  />
                </h1>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="buy"
                    name="buy"
                    className={`w-5 h-5 accent-primary 
                  `}
                  />
                  <label htmlFor="buy">Buy Now</label>
                </div>
              </div>
            ))}
          </div>
        </div>
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
