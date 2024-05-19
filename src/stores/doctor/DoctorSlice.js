import { createSlice } from "@reduxjs/toolkit";
import {
  cancelDoctorAppointment,
  createDoctorTimeOff,
  getDetailDoctorAppointment,
  getDoctorAppointment,
  getDoctorCalendar,
  getDoctorProfile,
  setDoctorSchedule,
} from "./DoctorThunk";

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    calendar: null,
    profile: null,
    appointmentDetail: null,
    statusCode: null,
    error: null,
    ListAppointments: [],
    TotalItems: null,
    CurrentPage: 1,
    ItemsPerPage: null,
    loading: false,
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
      .addCase(getDoctorAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctorAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.ListAppointments = action.payload.data;
        state.TotalItems = action.payload.pagingInfo.totalItems;
        state.CurrentPage = action.payload.pagingInfo.CurrentPage;
        state.ItemsPerPage = action.payload.pagingInfo.ItemsPerPage;
      })
      .addCase(getDoctorAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })

      //=====================================
      .addCase(getDetailDoctorAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDetailDoctorAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointmentDetail = action.payload.data;
      })
      .addCase(getDetailDoctorAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })

      //=====================================
      .addCase(getDoctorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
        localStorage.setItem("doctor", JSON.stringify(action.payload.data));
      })
      .addCase(getDoctorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })

      //=====================================
      .addCase(setDoctorSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setDoctorSchedule.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
      })
      .addCase(setDoctorSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })

      //=====================================
      .addCase(cancelDoctorAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelDoctorAppointment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
      })
      .addCase(cancelDoctorAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=====================================
      .addCase(getDoctorCalendar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctorCalendar.fulfilled, (state, action) => {
        state.loading = false;
        state.calendar = action.payload.data;
      })
      .addCase(getDoctorCalendar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })

      //=====================================
      .addCase(createDoctorTimeOff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDoctorTimeOff.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
      })
      .addCase(createDoctorTimeOff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
  },
});
export default doctorSlice.reducer;
export const { setStatusCode, setError } = doctorSlice.actions;
