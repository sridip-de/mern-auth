import APP_ROUTES from "@/constants/app.routes";
import { checkAuth } from "@/features/auth";
import { redirect } from "react-router";


export const  guestLoader = async () => {
    const isAuthenticated = await checkAuth();
    if (isAuthenticated) return redirect(APP_ROUTES.HOME)
    return null;
}

// async function requireAuth() {
//   try {
//     const response = await userService.getUser();
//     if (!response?.data?.success) {
//       throw redirect('/login');
//     }
//     return response.data;
//   } catch (error) {
//     if (error instanceof Response) {
//       throw error;
//     }
//     // Any error (401, network, etc.) redirects to login
//     throw redirect('/login');
//   }
// }

// export default requireAuth;
