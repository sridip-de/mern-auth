import { redirect } from "react-router";
import userService from "../../services/userService";

async function requireAuth() {
  try {
    const response = await userService.getUser();
    if (!response?.data?.success) {
      throw redirect('/login');
    }
    return response.data;
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    // Any error (401, network, etc.) redirects to login
    throw redirect('/login');
  }
}

export default requireAuth;
