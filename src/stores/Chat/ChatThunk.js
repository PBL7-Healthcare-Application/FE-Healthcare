import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../helpers/firebase";

export const getUserChat = createAsyncThunk(
  "chat/getUserChat",
  async (user, thunkApi) => {
    try {
      if (user !== null) {
        const docRef = doc(db, "users", user?.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const newData = {
            ...data,
            lastSeen: data.lastSeen.toDate(),
          };
          return newData;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
