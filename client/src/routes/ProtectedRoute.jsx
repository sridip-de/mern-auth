import { useAuth } from "@/features/auth";
import { Navigate, Outlet } from "react-router";

import Loader from "@/components/common/Loader/Loader";

function ProtectedRoute() {

  const { data, isLoading, isError } = useAuth();
  console.log('Protected Route', 'data:', data);

  if (isLoading) return <Loader />

  if (isError) {
    return <Navigate to={'/login'} />;
  }

  return <Outlet />
}

export default ProtectedRoute
