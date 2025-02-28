'use client';
//need to be changed
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/contexts/authContext';
import { useRouter } from 'next/navigation';
import SupportDashboard from '@/app/components/admin/SupportDashboard';

export default function SupportPage() {
  const { isSupport, user, loading, initialized } = useAuth();
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    console.log('Support Page Mount:', { loading, initialized, hasUser: !!user });
    
    // Only proceed if auth is initialized
    if (!loading && initialized) {
      const checkAccess = async () => {
        try {
          console.log('Checking Support Access:', { 
            hasUser: !!user, 
            userEmail: user?.user?.email,
            isSupport: isSupport()
          });
          
          const hasAccess = user && isSupport();
          if (!hasAccess) {
            console.log('Access Denied - Redirecting to Login');
            router.push('/login');
          } else {
            console.log('Access Granted - Loading Dashboard');
            setPageLoading(false);
          }
        } catch (error) {
          console.error('Error checking access:', error);
          router.push('/login');
        }
      };
      
      checkAccess();
    }
  }, [user, router, loading, isSupport, initialized]);

  // Show loading state while checking auth
  if (loading || pageLoading || !initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <SupportDashboard />
    </div>
  );
}
