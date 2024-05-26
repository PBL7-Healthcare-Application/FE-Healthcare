import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDoctorById, searchDoctor } from "../../api/doctor.api";
import { getRating } from "../../api/user.api";


export const getSearchResult = createAsyncThunk(
    "search/getSearchResult",
    async (params, thunkApi) => {
        try {
            const { keyword, exp, minPrice, maxPrice, sortBy, IdSpecialty, filterAvailable, rate, page } = params;
            const response = await searchDoctor(keyword, exp, minPrice, maxPrice, sortBy, IdSpecialty, filterAvailable, rate, page);
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

export const getDoctorRating = createAsyncThunk(
    "search/getDoctorRating",
    async (params, thunkApi) => {
        const { id, page } = params;
        try {
            const response = await getRating(id, page);
            return response;
        } catch (error) {
            throw thunkApi.rejectWithValue(error);
        }
    }
);



