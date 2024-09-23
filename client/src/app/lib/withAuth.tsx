import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../contexts/authContext";
import Loader from "../components/loader";

export function WithAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithAuthComponent(props: P) {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);

    if (loading) {
      return <Loader />;
    }

    if (user && user.user.role.name === 'owner'){
      router.push('/owner')
    }
    
    else if (user && user.user.role.name === 'zainspotter'){
      router.push('/zainspotter')
    }

    return <WrappedComponent {...props} />;
  };
}
