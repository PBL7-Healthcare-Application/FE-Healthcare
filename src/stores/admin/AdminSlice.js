import { createSlice } from "@reduxjs/toolkit";
import { disableAccountUser, getAdminPartner, getAdminPartnerDetail, getAdminUser } from "./AdminThunk";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    listUser: [],
    partner: [],
    partnerDetail: null,
    paging: null,
    statusCode: null,
    error: null,
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
      .addCase(getAdminUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminUser.fulfilled, (state, action) => {
        state.loading = false;
        state.listUser = action.payload.data;
        state.paging = action.payload.pagingInfo;
      })
      .addCase(getAdminUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //======================================
      .addCase(disableAccountUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(disableAccountUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
      })
      .addCase(disableAccountUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //======================================
      .addCase(getAdminPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminPartner.fulfilled, (state, action) => {
        state.loading = false;
        state.partner = action.payload.data;
        state.paging = action.payload.pagingInfo;
      })
      .addCase(getAdminPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //======================================
      .addCase(getAdminPartnerDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminPartnerDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.partnerDetail = action.payload.data;

      })
      .addCase(getAdminPartnerDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      });
  },
});
export default adminSlice.reducer;
export const { setError, setStatusCode } = adminSlice.actions;
