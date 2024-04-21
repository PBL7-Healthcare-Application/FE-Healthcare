
import { Image, Space, Typography } from "antd";
import "./CardResult.scss";
import { DollarOutlined, EnvironmentOutlined, StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

const CardResult = () => {



    return (
        <div className="result">
            <div className="result-first">
                <Image src="https://cdn-healthcare.hellohealthgroup.com/2023/05/1684827652_646c6e04bf08f6.83721389.jpg" className="result-first__img" />
                <Space className="result-first__title" >
                    <Typography className="result-first__title-text">11 years exp</Typography>
                </Space>
            </div>
            <div className="result-second">
                <Typography className="result-second__name">Dr. John Doe</Typography>
                <Typography className="result-second__specialty">Trauma – Orthopedics</Typography>
                <Space className="result-second__address">
                    <EnvironmentOutlined className="result-second__address-icon" />
                    <Typography className="result-second__specialty">45 Thanh Thai Street, Ward 14, District 10, Ho Chi Minh City, Vietnam</Typography>
                </Space>
                <Space className="result-second__address">

                    <DollarOutlined className="result-second__address-icon" />
                    <Typography className="result-second__specialty">$200</Typography>
                </Space>
            </div>
            <div className="result-third">
                <div>
                    <Space>
                        <StarFilled />
                        <Typography>5.0/5</Typography>
                    </Space>
                    <Link to="/doctor" >31 rating</Link>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default CardResult;