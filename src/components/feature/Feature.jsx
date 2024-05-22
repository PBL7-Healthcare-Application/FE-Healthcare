import { Image, Space, Typography } from "antd";
import doctor from "../../assets/images/doctor.png";
import appointment from "../../assets/images/appointment.png";
import video from "../../assets/images/video.png";
import chat from "../../assets/images/chat.png";
import "./Feature.scss";
const Feature = () => {
  return (
    <Space className="left__content">
      <Space className="left__content-item">
        <Space className="left__content-item-img">
          <Image
            src={doctor}
            preview={false}
            width="100%"
            height="100%"
            loading="lazy"
            style={{ marginLeft: "8px" }}
          ></Image>
        </Space>
        <Typography className="left__content-item-name">
          Doctor Searching
        </Typography>
      </Space>

      <Space className="left__content-item">
        <Space className="left__content-item-img">
          <Image
            src={appointment}
            preview={false}
            width="100%"
            height="100%"
            loading="lazy"
          ></Image>
        </Space>
        <Typography className="left__content-item-name">Appointment</Typography>
      </Space>

      <Space className="left__content-item">
        <Space className="left__content-item-img">
          <Image
            src={video}
            preview={false}
            width="100%"
            height="100%"
            loading="lazy"
          ></Image>
        </Space>
        <Typography className="left__content-item-name">
          Video Consultation
        </Typography>
      </Space>

      <Space className="left__content-item">
        <Space className="left__content-item-img">
          <Image
            src={chat}
            preview={false}
            width="100%"
            height="100%"
            loading="lazy"
          ></Image>
        </Space>
        <Typography className="left__content-item-name">Chatbot</Typography>
      </Space>
    </Space>
  );
};

export default Feature;
