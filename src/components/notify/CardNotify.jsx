import { Image } from "antd";
import "./Notify.scss";
import appointmentIcon from "../../assets/images/appointmentIcon.png";

function CardNotify() {
  return (
    <div style={{ width: "100%", borderBottom: "1px solid #6c81a0" }}>
      <div className="cardNotify">
        <Image src={appointmentIcon} width={45} preview={false} />
        <div className="cardNotify-content">
          <span className="cardNotify-font" style={{ color: "#404040" }}>
            New Appointment
          </span>
          <span
            className="cardNotify-font"
            style={{ fontSize: 13, fontWeight: 500 }}
          >
            You have a new medical appointment
          </span>
          <span
            className="cardNotify-font"
            style={{ fontSize: 12, fontWeight: 400 }}
          >
            1 day ago
          </span>
        </div>
      </div>
    </div>
  );
}

export default CardNotify;
