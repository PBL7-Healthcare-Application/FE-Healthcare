/* eslint-disable no-unused-vars */
import { DeleteTwoTone, EditOutlined, SearchOutlined } from "@ant-design/icons";
import "./Examination.scss";
import {
  Button,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Table,
  Tabs,
  Tag,
  Typography,
  notification,
} from "antd";
import person from "../../../assets/images/personDefault.png";
import CardExamination from "./CardExamination";
import height from "../../../assets/images/height.png";
import scale from "../../../assets/images/scale.png";
import temperatures from "../../../assets/images/temperatures.png";
import TextArea from "antd/es/input/TextArea";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelDoctorAppointment,
  changeAppointmentForPatient,
  doctorCreateMedical,
  doctorGetUserMedical,
  doctorGetlistMedical,
  doctorReschedule,
} from "../../../stores/doctor/DoctorThunk";
import { debounce } from "lodash";
import CardDay from "../../../components/Doctor/cardDay/CardDay";
import {
  convertTime,
  convertToInt,
  countTime,
  renderTimeForDoctor,
} from "../../../helpers/timeBooking";
import moment from "moment";
import TabPane from "antd/es/tabs/TabPane";
import Slider from "react-slick";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardTime from "../../../components/Doctor/cardTime/CardTime";
import NotAvailable from "../../../components/Doctor/notAvailable/NotAvailable";
import { getDoctorDetail } from "../../../stores/search-doctor/SearchThunk";
import NotFound from "../../../components/cardAppointment/NotFound";
import {
  setIsSelected,
  setIsTimeSelected,
} from "../../../stores/search-doctor/SearchSlice";
import { useForm } from "antd/es/form/Form";
import { openNotificationWithIcon } from "../../../components/notification/CustomNotify";
import { setError, setStatusCode } from "../../../stores/doctor/DoctorSlice";
import { setMessage } from "../../../stores/admin/AdminSlice";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuLoader } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import { cancelAppointment } from "../../../api/doctor.api";
import { FaPen } from "react-icons/fa";
import dayjs from "dayjs";

