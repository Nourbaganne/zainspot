"use client";

import Translation from "@/app/components/translation";
import { EDIT_PAGE_CARDS_DATA } from "@/app/constants/edit-page";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
const ProfileSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-center items-start bg-background border">
      {EDIT_PAGE_CARDS_DATA.map((item, index) => {
        const isActive = pathname === `/editProfile/${item.link}`;
        
        return (
          <Link
            key={index}
            href={`/editProfile/${item.link}`}
            className={`p-3 text-sm w-full items-start flex border-b focus:outline-none ${
              isActive
                ? "text-primary border-l-2 border-l-primary"
                : "text-span"
            }`}
          >
            <Translation translationKey={item.title} />
          </Link>
        );
      })}
    </div>
  );
};

export default ProfileSidebar;
