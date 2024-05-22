import { createSlice } from "@reduxjs/toolkit";
import { getUserChat } from "./ChatThunk";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatUser: null,
    loading: true,
    user: null,
    chatId: null,
    notify: []
  },
  reducers: {
    changeChat: (state, action) => {
      state.chatId = action.payload.chatId;
      const lastSeen = action.payload.user.lastSeen.toDate().toISOString();
      state.user = {
        ...action.payload.user,
        lastSeen,
      };
    },
    setUser: (state, action) => {
      const lastSeen = action.payload.lastSeen.toDate().toISOString();
      state.user = {
        ...action.payload,
        lastSeen,
      };
    },
    setNotify: (state, action) => {
      state.notify = action.payload;
    },
  },
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
export const { changeChat, setUser, setNotify } = chatSlice.actions;
