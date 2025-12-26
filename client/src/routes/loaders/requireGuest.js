import { fetchAuth } from "@/features/auth";
import { redirect } from "react-router";
import { toast } from "react-toastify";


export const  guestLoader = async () => {
  try {
    const user = await fetchAuth();

    if(user?.data?.success){
     return redirect('/')
    } 
  } catch (error) {
    toast.error(error || "error in guest loader")
  }
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
