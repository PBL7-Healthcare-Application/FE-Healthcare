import { createSlice } from "@reduxjs/toolkit";
import {
  bookAppointment,
  changeUserPassword,
  disableUserAccount,
  getUserAppointment,
  getUserProfile,
  updateUserProfile,
} from "./UserThunk";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    appointment: null,
    loading: false,
    statusCode: null,
    error: null,
    ListAppointments: [],
  },
  reducers: {
    setStatusCode: (state, action) => {
      state.statusCode = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })

      //=====================================
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.appointment = action.payload.data;
        state.statusCode = action.payload.statusCode;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })

      //=====================================
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.profile = action.payload.data;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })

      //=====================================
      .addCase(getUserAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.ListAppointments = action.payload.data;
      })
      .addCase(getUserAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })

      //=====================================
      .addCase(changeUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.statusCode = action.payload.statusCode;
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })

      //=====================================
      .addCase(disableUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(disableUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.statusCode = action.payload.statusCode;
      })
      .addCase(disableUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      });
  },
});
export default profileSlice.reducer;
export const { setStatusCode, setError } = profileSlice.actions;
