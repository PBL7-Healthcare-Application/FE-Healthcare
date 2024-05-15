/* eslint-disable react/prop-types */
import { Image } from "antd";
import "./List.scss";
import personDefault from "../../../assets/images/personDefault.png";

const ItemUser = ({ chat }) => {
  return (
    <div className="listUser-item">
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
          style={{ fontWeight: 400, fontSize: 12, color: "#a5a5a5" }}
        >
          {chat.lastMessage ? chat.lastMessage : "---"}
        </p>
      </div>
    </div>
  );
};

export default ItemUser;
