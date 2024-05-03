import { createAsyncThunk } from "@reduxjs/toolkit";
import { booking, getProfile } from "../../api/user.api";

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (userData, thunkApi) => {
    try {
      const response = await getProfile();
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const bookAppointment = createAsyncThunk(
  "user/bookAppointment",
  async (userData, thunkApi) => {
    try {
      const response = await booking(userData);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
