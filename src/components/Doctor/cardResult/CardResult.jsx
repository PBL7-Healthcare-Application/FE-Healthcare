import { Button, Image, Space, Typography } from "antd";
import "./CardResult.scss";
import {
    CheckCircleFilled,
    DollarOutlined,
    EnvironmentOutlined,
    StarFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const CardResult = () => {

    const navigate = useNavigate();
    const handleDetail = () => {
        navigate("/doctor/");
    }
    return (
        <div className="result" onClick={handleDetail}>
            <div className="result-first">
                <Image
                    src="https://cdn-healthcare.hellohealthgroup.com/2023/05/1684827652_646c6e04bf08f6.83721389.jpg"
                    className="result-first__img"
                    preview={false}
                />
                <Space className="result-first__title">
                    <Typography className="result-first__title-text">
                        11 years exp
                    </Typography>
                </Space>
            </div>
            <div className="result-second">
                <Space>
                    <Typography className="result-second__name">Dr. John Doe</Typography>
                    <CheckCircleFilled style={{ color: "green" }} />
                </Space>
                <Typography className="result-second__specialty">
                    Trauma – Orthopedics
                </Typography>
                <Space className="result-second__address">
                    <EnvironmentOutlined className="result-second__address-icon" />
                    <Typography className="result-second__specialty">
                        45 Thanh Thai Street, Ward 14, District 10, Ho Chi Minh City,
                        Vietnam
                    </Typography>
                </Space>
                <Space className="result-second__address">
                    <DollarOutlined className="result-second__address-icon" />
                    <Typography className="result-second__specialty">$200</Typography>
                </Space>
            </div>
            <div className="result-third">
                <div className="result-third__rate">
                    <Space className="result-third__rate-item">
                        <StarFilled className="result-third__rate-icon" />
                        <Typography className="result-third__rate-text">5.0/5</Typography>
                    </Space>
                    <Link to="/doctor" className="result-third__rate-link">
                        31 rating
                    </Link>
                </div>
                <div className="result-third__button">
                    <Button className="result-third__button-text">Chat now</Button>
                    {/* <Button className="result-third__button-text">View details</Button> */}
                </div>
            </div>
        </div>
    );
};

export default CardResult;
