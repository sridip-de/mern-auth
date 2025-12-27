import APP_ROUTES from "@/constants/app.routes";
import { verifyAuth } from "@/features/auth";

import { redirect } from "react-router";

export const  guestLoader = async () => {
    const isAuthenticated = await verifyAuth();
    console.log(isAuthenticated)
    if (isAuthenticated) return redirect(APP_ROUTES.HOME)
    return null;
}

