import { RouterProvider } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import appRoute from "./appRoute";
import SignInRoute from "./loginRoute";


export default function Router() {
    const { authData } = useAuth();


    return (
        <RouterProvider router={authData ? appRoute : SignInRoute} />
    );
}
