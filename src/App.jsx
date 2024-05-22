import "./App.css";
import { RouterProvider } from "react-router-dom";
import routers from "./routers/Routers";
import { onAuthStateChanged } from "firebase/auth";
import { auth, authNotify, dbNotify } from "./helpers/firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
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
  useEffect(() => {
    const notifyCollection = collection(dbNotify, "notifications");
    const q = query(notifyCollection, orderBy("createAt", "desc")); // replace 'yourCollectionName' with the name of your collection
    const unSub = onSnapshot(q, (snapshot) => {
      const notifyData = snapshot.docs.map((doc) => doc.data());
      console.log(notifyData);
    });

    return () => {
      unSub();
    };
  }, []);
  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
