import { Image, Typography } from "antd";
import { useEffect, useRef, useState } from "react";

import chatbot from "../../assets/images/chatbot.png";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { dbChatbot } from "../../helpers/firebase";
import { createAccountChatbot } from "../../helpers/firebaseHelper";
import { format } from "timeago.js";
const Chatbot = () => {
  const endRef = useRef(null);
  const { profile } = useSelector((state) => state.profile);
  const [chat, setChat] = useState();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const apiUrl = import.meta.env.VITE_API_URL_Chatbot;
    const res = await axios.post(apiUrl, {
      message: message,
      idDocument: null,
      nameSymptom: null,
      idChat: profile?.idUser,
    });
    setLoading(true);
    setMessage("");
  };
  useEffect(() => {
    const docRef = doc(dbChatbot, "chatbot", profile?.idUser);
    const unSub = onSnapshot(docRef, (res) => {
      setChat(res?.data()?.messages);
    });
    return () => {
      unSub();
    };
  }, [profile?.idUser]);

  useEffect(() => {
    createAccountChatbot(profile?.idUser);
  }, []);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="chatting">
      <div className="chatting-container">
        <div className="chat">
          <div className="chat-top">
            <div
              className="chat-top__user"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                className="chat-middle__content"
                style={{ fontSize: 25, fontWeight: 600, color: "#185FA0" }}
              >
                AI Buddy
              </Typography>
            </div>
          </div>
          <div className="chat-middle">
            {chat?.map((item, index) => (
              <div
                className={`chat-middle__message ${
                  item?.isUserSender && "own"
                }`}
                key={index}
              >
                {!item?.isUserSender && (
                  <Image
                    fallback={chatbot}
                    className="chat-middle__img"
                    width={40}
                    preview={false}
                    src={""}
                    style={{ backgroundColor: "#ccc" }}
                  />
                )}
                <div className="texts">
                  <p className="chat-middle__content">{item?.text}</p>

                  <span className="chat-middle__time">
                    {format(item?.createdAt)}
                  </span>
                </div>
              </div>
            ))}
            {loading && (
              <div className={`chat-middle__message `}>
                <Image
                  fallback={chatbot}
                  className="chat-middle__img"
                  width={40}
                  preview={false}
                  src={""}
                  style={{ backgroundColor: "#ccc" }}
                />

                <div className="texts"></div>
              </div>
            )}
            <div ref={endRef}></div>
          </div>
          <div className="chat-bottom">
            <div className="chat-bottom__content">
              <input
                placeholder="Ask somthing else..."
                className="chat-bottom__input"
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                value={message}
              />
              <IoSend
                size={25}
                className="chat-bottom__icon"
                style={{ marginRight: 10 }}
                onClick={handleSend}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
