import { redirect } from "react-router";
import userService from "../../services/userService";
async function requireAuth (){
  try {

    const res = await userService.getUser();

    if (!res.data?.success) {
      throw redirect('/login')
    }

  } catch (error) {
    
    // Check: Is this a "authentication" error?
    if(error.response?.status === 401) throw redirect('/login');
    
    // Not sure may be wifi down or other erros let the
    return null

  }
}

export default requireAuth;