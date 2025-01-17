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
import Authenticate from "../guards/auth/Authenticate";
import Partner from "../pages/partner/Partner";
import ChangePassword from "../pages/user/ChangePass/ChangePassword";
import Schedule from "../pages/doctor/Schedule/Schedule";
import DoctorLayout from "../layouts/doctor/DoctorLayout";
import DoctorAppointment from "../pages/doctor/Appointment/DoctorAppointment";
import MedicalHistory from "../pages/user/MedicalHistory/MedicalHistory";
import DisableAccount from "../pages/user/DisableAccount/DisableAccount";
import Setting from "../pages/doctor/Setting/Setting";
import Certification from "../components/DoctorProfile/Certification/Certification";
import ProfileDr from "../components/DoctorProfile/Profile/ProfileDr";
import Education from "../components/DoctorProfile/Education/Education";
import Experience from "../components/DoctorProfile/Experience/Experience";
import { AppointmentDetail } from "../components/Doctor/appointmentDetail/AppointmentDetail";
import SetUpSchedule from "../components/DoctorProfile/SetUpSchedule/SetUpSchedule";
import Chatting from "../pages/chatting/Chatting";
import Examination from "../pages/doctor/Examination/Examination";
import AdminLayout from "../layouts/Admin/AdminLayout";
import ManagementUser from "../pages/admin/ManagementUser";
import DetailUser from "../components/admin/user/DetailUser";
import ManagementAppointment from "../pages/admin/ManagementAppointment";
import ManagementPartner from "../pages/admin/ManagementPartner";
import Chatbot from "../pages/chatbot/Chatbot";
import HealthTool from "../pages/healthTool/HealthTool";
import BMI from "../pages/healthTool/BMI";
import BMR from "../pages/healthTool/BMR";
import RatingDoctor from "../pages/doctor/Rating/Rating";
import ResetPassword from "../pages/auth/password/ResetPassword";

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
        path: "chatbot",
        element: <Chatbot />,
      },
      {
        path: "health-tools/",

        children: [
          {
            path: "",
            element: <HealthTool />,
          },
          {
            path: "bmi",
            element: <BMI />
          },
          {
            path: "bmr",
            element: <BMR />
          }
        ]
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
        element: (
          <Authenticate>
            <ProfilePage />
          </Authenticate>
        ),
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
            element: <MedicalHistory />,
          },
          {
            path: "password",
            element: <ChangePassword />,
          },
          {
            path: "disable-account",
            element: <DisableAccount />,
          },
        ],
      },
      {
        path: "partner",
        element: <Partner />,
      },
      {
        path: "/chatting",
        element: <Chatting />,
      },
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
      {
        path: "reset-password",
        element: <ResetPassword />,
      },

    ],
  },
  {
    path: "/dr.Enclinic",
    element: <DoctorLayout />,
    children: [
      {
        path: "appointment/",

        children: [
          {
            path: "",
            element: <DoctorAppointment />,
          },
          {
            path: ":id",
            element: <AppointmentDetail />,
          },
        ],
      },
      {
        path: "calendar",
        element: <Schedule />,
      },
      {
        path: "examination",
        element: <Examination />,
      },
      {
        path: "setting",
        element: <Setting />,
        children: [
          {
            path: "profile",
            children: [
              {
                path: "personal",
                element: <ProfileDr />,
              },
              {
                path: "certification",
                element: <Certification type={"DOCTOR"} />,
              },
              {
                path: "education",
                element: <Education type={"DOCTOR"} />,
              },
              {
                path: "experience",
                element: <Experience type={"DOCTOR"} />,
              },
            ],
          },
          {
            path: "work-schedule",
            element: <SetUpSchedule />,
          },
          {
            path: "account",
            children: [
              {
                path: "password",
                element: <ChangePassword />,
              },
              {
                path: "disable-account",
                element: <DisableAccount />,
              },
            ],
          },
        ],
      },
      {
        path: "chatting",
        element: <Chatting />,
      },
      {
        path: "rating",
        element: <RatingDoctor />
      }
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "users",

        children: [
          {
            path: "",
            element: <ManagementUser />,
          },
          {
            path: "detail/:id",
            element: <DetailUser />,
          },
        ],
      },
      {
        path: "appointments",
        element: <ManagementAppointment />,
      },
      {
        path: "partners",
        children: [
          {
            path: "",
            element: <ManagementPartner />,
          },
          {
            path: ":id",
            element: <DetailUser partner={"partner"} />,
          },
        ],
      },
    ],
  },
]);

export default routers;
