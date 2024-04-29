import { Image, Typography } from "antd";
import location from "../../../assets/images/location.png";
import calender from "../../../assets/images/calandar.png";
import dolar from "../../../assets/images/dollar.png";
import "./SuccessBooking.scss";

const SuccessBooking = () => {
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
          You successfully created your booking. Thank you for using the service
          at Enclinic.
        </Typography>
        <div
          className="appointment-box successBooking-box"
          style={{ marginTop: 40 }}
        >
          <div className="appointment-left__infor--box">
            <Image
              src="https://cdn-healthcare.hellohealthgroup.com/2023/05/1684834987_646c8aab879aa9.52106579.jpg"
              width={90}
              className="appointment-left__infor--img"
            />
            <div
              className="appointment-left__infor--left"
              style={{ justifyContent: "flex-start" }}
            >
              <Typography
                className="appointment-font"
                style={{ fontSize: 20, fontWeight: 500, letterSpacing: 0.4 }}
              >
                Dr.Nguyen Đuc Cong
              </Typography>
              <Typography
                className="appointment-font"
                style={{ fontSize: 15, fontWeight: 400, color: "#6c81a0" }}
              >
                General medicine
              </Typography>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <Typography
              className="appointment-font"
              style={{ fontSize: 16, fontWeight: 500, color: "#6c81a0" }}
            >
              Appointment schedule information
            </Typography>
            <div className="appointment-right__box">
              <div className="appointment-right__content">
                {/* <ScheduleOutlined className="appointment-right__content-icon" /> */}
                <Image
                  src={calender}
                  width={28}
                  className="appointment-right__content-icon"
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
                    07:00 - 07:30 AM
                  </Typography>
                  <Typography
                    className="appointment-font"
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: "#6c81a0",
                    }}
                  >
                    Saturday, April 13th, 2024
                  </Typography>
                </div>
              </div>
              <div className="appointment-right__content">
                <Image
                  src={location}
                  width={28}
                  className="appointment-right__content-icon"
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
                    Saigon Healthcare General Clinic
                  </Typography>
                  <Typography
                    className="appointment-font"
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: "#6c81a0",
                    }}
                  >
                    45 Thanh Thai Street, Ward 14, District 10, Ho Chi Minh
                    City, Vietnam
                  </Typography>
                </div>
              </div>
              <div className="appointment-right__content">
                <Image
                  src={dolar}
                  width={28}
                  className="appointment-right__content-icon"
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
                    500$
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
              Service User
            </Typography>
            <div className="appointment-right__box successBooking-service">
              <Image
                src="https://scontent.fdad5-1.fna.fbcdn.net/v/t39.30808-1/321425310_853450245775265_1754860979446746751_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=p9CaGGhPmjIQ7kNvgGpnMd2&_nc_ht=scontent.fdad5-1.fna&oh=00_AfC8nf6r7t2vn599hHlCw_I3zdZKlckeDnHZ5Ix5CrJkwg&oe=6634F1B1"
                width={60}
                style={{ borderRadius: "50%" }}
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
                  Bui Van Huy
                </Typography>
                <Typography
                  className="appointment-font"
                  style={{
                    fontSize: 15,
                    fontWeight: 400,
                    color: "#6c81a0",
                  }}
                >
                  nguyenhoc0721@gmail.com
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessBooking;
