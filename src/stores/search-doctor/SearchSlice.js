import { createSlice } from "@reduxjs/toolkit";
import { getDoctorDetail, getDoctorRating, getSearchResult } from "./SearchThunk";
import { convertToInt, doctorSchedule } from "../../helpers/timeBooking";


const searchSlice = createSlice({
  name: "search",
  initialState: {
    listRate: [],
    isSelected: null,
    isTimeSelected: null,
    keyword: null,
    id_Specialty: null,
    schedule: [],
    searchResult: [],
    doctorDetail: null,
    error: null,
    loading: false,
    paging: null,
    tableOfrate: null
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
    },
    resetIdSpecialty: (state) => {
      state.id_Specialty = null;
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
        state.paging = action.payload.pagingInfo;
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
          action.payload.data?.durationPerAppointment,
          timeOff,
          timeBreak,
          action.payload.data?.slotAppointments
        ).map(item => ({
          ...item,
          date: item.date.toString(), // Convert date to ISO string
        }));
      })
      .addCase(getDoctorDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ///////////////
      .addCase(getDoctorRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctorRating.fulfilled, (state, action) => {

        state.loading = false;
        state.listRate = action.payload.data;
        state.tableOfrate = action.payload.statisticalTableOfRating;
      })
      .addCase(getDoctorRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default searchSlice.reducer;
export const { setIsSelected, setIsTimeSelected, setSearch, setIdSpecialty, resetTime, resetIdSpecialty } = searchSlice.actions;
