import calender from "../../../assets/images/calandar.png";
import height from "../../../assets/images/height.png";
import scale from "../../../assets/images/scale.png";
import temperatures from "../../../assets/images/temperatures.png";
import jam_medical from "../../../assets/images/jam_medical.png";
import doctorDefault from "../../../assets/images/doctor.jpeg";
import { Image, Typography } from "antd";
import "./MedicalHistory.scss";

const CardMedical = () => {
  return (
    <div className="cardAppointment">
      <div className="cardAppointment--header">
        <div className="cardAppointment--header__first">
          <Image
            className="cardAppointment--header__first__img"
            src={""}
            width={70}
            preview={false}
            fallback={doctorDefault}
          />
          <div className="cardAppointment--header__first__infor">
            <span className="cardAppointment--font">Bui Van Huy</span>
            <span
              className="cardAppointment--font"
              style={{ fontSize: 13, color: "#6c81a0" }}
            >
              Cardiology
            </span>
          </div>
        </div>
        <div className="cardAppointment--type">
          <Image preview={false} src={jam_medical} width={20} />
          <span className="appointment-font" style={{ color: "#6c81a0" }}>
            Clinic Visit
          </span>
        </div>
      </div>
      <div
        style={{
          padding: "0px 20px",
          paddingBottom: 20,
        }}
      >
        <div className="cardAppointment--item" style={{ marginTop: 20 }}>
          <Image
            src={calender}
            width={24}
            className="appointment-right__content-icon"
            preview={false}
          />
          <div>
            <Typography
              className="appointment-font"
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 0.4,
              }}
            >
              Saturday, May 18, 2024
            </Typography>
          </div>
        </div>
        <div className="medical">
          <div className="medical-height">
            <Image
              src={height}
              width={22}
              className="appointment-right__content-icon"
              preview={false}
            />
            <div>
              <Typography
                className="appointment-font"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: 0.4,
                }}
              >
                172 cm
              </Typography>
            </div>
          </div>
          <div className="medical-weight">
            <Image
              src={scale}
              width={23}
              className="appointment-right__content-icon"
              preview={false}
            />
            <div>
              <Typography
                className="appointment-font"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: 0.4,
                }}
              >
                75 kg
              </Typography>
            </div>
          </div>
          <div className="medical-temperature">
            <Image
              src={temperatures}
              width={23}
              className="appointment-right__content-icon"
              preview={false}
            />
            <div>
              <Typography
                className="appointment-font"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: 0.4,
                }}
              >
                37.2 °C
              </Typography>
            </div>
          </div>
        </div>
        <div className="cardAppointment--item" style={{ marginTop: 20 }}>
          <p className="medical-content appointment-font">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
            assumenda est, blanditiis, corporis repellendus quasi consectetur
            amet aliquam quidem inventore ad harum minima voluptates
            consequatur, corrupti odio itaque ut maiores.
          </p>
        </div>
      </div>
      <div className="cardAppointment--buttonArea">
        <div className="cardAppointment--buttonArea__button">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-custo="fill"
            >
              <path
                d="M10 2L9 3H5C4.4 3 4 3.4 4 4C4 4.6 4.4 5 5 5H7H17H19C19.6 5 20 4.6 20 4C20 3.4 19.6 3 19 3H15L14 2H10ZM5 7V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V7H5ZM9 9C9.6 9 10 9.4 10 10V19C10 19.6 9.6 20 9 20C8.4 20 8 19.6 8 19V10C8 9.4 8.4 9 9 9ZM15 9C15.6 9 16 9.4 16 10V19C16 19.6 15.6 20 15 20C14.4 20 14 19.6 14 19V10C14 9.4 14.4 9 15 9Z"
                fill="#f87171"
              ></path>
            </svg>
            <span
              className="appointment-font"
              style={{ marginTop: 3, color: "#f87171" }}
            >
              Delete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMedical;