const Examination = () => {
  const [api, contextHolder] = notification.useNotification();
  const { schedule, doctorDetail } = useSelector((state) => state.search);
  const location = useLocation();
  const [isList, setIsList] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [form] = useForm();
  const [isDelete, setIsDelete] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  //=======rescheduled================================
  const [times, setTimes] = useState([]);
  const [chooseTime, setChooseTime] = useState(null);
  const [cancelArr, setCancelArr] = useState([]);
  const [chooseDate, setChooseDate] = useState(null);
  const [isChange, setIsChange] = useState(false);
  const [patientRecord, setPatientRecord] = useState({
    startTime: "",
    endTime: "",
    date: "",
    idAppointment: "",
  });
  const {
    listMedical,
    profile,
    userMedical,
    loading,
    statusCode,
    error,
    message,
  } = useSelector((state) => state.doctor);

  const contentRef = useRef(null);
  useEffect(() => {
    if (location.state) {
      setIsList(true);
      dispatch(doctorGetUserMedical(location?.state?.idUser));
    } else {
      setIsList(false);
      dispatch(doctorGetlistMedical());
    }
  }, [location.state]);
  const disabledDate = (current) => {
    // Không cho phép chọn các ngày trước ngày hôm nay
    return current && current < moment().startOf("day");
  };
  // =========================== reschedule

  const handleTimeClick = (time) => {
    setChooseTime(time);
    dispatch(setIsTimeSelected(time));
  };
  useEffect(() => {
    dispatch(setIsTimeSelected(null));
    setTimes(schedule[0]?.times);
    setChooseDate(schedule[0]?.date);
  }, [schedule, dispatch]);

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
    {
      title: "Action",
      key: "function",
      dataIndex: "function",
      align: "center",
      className: "function-box",
      width: "20%",
      onCell: () => {
        return {
          onClick: (e) => {
            e.stopPropagation();
          },
        };
      },
      render: (text, record) => (
        <>
          <Space>
            <span
              style={{
                fontSize: 14,
                color: "rgb(51, 114, 254)",
                cursor: "pointer",
              }}
              onClick={() => {
                setIsChange(true);
                setPatientRecord({
                  startTime: record?.startTime,
                  endTime: record?.endTime,
                  date: record?.date,
                  idAppointment: record?.idAppointment,
                });
              }}
            >
              Reschedule
            </span>
          </Space>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getDoctorDetail(profile?.idDoctor));
  }, [dispatch, profile]);

  // =============================
  const handleChangeInput = (e) => {
    const newValue = e.target.value;
    setSearch(newValue);
    debounceInputKey(newValue);
  };
  const debounceInputKey = useRef(
    debounce((nextValue) => {
      dispatch(doctorGetlistMedical(nextValue));
    }, 500)
  ).current;
  const handleClick = () => {
    dispatch(doctorGetlistMedical(search !== "" ? search : undefined));
  };
  const handlePicker = (date, dateString) => {
    setChooseDate(dateString);
    setPatientRecord((pre) => ({
      ...pre,
      date: dateString,
    }));
    const timeOff = doctorDetail?.timeOffs.filter((item) => item.status !== 2);
    const timeBreak = doctorDetail?.timeOffs.filter(
      (item) => item.status !== 1
    );
    const time = renderTimeForDoctor(
      convertToInt(doctorDetail?.workingTimeStart),
      convertToInt(doctorDetail?.workingTimeEnd),
      doctorDetail?.durationPerAppointment,
      timeOff,
      timeBreak,
      doctorDetail?.slotAppointments,
      dateString
    );

    setTimes([...time]);
  };
  const handleBooking = () => {
    dispatch(
      doctorReschedule({
        idDoctor: profile?.idDoctor,
        idUser: user?.idUser,
        idAppointment: user?.idAppointment,
        date: chooseDate,
        startTime: chooseTime?.startTime,
        endTime: chooseTime?.endTime,
        issue: "Book an appointment for the reassessment",
        type: true,
        price: profile?.price,
        address: profile?.address,
        nameClinic: profile?.nameClinic,
      })
    );
  };

  const handleCreateMedical = (values) => {
    dispatch(
      doctorCreateMedical({
        idDoctor: profile?.idDoctor,
        idUser: user?.idUser,
        idAppointment: user?.idAppointment,
        height: values.height,
        weight: values.weight,
        temperature: values.temperature,
        content: values.disease,
        date: new Date(),
      })
    );
    // setIsList(false)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 // setIsList(false);
  };

  useEffect(() => {

    if (statusCode === 200) {
      openNotificationWithIcon("success", api, "", message);
      dispatch(setStatusCode(null));
      dispatch(setMessage(null));
      dispatch(doctorGetlistMedical());
      setIsCreate(false);
      setUser(null);
      setIsChange(false);
      setPatientRecord({
        startTime: "",
        endTime: "",
        date: "",
        idAppointment: "",
      });
      // setIsList(false);
      form.setFieldsValue({
        height: "",
        weight: "",
        temperature: "",
        disease: "",
      });
      setChooseTime(null);
      setChooseDate(null);
      setIsScheduled(false);
      if (message === "Add Medical record successfully!") {
        setIsList(false);
        // dispatch(doctorGetUserMedical(user?.idUser));

      }
    }
    if (statusCode === 300) {
      openNotificationWithIcon("success", api, "", message);
      dispatch(setStatusCode(null));
      dispatch(setMessage(null));
      setIsScheduled(false);
    }
    if (error !== null) {
      openNotificationWithIcon("error", api, "", error);
      dispatch(setError(null));
      setIsCreate(false);
      setUser(null);
      setChooseTime(null);
      setChooseDate(null);
      setIsScheduled(false);
      setIsChange(false);
      setPatientRecord({
        startTime: "",
        endTime: "",
        date: "",
        idAppointment: "",
      });
    }
  }, [statusCode, dispatch, api, error]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows.length > 0) {
        setIsDelete(true);
        setCancelArr(selectedRows);
      } else {
        setIsDelete(false);
      }
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const handleCancel = () => {
    try {
      cancelArr.map((item) => {
        dispatch(
          cancelDoctorAppointment({
            idAppointment: item?.idAppointment,
            reason: "The patient didn't come",
          })
        );
      });
      setCancelArr([]);
      setIsDelete(false);
      setIsCancel(false);
    } catch (error) {
      openNotificationWithIcon("error", api, "", "Cancel Appointments Error");
    }
  };
  return (
    <div className="exam">
      <Modal
        open={isScheduled}
        onCancel={() => {
          setIsScheduled(false);
        }}
        okButtonProps={{
          style: { display: "none" },
        }}
        cancelButtonProps={{
          style: { display: "none" },
        }}
        width={400}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="detailDr-content__right-appointment"
          style={{ width: 300, marginTop: 30 }}
        >
          <Typography
            className="detailDr-content__right-appointment--titleType"
            style={{ marginTop: 16, marginBottom: 12 }}
          >
            Availability
          </Typography>
          <DatePicker
            style={{ width: "100%", height: 40, marginBottom: 10 }}
            disabledDate={disabledDate}
            onChange={handlePicker}
          />
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
                      convertTime(item?.endTime) <= 18
                    ) {
                      return (
                        <CardTime
                          isBooking={item?.isBooking}
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
                    console.log(item);
                    if (convertTime(item?.startTime) >= 18) {
                      return (
                        <CardTime
                          isBooking={item?.isBooking}
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
            onClick={() => handleBooking()}
            disabled={!chooseTime}
            loading={loading}
          >
            Book
          </Button>
        </div>
      </Modal>
      <Modal
        open={isCancel}
        onCancel={() => setIsCancel(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="modalDelete">
          <span
            className="setting-font"
            style={{ color: "#404040", fontSize: 18, fontWeight: 500 }}
          >
            Are you sure you want to cancel appointments?
          </span>
          <div className="modalDelete-btn">
            <Button className="modalDelete-btn__Delete" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={isChange}
        onCancel={() => {
          setIsChange(false);
        }}
        okButtonProps={{
          style: { display: "none" },
        }}
        cancelButtonProps={{
          style: { display: "none" },
        }}
        width={400}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="detailDr-content__right-appointment"
          style={{ width: 300, marginTop: 30 }}
        >
          <Typography
            className="detailDr-content__right-appointment--titleType"
            style={{ marginTop: 16, marginBottom: 12 }}
          >
            Availability
          </Typography>
          <DatePicker
            style={{ width: "100%", height: 40, marginBottom: 10 }}
            disabledDate={disabledDate}
            onChange={handlePicker}
            value={dayjs(patientRecord.date)}
          />
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
                          hadleClick={(value) => {
                            setPatientRecord((pre) => ({
                              ...pre,
                              startTime: value.startTime,
                              endTime: value.endTime,
                            }));
                            dispatch(setIsTimeSelected(value));
                          }}
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
                          hadleClick={(value) => {
                            setPatientRecord((pre) => ({
                              ...pre,
                              startTime: value.startTime,
                              endTime: value.endTime,
                            }));
                            dispatch(setIsTimeSelected(value));
                          }}
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
                          hadleClick={(value) => {
                            setPatientRecord((pre) => ({
                              ...pre,
                              startTime: value.startTime,
                              endTime: value.endTime,
                            }));
                            dispatch(setIsTimeSelected(value));
                          }}
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
            onClick={() => dispatch(changeAppointmentForPatient(patientRecord))}
            loading={loading}
          >
            Reschedule
          </Button>
        </div>
      </Modal>
      <div className="exam_left">
        <div className="exam_left-search" style={{ flexDirection: "row" }}>
          <div
            className="search-box-content__third"
            style={{
              width: "80%",
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
            <Button
              className="Schedule-content__left-button"
              style={{ height: 43 }}
              onClick={handleClick}
            >
              Search
            </Button>
          </div>
          {isDelete && (
            <Button
              className="Schedule-content__left-button"
              style={{
                height: 43,
                backgroundColor: "#fff",
                color: "#ef4444",
                border: "1px solid #ef4444",
              }}
              onClick={() => setIsCancel(true)}
            >
              Cancel
            </Button>
          )}
        </div>
        <div className="exam_left-content exam_left-search">
          {!isList ? (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  className="exam_left-content__text"
                  style={{ color: "#185FA0" }}
                >
                  Appointments
                </Typography>
              </div>
              <Table
                rowSelection={{
                  type: "checkbox",
                  ...rowSelection,
                }}
                pagination={false}
                columns={columns}
                dataSource={listMedical.map((item, index) => ({
                  idAppointment: item?.idAppointment,
                  idUser: item?.idUser,
                  name: item.namePatient,
                  phone: item.phoneNumber,
                  date: item.date.split("T")[0],
                  time: `${item.startTime} - ${item.endTime}`,
                  key: item?.idAppointment,
                }))}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      setIsList(true);
                      setUser({
                        idAppointment: record?.idAppointment,
                        idUser: record?.idUser,
                      });
                      dispatch(doctorGetUserMedical(record?.idUser));
                    },
                  };
                }}
              />
            </>
          ) : (
            <>
              <div className="exam_left-content__infor">
                <Image
                  fallback={person}
                  width={110}
                  style={{ borderRadius: "50%" }}
                  preview={false}
                  src={userMedical?.infoUser?.avatarUser}
                />
                <div className="exam_left-content__textArea">
                  <span className="exam_left-content__text">
                    {userMedical?.infoUser?.nameUser}
                  </span>
                  <span
                    className="exam_left-content__text"
                    style={{ fontSize: 18, fontWeight: 400 }}
                  >
                    {userMedical?.infoUser?.phoneNumberUser}
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
                    {userMedical?.medicalRecordHistory?.length > 0 ? (
                      userMedical?.medicalRecordHistory?.map((item, index) => (
                        <CardExamination key={index} item={item} />
                      ))
                    ) : (
                      <NotFound content="The patient don't have any medical history" />
                    )}
                  </div>
                </div>
              </div>
              <div className="exam_left-history__button">
                <Button
                  className="Schedule-content__left-button"
                  style={{ width: "120px" }}
                  onClick={() => setIsScheduled(true)}
                >
                  Re-examine
                </Button>
                {!isCreate && (
                  <Button
                    className="Schedule-content__left-button"
                    style={{ width: "120px" }}
                    onClick={() => {
                      setUser((prev) => {
                        return {
                          ...prev,
                          ...userMedical?.infoUser,
                        };
                      });
                      setIsCreate(true);
                    }}
                  >
                    Add New
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="exam_right">
        <div className="exam_left-content__infor">
          <Image
            fallback={person}
            width={110}
            style={{ borderRadius: "50%" }}
            preview={false}
            src={user?.avatarUser}
          />
          <div className="exam_left-content__textArea">
            <span className="exam_left-content__text">{user?.nameUser}</span>
            <span
              className="exam_left-content__text"
              style={{ fontSize: 18, fontWeight: 400 }}
            >
              {user?.phoneNumberUser}
            </span>
          </div>
        </div>
        <Divider />
        <Form
          style={{ marginTop: 20 }}
          form={form}
          onFinish={handleCreateMedical}
        >
          {contextHolder}
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
              <div style={{ flex: 1 }}>
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
                <Form.Item
                  name="height"
                  style={{ flex: 1 }}
                  rules={[
                    {
                      required: true,
                      message: "Please input height!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>

              <div style={{ flex: 1 }}>
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
                <Form.Item
                  name="weight"
                  rules={[
                    {
                      required: true,
                      message: "Please input Weight!",
                    },
                  ]}
                  style={{ flex: 1 }}
                >
                  <Input />
                </Form.Item>
              </div>

              <div style={{ flex: 1 }}>
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
                <Form.Item
                  name="temperature"
                  style={{ flex: 1 }}
                  rules={[
                    {
                      required: true,
                      message: "Please input Temperature!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="exam_right-vital" style={{ marginTop: 30 }}>
            <span
              className="exam_left-content__text"
              style={{ fontSize: 18, fontWeight: 500 }}
            >
              Diseases
            </span>
            <Form.Item
              style={{ marginTop: 20 }}
              name="disease"
              rules={[
                {
                  required: true,
                  message: "Please input Diseases!",
                },
              ]}
            >
              <TextArea
                style={{ height: 200, fontSize: 16 }}
                placeholder="Enter patient's diseases ..."
              />
            </Form.Item>
          </div>
          <div
            style={{
              width: "100%",
              marginTop: 20,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              htmlType="submit"
              className="Schedule-content__left-button"
              style={{ width: "120px" }}
              disabled={!isCreate}
              loading={loading}
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
