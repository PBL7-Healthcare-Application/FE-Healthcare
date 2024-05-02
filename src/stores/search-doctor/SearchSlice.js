import { createSlice } from "@reduxjs/toolkit";
import { getDoctorDetail, getSearchResult } from "./SearchThunk";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    isSelected: null,
    isTimeSelected: null,
    keyword: null,
    id_Specialty: null,
    searchResult: [],
    doctorDetail: null,
    error: null,
    loading: false,
  },
  reducers: {
    setIsSelected: (state, action) => {
      state.isSelected = action.payload;
    },
    setIsTimeSelected: (state, action) => {
      state.isTimeSelected = action.payload;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setIdSpecialty: (state, action) => {
      state.id_Specialty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearchResult.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResult = action.payload.data;
      })
      .addCase(getSearchResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      // =========================

      .addCase(getDoctorDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctorDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorDetail = action.payload.data;
      })
      .addCase(getDoctorDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      });
  },
});

export default searchSlice.reducer;
export const { setIsSelected, setIsTimeSelected } = searchSlice.actions;
