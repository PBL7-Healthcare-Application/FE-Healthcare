import { Button, Image, Radio, Space, Tabs, Typography } from "antd";
import "./DetailDoctor.scss";
import { StarFilled } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardDay from "../../components/Doctor/cardDay/CardDay";
import CardTime from "../../components/Doctor/cardTime/CardTime";
import NotAvailable from "../../components/Doctor/notAvailable/NotAvailable";
import { useDispatch, useSelector } from "react-redux";
import {
  convertTime,
  convertToInt,
  countTime,
  doctorSchedule,
  monthNameToNumber,
} from "../../helpers/timeBooking";
import {
  setIsSelected,
  setIsTimeSelected,
} from "../../stores/search-doctor/SearchSlice";
import { useState } from "react";
const DetailDoctor = () => {
  const { doctorDetail } = useSelector((state) => state.search);
  const [times, setTimes] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = (cardId, item) => {
    setTimes(item.times);
    dispatch(setIsSelected(cardId));
  };
  const handleTimeClick = (time) => {
    dispatch(setIsTimeSelected(time));
  };
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", right: -14, zIndex: 1 }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: -15, zIndex: 1 }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const timeOff = doctorDetail?.timeOffs.filter((item) => item.status !== 2);
  const timeBreak = doctorDetail?.timeOffs.filter((item) => item.status !== 1);
  var schedule = [];
  if (doctorDetail) {
    schedule = doctorSchedule(
      convertToInt(doctorDetail?.workingTimeStart),
      convertToInt(doctorDetail?.workingTimeEnd),
      60,
      timeOff,
      timeBreak
    );
  }

  const { TabPane } = Tabs;
  return (
    <div className="detailDr-main">
      <div className="detailDr-content">
        <div className="detailDr-content__left">
          <div className="detailDr-content__left-profile">
            <Image
              src="https://cdn-healthcare.hellohealthgroup.com/2023/05/1684834987_646c8aab879aa9.52106579.jpg"
              width={150}
              style={{ borderRadius: 6 }}
            />
            <div className="detailDr-content__left-profile--infor">
              <div>
                <Typography className="detailDr-content__left-profile--infor__name">
                  {doctorDetail?.name}
                </Typography>
                <Typography className="detailDr-content__left-profile--infor__specialty">
                  {doctorDetail?.medicalSpecialty}
                </Typography>
              </div>
              <div>
                <Space
                  className="result-third__rate-item"
                  style={{ backgroundColor: "rgb(226 232 240)", marginTop: 3 }}
                >
                  <StarFilled className="result-third__rate-icon" />
                  <Typography className="result-third__rate-text">
                    5.0/5
                  </Typography>
                </Space>
                <Link to="/doctor" className="result-third__rate-link">
                  31 rating
                </Link>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <Tabs>
              <TabPane tab="Basic Information" key="1">
                <div className="detailDr-content__left-information__profile">
                  <div className="detailDr-divider"></div>
                  <Typography className="detailDr-content__left-information__profile-title">
                    Profile
                  </Typography>
                  <span className="detailDr-content__left-information__profile-content">
                    Ruben Dela Peña Macapinlac, M.D. is a graduate of De La
                    Salle Medical & Health Sciences Institute, Doctor of
                    Medicine. He had his Pediatric residency training at De La
                    Salle University Medical Center. During his residency
                    training, he wrote an award-winning case report and
                    research. He also became the department’s Chief Resident.
                    Dr. Macapinlac is now a General Pediatrician and the doctor
                    behind “Pedia On-The-Go” Facebook page.
                  </span>
                </div>
                <div className="detailDr-content__left-information__profile">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="32"
                        height="32"
                        rx="16"
                        fill="#BCDEFF"
                      ></rect>
                      <g clipPath="url(#education-icon_svg__clip0_16395_412957)">
                        <path
                          d="M25.598 10.79H6.402a.402.402 0 00-.402.402v12.616c0 .223.18.403.402.403h8.828a.964.964 0 011.54 0h8.828c.222 0 .402-.18.402-.403V11.192a.402.402 0 00-.402-.402z"
                          fill="#2D87F3"
                        ></path>
                        <path
                          d="M25.598 10.79h-1.61c.223 0 .403.18.403.402v12.616c0 .223-.18.403-.403.403h1.61c.222 0 .402-.18.402-.403V11.192a.402.402 0 00-.402-.402z"
                          fill="#2743AD"
                        ></path>
                        <path
                          d="M7.313 12.682h17.372V22.96H7.313V12.682z"
                          fill="#C5D7E6"
                        ></path>
                        <path
                          d="M15.999 10.416v12.413s-3.274-2.709-8.687-.805V10.416s4.365-2.052 8.687 0zM16 10.416v12.413s3.274-2.709 8.686-.805V10.416s-4.365-2.052-8.686 0z"
                          fill="#E4ECF2"
                        ></path>
                        <path
                          d="M16 10.614s2.629-2.817 7.479-2.817v12.215c-4.85 0-7.479 2.817-7.479 2.817V10.614z"
                          fill="#F0F5FA"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="education-icon_svg__clip0_16395_412957">
                          <path
                            fill="#fff"
                            transform="translate(6 6)"
                            d="M0 0h20v20H0z"
                          ></path>
                        </clipPath>
                      </defs>
                    </svg>
                    <Typography className="detailDr-content__left-information__profile-title">
                      Education
                    </Typography>
                  </div>

                  <div>
                    {doctorDetail?.trainingProcess.map((item, index) => (
                      <div
                        className="detailDr-content__left-information__box"
                        key={index}
                      >
                        <div>
                          <Typography
                            className="detailDr-content__left-information__profile-content"
                            style={{ fontSize: 16, fontWeight: 500 }}
                          >
                            {item?.schoolName}
                          </Typography>
                          <Typography className="detailDr-content__left-information__profile-content">
                            {item?.major}
                          </Typography>
                          <Typography className="detailDr-content__left-information__profile-content">
                            2013-2015
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/*  */}
                <div className="detailDr-content__left-information__profile">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="32"
                        height="32"
                        rx="16"
                        fill="#BCDEFF"
                      ></rect>
                      <g clipPath="url(#expertise-icon_svg__clip0_17095_459877)">
                        <path
                          d="M25.688 11.781a2.964 2.964 0 01-2.188 2.863V12.95a1.406 1.406 0 10-1.563 0v1.694a2.968 2.968 0 113.75-2.863z"
                          fill="#fff"
                        ></path>
                        <path
                          d="M23.5 12.95a1.406 1.406 0 11-1.562-2.338A1.406 1.406 0 0123.5 12.95z"
                          fill="#E4E8EC"
                        ></path>
                        <path
                          d="M23.5 14.644v2.293h-1.563V12.95a1.404 1.404 0 001.563 0v1.694z"
                          fill="#2B62CD"
                        ></path>
                        <path
                          d="M23.5 16.938v2.656a6.094 6.094 0 01-12.188 0v-.782a8.154 8.154 0 01-3.531-2.715 7.643 7.643 0 01-.728-1.197l1.59-.594a7.682 7.682 0 001.878 2.225 2.5 2.5 0 003.144 0 7.683 7.683 0 001.878-2.225l1.591.594a8.074 8.074 0 01-4.26 3.912v.782a4.531 4.531 0 009.063 0v-2.657H23.5z"
                          fill="#2D87F3"
                        ></path>
                        <path
                          d="M15.374 6.625v1.563l-.937.312-.797-.16a.953.953 0 010-1.868l.797-.16.937.313z"
                          fill="#fff"
                        ></path>
                        <path
                          d="M17.875 8.188v3.75a7.301 7.301 0 01-.74 2.962l-1.591-.594c.463-.82.726-1.74.768-2.681V8.187h-.937V6.625h.938a1.563 1.563 0 011.562 1.563zM8.813 6.625v1.563h-.938v3.437a6.01 6.01 0 00.769 2.681l-1.59.594a7.3 7.3 0 01-.741-2.963v-3.75a1.558 1.558 0 011.562-1.562h.938z"
                          fill="#2D87F3"
                        ></path>
                        <path
                          d="M10.547 6.472a.953.953 0 010 1.869L9.75 8.5l-.938-.313V6.625l.938-.313.797.16z"
                          fill="#fff"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="expertise-icon_svg__clip0_17095_459877">
                          <path
                            fill="#fff"
                            transform="translate(6 6)"
                            d="M0 0h20v20H0z"
                          ></path>
                        </clipPath>
                      </defs>
                    </svg>
                    <Typography className="detailDr-content__left-information__profile-title">
                      Experience
                    </Typography>
                  </div>

                  <div>
                    {doctorDetail?.workingProcess.map((item, index) => (
                      <div
                        className="detailDr-content__left-information__box"
                        key={index}
                      >
                        <div>
                          <Typography
                            className="detailDr-content__left-information__profile-content"
                            style={{ fontSize: 16, fontWeight: 500 }}
                          >
                            {item?.position}
                          </Typography>
                          <Typography className="detailDr-content__left-information__profile-content">
                            {item?.workplace}
                          </Typography>
                          <Typography className="detailDr-content__left-information__profile-content">
                            {item?.startYear}-{item?.endYear}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/*  */}
                <div className="detailDr-content__left-information__profile">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="16" cy="16" r="16" fill="#BCDEFF"></circle>
                      <ellipse
                        cx="15.999"
                        cy="24"
                        rx="15.333"
                        ry="0.667"
                        fill="#91CAFF"
                      ></ellipse>
                      <path
                        d="M9.063 8.023c.372.064.715.24.985.504.334.335.523.788.527 1.26v8.71h-2.2C7.615 18.496 7 17.88 7 17.12V9.788C7 8.8 7.8 8 8.788 8l.275.023z"
                        fill="#2D87F3"
                      ></path>
                      <path
                        d="M21.6 8.069H9.04c.375.02.728.185.986.458.348.308.548.75.55 1.215V22.69a1.375 1.375 0 001.327 1.421h10.544a1.467 1.467 0 001.42-1.42V10.2c0-1.215-1.076-2.132-2.268-2.132z"
                        fill="#fff"
                      ></path>
                      <path
                        d="M21.115 14.05h-8.159a.458.458 0 010-.917h8.16a.458.458 0 110 .917zM16.99 11.759h-4.034a.458.458 0 010-.917h4.034a.458.458 0 110 .917z"
                        fill="#2D87F3"
                      ></path>
                      <path
                        d="M21.163 23.79v3.599l-2.108-1.582-2.109 1.582-.046-3.598v-2.315l.046-.115a3.163 3.163 0 004.148.092h.138l-.069 2.338z"
                        fill="#2743AD"
                      ></path>
                      <path
                        d="M19.032 16.09a3.163 3.163 0 11-.003 6.325 3.163 3.163 0 01.003-6.325z"
                        fill="#2D87F3"
                      ></path>
                    </svg>
                    <Typography className="detailDr-content__left-information__profile-title">
                      Certificate
                    </Typography>
                  </div>

                  <div>
                    {doctorDetail?.certificates.map((item, index) => (
                      <div
                        className="detailDr-content__left-information__box"
                        key={index}
                      >
                        <div>
                          <Typography
                            className="detailDr-content__left-information__profile-content"
                            style={{ fontSize: 16, fontWeight: 500 }}
                          >
                            {item?.name}
                          </Typography>
                          <Typography className="detailDr-content__left-information__profile-content">
                            {item?.year}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Review" key="2">
                2nd TAB PANE Content
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className="detailDr-content__right">
          <div className="detailDr-content__right-appointment">
            <Typography className="detailDr-content__right-appointment--titleType">
              Choose the type of appointment
            </Typography>

            <Radio.Group style={{ width: "100%" }}>
              <div className="detailDr-content__right-appointment--box">
                <div className="detailDr-content__right-appointment--box__type">
                  <div className="detailDr-content__right-appointment--box__type-item">
                    <Radio value={1} />
                    <Typography className="detailDr-content__right-appointment--box__type-label">
                      Clinic Visit
                    </Typography>
                  </div>
                  <Typography
                    className="detailDr-content__right-appointment--box__type-label"
                    style={{
                      marginLeft: 25,
                      fontWeight: 500,
                      color: "#185FA0",
                    }}
                  >
                    {doctorDetail?.price}₫
                  </Typography>
                </div>
                <div className="detailDr-content__right-appointment--box__type">
                  <div className="detailDr-content__right-appointment--box__type-item">
                    <Radio value={2} />
                    <Typography className="detailDr-content__right-appointment--box__type-label">
                      Video Consult
                    </Typography>
                  </div>
                  <Typography
                    className="detailDr-content__right-appointment--box__type-label"
                    style={{
                      marginLeft: 25,
                      fontWeight: 500,
                      color: "#185FA0",
                    }}
                  >
                    Free
                  </Typography>
                </div>
              </div>
            </Radio.Group>

            <Typography
              className="detailDr-content__right-appointment--titleType"
              style={{ marginTop: 16, marginBottom: 12 }}
            >
              Choose Time Slot
            </Typography>
            <div style={{ width: 315, marginBottom: 8 }}>
              <div className="slider-container">
                <Slider {...settings}>
                  {schedule.map((item, index) => {
                    const dateArr = item?.date.toString().split(" ");
                    return (
                      <div className="item" key={index}>
                        <CardDay
                          dateOfWeek={dateArr[0]}
                          date={dateArr[2]}
                          month={monthNameToNumber(dateArr[1])}
                          available={item.times.length}
                          item={item}
                          index={index}
                          handleClick={(value, item) =>
                            handleCardClick(value, item)
                          }
                        />
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
            <Tabs size="middle" className="t-tabs-nav-list">
              <TabPane tab="Morning" key="1" className="t-tabs-tab">
                <div className="detailDr-content__right-appointment__time">
                  {countTime(times, "m") > 0 ? (
                    times.map((item, index) => {
                      if (convertTime(item?.endTime) < 13) {
                        return (
                          <CardTime
                            startTime={item?.startTime}
                            endTime={item?.endTime}
                            key={index}
                            hadleClick={(value) => handleTimeClick(value)}
                          />
                        );
                      }
                    })
                  ) : (
                    <NotAvailable />
                  )}
                </div>
              </TabPane>
              <TabPane tab="Afternoon" key="2" className="t-tabs-tab">
                <div className="detailDr-content__right-appointment__time">
                  {countTime(times, "a") > 0 ? (
                    times.map((item, index) => {
                      if (
                        convertTime(item?.startTime) >= 13 &&
                        convertTime(item?.endTime) < 18
                      ) {
                        return (
                          <CardTime
                            startTime={item?.startTime}
                            endTime={item?.endTime}
                            key={index}
                            hadleClick={(value) => handleTimeClick(value)}
                          />
                        );
                      }
                    })
                  ) : (
                    <NotAvailable />
                  )}
                </div>
              </TabPane>
              <TabPane tab="Evening" key="3" className="t-tabs-tab">
                <div className="detailDr-content__right-appointment__time">
                  {countTime(times, "e") > 0 ? (
                    times.map((item, index) => {
                      if (convertTime(item?.startTime) >= 18) {
                        return (
                          <CardTime
                            startTime={item?.startTime}
                            endTime={item?.endTime}
                            key={index}
                            hadleClick={(value) => handleTimeClick(value)}
                          />
                        );
                      }
                    })
                  ) : (
                    <NotAvailable />
                  )}
                </div>
              </TabPane>
            </Tabs>

            <Button
              className="detailDr-content__right-appointment__button"
              onClick={() => navigate("/booking/doctor")}
            >
              Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDoctor;
