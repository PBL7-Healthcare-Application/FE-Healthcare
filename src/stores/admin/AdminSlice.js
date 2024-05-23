import { createSlice } from "@reduxjs/toolkit";
import { disableAccountUser, getAdminUser } from "./AdminThunk";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    listUser: [],
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
      });
  },
});
export default adminSlice.reducer;
export const { setError, setStatusCode } = adminSlice.actions;
