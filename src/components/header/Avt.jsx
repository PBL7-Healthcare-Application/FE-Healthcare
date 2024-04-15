import { Avatar, Popover, Space } from "antd";
import React from "react";




const Avt = () => {



    return (

        <Popover placement="bottom" trigger="click" >
            <Space className="login">

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