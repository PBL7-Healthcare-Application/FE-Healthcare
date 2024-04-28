import { Avatar, Badge, Popover, Space } from "antd";
import "./Avt.scss";
import { BellOutlined, MessageOutlined } from "@ant-design/icons";
import dashboardLink from "../../routers/Dashboard";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../stores/auth/AuthSlice";
import deleteToken from "../../helpers/deleteToken";




const Avt = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const content = (
        <Space direction="vertical" className="options">
            {dashboardLink.map((link, index) => (
                <Space
                    key={index}
                    className={`options__item ${link.label === "Sign Out" ? "sign_out" : ""
                        }`}
                    onClick={() => {
                        if (link.label === "Sign Out") {
                            dispatch(logOut());
                            localStorage.removeItem("profile");
                            deleteToken();
                            navigate("/");
                        } else navigate(`/dashboard${link.path}`);
                    }}
                >
                    <Space className="options__icon">{link?.icon}</Space>
                    <span className="options__label">{link?.label}</span>
                </Space>
            ))}
        </Space>
    );
    return (

        <Popover placement="bottom" trigger="click" content={content}>
            <Space className="avt" >
                <Badge count={3}>
                    <MessageOutlined className="avt-notify" style={{ width: 30 }} />
                </Badge>
                <Badge count={5}>
                    <BellOutlined className="avt-notify" />
                </Badge>
                <Avatar
                    size="large"
                    style={{
                        backgroundColor: "#fde3cf",
                        color: "#f56a00",
                    }}
                >
                    H
                </Avatar>
            </Space>
        </Popover>

    );
};

export default Avt;