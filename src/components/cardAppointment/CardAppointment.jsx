/* eslint-disable react/prop-types */
import { Image, Modal, Rate, Typography } from "antd";
import "./CardAppointment.scss";
import location from "../../assets/images/location.png";
import calender from "../../assets/images/calandar.png";
import dolar from "../../assets/images/dollar.png";
import problem from "../../assets/images/problem.png";
import jam_medical from "../../assets/images/jam_medical.png";
import doctorDefault from "../../assets/images/doctor.jpeg";
import { formatDate } from "../../helpers/timeBooking";
import { useNavigate } from "react-router-dom";
import { setIsSelected } from "../../stores/search-doctor/SearchSlice";
import { getDoctorDetail } from "../../stores/search-doctor/SearchThunk";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { setConsent } from "firebase/analytics";
import { userCreateRating } from "../../stores/user/UserThunk";

const CardAppointment = ({ appointment, type, onCancel }) => {
  const [isRate, setIsRate] = useState(false)
  const [rate, setRate] = useState(5);
  const [content, setcontent] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(appointment?.isRating)

  useEffect(() => {
    setIsDisabled(appointment?.isRating)
  }, [appointment?.isRating])
  const handleCancel = () => {
    setIsRate(false)
    setRate(5)
    setConsent("")
  }

  const handleOk = () => {
    dispatch(
      userCreateRating({
        ratingScore: rate,
        comment: content,
        idDoctor: appointment?.idDoctor,
        idAppointment: appointment?.idAppointment,
        nameUser: JSON.parse(localStorage.getItem('user')).name,
      })
    )
    setIsRate(false)
    setIsSuccess(true)
    setIsDisabled(true)
  }
  return (
    <div className="cardAppointment">
      <Modal open={isRate} onCancel={handleCancel} onOk={handleOk} className="modal">
        <Typography
          className="appointment-font"
          style={{ fontSize: 18, fontWeight: 500, color: "#6c81a0", marginBottom: 10 }}
        >
          Give me your feeback
        </Typography>
        <div
          className="appointment-box successBooking-box"
          style={{
            minWidth: 550,
          }}
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
                {appointment?.medicalSpecialty}
              </Typography>
            </div>
          </div>
          <div>
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
                    {appointment?.nameClinic}
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
            </div>

          </div>
          <Typography
            className="appointment-font"
            style={{ fontSize: 16, fontWeight: 500, color: "#404040", marginTop: 20 }}
          >
            How was your appointment with the doctor?
          </Typography>
          <div style={{ marginTop: 10, width: 'fit-content' }}>
            <Rate value={rate} style={{ fontSize: 35 }} onChange={(value) => setRate(value)} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <span className="appointment-font"
                style={{ fontSize: 13, fontWeight: 500, color: "#6c81a0", marginTop: 5 }}>Terrible</span>
              <span className="appointment-font"
                style={{ fontSize: 13, fontWeight: 500, color: "#6c81a0", marginTop: 5 }}>Wonderful</span>
            </div>

          </div>
          <TextArea value={content} onChange={(e) => setcontent(e.target.value)} rows={4} placeholder="Enter your feeback ..." className="cardAppointment-textArea" />

        </div>
      </Modal>
      <Modal open={isSuccess} onCancel={() => setIsSuccess(false)} okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 30 }}>
          <span style={{ fontSize: 26, fontWeight: 600, color: "#6c81a0", marginTop: 20 }}>Thank you so much!</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#404040", marginTop: 2, textAlign: 'center' }}>Thank for taking your time to give us your feeback. We continue to work with partners to improve services.</span>
        </div>
      </Modal>
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
              {appointment?.nameClinic}
            </Typography>
            <Typography
              className="appointment-font"
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "#6c81a0",
              }}
            >
              {appointment?.address ? appointment?.address : "--"}
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
              VND {appointment?.price.toLocaleString("vi-VN")}
            </Typography>
          </div>
        </div>

        <div className="cardAppointment--item">
          <Image
            src={problem}
            width={20}
            className="appointment-right__content-icon"
            preview={false}
          />
          <div>
            <Typography
              className="appointment-font"
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "#6c81a0",
                marginTop: 2,
              }}
            >
              {appointment?.issue ? appointment?.issue : "--"}
            </Typography>
          </div>
        </div>
      </div>
      <div className="cardAppointment--buttonArea">
        <div className="cardAppointment--buttonArea__button">
          {type === 1 && (
            <div
              onClick={() => onCancel(appointment?.idAppointment)}
              style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, justifyContent: 'center' }}
            >
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
            </div>
          )}
          {type === 2 && (
            < >
              {
                !isDisabled ? (
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
                    <span className="appointment-font" style={{ color: "#185FA0" }} onClick={() => setIsRate(true)}>
                      Rate your appointment
                    </span>
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-custo="fill" ><path d="M19.9803 5.99018C19.7205 5.99792 19.4739 6.1065 19.2928 6.29292L8.99984 16.5859L5.70687 13.2929C5.61473 13.1969 5.50436 13.1203 5.38223 13.0675C5.2601 13.0147 5.12867 12.9869 4.99563 12.9855C4.86259 12.9842 4.73061 13.0094 4.60743 13.0597C4.48426 13.1099 4.37235 13.1843 4.27827 13.2784C4.1842 13.3725 4.10983 13.4844 4.05954 13.6075C4.00926 13.7307 3.98405 13.8627 3.9854 13.9957C3.98676 14.1288 4.01464 14.2602 4.06743 14.3823C4.12021 14.5045 4.19684 14.6148 4.29281 14.707L8.29281 18.707C8.48035 18.8944 8.73467 18.9998 8.99984 18.9998C9.26501 18.9998 9.51933 18.8944 9.70687 18.707L20.7069 7.70698C20.8514 7.56652 20.9501 7.38567 20.99 7.18815C21.03 6.99063 21.0093 6.78565 20.9308 6.60007C20.8523 6.41448 20.7195 6.25695 20.5499 6.14812C20.3803 6.03929 20.1817 5.98424 19.9803 5.99018Z" fill="#4ade80"></path></svg>
                    <span className="appointment-font" style={{ color: "#185FA0", cursor: 'default' }}>
                      You have rated this appointment
                    </span>
                  </>
                )
              }
            </>
          )}
          {type === 3 && (
            <div
              onClick={() => {
                dispatch(setIsSelected(0));
                dispatch(getDoctorDetail(appointment?.idDoctor));
                navigate(`/doctor/${appointment?.idDoctor}`);
              }}
              style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, justifyContent: 'center' }}
            >
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
          )}
        </div>
        {type === 2 && (
          <div
            className="cardAppointment--buttonArea__button"
            onClick={() => {
              dispatch(setIsSelected(0));
              dispatch(getDoctorDetail(appointment?.idDoctor));
              navigate(`/doctor/${appointment?.idDoctor}`);
            }}
            style={{ justifyContent: 'flex-start' }}
          >
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
        )}


      </div>
    </div>
  );
};

export default CardAppointment;
