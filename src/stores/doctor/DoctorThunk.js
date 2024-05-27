import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCertificate,
  addEducation,
  addExperience,
  addMedical,
  cancelAppointment,
  createTimeOff,
  editWorkingTime,
  editWorkingTimeForConflict,
  getAppointment,
  getCalendar,
  getDetailAppointment,
  getMedical,
  getProfile,
  getUserMedical,
  setSchedule,
  updateEducation,
  updateExprience,
  updateProfile,
} from "../../api/doctor.api";
import { customResCertificate } from "../../helpers/resHelper";

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
export const updateDoctorProfile = createAsyncThunk(
  "doctor/updateDoctorProfile",
  async (data, thunkApi) => {
    try {
      const response = await updateProfile(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const updateDoctorWorkingTime = createAsyncThunk(
  "doctor/updateDoctorWorkingTime",
  async (data, thunkApi) => {
    try {
      const response = await editWorkingTime(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const updateDoctorWorkingTimeForConflict = createAsyncThunk(
  "doctor/updateDoctorWorkingTimeForConflict",
  async (data, thunkApi) => {
    try {
      const response = await editWorkingTimeForConflict(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const doctorAddCertificate = createAsyncThunk(
  "doctor/doctorAddCertificate",
  async (data, thunkApi) => {
    try {
      const body = await customResCertificate(data);
      const response = await addCertificate(body);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const doctorAddEducation = createAsyncThunk(
  "doctor/doctorAddEducation",
  async (data, thunkApi) => {
    try {
      const response = await addEducation(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const doctorAddExperience = createAsyncThunk(
  "doctor/doctorAddExperience",
  async (data, thunkApi) => {
    try {
      const response = await addExperience(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const doctorGetlistMedical = createAsyncThunk(
  "doctor/doctorGetlistMedical",
  async (search, thunkApi) => {
    try {
      const response = await getMedical(search);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const doctorGetUserMedical = createAsyncThunk(
  "doctor/doctorGetUserMedical",
  async (id, thunkApi) => {
    try {
      const response = await getUserMedical(id);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const doctorCreateMedical = createAsyncThunk(
  "doctor/doctorCreateMedical",
  async (data, thunkApi) => {
    try {
      const response = await addMedical(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const doctorUpdateEducation = createAsyncThunk(
  "doctor/doctorUpdateEducation",
  async (data, thunkApi) => {
    try {
      const response = await updateEducation(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const doctorUpdateExperience = createAsyncThunk(
  "doctor/doctorUpdateExperience",
  async (data, thunkApi) => {
    try {
      const response = await updateExprience(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
