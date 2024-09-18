import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../contexts/authContext";
import Loader from "../components/loader";

export function WithOwner<P extends object>(WrappedComponent: React.ComponentType<P>) {
    return function WithOwnerComponent(props: P) {
        const { user, loading } = useContext(AuthContext);
        const router = useRouter();

        useEffect(() => {
            if (typeof window !== 'undefined') {
                const currentUrl = window.location.pathname;
                sessionStorage.setItem('prevUrl', currentUrl);
            }
        }, []);

        useEffect(() => {
            if (!loading && !user) {
                router.push('/login');
            }
        }, [user, loading, router]);

        if (loading) {
            return <Loader />;
        }

        if (!user) {
            return null;
        }

        // Get the previous URL from sessionStorage
        const prevUrl = typeof window !== 'undefined' ? sessionStorage.getItem('prevUrl') : null;

        // If the user is not an owner, redirect to the previous URL
        if (user?.user.role.name !== 'owner') {
            if (prevUrl) {
                router.replace(prevUrl);
            }
            return null;
        }

        return <WrappedComponent {...props} />;
    };
}
