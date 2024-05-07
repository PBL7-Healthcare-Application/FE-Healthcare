/* eslint-disable react/prop-types */
import { Image, Typography } from "antd";
import "./CardAppointment.scss";
import location from "../../assets/images/location.png";
import calender from "../../assets/images/calandar.png";
import dolar from "../../assets/images/dollar.png";
import jam_medical from "../../assets/images/jam_medical.png";
import doctorDefault from "../../assets/images/doctor.jpeg";
import { formatDate } from "../../helpers/timeBooking";
const CardAppointment = ({ appointment, type }) => {
  return (
    <div className="cardAppointment">
      <div className="cardAppointment--header">
        <div className="cardAppointment--header__first">
          <Image
            className="cardAppointment--header__first__img"
            src={appointment?.avatarDoctor}
            width={70}
            preview={false}
            fallback={doctorDefault}
          />
          <div className="cardAppointment--header__first__infor">
            <span className="cardAppointment--font">
              {appointment?.nameDoctor}
            </span>
            <span
              className="cardAppointment--font"
              style={{ fontSize: 13, color: "#6c81a0" }}
            >
              {appointment?.medicalSpecialty}
            </span>
          </div>
        </div>
        <div className="cardAppointment--type">
          <Image preview={false} src={jam_medical} width={20} />
          <span className="appointment-font" style={{ color: "#6c81a0" }}>
            {appointment?.type === true ? "Clinic Visit" : "Video Consult"}
          </span>
        </div>
      </div>
      <div
        style={{
          padding: "0px 20px",
          paddingBottom: 20,
          opacity: type === 3 ? 0.2 : 1,
        }}
      >
        <div className="cardAppointment--item">
          <svg
            width="24"
            height="24"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-custo="fill"
          >
            <path
              d="M3.75 2.25C2.92275 2.25 2.25 2.92275 2.25 3.75V14.25C2.25 15.0773 2.92275 15.75 3.75 15.75H14.25C15.0773 15.75 15.75 15.0773 15.75 14.25V3.75C15.75 2.92275 15.0773 2.25 14.25 2.25H3.75ZM6.75 5.25H8.25V6.75H9.75V5.25H11.25V6.75H12.75V8.25H11.25V9.75H12.75V11.25H11.25V12.75H9.75V11.25H8.25V12.75H6.75V11.25H5.25V9.75H6.75V8.25H5.25V6.75H6.75V5.25ZM8.25 8.25V9.75H9.75V8.25H8.25Z"
              fill="#626D7C"
            ></path>
          </svg>
          <span className="cardAppointment--item__text">
            Booking ID:
            <span
              className="cardAppointment--item__text"
              style={{
                color: "rgb(38, 38, 38)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {"  "}#{appointment?.idAppointment}
            </span>
          </span>
        </div>
        <div className="cardAppointment--item">
          <Image
            src={calender}
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
              {appointment?.startTime} - {appointment?.endTime}
            </Typography>
            <Typography
              className="appointment-font"
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "#6c81a0",
              }}
            >
              {formatDate(appointment?.date)}
            </Typography>
          </div>
        </div>
        <div className="cardAppointment--item">
          <Image
            src={location}
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
              Saigon Healthcare General Clinic
            </Typography>
            <Typography
              className="appointment-font"
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "#6c81a0",
              }}
            >
              7B/31 Thành Thái, phường 14, Quận 10, Ho Chi Minh City, Vietnam
            </Typography>
          </div>
        </div>
        <div className="cardAppointment--item">
          <Image
            src={dolar}
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
              600.000 ₫
            </Typography>
          </div>
        </div>
      </div>
      <div className="cardAppointment--buttonArea">
        <div className="cardAppointment--buttonArea__button">
          {type === 1 && (
            <>
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
                  fill="#595959"
                ></path>
              </svg>
              <span className="appointment-font">Cancel</span>
            </>
          )}
          {type === 2 && (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-custo="fill"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.5397 3.0862C11.712 2.67968 12.2881 2.67968 12.4604 3.0862L14.81 8.63001L20.8192 9.13983C21.2599 9.17722 21.4386 9.72635 21.1043 10.016L16.54 13.97L17.9108 19.846C18.0113 20.2768 17.5442 20.6162 17.1655 20.3877L12 17.27L6.83452 20.3877C6.45587 20.6162 5.98875 20.2768 6.08923 19.846L7.46002 13.97L2.89572 10.016C2.56142 9.72635 2.74013 9.17722 3.18084 9.13983L9.19002 8.63001L11.5397 3.0862ZM12 7.13001L11.03 9.40001L10.56 10.51L9.36002 10.61L6.89002 10.82L9.68002 13.24L9.41002 14.42L8.85002 16.83L10.97 15.55L12 14.93L13.03 15.57L15.15 16.85L14.59 14.44L14.32 13.26L17.11 10.84L14.64 10.63L13.44 10.53L12 7.13001Z"
                  fill="#185FA0"
                ></path>
              </svg>
              <span className="appointment-font" style={{ color: "#185FA0" }}>
                Rate your appointment
              </span>
            </>
          )}
        </div>
        <div className="cardAppointment--buttonArea__button">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-custo="fill"
          >
            <path
              d="M12 3C7.42169 3 3.6306 6.44039 3.07617 10.877C3.05645 11.0089 3.06333 11.1435 3.09642 11.2728C3.12951 11.402 3.18813 11.5234 3.26884 11.6296C3.34954 11.7359 3.45069 11.825 3.56634 11.8915C3.68198 11.9581 3.80978 12.0009 3.9422 12.0173C4.07462 12.0337 4.20899 12.0235 4.3374 11.9871C4.4658 11.9508 4.58564 11.8892 4.68985 11.8059C4.79407 11.7225 4.88056 11.6192 4.94422 11.5019C5.00788 11.3847 5.04744 11.2558 5.06055 11.123C5.49212 7.66961 8.42031 5 12 5C14.0143 5 15.8151 5.8498 17.0879 7.20508L15.1465 9.14648C14.9515 9.34148 14.9515 9.65852 15.1465 9.85352C15.2435 9.95152 15.372 10 15.5 10H20C20.2652 10 20.5196 9.89464 20.7071 9.70711C20.8946 9.51957 21 9.26522 21 9V4.5C21 4.372 20.9505 4.24448 20.8535 4.14648C20.6585 3.95148 20.3415 3.95148 20.1465 4.14648L18.5039 5.78906C16.8655 4.07122 14.5555 3 12 3ZM19.9414 11.9863C19.6938 11.9844 19.4542 12.0744 19.2691 12.2389C19.084 12.4034 18.9666 12.6308 18.9395 12.877C18.5079 16.3304 15.5797 19 12 19C9.9857 19 8.18826 18.1491 6.91406 16.793L8.85352 14.8535C9.04852 14.6585 9.04852 14.3415 8.85352 14.1465C8.75652 14.0485 8.628 14 8.5 14H4C3.73478 14 3.48043 14.1054 3.29289 14.2929C3.10536 14.4804 3 14.7348 3 15V19.5C3 19.628 3.04948 19.7555 3.14648 19.8535C3.34148 20.0485 3.65852 20.0485 3.85352 19.8535L5.49805 18.209C7.13567 19.9255 9.44544 21 12 21C16.5783 21 20.3694 17.5596 20.9238 13.123C20.9433 12.9822 20.9324 12.8388 20.8921 12.7025C20.8517 12.5662 20.7827 12.44 20.6898 12.3324C20.5968 12.2249 20.482 12.1384 20.3529 12.0787C20.2239 12.019 20.0836 11.9875 19.9414 11.9863Z"
              fill="#185FA0"
            ></path>
          </svg>
          <span className="appointment-font" style={{ color: "#185FA0" }}>
            Reschedule
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardAppointment;
