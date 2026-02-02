import { useNavigate, NavLink } from "react-router"
import { toast } from "react-toastify";
import { useState } from "react";

import APP_ROUTES from "@/constants/app.routes"
import { useLogoutMutation } from "@/features/auth"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = useLogoutMutation({
    onSuccess: (res) => {
      navigate('/login')
      toast.warn(res.data.message);
    }
  });

  return (
    <nav className="bg-zinc-800 border-b border-zinc-700">
      <div className="px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-bold text-xl text-blue-400">
          Logo
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <NavLink to={APP_ROUTES.HOME} className="text-zinc-300 hover:text-blue-400 transition-colors">
            Home
          </NavLink>
          <NavLink to={APP_ROUTES.EMAIL_VERIFY} className="text-zinc-300 hover:text-blue-400 transition-colors">
            Verify Email
          </NavLink>
          <NavLink to={APP_ROUTES.REGISTER} className="text-zinc-300 hover:text-blue-400 transition-colors">
            Register
          </NavLink>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => logout.mutate()}
            className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-600 active:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            disabled={logout.isPending}
          >
            {logout.isPending ? 'Logging out...' : 'Logout'}
          </button>

          <NavLink to={APP_ROUTES.LOGIN} className="w-full sm:w-auto">
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700 transition-colors font-medium">
              Login
            </button>
          </NavLink>
        </div>
      </div>
    </nav>);
}


export default Header
