/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import CardNotify from "./CardNotify";
import "./Notify.scss";
import { Space } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import { dbNotify } from "../../helpers/firebase";

function Notify({ onClose }) {
  const { notify } = useSelector((state) => state.chat);
  const handleMark = async () => {
    notify?.map(async (item) => {
      const docRef = await doc(dbNotify, "notifications", item.id); // replace 'notification.id' with the actual id field of your notification
      await updateDoc(docRef, {
        isRead: true, // replace with the fields you want to update
      });
    });
  }
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
      {
        notify?.length > 0 && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: "10px 20px" }}>
            <span className="cardNotify-font" style={{ color: "#404040" }}>
              Notifications
            </span>
            <span>
              <span
                className="cardNotify-font"
                style={{ fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
                onClick={() => handleMark()}
              >
                Mark all as read
              </span>
            </span>
          </div>
        )
      }
      {
        notify?.map((item, index) => (
          <CardNotify key={index} item={item} />
        ))
      }
    </Space>
  );
}

export default Notify;
