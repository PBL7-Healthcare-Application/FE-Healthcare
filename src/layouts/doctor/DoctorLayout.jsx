import { LogoutOutlined } from "@ant-design/icons";
import { Image, Layout, Menu } from "antd";
import "./DoctorLayout.scss";
import title from "../../assets/images/title.png";
import logo from "../../assets/images/logo.png";
import { FaRegBookmark, FaRegCalendarAlt, FaRegSun } from "react-icons/fa";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Avt from "../../components/header/Avt";
import SignInBtn from "../../components/header/SignInBtn";
const { Header, Sider, Content } = Layout;
const DoctorLayout = () => {

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [current, setCurrent] = useState("/appointment");
  const location = useLocation();

  useEffect(() => {
    const endpoint = location.pathname;
    setCurrent(`/${endpoint.split("/")[2]}`);

  }, [location.pathname]);
  const onNavItemClick = (e) => {
    console.log("huy:", e.key);
    setCurrent(e.key);
    if (e.key.trim() === "/setting") navigate("/dr.Enclinic/setting/profile/personal");
    else navigate(`/dr.Enclinic${e.key}`);
  };

  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <Sider trigger={null} collapsible className="customSlider" >
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
              key: "/setting",
              icon: <FaRegSun size={25} color="#b5bad4" />,
              label: "Setting",
            },
          ]}
          onClick={onNavItemClick}
        />
        <div className="sidebar__logout">
          <LogoutOutlined style={{ fontSize: 25, color: "#b5bad4" }} />
          <span className="sidebar__logout__text">Sign Out</span>
        </div>
      </Sider>
      <Layout style={{ backgroundColor: "#f1f5f9" }}>
        <Header className="customSlider__header">
          {isLogin ? <Avt /> : <SignInBtn />}
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
