import { useNavigate, NavLink } from "react-router"
import APP_ROUTES from "@/constants/app.routes"
import { useLogoutMutation } from "@/features/auth"
import { toast } from "react-toastify";


const Header = () => {
  const navigate = useNavigate();
  const logout = useLogoutMutation({
    onSuccess: (res) => {
      navigate('/login')
      toast.success(res.data.message)
    }
  });
  return (
    <nav className="
      
      bg-zinc-800
      border-b
      border-zinc-700
    ">
      <div className="
        px-4
        py-4
        flex
        items-center
        justify-between
      ">
        <div className="
          font-bold
          text-xl
          text-blue-400
        ">
          Logo
        </div>
        <div className="
          flex
          items-center
          space-x-4
        ">
          <NavLink to={APP_ROUTES.HOME} className="
            text-zinc-300
            hover:text-blue-400

          ">
            Home
          </NavLink>
          <NavLink to={APP_ROUTES.REGISTER} className="
            text-zinc-300
            hover:text-blue-400

          ">
            Register
          </NavLink>
        </div>

        <div className="flex space-x-4">
          <NavLink to={APP_ROUTES.LOGIN}>
          <button className="
          px-4 py-2
          bg-blue-500
          text-white
          rounded-md
          hover:bg-blue-600
        ">
            Login
          </button>
         
        </NavLink>
        
           <button 
           onClick={()=> logout.mutate()}
           className="
          px-4 py-2
          bg-red-500
          text-white
          rounded-md
          hover:bg-red-600
        ">
            Logout
          </button>
        
        </div>
      </div>
    </nav>
  )
}

export default Header