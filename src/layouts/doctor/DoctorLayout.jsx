import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Badge, Image, Layout, Menu, Space, Typography } from "antd";
import "./DoctorLayout.scss";
import title from "../../assets/images/title.png";
import logo from "../../assets/images/logo.png";
import examination from "../../assets/images/examination.png";
import {
  FaFacebookMessenger,
  FaRegBookmark,
  FaRegCalendarAlt,
  FaRegSun,
} from "react-icons/fa";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SignInBtn from "../../components/header/SignInBtn";
import getToken from "../../helpers/getToken";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoctorCalendar,
  getDoctorProfile,
} from "../../stores/doctor/DoctorThunk";
import { logOut } from "../../stores/auth/AuthSlice";
import deleteToken from "../../helpers/deleteToken";
import { auth, db, dbNotify } from "../../helpers/firebase";
import { handleUpdateStatus } from "../../helpers/chat";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { IoNotifications } from "react-icons/io5";
import Notify from "../../components/notify/Notify";
import { orderBy } from "lodash";
import { setNotify } from "../../stores/Chat/ChatSlice";
import { VscFeedback } from "react-icons/vsc";
const { Header, Sider, Content } = Layout;
const DoctorLayout = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [current, setCurrent] = useState("/appointment");
  const location = useLocation();
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const [countSeen, setCountSeen] = useState("");
  const [countNoti, setCountNoti] = useState("");
  const [isNoti, setIsNoti] = useState(false);
  const { profile } = useSelector((state) => state.doctor);
  const { chatUser } = useSelector((state) => state.chat);
  useEffect(() => {
    const endpoint = location.pathname;
    setCurrent(`/${endpoint.split("/")[2]}`);
  }, [location.pathname]);
  useEffect(() => {
    const token = getToken();
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
      dispatch(getDoctorProfile());
      dispatch(getDoctorCalendar());
    }
    return () => { };
  }, [token, dispatch]);

  useEffect(() => {
    if (profile === null) {
      const token = getToken();
      if (!token) {
        setIsLogin(false);
      }
    }
  }, [profile]);

  const onNavItemClick = (e) => {
    setCurrent(e.key);
    if (e.key.trim() === "/setting")
      navigate("/dr.Enclinic/setting/profile/personal");
    else navigate(`/dr.Enclinic${e.key}`);
  };
  const handleLogout = async () => {
    console.log("ok");
    try {
      await handleUpdateStatus(chatUser?.id, false);
      auth.signOut();
    } catch (error) {
      console.log(error);
    }
    dispatch(logOut());
    localStorage.removeItem("doctor");
    deleteToken();
    navigate("/");
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
    const notifyCollection = collection(dbNotify, "notifications");
    const q = query(notifyCollection, orderBy("createAt", "desc")); // replace 'yourCollectionName' with the name of your collection
    const unSub = onSnapshot(q, (snapshot) => {
      const notifyData = snapshot.docs.map((doc) => ({
        id: doc.id, // get the id of the document
        ...doc.data(), // get the data of the document
      }));
      const listFilter = notifyData.filter((item) => {
        if (item?.idDoctor && item?.title !== "New information needs to be verified") {
          return item.idDoctor === profile?.idDoctor && !item.isRead;
        }
        if (item?.idReceiver) {
          return item.idReceiver === profile?.idDoctor && !item.isRead;
        }
      });
      console.log(listFilter);
      setCountNoti(listFilter?.length);
      dispatch(setNotify(listFilter));
    });

    return () => {
      unSub();
    };
  }, [dispatch, profile]);
  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      <Sider trigger={null} collapsible className="customSlider">
        <div className="customSlider__logo">
          <Image src={logo} preview={false} width="60%" />
          <Image src={title} preview={false} width="70%" />
        </div>
        <Menu
          className="sidebar__nav"
          mode="inline"
          selectedKeys={[current]}
          items={[
            {
              key: "/appointment",
              icon: <FaRegBookmark size={25} color="#b5bad4" />,
              label: "Appointment",
            },
            {
              key: "/calendar",
              icon: <FaRegCalendarAlt size={25} color="#b5bad4" />,
              label: "Calendar",
            },
            {
              key: "/examination",
              icon: <Image src={examination} preview={false} width={29} />,
              label: "Examination",
            },
            {
              key: "/setting",
              icon: <FaRegSun size={25} color="#b5bad4" />,
              label: "Setting",
            },
            {
              key: "/rating",
              icon: <VscFeedback size={25} color="#b5bad4" />,
              label: "Rating",
            },
          ]}
          onClick={onNavItemClick}
        />
        <div className="sidebar__logout" onClick={handleLogout}>
          <LogoutOutlined style={{ fontSize: 25, color: "#b5bad4" }} />
          <span className="sidebar__logout__text">Sign Out</span>
        </div>
      </Sider>
      <Layout style={{ backgroundColor: "#f1f5f9" }}>
        <Header className="customSlider__header">
          {isLogin ? (
            <Space
              className="avt"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Space>
                <Typography
                  className="sidebar__logout__text"
                  style={{ color: "#404040" }}
                >
                  {profile && profile?.name}
                </Typography>
                <Avatar
                  className="avt-avatar profile-icon"
                  size="large"
                  style={{
                    backgroundColor: "#fde3cf",
                    color: "#f56a00",
                  }}
                >
                  {profile && profile?.name[0]}
                </Avatar>
              </Space>
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
                  onClick={() => navigate("/dr.Enclinic/chatting")}
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
            </Space>
          ) : (
            <SignInBtn />
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            // backgroundColor: "#F5F7FA"
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default DoctorLayout;
