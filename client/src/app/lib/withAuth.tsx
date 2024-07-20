"use client"

import { useRouter } from 'next/navigation';
import { useContext, ComponentType, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/authContext';

export function withAuth<P extends object>(Component: ComponentType<P>) {
  return function WithAuth(props: P) {
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!user) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    }, [user, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
}