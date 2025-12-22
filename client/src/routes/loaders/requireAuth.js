import { redirect } from "react-router";
import { queryClient } from "../../config/query.config";
import userService from "../../services/userService";

async function requireAuth() {
  try {
    const data = await queryClient.fetchQuery({
      queryKey: ['user'],
      queryFn: userService.getUser,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

    if (!data.data?.success) {
      throw redirect('/login');
    }

    return data;
  } catch (error) {
    if (error.response?.status === 401 || error instanceof Response) {
      throw redirect('/login');
    }
    // For other errors, allow access or handle differently
    return null;
  }
}

export default requireAuth;
