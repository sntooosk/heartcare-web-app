import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import PostTela from "../pages/Post";

const appRoute = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: 'publicacao',
                element: <PostTela />
            },
        ]
    },
]);
export default appRoute;
