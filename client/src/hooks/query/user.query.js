import {useQuery} from '@tanstack/react-query';
import userService from '../../services/userService'

export const useGetUser = () => {
  return useQuery({
    queryKey:['user'],
    queryFn: ()=> userService.getUser(),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}