import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import MainLayout from "../components/layout/MainLayout"
import Home from "../pages/Home";
import Login from "../pages/Login";
import Singup from "../pages/Register"
import NotFound from "../pages/NotFound"
import EmailVerify from "../pages/EmailVerify";

import APP_ROUTES from "../constants/app.routes"

import { requireGuest, requireAuth } from "./loaders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    
    children: [
      {
        path: APP_ROUTES.HOME,
        element: <Home />,
        //loader: requireAuth,
      },
      {
        path: APP_ROUTES.LOGIN,
        element: <Login />,
        //loader: requireGuest,
      },
      {
        path: APP_ROUTES.REGISTER,
        element: <Singup />,
        loader: requireGuest,
      },
      {
        path: APP_ROUTES.EMAIL_VERIFY,
        element: <EmailVerify />,
        loader: requireAuth,
      }
    ]
  }
])

function AppRouter() {
  return <RouterProvider router={router} />
}

export default AppRouter;
