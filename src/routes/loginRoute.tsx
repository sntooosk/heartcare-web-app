import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";

const SignInRoute = createBrowserRouter([
    {
        path: "/",
        element: <SignIn />,
    },
]);

export default SignInRoute