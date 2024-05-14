import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth/AuthSlice";
import SearchSlice from "./search-doctor/SearchSlice";
import UserSlice from "./user/UserSlice";
import DoctorSlice from "./doctor/DoctorSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    search: SearchSlice,
    profile: UserSlice,
    doctor: DoctorSlice,
  },
});

export default store;
