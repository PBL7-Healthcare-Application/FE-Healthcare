import { Image, Menu, Space } from "antd";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import title from "../../assets/images/title.png";
import { Typography } from "antd";
import "./Header.scss";
import Avt from "./Avt";
import { useState } from "react";
import SignInBtn from "./SignInBtn";
import { MenuOutlined } from "@ant-design/icons";
export const Header = () => {
  const { pathname } = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [isLogin, setIsLogin] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
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
  const handleMenuClick = () => {
    setOpenMenu(!openMenu);
  };
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

  const menuItems = links.map((item, index) => ({
    key: index,
    label: (
      <Link to={item.href} className="menu-selector__item" style={{ color: '#0f2f64' }}>
        {item.label}
      </Link>
    ),
  }));


  return (
    <Space className={`menu`}>
      <Space className="logo">
        <MenuOutlined className="menu-icon" onClick={handleMenuClick} />
        <Menu className={`menu-selector ${openMenu ? 'open' : ''}`} items={menuItems} />
        <Image src={logo} preview={false} width={80} loading="lazy"></Image>
        <Image src={title} preview={false} width={150} loading="lazy" className="image-title"></Image>
      </Space>
      <Space className="nav">{navItems}</Space>
      {isLogin ? <Avt /> : <SignInBtn />}
    </Space>
  );
};
