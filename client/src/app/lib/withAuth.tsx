import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../contexts/authContext";
import Loader from "../components/loader";

export function WithAuth<P extends object>(WrappedComponent: React.ComponentType<P>, requiredRole?: string) {
  return function WithAuthComponent(props: P) {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push('/login');
        } else if (requiredRole && user.user.role.name !== requiredRole) {
          if (user.user.role.name === 'admin') {
            router.push('/unauthorized');
          }else{
            router.push('/')
          }
        }
      }
    }, [user, loading, router, requiredRole]);

    if (loading) {
      return <Loader />;
    }

    return <WrappedComponent {...props} />;
  };
}
