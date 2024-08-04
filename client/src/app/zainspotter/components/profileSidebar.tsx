"use client";

import Translation from "@/app/components/translation";
import { ZAINSPOTTER_DASHBOARD } from "@/app/constants/dashboards";
import Link from "next/link";
import { usePathname } from "next/navigation"; 

const ProfileSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row overflow-auto md:flex-col md:justify-center md:items-start bg-background border scrollbar-hide">
      {ZAINSPOTTER_DASHBOARD.map((item, index) => {
        const isActive = pathname === `/zainspotter/${item.link}`;
        
        return (
          <Link
            key={index}
            href={`/zainspotter/${item.link}`}
            className={`p-3 text-sm whitespace-nowrap md:whitespace-normal md:w-full items-start flex border-r md:border-b md:border-b-[#E8E8E8] focus:outline-none ${
              isActive
                ? "text-primary border-b-2 md:border-l-2 border-b-primary md:border-l-primary"
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
