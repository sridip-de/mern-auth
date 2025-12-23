import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useAuth } from '../hooks/queries/use.auth.query';

const GuestRoute = ({ children }) => {
  const { data: userData, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && userData?.success) {
      // User is logged in, redirect to home
      navigate('/');
    }
  }, [isLoading, userData?.success, navigate]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div>Loading...</div>
      </div>
    );
  }

  // If user is logged in, don't render
  if (userData?.success) {
    return null;
  }

  return children;
};



export default GuestRoute;
