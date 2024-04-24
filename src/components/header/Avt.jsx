import { Avatar, Badge, Popover, Space } from "antd";
import "./Avt.scss";
import { BellOutlined, MessageOutlined } from "@ant-design/icons";



const Avt = () => {



    return (

        <Popover placement="bottom" trigger="click" >
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