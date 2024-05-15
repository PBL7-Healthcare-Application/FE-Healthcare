import { Badge, Image, Spin } from "antd";
import "./Chat.scss";
import personDefault from "../../../assets/images/personDefault.png";
import { IoImages, IoSend, IoVideocam } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../helpers/firebase";
import { useSelector } from "react-redux";
import getImageUpload from "../../../helpers/uploadCloudinary";
import { format } from "timeago.js";
const Chat = () => {
  const [chat, setChat] = useState();
  const [text, setText] = useState("");
  const endRef = useRef(null);
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { chatId, user, chatUser } = useSelector((state) => state.chat);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());

    })
    return () => {
      unSub();
    }
  }, [chatId]);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chat])

  const handleSend = async () => {
    if (text === "") return;
    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: chatUser.id,
          text,
          createdAt: new Date(),
          ...(img && { img: img }),
        }),
      });

      const userIDs = [chatUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === chatUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
      endRef.current.scrollIntoView({ behavior: "smooth" });

    } catch (err) {
      console.log(err);
    } finally {
      setImg("");

      setText("");
      setIsSuccess(false);
    }
  };

  const handleImg = async (e) => {
    try {
      setLoading(true);
      const res = await getImageUpload(e.target.files[0]);
      setImg(res);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
      setIsSuccess(true);
    }
  };
  return (
    <div className="chat">
      <div className="chat-top">
        <div className="chat-top__user">
          <Image
            fallback={personDefault}
            width={60}
            preview={false}
            style={{ borderRadius: "50%" }}
          />
          <div className="chat-top__texts">
            <span className="listUser-item__name">{user.usename}</span>
            <div className="chat-top__status">
              <div className="chat-top__dot"></div>
              <span
                className="listUser-item__name"
                style={{ fontWeight: 500, fontSize: 12, marginTop: 1 }}
              >
                Online
              </span>
            </div>
          </div>
        </div>
        <div className="chat-top__icon">
          <IoVideocam size={30} style={{ marginRight: 10, color: "#185FA0" }} />
        </div>
      </div>
      <div className="chat-middle">
        {
          chat?.messages?.map((item) => (
            <div className={
              item.senderId === chatUser.id ? "chat-middle__message own" : "chat-middle__message"
            } key={item?.createAt}>
              {item.senderId === chatUser.id ? "" : <Image

                fallback={personDefault}
                className="chat-middle__img"
                width={40}
                preview={false}
                src={user.avatar}
              />}
              <div className="texts">
                {item.img && <Image src={item.img} preview={false} className="img" />}
                <p className="chat-middle__content">
                  {item.text}
                </p>
                <span className="chat-middle__time">{format(item.createdAt.toDate())}</span>
              </div>
            </div>
          ))
        }


        <div ref={endRef}></div>
      </div>
      <div className="chat-bottom">
        <div>
          <label htmlFor="file">
            {loading ? <Spin /> : <Badge dot={isSuccess}>
              <IoImages size={25} className="chat-bottom__icon" />
            </Badge>}
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
            accept="image/*"
          />
        </div>
        <input placeholder="Type a message" className="chat-bottom__input" onChange={(e) => setText(e.target.value)} value={text} />
        <IoSend
          size={25}
          className="chat-bottom__icon"
          style={{ marginRight: 10 }}
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default Chat;
