import { Button, Image, Typography } from "antd";
import location from "../../../assets/images/location.png";
import calender from "../../../assets/images/calandar.png";
import dolar from "../../../assets/images/dollar.png";
import doctorDefault from "../../../assets/images/doctor.jpeg";
import personDefault from "../../../assets/images/personDefault.png";
import "./SuccessBooking.scss";
import { useSelector } from "react-redux";
import { formatDate } from "../../../helpers/timeBooking";
import { useNavigate } from "react-router-dom";

const SuccessBooking = () => {
  const { appointment } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div className="successBooking-main">
      <div className="successBooking-content">
        <Typography className="successBooking-font">
          Booking Successful!
        </Typography>
        <Typography
          className="successBooking-font"
          style={{ fontSize: 16, color: "#595959", fontWeight: 400 }}
        >
          Your appointment has successfully booked. Thank you for using the service
          at Enclinic.
        </Typography>
        <div
          className="appointment-box successBooking-box"
          style={{ marginTop: 40, minWidth: 550 }}
        >
          <div className="appointment-left__infor--box">
            <Image
              src={appointment?.avatarDoctor}
              width={90}
              className="appointment-left__infor--img"
              fallback={doctorDefault}
              preview={false}
            />
            <div
              className="appointment-left__infor--left"
              style={{ justifyContent: "flex-start" }}
            >
              <Typography
                className="appointment-font"
                style={{ fontSize: 20, fontWeight: 500, letterSpacing: 0.4 }}
              >
                {appointment?.nameDoctor}
              </Typography>
              <Typography
                className="appointment-font"
                style={{ fontSize: 15, fontWeight: 400, color: "#6c81a0" }}
              >
                {appointment?.nameMedicalSpecialty}
              </Typography>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <Typography
              className="appointment-font"
              style={{ fontSize: 16, fontWeight: 500, color: "#6c81a0" }}
            >
              Information
            </Typography>
            <div className="appointment-right__box">
              <div className="appointment-right__content">
                {/* <ScheduleOutlined className="appointment-right__content-icon" /> */}
                <Image
                  src={calender}
                  width={28}
                  className="appointment-right__content-icon"
                  preview={false}
                />
                <div>
                  <Typography
                    className="appointment-font"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      letterSpacing: 0.4,
                    }}
                  >
                    {appointment?.startTime} - {appointment?.endTime}
                  </Typography>
                  <Typography
                    className="appointment-font"
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: "#6c81a0",
                    }}
                  >
                    {formatDate(appointment?.date)}
                  </Typography>
                </div>
              </div>
              <div className="appointment-right__content">
                <Image
                  src={location}
                  width={28}
                  className="appointment-right__content-icon"
                  preview={false}
                />
                <div>
                  <Typography
                    className="appointment-font"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      letterSpacing: 0.4,
                    }}
                  >
                    {appointment?.nameClinic ? appointment?.nameClinic : "--"}
                  </Typography>
                  <Typography
                    className="appointment-font"
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: "#6c81a0",
                    }}
                  >
                    {appointment?.address ? appointment?.address : "--"}
                  </Typography>
                </div>
              </div>
              <div className="appointment-right__content">
                <Image
                  src={dolar}
                  width={28}
                  className="appointment-right__content-icon"
                  preview={false}
                />
                <div>
                  <Typography
                    className="appointment-font"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      letterSpacing: 0.4,
                      color: "#D84023",
                    }}
                  >
                    {appointment?.price.toLocaleString('vi-VN')} ₫
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== */}
          <div style={{ marginTop: 20 }}>
            <Typography
              className="appointment-font"
              style={{ fontSize: 16, fontWeight: 500, color: "#6c81a0" }}
            >
              User
            </Typography>
            <div className="appointment-right__box successBooking-service">
              <Image
                src={appointment?.avatarUser}
                width={60}
                style={{ borderRadius: "50%" }}
                fallback={personDefault}
                preview={false}
              />
              <div>
                <Typography
                  className="appointment-font"
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: 0.4,
                  }}
                >
                  {appointment?.nameUser}
                </Typography>
                <Typography
                  className="appointment-font"
                  style={{
                    fontSize: 15,
                    fontWeight: 400,
                    color: "#6c81a0",
                  }}
                >
                  {appointment?.emailUser}
                </Typography>
              </div>
            </div>
          </div>
          <Button className="appointment-font successBooking-button" onClick={() => navigate("/user/appointment")}>My Appointment</Button>
        </div>

      </div>

    </div>
  );
};

export default SuccessBooking;
