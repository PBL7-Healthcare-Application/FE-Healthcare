import { useDispatch, useSelector } from "react-redux";
import Chat from "../../components/chatting/Chat/Chat";
import ListUser from "../../components/chatting/List/List";
import "./Chatting.scss";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../helpers/firebase";
import { changeChat } from "../../stores/Chat/ChatSlice";

const Chatting = () => {
  const { chatId } = useSelector((state) => state.chat);
  const { chatUser, user } = useSelector((state) => state.chat);
  const location = useLocation();
  const dispatch = useDispatch();
  const state = location?.state;
  useEffect(() => {
    if (state) {
      const unsub = onSnapshot(
        doc(db, "userchats", chatUser.id),
        async (res) => {
          const items = res.data().chats;
          const promisses = items.map(async (item) => {
            const userRef = doc(db, "users", item.receiverId);
            const userDocSnap = await getDoc(userRef);
            const user = userDocSnap.data();
            return { ...item, user };
          });
          const chatData = await Promise.all(promisses);
          const chats = chatData.sort((a, b) => b.updateAt - a.updateAt);
          const userChats = chats.map((item) => {
            const { user, ...rest } = item;
            return rest;
          });

          const chatIndex = userChats.findIndex(
            (item) => item.chatId === chats[0].chatId
          );

          userChats[chatIndex].isSeen = true;

          const userChatsRef = doc(db, "userchats", chatUser.id);
          try {
            await updateDoc(userChatsRef, {
              chats: userChats,
            });
            dispatch(
              changeChat({ chatId: chats[0].chatId, user: chats[0].user })
            );
          } catch (err) {
            console.log(err);
          }
        }
      );
      return () => {
        unsub();
      };
    }
  }, [chatUser.id, state]);
  return (
    <div className="chatting">
      <div className="chatting-container">
        <ListUser />
        {chatId && <Chat />}
      </div>
    </div>
  );
};

export default Chatting;
