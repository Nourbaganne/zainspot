"use client";

import Translation from "@/app/components/translation";
import { ZAINSPOTTER_DASHBOARD } from "@/app/constants/dashboards";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
const ProfileSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-center items-start bg-background border ">
      {ZAINSPOTTER_DASHBOARD.map((item, index) => {
        const isActive = pathname === `/zainspotter/${item.link}`;
        
        return (
          <Link
            key={index}
            href={`/zainspotter/${item.link}`}
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
