"use client"

import { useRouter } from 'next/navigation';
import { useContext, ComponentType, useEffect } from 'react';
import { AuthContext } from '../contexts/authContext';
import Loader from '../components/loader';

export function withNoAuth<P extends object>(Component: ComponentType<P>) {
    return function WithNoAuth(props: P) {
        const router = useRouter();
        const { user, loading } = useContext(AuthContext);

        useEffect(() => {
            if (user) {
                if (user.user.role.name === 'owner') {
                    router.push('/owner');
                } else {
                    router.push('/zainspotter');
                }
            }
        }, [user, router]);

        if (loading) return <Loader />;

        if (user) {
            return <Loader />;
        }

        return <Component {...props} />;

    };
}
