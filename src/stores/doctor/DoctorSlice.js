import { createSlice } from "@reduxjs/toolkit";
import {
  cancelDoctorAppointment,
  changeAppointmentForPatient,
  createDoctorTimeOff,
  doctorAddCertificate,
  doctorAddEducation,
  doctorAddExperience,
  doctorCreateMedical,
  doctorDeleteCertificate,
  doctorDeleteEducation,
  doctorDeleteExperience,
  doctorGetUserMedical,
  doctorGetlistMedical,
  doctorReschedule,
  doctorUpdateCertificate,
  doctorUpdateEducation,
  doctorUpdateExperience,
  getDetailDoctorAppointment,
  getDoctorAppointment,
  getDoctorCalendar,
  getDoctorProfile,
  setDoctorSchedule,
  updateDoctorProfile,
  updateDoctorWorkingTime,
  updateDoctorWorkingTimeForConflict,
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
    loading: false,
    paging: null,
    message: null,
    listMedical: [],
    userMedical: [],
  },
  reducers: {
    setStatusCode: (state, action) => {
      state.statusCode = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
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
        state.paging = action.payload.pagingInfo;
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
        if (localStorage.getItem("doctor")) {
          localStorage.removeItem("doctor");
          localStorage.setItem("doctor", JSON.stringify(action.payload.data));
        } else {
          localStorage.setItem("doctor", JSON.stringify(action.payload.data));
        }
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
        state.message = action.payload.message;
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
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
      })
      .addCase(createDoctorTimeOff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=====================================
      .addCase(updateDoctorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
      })
      .addCase(updateDoctorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=====================================
      .addCase(updateDoctorWorkingTime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctorWorkingTime.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          if (action.payload.statusCode === 409) {
            state.statusCode = action.payload.statusCode;
            return;
          }
          state.error = action.payload.message;
          return;
        }
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
      })
      .addCase(updateDoctorWorkingTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=====================================
      .addCase(updateDoctorWorkingTimeForConflict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateDoctorWorkingTimeForConflict.fulfilled,
        (state, action) => {
          state.loading = false;
          if (action.payload.statusCode !== 200) {
            state.error = action.payload.message;
            return;
          }
          state.message = action.payload.message;
          state.statusCode = action.payload.statusCode;
        }
      )
      .addCase(updateDoctorWorkingTimeForConflict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=====================================
      .addCase(doctorAddCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doctorAddCertificate.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
      })
      .addCase(doctorAddCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=====================================
      .addCase(doctorAddExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doctorAddExperience.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
      })
      .addCase(doctorAddExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=====================================
      .addCase(doctorAddEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doctorAddEducation.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
      })
      .addCase(doctorAddEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //============================
      //=====================================
      .addCase(doctorGetlistMedical.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doctorGetlistMedical.fulfilled, (state, action) => {
        state.loading = false;
        state.listMedical = action.payload.data;
      })
      .addCase(doctorGetlistMedical.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=====================================
      .addCase(doctorCreateMedical.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doctorCreateMedical.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
        state.message = action.payload.message;
      })
      .addCase(doctorCreateMedical.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=====================================
      .addCase(doctorGetUserMedical.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doctorGetUserMedical.fulfilled, (state, action) => {
        state.loading = false;
        state.userMedical = action.payload.data;
      })
      .addCase(doctorGetUserMedical.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })

      //=====================================
      .addCase(doctorUpdateEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doctorUpdateEducation.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
        state.message = action.payload.message;
      })
      .addCase(doctorUpdateEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=====================================
      .addCase(doctorUpdateExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doctorUpdateExperience.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
        state.message = action.payload.message;
      })
      .addCase(doctorUpdateExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=====================================
      .addCase(doctorUpdateCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doctorUpdateCertificate.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
        state.message = action.payload.message;
      })
      .addCase(doctorUpdateCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })

      //=====================================
      .addCase(doctorDeleteCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doctorDeleteCertificate.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
        state.message = action.payload.message;
      })
      .addCase(doctorDeleteCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=====================================
      .addCase(doctorDeleteEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doctorDeleteEducation.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
        state.message = action.payload.message;
      })
      .addCase(doctorDeleteEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=====================================
      .addCase(doctorDeleteExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doctorDeleteExperience.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
        state.message = action.payload.message;
      })
      .addCase(doctorDeleteExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })

      //=====================================
      .addCase(doctorReschedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doctorReschedule.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        if (action.payload.message === "Successfully rescheduled appointment!") {
          state.statusCode = 300;
          state.message = action.payload.message;
          return
        }
        state.statusCode = action.payload.statusCode;
        state.message = action.payload.message;
      })
      .addCase(doctorReschedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=====================================
      .addCase(changeAppointmentForPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeAppointmentForPatient.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
        state.message = action.payload.message;
      })
      .addCase(changeAppointmentForPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
  },
});
export default doctorSlice.reducer;
export const { setStatusCode, setError, setMessage } = doctorSlice.actions;
