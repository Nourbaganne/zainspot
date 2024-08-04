"use client";

import Link from "next/link";
import Image from "next/image";
import breadcrumbIcon from '@/app/assets/zainspotter/breadcrumbIcon.svg';
import Translation from "@/app/components/translation";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="text-sm text-span-foreground flex gap-4">
      {items.map((item, index) => (
        <div key={index} className="flex gap-3 items-center">
          {item.href ? (
            <Link href={item.href} className={`flex gap-3  ${index === 0 ? 'text-primary' : ''} `}>
              <span className="hover:underline">
                <Translation translationKey={item.label} />
              </span>
              {index < items.length - 1 && (
                <Image src={breadcrumbIcon} alt="breadcrumbIcon" />
              )}
            </Link>
          ) : (
            <span >
              <Translation translationKey={item.label} />
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
