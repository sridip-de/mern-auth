import { createBrowserRouter, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";

import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Singup from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import EmailVerify from "@/pages/EmailVerify";

import APP_ROUTES from "@/constants/app.routes";

//import { guestLoader } from "./loaders";

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
        //loader: guestLoader,
      },
      {
        path: APP_ROUTES.REGISTER,
        element: <Singup />,
      },
      {
        path: APP_ROUTES.EMAIL_VERIFY,
        element: <EmailVerify />,
      },
    ]
  }
])

function AppRouter() {
  return <RouterProvider router={router} />
}

export default AppRouter;
