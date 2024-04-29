import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  logInUser,
  registerUser,
  verifyEmail,
  resendOTP,
} from "../../api/auth.api";

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (userData, thunkApi) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

// Async action to log in a user
export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (userData, thunkApi) => {
    try {
      const response = await logInUser(userData);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

// Async action to verify email a user
export const VerifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (userData, thunkApi) => {
    try {
      const response = await verifyEmail(userData);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const ResendOTP = createAsyncThunk(
  "auth/resendOTP",
  async (userData, thunkApi) => {
    try {
      const response = await resendOTP(userData);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
