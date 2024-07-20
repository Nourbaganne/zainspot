"use client"

import Link from "next/link";
import { EDIT_PAGE_CARDS_DATA } from "../constants/edit-page";
import ProfileCard from "./component/profileCard";
import Translation from "../components/translation";
import { withAuth } from "../lib/withAuth";

const Page = () => {
  return (
    <div className='flex flex-col bg-background-foreground gap-8 p-8 p md:p-16 '>
      <h1 className='text-xl font-bold'>My Zainspot</h1>
      <p className='text-span max-w-2xl'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <div className="flex flex-col md:grid md:grid-cols-3 gap-4 justify-center items-stretch  ">
        {EDIT_PAGE_CARDS_DATA.map((card, index) => (
          <Link href={`/editProfile/${card.link}`} key={index} className='flex'>
            <ProfileCard logo={card.logo} title={card.title} description={card.description} />
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-4 text-span justify-center items-center text-sm">
        <p>
          <Translation translationKey="editProfile_desactivation" />
        </p>
        <button className="text-xs underline hover:no-underline">
          <Translation translationKey="editProfile_desactivation_button" />
        </button>
      </div>
    </div>
  );
};

export default withAuth(Page);