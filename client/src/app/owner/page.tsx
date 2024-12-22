"use client";

import React from 'react'
import Link from "next/link";
import ProfileCard from '../components/profileCard'
import Translation from '../components/translation';
import {WithAuth} from '../lib/withAuth';
import reportsIcon from "@/app/assets/owner/reportsIcon.svg";
import reportsHover from "@/app/assets/owner/reportsHover.svg";
import userIcon from "@/app/assets/owner/userIcon.svg";
import userHover from "@/app/assets/owner/userHover.svg";
import locationLogo from "@/app/assets/owner/location-outline.svg";
import locationHover from "@/app/assets/owner/locationHover.svg";

const OWNER_DASHBOARD = [
    {
        logo: reportsIcon,
        hoverLogo: reportsHover,
        link: 'reports',
        title: 'ownerDashboard_reports',
        description: 'ownerDashboard_reports_desc',
    },
    {
        logo: userIcon,
        hoverLogo: userHover,
        link: 'users',
        title: 'ownerDashboard_users',
        description: 'ownerDashboard_users_desc',
    },
    {
        logo: locationLogo,
        hoverLogo: locationHover,
        link: 'locations',
        title: 'ownerDashboard_location',
        description: 'ownerDashboard_location_desc',
    },
];

const OwnerDashboard = () => {
    return (
        <div className='bg-background-foreground'>
            <div className='flex flex-col bg-background-foreground gap-8 p-8 p md:px-16 md:py-8 md:pb-44 '>
                <h1 className='text-xl font-bold'>
                    <Translation translationKey='ownerPage_header'/>
                </h1>
                <p className='text-span max-w-2xl'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                </p>
                <div className="flex flex-col md:pt-10 md:grid md:grid-cols-3 gap-4 justify-center items-stretch  ">
                    {OWNER_DASHBOARD.map((card, index) => (
                        <Link href={`/owner/${card.link}`} key={index} className='flex'>
                            <ProfileCard logo={card.logo} hoverLogo={card.hoverLogo} title={card.title} description={card.description}/>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WithAuth(OwnerDashboard, ['owner', 'admin']);