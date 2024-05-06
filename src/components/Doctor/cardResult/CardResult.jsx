/* eslint-disable react/prop-types */
import { Button, Image, Space, Typography } from "antd";
import "./CardResult.scss";
import {
  CheckCircleFilled,
  DollarOutlined,
  EnvironmentOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDoctorDetail } from "../../../stores/search-doctor/SearchThunk";
import { setIsSelected } from "../../../stores/search-doctor/SearchSlice";
import error from "../../../assets/images/error.png";

// eslint-disable-next-line react/prop-types
const CardResult = ({ doctor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDetail = () => {
    // eslint-disable-next-line react/prop-types
    dispatch(setIsSelected(0));
    dispatch(getDoctorDetail(doctor?.idDoctor));
    navigate(`/doctor/{doctor.idDoctor}`);
  };
  return (
    <div className="result" onClick={handleDetail}>
      <div className="result-first">
        <Image
          src={doctor?.avatar}
          className="result-first__img"
          preview={false}
          fallback={error}
        />
        <Space className="result-first__title">
          <Typography className="result-first__title-text">
            {doctor?.yearExperience} years exp
          </Typography>
        </Space>
      </div>
      <div className="result-second">
        <Space>
          <Typography className="result-second__name">
            {doctor?.name}
          </Typography>
          <CheckCircleFilled style={{ color: "green" }} />
        </Space>
        <Typography className="result-second__specialty">
          {doctor?.medicalSpecialty}
        </Typography>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Space className="result-second__address">
            <EnvironmentOutlined className="result-second__address-icon" />
            <Typography className="result-second__specialty">
              {doctor?.address}
            </Typography>
          </Space>
          <Space className="result-second__address">
            <DollarOutlined className="result-second__address-icon" />
            <Typography className="result-second__specialty">
              {doctor.price.toLocaleString("vi-VN")} ₫
            </Typography>
          </Space>
        </div>
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
