/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ItemUser from "./ItemUser";
import "./List.scss";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../helpers/firebase";
import { Empty } from "antd";
import { changeChat } from "../../../stores/Chat/ChatSlice";

const ListUser = () => {
  const dispatch = useDispatch();
  const [chats, setChats] = useState([]);

  const { chatUser } = useSelector((state) => state.chat);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", chatUser.id);
    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      dispatch(changeChat({ chatId: chat.chatId, user: chat.user }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (chatUser?.id) {
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
          setChats(chatData.sort((a, b) => b.updateAt - a.updateAt));
        }
      );

      return () => {
        unsub();
      };
    }
  }, [chatUser?.id]);

  console.log(chats);
  return (
    <div className="listUser">
      <span className="listUser-font">List Messages</span>
      <div className="listUser-divider"></div>
      <div className="listUser-list">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <ItemUser
              key={chat.chatId}
              chat={chat}
              onSelect={(data) => handleSelect(data)}
            />
          ))
        ) : (
          <Empty style={{ marginTop: 30 }} />
        )}
      </div>
    </div>
  );
};

export default ListUser;
