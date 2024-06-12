import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  booking,
  cancelAppointment,
  changePassword,
  createRating,
  disableAccount,
  getAppointment,
  getMedicalHistory,
  getProfile,
  registerDoctor,
  updateProfile,
} from "../../api/user.api";
import { bodyPartner } from "../../helpers/resHelper";

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

export const regisDoctor = createAsyncThunk(
  "user/regisDoctor",
  async (data, thunkApi) => {
    try {
      console.log("body", data);
      const body = await bodyPartner(data);
      console.log("body", body);
      const response = await registerDoctor(body);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const userCreateRating = createAsyncThunk(
  "user/userCreateRating",
  async (data, thunkApi) => {
    try {
      const response = await createRating(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const userGetMedical = createAsyncThunk(
  "user/userGetMedical",
  async (data, thunkApi) => {
    try {
      const response = await getMedicalHistory();
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
