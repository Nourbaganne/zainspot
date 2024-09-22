"use client"

import { useRouter } from 'next/navigation';
import { useContext, ComponentType, useEffect } from 'react';
import { AuthContext } from '../contexts/authContext';

export function withNoAuth<P extends object>(Component: ComponentType<P>) {
    return function WithNoAuth(props: P) {
        const router = useRouter();
        const { user } = useContext(AuthContext);

        useEffect(() => {
            if (user) {
                router.push('/');
            }
        }, [user, router]);

        if (user) {
            return null;
        }

        return <Component { ...props } />;
    };
}
