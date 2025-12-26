import { queryClient } from "@/config/query.config";
import { userService } from "@/features/user/services/userService";

export async function checkAuth () {
    const res = await queryClient.fetchQuery({
    queryKey: ['auth'],
    queryFn: userService.getUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
  return res.data?.success ? res.data.success : null;
}