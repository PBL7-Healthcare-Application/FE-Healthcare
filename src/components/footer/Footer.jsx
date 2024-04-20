import { Image, Space, Typography } from "antd";
import logo from "../../assets/images/logo.png";
import "./Footer.scss";
export const Footer = () => {
  return (
    <Space className="footer">
      <Space>
        <Image src={logo} preview={false} width={80} loading="lazy"></Image>
        <Typography className="title">Enclinic</Typography>
      </Space>
      <Typography className="sub_title">
        Copyright © 2023, Enclinics. All rights reserved.
      </Typography>
    </Space>
  );
};
