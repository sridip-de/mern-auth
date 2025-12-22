import { redirect } from "react-router";
import userService from "../../services/userService";
import APP_ROUTES from "../../constants/app.routes";


async function requireGuest () {
  try {
    const res = await userService.getUser();
  
  
    if(res.data?.success ){
      throw redirect(APP_ROUTES.HOME);
    } 
  
    //return null;

  } catch (error) {
    if (error instanceof Response) {
      throw error; // Let React Router handle the redirect
    }
  }
}

export default requireGuest;


//===================================================================================
// WHY THROW INSTEAD OF RETURN
//===================================================================================
// > The 'redirect' returns a instance of`Response` object (javascript core object).
// > `React Router` treats it as data to pass to the component.
// > Your component receives the `Response` object via `useLoaderData()`
// > NO NAVIGATION HAPPENS!

// > The 'loader' throws a `Response` object
// > `React Router` catches it at a higher level (outside your loader)
// > `React Router` recognizes it as a redirect instruction
// > Navigation happesn!

//===================================================================================
// WHY THROW FROM CATCH BLOCK
//===================================================================================
// > If the code was a synconus task we can simply throw it
// > it this case its a asyncronus task so we have to wrap it in try-catch
// > and as we wrap it in try-catch the thwored response from try block alway be caught in catch block error
// > that's why we need re throw it so that the ✅React-Router catch it 

//==========================================================================================
// More Details about 'redirect'
//============================================================================================
// A redirect `Response` , sets the status code to `302` and the `location header` to `Found`.
// `302` : The HTTP 302 Found redirection response status code indicates that the requested resource
// has been temporarily moved to the URL in the `Location` header.
// after receiving this status code the browser will automatically redirect the user at the URL in
// the Location header and request the resource ,
//