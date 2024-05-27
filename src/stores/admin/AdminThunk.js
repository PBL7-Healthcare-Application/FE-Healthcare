import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  disableAccount,
  getPartner,
  getPartnerDetail,
  getUsers,
  unlockAccount,
  verifyCertificate,
  verifyEducation,
  verifyExperience,
  verifyProfile,
} from "../../api/admin.api";

export const getAdminUser = createAsyncThunk(
  "admin/getAdminUser",
  async (params, thunkApi) => {
    try {
      const { search, status, page, role } = params;
      const response = await getUsers(search, role, status, page);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const disableAccountUser = createAsyncThunk(
  "admin/disableAccountUser",
  async (params, thunkApi) => {
    try {
      const response = await disableAccount(params);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
export const unLockAccountUser = createAsyncThunk(
  "admin/unLockAccountUser",
  async (params, thunkApi) => {
    try {
      const response = await unlockAccount(params);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const getAdminPartner = createAsyncThunk(
  "admin/getAdminPartner",
  async (params, thunkApi) => {
    try {
      const { search, idSpecialty, TypePartner, page } = params;
      const response = await getPartner(search, idSpecialty, TypePartner, page);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const getAdminPartnerDetail = createAsyncThunk(
  "admin/getAdminPartnerDetail",
  async (params, thunkApi) => {
    try {
      const response = await getPartnerDetail(params);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const verifyAdminProfile = createAsyncThunk(
  "admin/verifyAdminProfile",
  async (data, thunkApi) => {
    try {
      const response = await verifyProfile(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const verifyAdminCertificate = createAsyncThunk(
  "admin/verifyAdminCertificate",
  async (data, thunkApi) => {
    try {
      const response = await verifyCertificate(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const verifyAdminEducation = createAsyncThunk(
  "admin/verifyAdminEducation",
  async (data, thunkApi) => {
    try {
      const response = await verifyEducation(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const verifyAdminExperience = createAsyncThunk(
  "admin/verifyAdminExperience",
  async (data, thunkApi) => {
    try {
      const response = await verifyExperience(data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
