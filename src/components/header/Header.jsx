import { Image, Space } from "antd";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { Typography } from "antd";
import "./Header.scss";
import Avt from "./Avt";
import { useState } from "react";
import SignInBtn from "./SignInBtn";
export const Header = () => {
  const { pathname } = useLocation();
  const { isLogin, setIsLogin } = useState(false);
  const links = [
    {
      label: "Appointment",
      href: "/",
    },
    {
      label: "Chatbox",
      href: "/a",
    },

    {
      label: "Health Tool",
      href: "/b",
    },
    {
      label: "For Partners",
      href: "/c",
    },
  ];
  const navItems = links.map((item, index) => {
    return (
      <div key={index} className="nav__item ">
        <Link
          className={`nav__item-content ${pathname.split("/").filter(Boolean)[0] ===
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

      <Space className="logo">
        <Image src={logo} preview={false} width={80} loading="lazy"></Image>
        <Typography className="title">Enclinic</Typography>



      </Space>
      <Space className="nav">
        {navItems}
      </Space>
      {isLogin ? <Avt /> : <SignInBtn />}
    </Space>
  );
};
