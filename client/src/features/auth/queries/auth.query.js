import { queryClient } from "@/config/query.config";
import { userService } from "@/features/user/services/userService";

export function fetchAuth () {
  return queryClient.fetchQuery({
    queryKey: ['auth'],
    queryFn: userService.getUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
  })
}