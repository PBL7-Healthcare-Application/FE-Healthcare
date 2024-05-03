import { createSlice } from "@reduxjs/toolkit";
import { bookAppointment, getUserProfile } from "./UserThunk";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    appointment: null,
    loading: false,
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
        state.appointment = action.payload.data;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      });
  },
});
export default profileSlice.reducer;
