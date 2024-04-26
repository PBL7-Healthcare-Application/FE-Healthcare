import { createSlice } from "@reduxjs/toolkit";
import { signInUser, signUpUser } from "./AuthThunk";
import setAccessToken from "../../helpers/setAccessToken";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    loading: false,
  },
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        setAccessToken(action.payload.token);
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })

      //==============================

      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInformation = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail || action.payload;
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.actions;
