import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth/AuthSlice";
import SearchSlice from "./search-doctor/SearchSlice";
import UserSlice from "./user/UserSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    search: SearchSlice,
    profile: UserSlice,
  },
});

export default store;
