import { createSlice } from "@reduxjs/toolkit";
import { getUserChat } from "./ChatThunk";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatUser: null,
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserChat.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.chatUser = action.payload;
      })
      .addCase(getUserChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      });
  },
});
export default chatSlice.reducer;
// export const { setChatUser } = chatSlice.actions;
