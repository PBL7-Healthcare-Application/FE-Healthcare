import { CloseCircleOutlined, MailOutlined } from "@ant-design/icons";
import "./Appointment.scss";
import { Button, Divider, Image, Radio, Typography, notification } from "antd";
import location from "../../../assets/images/location.png";
import calender from "../../../assets/images/calandar.png";
import dolar from "../../../assets/images/dollar.png";
import TextArea from "antd/es/input/TextArea";
import wallet from "../../../assets/images/wallet.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment } from "../../../stores/user/UserThunk";
import { formatDate } from "../../../helpers/timeBooking";
import { delay } from "lodash";
import { openNotificationWithIcon } from "../../../components/notification/CustomNotify";
import doctorDefault from "../../../assets/images/doctor.jpeg";
import personDefault from "../../../assets/images/personDefault.png";
import { setError, setStatusCode } from "../../../stores/user/UserSlice";
import NotFound from "../../../components/cardAppointment/NotFound";
const Appointment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMess, setIsMess] = useState(false);
  const [inputIssue, setInputIssue] = useState("");
  const [appointment, setAppointment] = useState();
  const [user, setUser] = useState();
  const [closeInfor, setCloseInfor] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const { loading, statusCode, error } = useSelector((state) => state.profile);
  useEffect(() => {
    const app = JSON.parse(localStorage.getItem("appointment"));
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser) {
      setUser(localUser);
    }
    if (app) {
      setAppointment(app);
    }
  }, []);
  const handleBooking = () => {
    if (inputIssue !== null && inputIssue.length > 0) {
      dispatch(
        bookAppointment({
          idDoctor: appointment?.doctor.idDoctor,
          startTime: appointment?.appointment.startTime,
          endTime: appointment?.appointment.endTime,
          date: appointment?.appointment.date,
          issue: inputIssue,
          type: appointment?.appointment.type === 1 ? true : false,
          price: appointment?.doctor.price,
        })
      );
      setIsMess(false);
    } else {
      setIsMess(true);
    }
  };
  useEffect(() => {
    if (statusCode === 200) {
      localStorage.removeItem("appointment");
      openNotificationWithIcon(
        "success",
        api,
        "",
        "Successfully scheduled a medical examination!"
      );
      delay(() => {
        dispatch(setStatusCode(null));
        navigate("/booking/success");
      }, 1500);
    }
    if (error !== null) {
      localStorage.removeItem("appointment");
      openNotificationWithIcon(
        "error",
        api,
        "",
        "Unsuccessfully scheduled a medical examination!"
      );
      delay(() => {
        dispatch(setError(null));
        navigate(`/doctor/${appointment?.doctor.idDoctor}`);
      }, 1500);
    }
  }, [statusCode, navigate, api, error, dispatch, appointment]);
  return (
    <div className="appointment-main">
      {contextHolder}
      {closeInfor && appointment && (
        <div
          className="appointment-content appointment-noti appointment-font"
          style={{ marginBottom: 40, position: "relative" }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="15.999" cy="15.999" r="13.333" fill="#BCDEFF"></circle>
            <path
              d="M22.513 2.922L6.378 5.337a1.732 1.732 0 00-1.456 1.97l3.04 20.313a1.731 1.731 0 001.968 1.456l16.134-2.415a1.732 1.732 0 001.456-1.969L24.481 4.379a1.732 1.732 0 00-1.968-1.457z"
              fill="#65B5FF"
            ></path>
            <path
              d="M6.148 5.373L22.74 2.89l3.16 21.128-16.59 2.483L6.147 5.373z"
              fill="#fff"
            ></path>
            <path
              d="M15.312 7.974l-.572.086a.838.838 0 00-.704.951l.021.143a.181.181 0 01-.151.205l-.142.02a.837.837 0 00-.704.953l.086.573a.838.838 0 00.951.703l.143-.021a.18.18 0 01.205.152l.021.142a.838.838 0 00.952.703l.572-.085a.838.838 0 00.704-.952l-.022-.143a.18.18 0 01.151-.205l.144-.021a.838.838 0 00.703-.952l-.086-.572a.837.837 0 00-.95-.703l-.144.021a.18.18 0 01-.205-.151l-.022-.144a.837.837 0 00-.951-.703z"
              fill="#F44D2C"
            ></path>
            <path
              d="M21.93 13.421l-9.403 1.408a.324.324 0 00.096.64l9.403-1.407a.324.324 0 10-.095-.64zM22.232 15.749l-11.787 1.764a.324.324 0 00.096.64l11.787-1.764a.324.324 0 00-.096-.64zM21.633 18.208l-10.887 1.629a.324.324 0 10.096.64l10.887-1.629a.324.324 0 00-.096-.64zM20.54 20.744l-9.491 1.421a.324.324 0 00.096.64l9.49-1.42a.324.324 0 10-.096-.64zM22.881 20.393l-.836.125a.324.324 0 00.096.64l.836-.124a.324.324 0 00-.096-.64z"
              fill="#D2D6DC"
            ></path>
            <path
              d="M19.464 5.42l-9.44 1.413a1.161 1.161 0 01-1.32-.977l-.1-.66a.442.442 0 01.372-.503l10.862-1.626a.442.442 0 01.503.372l.098.66a1.162 1.162 0 01-.976 1.321z"
              fill="#284A75"
            ></path>
            <path
              d="M31.75 27.879l-2.392-2.393-1.206 1.206 2.392 2.392a.853.853 0 101.206-1.205z"
              fill="#2743AD"
            ></path>
            <path
              d="M28.828 17.997a5.77 5.77 0 00-8.879 7.289 5.772 5.772 0 108.879-7.289zm-1.312 6.852a3.915 3.915 0 01-6.024-4.946 3.915 3.915 0 116.024 4.946z"
              fill="#2D87F3"
            ></path>
            <path
              d="M2.657 12.087l-.064.327a.482.482 0 01-.564.38l-.081-.015a.103.103 0 00-.121.081l-.016.084a.483.483 0 01-.567.38l-.327-.064a.484.484 0 01-.381-.564l.016-.081a.105.105 0 00-.081-.123l-.081-.016a.48.48 0 01-.381-.564l.064-.327a.481.481 0 01.564-.38l.081.015a.104.104 0 00.122-.084l.015-.081a.483.483 0 01.565-.38l.327.063a.484.484 0 01.383.565l-.016.081a.103.103 0 00.08.123l.082.016a.481.481 0 01.381.564z"
              fill="#65B5FF"
            ></path>
            <path
              d="M4.618 16.043l.043.245a.36.36 0 01-.293.418l-.063.011a.078.078 0 00-.063.09l.01.061a.362.362 0 01-.295.419l-.245.042a.362.362 0 01-.418-.295l-.01-.061a.077.077 0 00-.06-.063.078.078 0 00-.03 0l-.062.01a.36.36 0 01-.368-.164.362.362 0 01-.05-.131l-.043-.245a.363.363 0 01.295-.419l.061-.01a.077.077 0 00.05-.032.078.078 0 00.014-.059l-.01-.06a.362.362 0 01.294-.418l.246-.043a.362.362 0 01.418.295l.01.06a.078.078 0 00.09.065l.063-.011a.36.36 0 01.416.295zM29.944 6.043l.043.245a.36.36 0 01-.293.418l-.062.011a.078.078 0 00-.064.09l.01.061a.362.362 0 01-.295.419l-.245.042a.363.363 0 01-.418-.295l-.01-.061a.079.079 0 00-.06-.063.078.078 0 00-.03 0l-.061.01a.363.363 0 01-.42-.295l-.042-.245a.363.363 0 01.296-.419l.06-.01a.078.078 0 00.064-.09l-.01-.061a.362.362 0 01.295-.419l.245-.042a.363.363 0 01.418.295l.01.06a.078.078 0 00.09.065l.064-.011a.36.36 0 01.415.295z"
              fill="#91CAFF"
            ></path>
            <circle
              cx="24.666"
              cy="22"
              r="4"
              fill="#fff"
              fillOpacity="0.75"
            ></circle>
          </svg>

          <span>
            Please verify your information and confirm your appointment booking.
          </span>
          <CloseCircleOutlined
            style={{ position: "absolute", right: 18, fontSize: 20 }}
            onClick={() => setCloseInfor(false)}
          />
        </div>
      )}
      {console.log("Appointment", appointment)}
      {appointment ? (
        <div className="appointment-content">
          <div className="appointment-left appointment-box">
            <div>
              <Typography className="appointment-left__title">
                Information
              </Typography>
              <div className="appointment-left__infor">
                <div className="appointment-left__infor--box">
                  <Image
                    src={user?.avatar}
                    width={60}
                    className="appointment-left__infor--img"
                    preview={false}
                    fallback={personDefault}
                  />
                  <div className="appointment-left__infor--left">
                    <Typography
                      className="appointment-font"
                      style={{ fontSize: 16, fontWeight: 600 }}
                    >
                      {user?.name}
                    </Typography>
                  </div>
                </div>

                <Divider style={{ margin: "15px 0" }} />

                <div className="appointment-left__infor--phone">
                  <MailOutlined style={{ fontSize: 19, color: "#6c81a0" }} />
                  <Typography
                    className="appointment-font"
                    style={{ fontSize: 16, fontWeight: 400, color: "#6c81a0" }}
                  >
                    {user?.email}
                  </Typography>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <Typography className="appointment-left__title">
                Survey questions
              </Typography>
              <TextArea
                placeholder="Enter your issue ..."
                autoSize={{
                  minRows: 2,
                  maxRows: 6,
                }}
                onChange={(e) => {
                  setIsMess(false);
                  setInputIssue(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.keyCode === 32 && inputIssue.length === 0) {
                    e.preventDefault();
                  }
                }}
                className="textArea"
                required
                style={{ marginBottom: 10 }}
              />
              {isMess && (
                <span style={{ color: "red" }}>Please enter your issues</span>
              )}
            </div>
          </div>
          <div className="appointment-right" style={{ border: 0 }}>
            <div className="appointment-box">
              <Typography className="appointment-left__title">
                Your appointment
              </Typography>
              <div className="appointment-left__infor--box">
                <Image
                  src={appointment?.doctor.avatar}
                  width={90}
                  className="appointment-left__infor--img"
                  fallback={doctorDefault}
                />
                <div
                  className="appointment-left__infor--left"
                  style={{ justifyContent: "flex-start" }}
                >
                  <Typography
                    className="appointment-font"
                    style={{
                      fontSize: 20,
                      fontWeight: 500,
                      letterSpacing: 0.4,
                    }}
                  >
                    {appointment?.doctor.name}
                  </Typography>
                  <Typography
                    className="appointment-font"
                    style={{ fontSize: 15, fontWeight: 400, color: "#6c81a0" }}
                  >
                    {appointment?.doctor.medicalSpecialty}
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
                        {appointment?.appointment.startTime} -{" "}
                        {appointment?.appointment.endTime}
                      </Typography>
                      <Typography
                        className="appointment-font"
                        style={{
                          fontSize: 15,
                          fontWeight: 400,
                          color: "#6c81a0",
                        }}
                      >
                        {formatDate(appointment?.appointment.date)}
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
                        {appointment?.doctor.nameClinic}
                      </Typography>
                      <Typography
                        className="appointment-font"
                        style={{
                          fontSize: 15,
                          fontWeight: 400,
                          color: "#6c81a0",
                        }}
                      >
                        {appointment?.doctor.address
                          ? appointment?.doctor.address
                          : "--"}
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
                        VND {appointment?.doctor.price.toLocaleString("vi-VN")}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phuong thuc thanh toan */}
            <div className="appointment-box" style={{ marginTop: 30 }}>
              <Typography className="appointment-left__title">
                Payment
              </Typography>
              <div
                className="appointment-right__box appointment-right__payment"
                style={{ border: "1px solid rgb(45, 135, 243)" }}
              >
                <div className="appointment-right__payment-left">
                  <Image
                    src={wallet}
                    width={28}
                    className="appointment-right__content-icon"
                  />
                  <Typography
                    className="appointment-font"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      letterSpacing: 0.4,
                    }}
                  >
                    Cash Payment
                  </Typography>
                </div>
                <Radio checked />
              </div>

              <div
                style={{
                  marginTop: 20,
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  className="appointment-right__button"
                  onClick={() => handleBooking()}
                  loading={loading}
                  disabled={!inputIssue}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotFound content={"You don't have any appointment"} />
      )}
    </div>
  );
};

export default Appointment;
