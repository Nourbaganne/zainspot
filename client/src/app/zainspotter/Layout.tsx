"use client"

import React, { ReactNode, useState, useRef, useEffect } from 'react';
import ProfileSidebar from './component/profileSidebar';
import openSideBar from '@/app/assets/profile-details/openSidebar.svg';
import closeSideBar from '@/app/assets/profile-details/closeSidebar.svg';
import Image from 'next/image';
import { WithAuth } from '../lib/withAuth';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    return (
        <div className="relative md:grid md:grid-cols-8 md:gap-8">
            <div className='md:hidden flex'>
                <div 
                    ref={sidebarRef}
                    className={`fixed h-full top-0 left-0 w-64 bg-background border transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-20`}
                >
                    <div className="flex items-center justify-between p-4 border-b">
                        <span className="font-bold text-lg">Menu</span>
                        <button onClick={() => setIsSidebarOpen(false)}>
                            <Image src={closeSideBar} alt="Close Sidebar" />
                        </button>
                    </div>
                    <ProfileSidebar />
                </div>
               
                {!isSidebarOpen && (
                    <button
                        className="absolute top-2 left-2 p-2 bg-gray-200 rounded"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Image src={openSideBar} alt="Open Sidebar" />
                    </button>
                )}
            </div>

            <div className='hidden md:block md:col-span-2 w-auto'>
                <ProfileSidebar />
            </div>

            <div className={`col-span-8 md:col-span-6 pb-10 py-14 md:py-0`}>
                {children}
            </div>
        </div>
    );
}

export default WithAuth(Layout);
