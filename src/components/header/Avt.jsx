/* eslint-disable react/prop-types */
import { Avatar, Badge, Button, Image, Space, Typography } from "antd";
import "./Avt.scss";
import {
  BellOutlined,
  CloseOutlined,
  MessageOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../stores/auth/AuthSlice";
import deleteToken from "../../helpers/deleteToken";
import { useEffect, useState } from "react";
import medicalHistory from "../../assets/images/medicalHistory.png";
import personDefault from "../../assets/images/personDefault.png";
import { auth, db } from "../../helpers/firebase";
import { handleUpdateStatus } from "../../helpers/chat";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";

const Avt = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setvisible] = useState(true);
  const [countSeen, setCountSeen] = useState("");
  const { chatUser } = useSelector((state) => state.chat);
  const handleAvatar = () => {
    setvisible(!visible);
  };
  const handleLogout = async () => {
    await handleUpdateStatus(chatUser.id, false);
    auth.signOut();
    dispatch(logOut());
    localStorage.removeItem("profile");
    localStorage.removeItem("user");
    deleteToken();
    setvisible(!visible);
    navigate("/");
  };
  useEffect(() => {

    const unSub = onSnapshot(doc(db, "userchats", chatUser.id), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setCountSeen(data.chats.filter((item) => item.isSeen === false).length);
      }
    });

    return () => {
      unSub();
    };
  }, [chatUser?.id])
  return (
    <Space className="avt">
      <Badge count={countSeen} style={{ cursor: "pointer" }}>
        <MessageOutlined
          className="avt-notify"
          style={{ width: 30 }}
          onClick={() => navigate("/chatting")}
        />
      </Badge>
      <Badge count={5}>
        <BellOutlined className="avt-notify" />
      </Badge>
      <div style={{ position: "relative" }}>
        {visible ? (
          <Avatar
            className="avt-avatar"
            size="large"
            style={{
              backgroundColor: "#fde3cf",
              color: "#f56a00",
            }}
            onClick={handleAvatar}
          >
            {props?.profile && props?.profile?.name[0]}
          </Avatar>
        ) : (
          <div className="avt-icon" style={{ position: "relative" }}>
            <CloseOutlined onClick={handleAvatar} className="avt-icon__item" />
            <Space className="avt-popover" direction="vertical">
              <Space
                onClick={() => {
                  navigate("/user/profile");
                  setvisible(!visible);
                }}
              >
                <Image
                  src={props?.profile?.avatar}
                  width={70}
                  className="avt-popover__img avt-pointer"
                  preview={false}
                  fallback={personDefault}
                />
                <div
                  style={{ display: "flex", gap: 15, flexDirection: "column" }}
                  className="avt-pointer"
                >
                  <Typography className="avt-font">
                    {props?.profile && props?.profile?.name}
                  </Typography>
                  <Space style={{ marginTop: -10 }}>
                    <Typography
                      className="avt-font"
                      style={{ fontSize: 12, color: "#595959" }}
                    >
                      View my profile
                    </Typography>
                    <RightOutlined style={{ fontSize: 12, color: "#595959" }} />
                  </Space>
                </div>
              </Space>
              <div className="avt-popover__box" style={{ marginTop: 20 }}>
                <Space
                  className="avt-popover__box--item"
                  onClick={() => {
                    navigate("/user/appointment");
                    setvisible(!visible);
                  }}
                >
                  <Image
                    src="https://hhg-common.hellobacsi.com/common/userProfileNav/helloSites/icon-myBooking.svg"
                    preview={false}
                  />
                  <Typography className="avt-font" style={{ fontSize: 13 }}>
                    My Appointment
                  </Typography>
                </Space>
                <Space className="avt-popover__box--item" onClick={() => {
                  navigate("/user/medical-history");
                  setvisible(!visible);
                }}>
                  <Image src={medicalHistory} preview={false} width={25} />
                  <Typography
                    className="avt-font"
                    style={{ fontSize: 13 }}
                    onClick={() => {
                      navigate("/user/medical-history");
                      setvisible(!visible);
                    }}
                  >
                    My Medical History
                  </Typography>
                </Space>
              </div>
              <Button
                className="avt-popover__button avt-font"
                style={{ fontSize: 13, marginTop: 13 }}
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </Space>
          </div>
        )}
      </div>
    </Space>
  );
};

export default Avt;
