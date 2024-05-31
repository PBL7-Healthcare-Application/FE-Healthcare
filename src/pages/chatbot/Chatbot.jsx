import { Image, Typography } from "antd";
import React, { useRef } from "react";
import personDefault from "../../assets/images/personDefault.png";
import chatbot from "../../assets/images/chatbot.png";
import { IoSend } from "react-icons/io5";
const Chatbot = () => {
  const endRef = useRef(null);
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
            <div className="chat-middle__message own">
              <div className="texts">
                <p className="chat-middle__content">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Praesentium amet quis est suscipit odio id debitis delectus,
                  adipisci repellat tempore libero, reiciendis quas recusandae
                </p>

                <span className="chat-middle__time">1 ago</span>
              </div>
            </div>
            <div className="chat-middle__message">
              <Image
                fallback={chatbot}
                className="chat-middle__img"
                width={40}
                preview={false}
                src={""}
                style={{ backgroundColor: "#ccc" }}
              />

              <div className="texts">
                <p className="chat-middle__content">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Praesentium amet quis est suscipit odio id debitis delectus,
                  adipisci repellat tempore libero, reiciendis quas recusandae
                </p>

                <span className="chat-middle__time">1 ago</span>
              </div>
            </div>

            <div ref={endRef}></div>
          </div>
          <div className="chat-bottom">
            <div className="chat-bottom__content" style={{ width: "60%" }}>
              <input
                placeholder="Ask somthing else..."
                className="chat-bottom__input"
                // onChange={(e) => setText(e.target.value)}
                // value={text}
              />
              <IoSend
                size={25}
                className="chat-bottom__icon"
                style={{ marginRight: 10 }}
                // onClick={handleSend}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
