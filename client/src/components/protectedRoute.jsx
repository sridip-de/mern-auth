import { useNavigate, Outlet } from 'react-router';
import { useEffect } from 'react';
import { useFetchUser } from '../hooks/queries/use.auth.query';

const ProtectedRoute = ({children}) => {
  const { data: userData, isLoading, error } = useFetchUser();
  const navigate = useNavigate();

  useEffect(() => {
    // If not loading and either errored or no user data, redirect to login
    if (!isLoading && (!userData?.success || error)) {
      navigate('/login', { replace: true });
    }
  }, [isLoading, userData?.success, error, navigate]);

  if(isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div>Loading...</div>
      </div>
    );
  }

  // If no user data, don't render (will redirect)
  if (!userData?.success) {
    return null;
  }

  return children || <Outlet/>
}

export default ProtectedRoute;