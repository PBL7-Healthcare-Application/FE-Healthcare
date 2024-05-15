import { useEffect, useState } from "react";
import ItemUser from "./ItemUser";
import "./List.scss";
import { useSelector } from "react-redux";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../helpers/firebase";
import { Empty } from "antd";

const ListUser = () => {
  const [chats, setChats] = useState([]);

  const { chatUser } = useSelector((state) => state.chat);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userchats", chatUser.id), async (res) => {
      const items = res.data().chats;

      const promisses = items.map(async (item) => {
        const userRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userRef);
        const user = userDocSnap.data();
        return { ...item, user };
      });
      const chatData = await Promise.all(promisses);
      setChats(chatData.sort((a, b) => b.updateAt - a.updateAt));
    });

    return () => {
      unsub();
    };
  }, [chatUser.id]);

  console.log(chats);
  return (
    <div className="listUser">
      <span className="listUser-font">List Messages</span>
      <div className="listUser-list">
        {chats.length > 0 ? (
          chats.map((chat) => <ItemUser key={chat.chatId} chat={chat} />)
        ) : (
          <Empty style={{ marginTop: 30 }} />
        )}
      </div>
    </div>
  );
};

export default ListUser;
