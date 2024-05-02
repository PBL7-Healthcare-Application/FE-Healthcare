import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth/AuthSlice";
import SearchSlice from "./search-doctor/SearchSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    search: SearchSlice,
  },
});

export default store;
