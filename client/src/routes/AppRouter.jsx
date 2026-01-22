import { createBrowserRouter, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";
import { lazy, Suspense} from 'react';

import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
const Signup = lazy(()=> import('@/pages/Register'))
import NotFound from "@/pages/NotFound";
const EmailVerify = lazy(()=> import('@/pages/EmailVerify'))

import APP_ROUTES from "@/constants/app.routes";

//import { requireAuth } from "./loaders/requireAuth";

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
        //loader: requireAuth,
      },
      {
        path: APP_ROUTES.REGISTER,
        element: <Suspense fallback={<div>Loading</div>}>
          <Signup/>
        </Suspense>,
      },
      {
        path: APP_ROUTES.EMAIL_VERIFY,
        element: <Suspense fallback={<div>Loading</div>}>
          <EmailVerify/>
        </Suspense>,
      },
    ]
  }
])

function AppRouter() {
  return <RouterProvider router={router} />
}

export default AppRouter;
