"use client";

import React from 'react'
import { OWNER_DASHBOARD } from '../constants/dashboards'
import Link from "next/link";
import ProfileCard from '../components/profileCard'

const OwnerDashboard = () => {
  return (
    <div className='bg-background-foreground'>
      <div className='flex flex-col bg-background-foreground gap-8 p-8 p md:px-16 md:py-8 '>
      <h1 className='text-[32px] font-bold'>Owner Dashboard</h1>
      <div className="flex flex-col md:grid md:grid-cols-3 gap-4 justify-center items-stretch  ">
        {OWNER_DASHBOARD.map((card, index) => (
          <Link href={`/owner/${card.link}`} key={index} className='flex'>
            <ProfileCard logo={card.logo} hoverLogo={card.hoverLogo} title={card.title} description={card.description} />
          </Link>
        ))}
      </div>
      
    </div>
    </div>
  )
}

export default OwnerDashboard