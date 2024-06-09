/* eslint-disable no-unused-vars */
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
import getToken from "../../helpers/getToken";
import DotLoader from "../../components/dotLoader/DotLoader";
import { delay } from "lodash";
const Chatbot = () => {
  const endRef = useRef(null);
  const { profile } = useSelector((state) => state.profile);
  const [chat, setChat] = useState();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [response, setResponse] = useState({
    idDocument: null,
    nameSymptom: null,

  });
  const handleSend = async () => {
    const apiUrl = import.meta.env.VITE_API_URL_Chatbot;
    setMessage("");
    const res = await axios.post(apiUrl, {
      message: message,
      idDocument: response.idDocument,
      nameSymptom: response.nameSymptom,
      idChat: profile?.idUser,
    });
    setResponse({
      idDocument: res?.data?.idDocument,
      nameSymptom: res?.data?.nameSymptom,
    });

    setLoading(true);
  };
  useEffect(() => {
    if (isLogin) {
      const docRef = doc(dbChatbot, "chatbot", profile?.idUser);
      const unSub = onSnapshot(docRef, (res) => {
        delay(() => {
          setChat(res?.data()?.messages);
          setLoading(false);
        }, 1000);
      });
      return () => {
        unSub();
      };
    }
  }, [profile?.idUser, isLogin]);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLogin(true);
      createAccountChatbot(profile?.idUser, profile?.name);
    } else {
      setIsLogin(false);
    }
  }, []);
  useEffect(() => {
    if (isLogin) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, isLogin, loading]);

  return (
    <div className="chatting">
      <div className="chatting-container">
        {isLogin ? (
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
                  Enclinic
                </Typography>
              </div>
            </div>
            <div className="chat-middle">
              {chat?.map((item, index) => (
                <div
                  className={`chat-middle__message ${item?.isUserSender && "own"
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

                  <div style={{ marginTop: 15 }}>
                    <DotLoader />
                  </div>
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
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",

              flexDirection: "column",
            }}
          >
            <Image src={chatbot} width={300} preview={false} />
            <span
              className="chat-middle__content"
              style={{ fontSize: 32, fontWeight: 600, color: "#185FA0" }}
            >
              Welcome to our Chatbot
            </span>
            <span
              className="chat-middle__content"
              style={{ fontSize: 20, fontWeight: 500, color: "#185FA0" }}
            >
              Please login to continue
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
