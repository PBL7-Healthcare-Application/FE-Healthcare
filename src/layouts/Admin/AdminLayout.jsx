import {
  BellOutlined,
  LogoutOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Image, Layout, Menu, Space } from "antd";
import "../doctor/DoctorLayout.scss";
import title from "../../assets/images/title.png";
import logo from "../../assets/images/logo.png";
import examination from "../../assets/images/examination.png";
import { FaRegBookmark, FaRegCalendarAlt, FaUsers } from "react-icons/fa";
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
import "./AdminLayout.scss";
import { FaListCheck } from "react-icons/fa6";
import { TiThList } from "react-icons/ti";
const { Header, Sider, Content } = Layout;
const AdminLayout = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [current, setCurrent] = useState("/appointment");
  const location = useLocation();
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.doctor);
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
    navigate(`/admin${e.key}`);
  };
  const handleLogout = async () => {
    dispatch(logOut());
    localStorage.removeItem("doctor");
    deleteToken();
    navigate("/");
  };

  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      <Sider
        trigger={null}
        collapsible
        className="adminSlider"
        style={{ width: 310 }}
      >
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
              key: "/users",
              icon: <FaUsers size={25} color="#b5bad4" />,
              label: "Users",
            },
            {
              key: "/appointments",
              icon: <FaRegBookmark size={25} color="#b5bad4" />,
              label: "Appointments",
            },
            {
              key: "/requests",
              icon: <TiThList size={25} color="#b5bad4" />,
              label: "Requests",
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
export default AdminLayout;
