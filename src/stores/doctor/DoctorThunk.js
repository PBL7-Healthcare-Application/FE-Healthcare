import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  cancelAppointment,
  createTimeOff,
  getAppointment,
  getCalendar,
  getDetailAppointment,
  getProfile,
  setSchedule,
} from "../../api/doctor.api";

export const getDoctorAppointment = createAsyncThunk(
  "doctor/getDoctorAppointment",
  async (params, thunkApi) => {
    try {
      console.log("param", params);
      const { search, status, page, filterAvailable } = params;
      const response = await getAppointment(
        search,
        status,
        page,
        filterAvailable
      );
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const getDetailDoctorAppointment = createAsyncThunk(
  "doctor/getDetailDoctorAppointment",
  async (id, thunkApi) => {
    try {
      const response = await getDetailAppointment(id);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const setDoctorSchedule = createAsyncThunk(
  "doctor/setDoctorSchedule",
  async (data, thunkApi) => {
    try {
      const response = await setSchedule(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const cancelDoctorAppointment = createAsyncThunk(
  "doctor/cancelDoctorAppointment",
  async (data, thunkApi) => {
    try {
      const response = await cancelAppointment(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const getDoctorProfile = createAsyncThunk(
  "doctor/getDoctorProfile",
  async (data, thunkApi) => {
    try {
      const response = await getProfile();
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const getDoctorCalendar = createAsyncThunk(
  "doctor/getDoctorCalendar",
  async (data, thunkApi) => {
    try {
      const response = await getCalendar();
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const createDoctorTimeOff = createAsyncThunk(
  "doctor/createDoctorTimeOff",
  async (data, thunkApi) => {
    try {
      const response = await createTimeOff(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
