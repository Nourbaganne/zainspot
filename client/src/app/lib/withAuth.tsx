import { useContext, useEffect } from "react";
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

    // Helper function to fully log out the user
    const logoutUser = () => {
      localStorage.removeItem('token');   // Remove the token from localStorage
      localStorage.removeItem('user');    // Remove any stored user data
      dispatch({ type: 'LOGOUT' });       // Clear user data from context
      router.push('/login');              // Redirect to login page
    };

    useEffect(() => {
      if (loading) return; // Wait until loading is complete

      // Check expiration
      if (user?.expires_at) {
        const expires_at = new Date(user.expires_at);
        const current_time = new Date();

        if (expires_at <= current_time) {
          // Token has expired, log the user out
          logoutUser();
          return;
        }
      }

      // If no user, log them out
      if (!user) {
        router.push('/login')
        return;
      }

      // Role-based authorization
      if (requiredRole && user.user.role.name !== requiredRole) {
        if (user.user.role.name === 'admin') {
          router.push('/unauthorized');
        } else {
          router.push('/');
        }
      }
    }, [user, loading, router, requiredRole]);

    if (loading) {
      return <Loader />;
    }

    return <WrappedComponent {...props} />;
  };
}
