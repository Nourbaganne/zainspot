"use client"

import React, { ReactNode, useState, useRef, useEffect } from 'react';
import ProfileSidebar from './components/profileSidebar';
import { WithAuth } from '../lib/withAuth';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
   

    return (
        <div className="relative md:grid md:grid-cols-8 md:gap-8">

            <div className='md:col-span-2 w-auto'>
                <ProfileSidebar />
            </div>

            <div className={`col-span-8 md:col-span-6 pb-10 py-14 md:py-0`}>
                {children}
            </div>
        </div>
    );
}

export default WithAuth(Layout, 'zainspotter');
