/* eslint-disable react/prop-types */
import CardNotify from "./CardNotify";
import "./Notify.scss";
import { Space } from "antd";

function Notify({ onClose }) {
  return (
    <Space
      className="avt-popover"
      direction="vertical"
      onClick={() => onClose()}
      style={{
        top: 50,
        height: "fit-content",
        maxHeight: 400,
        overflowY: "scroll",
        scrollbarWidth: "thin",
        scrollbarColor: "#888 #f5f5f5",
        padding: "10px 0",
        backgroundColor: "#fff",
      }}
    >
      <CardNotify />
      <CardNotify />
      <CardNotify />
      <CardNotify />
      <CardNotify />
      <CardNotify />
    </Space>
  );
}

export default Notify;
