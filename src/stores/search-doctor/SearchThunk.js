import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDoctorById, searchDoctor } from "../../api/doctor.api";


export const getSearchResult = createAsyncThunk(
    "search/getSearchResult",
    async (params, thunkApi) => {
        try {
            const { keyword, exp, minPrice, maxPrice, sortBy, IdSpecialty } = params;
            const response = await searchDoctor(keyword, exp, minPrice, maxPrice, sortBy, IdSpecialty);
            return response;
        } catch (error) {
            throw thunkApi.rejectWithValue(error);
        }
    }
);

// Async action to log in a user
export const getDoctorDetail = createAsyncThunk(
    "search/getDoctorDetail",
    async (id, thunkApi) => {
        try {
            const response = await getDoctorById(id);
            return response;
        } catch (error) {
            throw thunkApi.rejectWithValue(error);
        }
    }
);



