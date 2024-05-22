import {
  BellOutlined,
  LogoutOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Image, Layout, Menu, Space } from "antd";
import "./DoctorLayout.scss";
import title from "../../assets/images/title.png";
import logo from "../../assets/images/logo.png";
import examination from "../../assets/images/examination.png";
import { FaRegBookmark, FaRegCalendarAlt, FaRegSun } from "react-icons/fa";
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
import { auth, db } from "../../helpers/firebase";
import { handleUpdateStatus } from "../../helpers/chat";
import { doc, onSnapshot } from "firebase/firestore";
const { Header, Sider, Content } = Layout;
const DoctorLayout = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [current, setCurrent] = useState("/appointment");
  const location = useLocation();
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const [countSeen, setCountSeen] = useState("");

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
    return () => {};
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
      await handleUpdateStatus(chatUser.id, false);
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
            <Space className="avt">
              <Badge count={countSeen}>
                <MessageOutlined
                  className="avt-notify"
                  style={{ width: 30 }}
                  onClick={() =>
                    navigate("/dr.Enclinic/chatting", {
                      state: "Doctor",
                    })
                  }
                />
              </Badge>
              <Badge count={5}>
                <BellOutlined className="avt-notify" />
              </Badge>
              <div style={{ position: "relative" }}>
                <Avatar
                  className="avt-avatar"
                  size="large"
                  style={{
                    backgroundColor: "#fde3cf",
                    color: "#f56a00",
                  }}
                >
                  {profile?.name[0]}
                </Avatar>
              </div>
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
