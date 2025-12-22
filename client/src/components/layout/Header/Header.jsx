import { NavLink } from "react-router"
import ROUTE_PATHS from "../../../constants/app.routes"

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
          <NavLink to={ROUTE_PATHS.HOME} className="
            text-zinc-300
            hover:text-blue-400

          ">
            Home
          </NavLink>
        </div>

        <NavLink to={ROUTE_PATHS.LOGIN}>
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
      </div>
    </nav>
  )
}

export default Header