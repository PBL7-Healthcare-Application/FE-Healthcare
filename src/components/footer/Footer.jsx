import { Image, Space, Typography } from "antd";
import logo from "../../assets/images/logo.png";
import title from "../../assets/images/title.png";
import "./Footer.scss";
export const Footer = () => {
  return (
    <Space className="footer">
      <Space>
        <Image src={logo} preview={false} width={80} loading="lazy" ></Image>
        <Image src={title} preview={false} width={150} loading="lazy" style={{ marginLeft: -46 }}></Image>
      </Space>
      <Typography className="sub_title">
        Copyright © 2024, Enclinic. All rights reserved.
      </Typography>
    </Space>
  );
};
