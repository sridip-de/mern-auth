import { useNavigate, Outlet } from 'react-router';
import { useEffect } from 'react';
import { useAuth } from '../hooks/queries/use.auth.query';

const ProtectedRoute = ({children}) => {
  const { data: userState, isLoading, isError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (isError || !userState)) {
      navigate('/login');
    }
  }, [isLoading, isError, userState, navigate]);

  if(isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div>Loading...</div>
      </div>
    );
  }

  if (isError || !userState) {
    return null;
  }

  return children || <Outlet/>
}

export default ProtectedRoute;