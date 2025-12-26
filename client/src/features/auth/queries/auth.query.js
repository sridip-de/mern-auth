import { queryClient } from "@/config/query.config";
import { userService } from "@/features/user/services/userService";

export async function checkAuth () {
    try {
      // check cache first
      const cacheData = queryClient.getQueryData(['auth']);

      if(cacheData) {
        return cacheData.data?.success ?? false;
      }

      // Only fetch if not in cache
      const res = await queryClient.fetchQuery({
      queryKey: ['auth'],
      queryFn: userService.getUser,
      retry: false,
      staleTime: 5 * 60 * 1000,
    });
    return res.data?.success ?? false;
    
    } catch (error) {
      console.error('Auth Check Failed:',error);
      return false;
    }
}