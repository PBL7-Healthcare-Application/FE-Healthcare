import { createSlice } from "@reduxjs/toolkit";
import { bookAppointment, getUserProfile } from "./UserThunk";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    appointment: null,
    loading: false,
    statusCode: null,
    error: null,
  },
  reducers: {},
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

      });
  },
});
export default profileSlice.reducer;
