import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  booking,
  cancelAppointment,
  changePassword,
  disableAccount,
  getAppointment,
  getProfile,
  updateProfile,
} from "../../api/user.api";

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
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, thunkApi) => {
    try {
      const response = await updateProfile(userData);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const getUserAppointment = createAsyncThunk(
  "user/getUserAppointment",
  async (type, thunkApi) => {
    try {
      const response = await getAppointment(type);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const changeUserPassword = createAsyncThunk(
  "user/changeUserPassword",
  async (data, thunkApi) => {
    try {
      const response = await changePassword(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const disableUserAccount = createAsyncThunk(
  "user/disableUserAccount",
  async (data, thunkApi) => {
    try {
      const response = await disableAccount(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const cancelUserAppointment = createAsyncThunk(
  "user/cancelUserAppointment",
  async (data, thunkApi) => {
    try {
      const response = await cancelAppointment(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
