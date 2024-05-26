import { SearchOutlined } from "@ant-design/icons";
import "./Examination.scss";
import { Button, Divider, Form, Image, Input, Modal, Slider, Table, Tabs, Typography } from "antd";
import person from "../../../assets/images/personDefault.png";
import CardExamination from "./CardExamination";
import height from "../../../assets/images/height.png";
import scale from "../../../assets/images/scale.png";
import temperatures from "../../../assets/images/temperatures.png";
import TextArea from "antd/es/input/TextArea";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doctorGetlistMedical } from "../../../stores/doctor/DoctorThunk";
import { debounce } from "lodash";
import CardDay from "../../../components/Doctor/cardDay/CardDay";
import { convertTime, countTime, monthNameToNumber } from "../../../helpers/timeBooking";
import TabPane from "antd/es/tabs/TabPane";
import CardTime from "../../../components/Doctor/cardTime/CardTime";
import NotAvailable from "../../../components/Doctor/notAvailable/NotAvailable";
import { getDoctorDetail } from "../../../stores/search-doctor/SearchThunk";
const Examination = () => {
  const { schedule } = useSelector((state) => state.search);
  const location = useLocation();
  const [isList, setIsList] = useState(false);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const [times, setTimes] = useState(schedule[0]?.times);
  const { listMedical, profile } = useSelector((state) => state.doctor);

  const contentRef = useRef(null);
  useEffect(() => {
    console.log(`test`, location.state);
    if (location.state) {
      setIsList(true)
    }
    else {
      setIsList(false)
      dispatch(doctorGetlistMedical())
    }
  }, [location.state]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
    },

    {
      title: "Phone",
      dataIndex: "phone",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      align: "center",
    },
    {
      title: "Time",
      dataIndex: "time",
      align: "center",
    },
  ];
  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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

  useEffect(() => {
    dispatch(getDoctorDetail(profile?.idDoctor))
  }, [])
  const handleChangeInput = (e) => {
    const newValue = e.target.value;
    setSearch(newValue);
    debounceInputKey(
      newValue,

    );
  };
  const debounceInputKey = useRef(
    debounce((nextValue) => {
      dispatch(
        doctorGetlistMedical(nextValue)
      );
    }, 500)
  ).current;
  const handleClick = () => {
    dispatch(
      doctorGetlistMedical(
        search !== "" ? search : undefined,
      )
    );
  }

  return (
    <div className="exam">
      <Modal open={true}>
        <div className="detailDr-content__right">
          <div className="detailDr-content__right-appointment">
            <Typography className="detailDr-content__right-appointment--titleType">
              Type of appointment
            </Typography>



            <Typography
              className="detailDr-content__right-appointment--titleType"
              style={{ marginTop: 16, marginBottom: 12 }}
            >
              Availability
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
                          available={item?.count ? item.times.length - item?.count : item.times.length}
                          item={item}
                          index={index}
                        // handleClick={(value, item) =>
                        //   handleCardClick(value, item)
                        // }
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
                      if (convertTime(item?.endTime) <= 13) {
                        return (
                          <CardTime
                            isBooking={item?.isBooking}
                            startTime={item?.startTime}
                            endTime={item?.endTime}
                            key={index}
                          // hadleClick={(value) => handleTimeClick(value)}
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
                        convertTime(item?.endTime) <= 18
                      ) {
                        return (
                          <CardTime
                            isBooking={item?.isBooking}
                            startTime={item?.startTime}
                            endTime={item?.endTime}
                            key={index}
                          // hadleClick={(value) => handleTimeClick(value)}
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
                      console.log(item);
                      if (convertTime(item?.startTime) >= 18) {

                        return (
                          <CardTime
                            isBooking={item?.isBooking}
                            startTime={item?.startTime}
                            endTime={item?.endTime}
                            key={index}
                          // hadleClick={(value) => handleTimeClick(value)}
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

            {/* <Button
              className="detailDr-content__right-appointment__button"
              onClick={() => handleBooking()}
              disabled={!chooseTime}
            >
              Book
            </Button> */}
          </div>
        </div>
      </Modal>
      <div className="exam_left">
        <div className="exam_left-search">
          <div
            className="search-box-content__third"
            style={{
              width: 500,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginTop: 0,
            }}
          >
            <SearchOutlined className="search-box-content_icon" />
            <Input
              type="text"
              className="search__input-text"
              placeholder="Search for a patient..."
              style={{ border: "1px solid #a1a1aa", fontSize: 13 }}
              onChange={handleChangeInput}
              ref={contentRef}
            />
            <Button className="Schedule-content__left-button" style={{ height: 43 }} onClick={handleClick}>Search</Button>
          </div>
        </div>
        <div className="exam_left-content exam_left-search">
          {
            !isList ? (
              <>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} ><Typography className="exam_left-content__text" style={{ color: '#185FA0' }}>Appointments</Typography></div>
                <Table pagination={false} columns={columns} dataSource={listMedical.map((item, index) => ({
                  idUser: item?.idUser,
                  name: item.namePatient,
                  phone: item.phoneNumber,
                  date: item.date.split("T")[0],
                  time: `${item.startTime} - ${item.endTime}`,
                }))} />
              </>
            ) : (
              <>
                <div className="exam_left-content__infor">
                  <Image
                    fallback={person}
                    width={110}
                    style={{ borderRadius: "50%" }}
                    preview={false}
                  />
                  <div className="exam_left-content__textArea">
                    <span className="exam_left-content__text">Bui Van Huy</span>
                    <span
                      className="exam_left-content__text"
                      style={{ fontSize: 18, fontWeight: 400 }}
                    >
                      0935350632
                    </span>
                  </div>
                </div>
                <div className="exam_left-history">
                  <span
                    className="exam_left-content__text"
                    style={{ fontSize: 20, fontWeight: 500 }}
                  >
                    Medical History
                  </span>
                  <div className="exam_left-history__content">
                    <div className="exam_left-history__box">
                      <CardExamination />
                      <CardExamination />
                      <CardExamination />
                    </div>
                  </div>
                </div>
                <div className="exam_left-history__button">
                  <Button
                    className="Schedule-content__left-button"
                    style={{ width: "120px" }}
                  >
                    Reschedule
                  </Button>
                  <Button className="Schedule-content__left-button" style={{ width: "120px" }}>Add New</Button>
                </div>
              </>
            )
          }
        </div>
      </div>
      <div className="exam_right">
        <div className="exam_left-content__infor">
          <Image
            fallback={person}
            width={110}
            style={{ borderRadius: "50%" }}
            preview={false}
          />
          <div className="exam_left-content__textArea">
            <span className="exam_left-content__text">Bui Van Huy</span>
            <span
              className="exam_left-content__text"
              style={{ fontSize: 18, fontWeight: 400 }}
            >
              0935350632
            </span>
          </div>
        </div>
        <Divider />
        <Form style={{ marginTop: 20 }}>
          <div className="exam_right-vital">
            <span
              className="exam_left-content__text"
              style={{ fontSize: 18, fontWeight: 500 }}
            >
              Vitals
            </span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: 20,
                marginTop: 20,
              }}
            >
              <Form.Item style={{ flex: 1 }}>
                <div className="exam_right-vital__label">
                  <Image
                    src={height}
                    width={24}
                    className="appointment-right__content-icon"
                    preview={false}
                  />
                  <span
                    className="exam_left-content__text"
                    style={{ fontSize: 13, marginTop: 4 }}
                  >
                    Height (cm)
                  </span>
                </div>
                <Input />
              </Form.Item>
              <Form.Item style={{ flex: 1 }}>
                <div className="exam_right-vital__label">
                  <Image
                    src={scale}
                    width={24}
                    className="appointment-right__content-icon"
                    preview={false}
                  />
                  <span
                    className="exam_left-content__text"
                    style={{ fontSize: 13, marginTop: 4 }}
                  >
                    Weight (kg)
                  </span>
                </div>
                <Input />
              </Form.Item>
              <Form.Item style={{ flex: 1 }}>
                <div className="exam_right-vital__label">
                  <Image
                    src={temperatures}
                    width={24}
                    className="appointment-right__content-icon"
                    preview={false}
                  />
                  <span
                    className="exam_left-content__text"
                    style={{ fontSize: 13, marginTop: 4 }}
                  >
                    Temperatures (°C)
                  </span>
                </div>
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="exam_right-vital" style={{ marginTop: 30 }}>
            <span
              className="exam_left-content__text"
              style={{ fontSize: 18, fontWeight: 500 }}
            >
              Diseases
            </span>
            <Form.Item style={{ marginTop: 20 }}>
              <TextArea
                style={{ height: 200, fontSize: 16 }}
                placeholder="Enter patient's diseases ..."
              />
            </Form.Item>
          </div>
          <div
            style={{
              width: "100%",
              marginTop: 40,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              className="Schedule-content__left-button"
              style={{ width: "120px" }}
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Examination;
