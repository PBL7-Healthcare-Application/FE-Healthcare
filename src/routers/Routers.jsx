import { createBrowserRouter } from "react-router-dom";
import HomePage from "../layouts/homePage/HomePage";
import SignIn from "../pages/sign-in/SignIn";
import SignUp from "../pages/sign-up/SignUp";
import { Main } from "../pages/main/Main";
import Search from "../pages/search/Search";
import DetailDoctor from "../pages/detail-doctor/DetailDoctor";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: "search/doctor",
        element: <Search />,
      },
      {
        path: "doctor",
        element: <DetailDoctor />,
      }
    ]
  },
  {
    path: "/auth",
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

export default routers;
