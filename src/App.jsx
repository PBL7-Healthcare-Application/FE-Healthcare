import "./App.css";
import { RouterProvider } from "react-router-dom";
import routers from "./routers/Routers";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./helpers/firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserChat } from "./stores/Chat/ChatThunk";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      dispatch(getUserChat(user));
    });

    return () => {
      unSub();
    };
  }, [dispatch]);

  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
