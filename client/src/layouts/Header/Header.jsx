import { NavLink } from "react-router"
import APP_ROUTES from "@/constants/app.routes"

const Header = () => {
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
        ">
          <NavLink to={APP_ROUTES.HOME} className="
            text-zinc-300
            hover:text-blue-400

          ">
            Home
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
        <NavLink to={APP_ROUTES.LOGOUT}>
           <button className="
          px-4 py-2
          bg-red-500
          text-white
          rounded-md
          hover:bg-red-600
        ">
            Logout
          </button>
        </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Header