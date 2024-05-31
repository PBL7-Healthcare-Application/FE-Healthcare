/* eslint-disable react/prop-types */
import calender from "../../../assets/images/calandar.png";
import height from "../../../assets/images/height.png";
import scale from "../../../assets/images/scale.png";
import temperatures from "../../../assets/images/temperatures.png";
import { Image, Typography } from "antd";
import "../../user/MedicalHistory/MedicalHistory.scss";

const CardExamination = ({ item }) => {
  console.log("item", item);
  return (
    <div className="cardAppointment" style={{ marginBottom: 10 }}>
      <div
        style={{
          padding: "0px 20px",
          paddingBottom: 20,
        }}
      >
        <div
          className="cardAppointment--item"
          style={{
            marginTop: 20,
            // flexDirection: "column",
            gap: 20,
            alignItems: "center",
          }}
        >
          <div>
            <Typography
              className="appointment-font"
              style={{
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: 0.4,
              }}
            >
              {item?.name}
            </Typography>
          </div>
          <div>
            <Typography
              className="appointment-font"
              style={{
                fontSize: 14,
                fontWeight: 400,
                letterSpacing: 0.4,
              }}
            >
              {item?.medicalSpecialty}
            </Typography>
          </div>
        </div>
        <div className="cardAppointment--item" style={{ marginTop: 10 }}>
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
                {item?.height} cm
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
                {item?.weight} kg
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
                {item?.temperature} °C
              </Typography>
            </div>
          </div>
        </div>
        <div className="cardAppointment--item" style={{ marginTop: 10 }}>
          <p
            className="medical-content appointment-font"
            style={{ width: "100%" }}
          >
            {item?.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardExamination;
