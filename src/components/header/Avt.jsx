/* eslint-disable react/prop-types */
import { Avatar, Badge, Button, Image, Space, Typography } from "antd";
import "./Avt.scss";
import {
  BellOutlined,
  CloseOutlined,
  MessageOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../stores/auth/AuthSlice";
import deleteToken from "../../helpers/deleteToken";
import { useState } from "react";

const Avt = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setvisible] = useState(true);
  const handleAvatar = () => {
    setvisible(!visible);
  };
  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("profile");
    localStorage.removeItem("user");
    deleteToken();
    navigate("/");
  };
  return (
    <Space className="avt">
      <Badge count={3}>
        <MessageOutlined className="avt-notify" style={{ width: 30 }} />
      </Badge>
      <Badge count={5}>
        <BellOutlined className="avt-notify" />
      </Badge>
      <div style={{ position: "relative" }}>
        {visible ? (
          <Avatar
            className="avt-avatar"
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
              <Space>
                <Image
                  src="https://scontent.fdad5-1.fna.fbcdn.net/v/t39.30808-1/321425310_853450245775265_1754860979446746751_n.jpg?stp=dst-jpg_p200x200&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=p9CaGGhPmjIQ7kNvgGpnMd2&_nc_ht=scontent.fdad5-1.fna&oh=00_AfABUj82UUSvq5B3syT5sfU2-Zv3RLg62_U-2127BPezXw&oe=663529F1"
                  width={70}
                  className="avt-popover__img avt-pointer"
                  preview={false}
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
              <div className="avt-popover__box">
                <Space className="avt-popover__box--item">
                  <Image src="https://hhg-common.hellobacsi.com/common/userProfileNav/helloSites/icon-myBooking.svg" />
                  <Typography className="avt-font" style={{ fontSize: 15 }}>
                    My Appointment
                  </Typography>
                </Space>
                <Space className="avt-popover__box--item">
                  <Image src="https://hhg-common.hellobacsi.com/common/userProfileNav/helloSites/icon-myBooking.svg" />
                  <Typography className="avt-font" style={{ fontSize: 15 }}>
                    My Appointment
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
