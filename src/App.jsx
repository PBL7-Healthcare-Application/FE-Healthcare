import "./App.css";
import { RouterProvider } from "react-router-dom";
import routers from "./routers/Routers";
import { onAuthStateChanged } from "firebase/auth";
import { auth, authNotify, dbNotify } from "./helpers/firebase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserChat } from "./stores/Chat/ChatThunk";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user);
      dispatch(getUserChat(user));
    });

    return () => {
      unSub();
    };
  }, [dispatch]);

  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
