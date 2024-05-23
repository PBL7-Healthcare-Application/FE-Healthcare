import { createAsyncThunk } from "@reduxjs/toolkit";
import { disableAccount, getUsers } from "../../api/admin.api";

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
