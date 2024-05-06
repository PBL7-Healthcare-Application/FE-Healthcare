import { createSlice } from "@reduxjs/toolkit";
import { getDoctorDetail, getSearchResult } from "./SearchThunk";
import { convertToInt, doctorSchedule } from "../../helpers/timeBooking";


const searchSlice = createSlice({
  name: "search",
  initialState: {
    isSelected: null,
    isTimeSelected: null,
    keyword: null,
    id_Specialty: null,
    schedule: [],
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
    setSearch: (state, action) => {
      state.keyword = action.payload.keyword;
      state.id_Specialty = action.payload.id;
    },
    setIdSpecialty: (state, action) => {
      state.id_Specialty = action.payload.id;
    }

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
        const timeOff = action.payload.data?.timeOffs.filter((item) => item.status !== 2);
        const timeBreak = action.payload.data?.timeOffs.filter((item) => item.status !== 1);
        state.schedule = doctorSchedule(
          convertToInt(action.payload.data?.workingTimeStart),
          convertToInt(action.payload.data?.workingTimeEnd),
          60,
          timeOff,
          timeBreak
        ).map(item => ({
          ...item,
          date: item.date.toString(), // Convert date to ISO string
        }));
      })
      .addCase(getDoctorDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default searchSlice.reducer;
export const { setIsSelected, setIsTimeSelected, setSearch, setIdSpecialty } = searchSlice.actions;
