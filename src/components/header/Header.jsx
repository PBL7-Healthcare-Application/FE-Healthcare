import { Image, Space } from "antd";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { Typography } from "antd";
import "./Header.scss";
export const Header = () => {
  const { pathname } = useLocation();
  const links = [
    {
      label: "Appointment",
      href: "/",
    },
    {
      label: "Chatbox",
      href: "/",
    },

    {
      label: "Health Tool",
      href: "/",
    },
    {
      label: "For Partners",
      href: "/",
    },
  ];
  const navItems = links.map((item, index) => {
    return (
      <div key={index} className="nav__item ">
        <Link
          className={`nav__item-content ${
            pathname.split("/").filter(Boolean)[0] ===
            item.href.split("/").filter(Boolean)[0]
              ? "active"
              : ""
          } `}
          to={item.href}
        >
          {item.label}
        </Link>
      </div>
    );
  });
  return (
    <Space className={`menu`}>
      <Space className="nav">
        <Space>
          <Image src={logo} preview={false} width={80} loading="lazy"></Image>
          <Typography className="title">Enclinic</Typography>
        </Space>

        {navItems}
      </Space>
      {/* {isLogin ? <Avt profile={profile} /> : <SignInBtn />} */}
    </Space>
  );
};
