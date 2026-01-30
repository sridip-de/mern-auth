import { useAuth } from "@/features/auth";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {

  const { data, isLoading, isError } = useAuth();
  console.log('Protected Route', data);

  if (isLoading) return <div>Loading...</div>;

  if (isError || !data) {
    return <Navigate to={'/login'} />;
  }

  return <Outlet />
}

export default ProtectedRoute
