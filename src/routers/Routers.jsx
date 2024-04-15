import { createBrowserRouter } from "react-router-dom";
import HomePage from "../layouts/homePage/HomePage";
import SignIn from "../pages/sign-in/SignIn";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
    ],
  },
]);

export default routers;
