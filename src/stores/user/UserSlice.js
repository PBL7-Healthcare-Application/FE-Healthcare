import { createSlice } from "@reduxjs/toolkit";
import {
  bookAppointment,
  cancelUserAppointment,
  changeUserPassword,
  disableUserAccount,
  getUserAppointment,
  getUserProfile,
  regisDoctor,
  updateUserProfile,
  userCreateRating,
  userGetMedical,
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
    MedicalHistory: []
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
        state.statusCode = action.payload.statusCode;
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
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
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
      })

      //=====================================
      .addCase(cancelUserAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelUserAppointment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
      })
      .addCase(cancelUserAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })

      //=====================================
      .addCase(regisDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(regisDoctor.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
      })
      .addCase(regisDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })

      //=====================================
      .addCase(userCreateRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userCreateRating.fulfilled, (state) => {
        state.loading = false;

      })
      .addCase(userCreateRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })

      //=====================================
      .addCase(userGetMedical.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userGetMedical.fulfilled, (state, action) => {
        state.loading = false;
        state.MedicalHistory = action.payload.data;
      })
      .addCase(userGetMedical.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
  },
});
export default profileSlice.reducer;
export const { setStatusCode, setError } = profileSlice.actions;
