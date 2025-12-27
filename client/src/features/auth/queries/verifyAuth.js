import { queryClient } from "@/config/query.config";
import { authService } from "../services/authService";

export async function verifyAuth () {
    try {
      // check cache first, reduces task for queryClient's cache checking
      // const cacheData = queryClient.getQueryData(['auth']);

      // if(cacheData) {
      //   return cacheData.data?.success ?? false;
      // }

      // Only fetch if not in cache
      const res = await queryClient.fetchQuery({
      queryKey: ['auth'],
      queryFn: authService.userVerify,
      retry: false,
      staleTime: 5 * 60 * 1000,
    });
    return res.data?.success ?? false;

    } catch (error) {
      console.error('Auth Check Failed:',error);
      return false;
    }
}