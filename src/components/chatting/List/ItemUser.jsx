/* eslint-disable react/prop-types */
import { Image } from "antd";
import "./List.scss";
import personDefault from "../../../assets/images/personDefault.png";
import { BsFillRecordFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const ItemUser = ({ chat, onSelect }) => {
  const { chatSelected } = useSelector((state) => state.chat);
  return (
    <div
      className={`listUser-item`}
      onClick={() => onSelect(chat)}
      style={{
        position: "relative",
        backgroundColor: chatSelected === chat.chatId && "#f0f9ff",
      }}
    >
      <Image
        src={chat.user?.avatar}
        fallback={personDefault}
        width={40}
        preview={false}
        style={{ borderRadius: "50%" }}
      />
      <div className="listUser-item__texts">
        <span className="listUser-item__name" style={{ fontSize: 15 }}>
          {chat.user?.usename}
        </span>
        <p
          className="listUser-item__name"
          style={{
            fontWeight: 500,
            fontSize: 14,
            color: !chat?.isSeen ? "#000" : "#6c81a0",
          }}
        >
          {chat.lastMessage ? chat.lastMessage : "---"}
        </p>
      </div>
      {!chat?.isSeen && (
        <span style={{ position: "absolute", right: 10 }}>
          <BsFillRecordFill size={20} color="#0866FF" />
        </span>
      )}
      ,
    </div>
  );
};

export default ItemUser;
