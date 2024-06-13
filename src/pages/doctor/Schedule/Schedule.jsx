/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import "./Schedule.scss";

import { useEffect, useMemo, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { useTable } from "react-table";
import {
  Button,
  Checkbox,
  Image,
  Input,
  Modal,
  Radio,
  Select,
  Typography,
  notification,
} from "antd";
import calender from "../../../assets/images/calandar.png";
import personDefault from "../../../assets/images/personDefault.png";
import disappointed from "../../../assets/images/disappointed.png";
import { format, addDays, subDays, isToday } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  compareTime,
  convertToInt,
  formatDate,
  timeSchedule,
  viewBreakTime,
  viewInforSchedule,
  viewInforTimeOff,
  viewInforTimeOffIsFix,
  viewSchedule,
} from "../../../helpers/timeBooking";
import {
  cancelDoctorAppointment,
  createDoctorTimeOff,
  getDoctorCalendar,
} from "../../../stores/doctor/DoctorThunk";
import { openNotificationWithIcon } from "../../../components/notification/CustomNotify";
import { delay, set } from "lodash";
import {
  setError,
  setMessage,
  setStatusCode,
} from "../../../stores/doctor/DoctorSlice";
import logo from "../../../assets/images/logo.png";
import { is } from "date-fns/locale";
const Schedule = () => {
  const { profile, calendar, statusCode, error, message } = useSelector(
    (state) => state.doctor
  );
  const dispatch = useDispatch();

  const handleModal = (item) => {
    setIsOpenAppointment(true);
    setAppointment(item);
  };

  const data = useMemo(() => {
    const times = timeSchedule(
      convertToInt(profile?.workingTimeStart),
      convertToInt(profile?.workingTimeEnd),
      profile?.durationPerAppointment
    );
    return times.map((item, i) => ({
      time: `${item.startTime} - ${item.endTime}`,
      Mon: "",
      Tue: "",
      Wed: "",
      Thu: "",
      Fri: "",
      Sat: "",
      Sun: "",
    }));
  }, [
    profile?.workingTimeStart,
    profile?.workingTimeEnd,
    profile?.durationPerAppointment,
  ]);
  const [today, setToday] = useState(true);
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [appointment, setAppointment] = useState(null);
  const [isOpenAppointment, setIsOpenAppointment] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const handleItemClick = (rowIndex, index) => {
    if (
      viewSchedule(
        calendar.timeOffs,
        calendar.appointments,
        columns[index].date,
        data[rowIndex].time.toString()
      ) === "examination"
    ) {
      return;
    }
    console.log("rowIndex", rowIndex, "index", index);
    if (index === 0) {
      const indexFind = selectedRow.findIndex((item) => item.row === rowIndex);
      if (indexFind === -1) {
        setSelectedRow((prev) => [
          ...prev,
          {
            row: rowIndex,
            index: index,
          },
        ]);
      } else {
        const newSelectedRow = selectedRow.filter(
          (item) => item.row !== rowIndex
        );
        setSelectedRow(newSelectedRow);
      }
    } else {
      const indexFind = selectedItem.findIndex(
        (item) => item.row === rowIndex && item.index === index
      );
      if (indexFind === -1) {
        setSelectedItem((prev) => [
          ...prev,
          {
            row: rowIndex,
            index: index,
          },
        ]);
      } else {
        const newSelectedItem = selectedItem.filter(
          (item) => item.row !== rowIndex && item.index !== index
        );
        setSelectedItem(newSelectedItem);
      }
    }
  };
  const handleCancelAppointment = () => {
    dispatch(
      cancelDoctorAppointment({
        idAppointment: appointment?.idAppointment,
        reason: ressonCancel,
      })
    );

    setAppointment(null);
  };
  useEffect(() => {
    if (statusCode === 200) {
      openNotificationWithIcon("success", api, "", message);
      delay(() => {
        setIsCancel(false);
        setReason("");
        setSelectedItem([]);
        setSelectedRow([]);
        dispatch(getDoctorCalendar());
        dispatch(setStatusCode(null));
        dispatch(setMessage(null));
        //  setIsModalOpen(!isModalOpen);
      }, 1500);
    }
    if (error !== null) {
      openNotificationWithIcon("error", api, "", error);
      setIsCancel(false);
      setReason("");
      setSelectedItem([]);
      setSelectedRow([]);
      dispatch(setError(null));
      //   setIsModalOpen(!isModalOpen);
    }
  }, [statusCode, api, error, dispatch]);

  useEffect(() => {
    dispatch(getDoctorCalendar());
  }, [dispatch]);

  const handlePrevWeek = () => {
    const newDate = subDays(date, 7);
    setDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = addDays(date, 7);
    setDate(newDate);
  };
  const handleAction = () => {
    if (status === "busy") {
      setIsModalOpen(true);
    } else {
      const body = selectedRow.map((item) => {
        return {
          date: columns[item.index].date,
          startTime: data[item.row].time.split(" - ")[0],
          endTime: data[item.row].time.split(" - ")[1],
          status: 2,
          reason: "break time",
          isFixed: false,
        };
      });
      dispatch(createDoctorTimeOff(body));
    }
  };

  const columns = useMemo(() => {
    const startOfCurrentWeek = date;
    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const d = addDays(startOfCurrentWeek, i);
      const dayName = format(d, "EEEE");
      const dayNumber = format(d, "d");
      const newDay = format(d, "yyyy-MM-dd");

      // Tạo Header cho mỗi ngày
      const header = (
        <div className="Schedule-header">
          <span style={{ fontWeight: 400, fontSize: 14 }}>{dayName}</span>
          <span style={{ fontSize: 18 }}>{dayNumber}</span>
        </div>
      );
      daysOfWeek.push({
        Header: header,
        accessor: dayName,
        date: newDay,
      });
    }
    return [
      {
        Header: <FaRegClock size={32} color="#3b82f6" />,
        accessor: "time", // accessor is the "key" in the data
      },
      ...daysOfWeek,
    ];
  }, [date]);
  useEffect(() => {
    const isCurrentDate = isToday(date);
    setToday(isCurrentDate);
  }, [date]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [ressonCancel, setReasonCancel] = useState("");

  const handleOk = () => {
    const body = selectedItem.map((item) => {
      return {
        date: columns[item.index].date,
        startTime: data[item.row].time.split(" - ")[0],
        endTime: data[item.row].time.split(" - ")[1],
        status: 1,
        reason: reason,
        isFixed: isFixed,
      };
    });
    dispatch(createDoctorTimeOff(body));
    setReason("");
    setIsModalOpen(false);
    setIsFixed(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setReason("");
    setIsFixed(false);
  };
  const doctorLocal = JSON.parse(localStorage.getItem("doctor"));

  const handleToday = () => {
    const today = new Date();
    setDate(today);
  };
  return (
    <div className="Schedule-main">
      {/* <span className="Schedule-title">Doctor Calendar</span> */}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: reason === "",
        }}
        cancelButtonProps={{
          disabled: reason === "",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontSize: 20,
          }}
          className="Schedule-title"
        >
          Add Reason
        </div>
        <Input value={reason} onChange={(e) => setReason(e.target.value)} />
        <Checkbox
          checked={isFixed}
          onChange={() => setIsFixed(!isFixed)}
          style={{ marginTop: 20 }}
        >
          For every week
        </Checkbox>
      </Modal>
      <Modal
        open={isOpenAppointment}
        onCancel={() => setIsOpenAppointment(false)}
        className="modal"
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div style={{ marginTop: 40, minWidth: 550 }}>
          <div style={{ marginTop: 20 }}>
            <Typography
              className="appointment-font"
              style={{ fontSize: 16, fontWeight: 500, color: "#6c81a0" }}
            >
              Information
            </Typography>
            <div className="appointment-right__box">
              <div
                className="successBooking-service"
                style={{ marginBottom: 20 }}
              >
                <Image
                  src={""}
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
                    {"Ngueyn Van A"}
                  </Typography>
                  <Typography
                    className="appointment-font"
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: "#6c81a0",
                    }}
                  >
                    {appointment?.namePatient}
                  </Typography>
                </div>
              </div>
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
            </div>
          </div>
          {appointment?.status === 1 && (
            <div className="appointmentDetail-right__buttonView" style={{}}>
              <Button
                className="appointmentDetail-right__button"
                onClick={() => {
                  setIsCancel(true);
                  setIsOpenAppointment(false);
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </Modal>
      <Modal
        title="Cancel appointment"
        open={isCancel}
        onOk={handleCancelAppointment}
        onCancel={() => setIsCancel(false)}
        okButtonProps={{
          disabled: ressonCancel.length === 0,
        }}
      >
        <div className="myAppointment-cancel">
          <Image src={disappointed} preview={false} width={90} />
          <div className="myAppointment-cancel__content">
            <span className="myAppointment-cancel__content-text">
              We're sorry!
            </span>
            <span
              className="myAppointment-cancel__content-text"
              style={{ fontSize: 14, fontWeight: 400 }}
            >
              Please help us understand more about the reason behind canceling
              your appointment so we can improve our service in the future.
            </span>
          </div>
          <div
            className="myAppointment-cancel__content"
            style={{ marginTop: 12 }}
          >
            <span
              className="myAppointment-cancel__content-text"
              style={{ fontSize: 14, fontWeight: 500 }}
            >
              Reason
            </span>
            <Input onChange={(e) => setReasonCancel(e.target.value)} />
          </div>
        </div>
      </Modal>
      {doctorLocal?.workingTimeEnd &&
      doctorLocal?.workingTimeStart &&
      doctorLocal?.durationPerAppointment ? (
        <>
          <span className="Schedule-title">Doctor Calendar</span>
          <div className="Schedule-content">
            {contextHolder}
            <div className="Schedule-content__left">
              <div className="Schedule-content__left-action">
                <Select
                  placeholder="--Select--"
                  style={{
                    width: "100%",
                    height: 40,
                  }}
                  options={[
                    {
                      value: "busy",
                      label: "Busy",
                    },
                    {
                      value: "break",
                      label: "Break time",
                    },
                  ]}
                  onChange={(value) => setStatus(value)}
                />
                <Button
                  className="Schedule-content__left-button"
                  disabled={status === ""}
                  onClick={() => handleAction()}
                >
                  Action
                </Button>
              </div>
              <div
                style={{
                  width: "100%",
                  gap: 20,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="Schedule-status">
                  <div
                    className="Schedule-status-color"
                    style={{ backgroundColor: "#fff" }}
                  ></div>
                  <span className="Schedule-status-text">Available</span>
                </div>
                <div className="Schedule-status">
                  <div className="Schedule-status-color"></div>
                  <span className="Schedule-status-text">
                    Examination Schedule
                  </span>
                </div>
                <div className="Schedule-status">
                  <div
                    className="Schedule-status-color"
                    style={{ backgroundColor: "#FFA996" }}
                  ></div>
                  <span className="Schedule-status-text">Break time</span>
                </div>
                <div className="Schedule-status">
                  <div
                    className="Schedule-status-color"
                    style={{ backgroundColor: "#A5ADF3" }}
                  ></div>
                  <span className="Schedule-status-text">Busy</span>
                </div>
              </div>
            </div>
            <div style={{ flex: 8 }}>
              <div className="Schedule-date">
                <span
                  className="Schedule-title"
                  style={{ color: "#344858", fontSize: 28, marginBottom: 10 }}
                >
                  {format(date, "MMMM")}{" "}
                  <span style={{ color: "#344858", fontWeight: 400 }}>
                    {format(date, "d")} -{" "}
                    <span
                      className="Schedule-title"
                      style={{
                        color: "#344858",
                        fontSize: 28,
                        marginBottom: 10,
                      }}
                    >
                      {format(addDays(date, 6), "MMMM")}{" "}
                    </span>
                    {format(addDays(date, 6), "d")},
                  </span>{" "}
                  <span
                    style={{ color: "#344858", fontSize: 28, fontWeight: 400 }}
                  >
                    {format(date, "yyyy")}
                  </span>
                </span>
                <span className="Schedule-buttonDate">
                  <span
                    className={`Schedule-today ${
                      !today ? "Schedule-today-noToday" : ""
                    }`}
                    onClick={handleToday}
                  >
                    Today
                  </span>
                  {
                    <div
                      className={`Schedule-prev ${
                        today ? "Schedule-prev__disable" : ""
                      }`}
                      onClick={handlePrevWeek}
                    >
                      <CaretLeftOutlined className="Schedule-buttonDate__icon" />
                    </div>
                  }
                  <div className="Schedule-next" onClick={handleNextWeek}>
                    <CaretRightOutlined className="Schedule-buttonDate__icon" />
                  </div>
                </span>
              </div>
              <table
                {...getTableProps()}
                style={{
                  borderRadius: "10px",
                  width: "100%",
                  margin: "0 auto",
                  borderSpacing: 0,
                  backgroundColor: "#fff",
                }}
                className="Schedule"
              >
                <thead>
                  {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                      {headerGroup.headers.map((column, index) => (
                        <th
                          {...column.getHeaderProps()}
                          key={index}
                          className={`Schedule-header__text ${
                            index === 0 ? "border-first" : ""
                          }  ${index === 7 ? "border-second" : ""}`}
                        >
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} key={index}>
                        {row.cells.map((cell, index) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              key={index}
                              onClick={() => handleItemClick(row.index, index)}
                              className={`
                    ${
                      selectedRow.some((item) => item.row === row.index) &&
                      index !== 0
                        ? "selected"
                        : ""
                    }

                        ${
                          selectedItem.some(
                            (item) =>
                              item.row === row.index && item.index === index
                          )
                            ? "selectedItem"
                            : ""
                        }
                         ${
                           row.index === row.cells.length + 1 && index === 0
                             ? "border-third"
                             : ""
                         }
                          ${
                            row.index === row.cells.length + 1 && index === 7
                              ? "border-fourth"
                              : ""
                          }
                          ${viewSchedule(
                            calendar.timeOffs,
                            calendar.appointments,
                            columns[index].date,
                            data[row.index].time.toString()
                          )}

                          ${
                            index !== 0 &&
                            viewBreakTime(
                              calendar.timeOffs,
                              data[row.index].time.toString()
                            )
                          }
                        ${
                          index === 1 &&
                          compareTime(data[row.index].time.toString())
                            ? "disableItem"
                            : ""
                        }

                         ${
                           viewInforTimeOffIsFix(
                             calendar.timeOffs,
                             columns[index],
                             data[row.index].time.toString()
                           )?.status
                         }
                          
                    `}
                            >
                              {cell.render("Cell")}
                              <label
                                style={{
                                  fontSize: 12,
                                  fontWeight: 500,
                                  cursor: "pointer",
                                }}
                                onClick={(e) =>
                                  handleModal(
                                    viewInforSchedule(
                                      calendar.appointments,
                                      columns[index].date,
                                      data[row.index].time.toString()
                                    )
                                  )
                                }
                              >
                                {
                                  viewInforSchedule(
                                    calendar.appointments,
                                    columns[index].date,
                                    data[row.index].time.toString()
                                  )?.namePatient
                                }
                              </label>
                              {index !== 0 &&
                                viewSchedule(
                                  calendar.timeOffs,
                                  calendar.appointments,
                                  columns[index].date,
                                  data[row.index].time.toString()
                                ) === "busy" &&
                                viewInforTimeOff(
                                  calendar.timeOffs,
                                  columns[index].date,
                                  data[row.index].time.toString()
                                )}
                              {
                                viewInforTimeOffIsFix(
                                  calendar.timeOffs,
                                  columns[index],
                                  data[row.index].time.toString()
                                )?.item
                              }
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginTop: 40,
          }}
        >
          <Image src={logo} width={200} />
          <span className="Schedule-title" style={{ marginBottom: 0 }}>
            Welcome to Enclinic
          </span>
          <span className="Schedule-title" style={{ fontSize: 25 }}>
            Please update your schedule work to use this feature
          </span>
        </div>
      )}
    </div>
  );
};

export default Schedule;
