import { useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../contexts/authContext";
import Loader from "../components/loader";

export function WithAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredRole?: string
) {
  return function WithAuthComponent(props: P) {
    const { user, loading, dispatch } = useContext(AuthContext);
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    // Memoized logout function
    const logoutUser = useCallback(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
      router.push('/login');
    }, [dispatch, router]); // Include dispatch and router as dependencies

    useEffect(() => {
      // Check if loading state is finished
      if (!loading) {
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
          if (user.user.role.name === 'admin') {
            router.push('/unauthorized');
          } else {
            router.push('/');
          }
          return;
        }

        // If authorized, finish checking
        setIsCheckingAuth(false);
      }
    }, [user, loading, router, logoutUser]); // logoutUser is now stable

    // If still checking authorization or loading, show loader
    if (isCheckingAuth || loading) {
      return <Loader />;
    }

    // Render the wrapped component only if authorized
    return <WrappedComponent {...props} />;
  };
}
