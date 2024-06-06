import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db, dbChatbot } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const createAccountFirebase = async (email, name) => {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const res = await createUserWithEmailAndPassword(auth, email, email);
      await setDoc(doc(db, "users", res.user.uid), {
        usename: name,
        email: email,
        id: res.user.uid,
        online: true,
        lastSeen: serverTimestamp(),
      });
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const createAccountChatbot = async (Id) => {
  try {
    const q = query(
      collection(dbChatbot, "chatbot"),
      where("idUser", "==", Id)
    );
    console.log("jhuy");
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      await setDoc(doc(dbChatbot, "chatbot", Id), {
        createAt: Date.now(),
        idUser: Id,
        messages: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
};
