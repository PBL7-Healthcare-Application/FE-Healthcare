import { createSlice } from "@reduxjs/toolkit";
import { ResendOTP, ResetPasswordUser, signInUser, signUpUser, VerifyEmail } from "./AuthThunk";
import setAccessToken from "../../helpers/setAccessToken";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    loading: false,
    statusCode: null,
  },
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.error = null;
    },
    SetError: (state) => {
      state.error = null;
    },
    SetStatusCode: (state) => {
      state.statusCode = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.user = action.payload.data;

        setAccessToken(action.payload.data.accessToken);
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
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.user = action.payload.data;
        localStorage.setItem("profile", JSON.stringify(action.payload.data));
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail || action.payload;
      })

      //==============================

      .addCase(VerifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VerifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.user = action.payload.data;

        setAccessToken(action.payload.data.accessToken);
      })
      .addCase(VerifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail || action.payload;
      })

      //==============================

      .addCase(ResendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ResendOTP.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
      })
      .addCase(ResendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail || action.payload;
      })

      //==============================

      .addCase(ResetPasswordUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ResetPasswordUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
      })
      .addCase(ResetPasswordUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail || action.payload;
      });
  },
});

export const { logOut, SetError, SetStatusCode } = authSlice.actions;
export default authSlice.reducer;
