import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const handleUpdateStatus = async (id, status) => {
  await updateDoc(doc(db, "users", id), {
    online: status,
    lastSeen: new Date(),
  });
};
