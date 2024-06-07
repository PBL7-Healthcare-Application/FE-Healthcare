/* eslint-disable react/prop-types */
import { Avatar, Badge, Button, Image, Space, Typography } from "antd";
import "./Avt.scss";
import { CloseOutlined, RightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../stores/auth/AuthSlice";
import deleteToken from "../../helpers/deleteToken";
import { useEffect, useState } from "react";
import medicalHistory from "../../assets/images/medicalHistory.png";
import personDefault from "../../assets/images/personDefault.png";
import { auth, db, dbNotify } from "../../helpers/firebase";
import { handleUpdateStatus } from "../../helpers/chat";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import Notify from "../notify/Notify";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { setNotify, setNotifyOld } from "../../stores/Chat/ChatSlice";
import { orderBy } from "lodash";

const Avt = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setvisible] = useState(false);
  const [isNoti, setIsNoti] = useState(false);
  const [countSeen, setCountSeen] = useState("");
  const [countNoti, setCountNoti] = useState("");
  const { profile } = useSelector((state) => state.profile);
  const { chatUser } = useSelector((state) => state.chat);
  const handleAvatar = () => {
    setvisible(!visible);
  };
  const handleLogout = async () => {
    auth.signOut();
    dispatch(logOut());
    localStorage.removeItem("profile");
    localStorage.removeItem("user");
    deleteToken();
    setvisible(!visible);
    navigate("/");
    await handleUpdateStatus(chatUser?.id, false);
  };
  useEffect(() => {
    if (chatUser?.id) {
      const unSub = onSnapshot(doc(db, "userchats", chatUser?.id), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setCountSeen(
            data.chats.filter((item) => item.isSeen === false).length
          );
        }
      });

      return () => {
        unSub();
      };
    }
  }, [chatUser?.id]);
  useEffect(() => {
    const notifyCollection = collection(dbNotify, "notifications");
    const q = query(notifyCollection, orderBy("createAt", "desc"));
    const unSub = onSnapshot(q, (snapshot) => {
      const notifyData = snapshot.docs.map((doc) => ({
        id: doc.id, // get the id of the document
        ...doc.data(), // get the data of the document
      }));
      const listFilter = notifyData.filter((item) => {
        // console.log(item);
        if (item?.idReceiver) {
          if (!item.isRead) {
            return item.idReceiver === profile?.idUser;
          }
        }
      });
      const listFilterOld = notifyData.filter((item) => {
        // console.log(item);
        if (item?.idReceiver) {
          if (item.isRead) {
            return item.idReceiver === profile?.idUser;
          }
        }
      });
      setCountNoti(listFilter?.length);
      dispatch(setNotify(listFilter));
      dispatch(setNotifyOld(listFilterOld));
    });

    return () => {
      unSub();
    };
  }, [dispatch, profile]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNoti && event.target.closest(".notification-icon") === null) {
        setIsNoti(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isNoti]);
  useEffect(() => {
    const handleClickOutsideAvatar = (event) => {
      if (visible && event.target.closest(".profile-icon") === null) {
        setvisible(false);
      }
    };

    document.addEventListener("click", handleClickOutsideAvatar);
    return () => {
      document.removeEventListener("click", handleClickOutsideAvatar);
    };
  }, [visible]);

  return (
    <Space className="avt">
      <Badge
        count={countSeen}
        style={{ cursor: "pointer" }}
        size="large"
        offset={[-5, 3]}
      >
        <div
          style={{
            padding: 10,
            paddingBottom: 5,
            backgroundColor: "#E4E6EB",
            borderRadius: "50%",
            cursor: "pointer",
          }}
          onClick={() => navigate("/chatting")}
        >
          {/* <MessageOutlined className="avt-notify" style={{ width: 25 }} /> */}
          <FaFacebookMessenger size={25} color="#404040" />
        </div>
      </Badge>

      <Badge
        count={countNoti}
        style={{ cursor: "pointer" }}
        size="large"
        offset={[-5, 3]}
      >
        <div
          className="notification-icon"
          onClick={() => setIsNoti(!isNoti)}
          style={{
            position: "relative",
            cursor: "pointer",
            padding: 10,
            paddingBottom: 5,
            backgroundColor: isNoti ? "#E3F2FE" : "#E4E6EB",
            borderRadius: "50%",
          }}
        >
          <IoNotifications
            size={26}
            color={`${isNoti ? "#4096ff" : "#404040"}`}
          />
          {isNoti && <Notify onClose={() => setIsNoti(!isNoti)} />}
        </div>
      </Badge>
      <div style={{ position: "relative" }}>
        {!visible ? (
          <Avatar
            className="avt-avatar profile-icon"
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
                <Space
                  className="avt-popover__box--item"
                  onClick={() => {
                    navigate("/user/medical-history");
                  }}
                >
                  <Image src={medicalHistory} preview={false} width={25} />
                  <Typography
                    className="avt-font"
                    style={{ fontSize: 13 }}
                    onClick={() => {
                      navigate("/user/medical-history");
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
