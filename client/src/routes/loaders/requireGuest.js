import { redirect } from "react-router";
import { userService } from "@/features/user/services/userService";
import APP_ROUTES from "@/constants/app.routes";

async function requireGuest() {
  try {
    const response = await userService.getUser();
    // If user is logged in, redirect to home
    if (response?.data?.success) {
      throw redirect(APP_ROUTES.HOME);
    }
    return null;
  } catch (error) {
    if (error instanceof Response) {
      throw error; // Let React Router handle the redirect
    }
    // If error fetching user (e.g., not logged in), allow access to guest routes
    return null;
  }
}

export default requireGuest;
