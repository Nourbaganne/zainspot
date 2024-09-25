import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../contexts/authContext";
import Loader from "../components/loader";

export function WithAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredRole?: string
) {
  return function WithAuthComponent(props: P) {
    const { user, dispatch } = useContext(AuthContext);
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); 

    // Helper function to log out the user
    const logoutUser = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
      router.push('/login');
    };

    useEffect(() => {
      // Check expiration
      if (user?.expires_at) {
        const expiresAt = new Date(user.expires_at);
        const currentTime = new Date();

        if (expiresAt <= currentTime) {
          logoutUser();
          return;
        }
      }

      // If no user, redirect to login
      if (!user) {
        router.push('/login');
        return;
      }

      // Role-based authorization
      if (requiredRole && user.user.role.name !== requiredRole) {
        setIsAuthorized(false); 
        if (user.user.role.name === 'admin') {
          router.push('/unauthorized');
        } else {
          router.push('/');
        }
        return; // Prevent rendering if redirected
      }

      setIsAuthorized(true); // Set authorized state
    }, [user, router, requiredRole]);

    // Render the wrapped component if authorized
    if (isAuthorized) {
      return <WrappedComponent {...props} />;
    }

    return <Loader />; // Prevent rendering if unauthorized
  };
}