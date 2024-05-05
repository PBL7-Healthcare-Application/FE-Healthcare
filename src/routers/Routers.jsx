import { createBrowserRouter } from "react-router-dom";
import HomePage from "../layouts/homePage/HomePage";
import SignIn from "../pages/auth/sign-in/SignIn";
import SignUp from "../pages/auth/sign-up/SignUp";
import { Main } from "../pages/main/Main";
import Search from "../pages/search/Search";
import DetailDoctor from "../pages/detail-doctor/DetailDoctor";
import Appointment from "../pages/appointment/booking/Appointment";
import Verification from "../pages/auth/verify/Verification";
import SuccessBooking from "../pages/appointment/successBooking/SuccessBooking";
import ProfilePage from "../layouts/Profile/ProfilePage";
import Profile from "../pages/user/Profile/Profile";
import MyAppointment from "../pages/user/MyAppointment/MyAppointment";

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
        path: "doctor/:idDoctor",
        element: <DetailDoctor />,
      },
      {
        path: "booking/",
        children: [
          {
            path: "doctor",
            element: <Appointment />,
          },
          {
            path: "success",
            element: <SuccessBooking />,
          },
        ],
      },
      {
        path: "user/",
        element: <ProfilePage />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "appointment",
            element: <MyAppointment />,
          },
          {
            path: "medical-history",
            element: <Profile />,
          },
          {
            path: "password",
            element: <Profile />,
          },
          {
            path: "disable-account",
            element: <Profile />,
          }
        ],
      }
    ],
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
      {
        path: "verify",
        element: <Verification />,
      },
    ],
  },
]);

export default routers;
