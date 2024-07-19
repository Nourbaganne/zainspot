import React, { ReactNode } from 'react';
import ProfileSidebar from './component/profileSidebar';


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="grid grid-cols-8 bg-background-foreground px-16 py-8 gap-8 '">
            <div className='col-span-2 w-auto'>
                <ProfileSidebar />
            </div>
            <div className='col-span-6'>
            {children}
            </div>
        </div>
    );
}

export default Layout;
