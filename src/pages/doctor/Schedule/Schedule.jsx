/* eslint-disable no-unused-vars */
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import "./Schedule.scss";

import { useEffect, useMemo, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { useTable } from "react-table";
import { Button, Input, Modal, Select, notification } from "antd";

import {
  format,
  addDays,
  startOfWeek,
  addWeeks,
  subWeeks,
  endOfWeek,
} from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  convertToInt,
  timeSchedule,
  viewBreakTime,
  viewInforSchedule,
  viewInforTimeOff,
  viewSchedule,
} from "../../../helpers/timeBooking";
import { se } from "date-fns/locale";
import { createDoctorTimeOff, getDoctorCalendar } from "../../../stores/doctor/DoctorThunk";
import { openNotificationWithIcon } from "../../../components/notification/CustomNotify";
import { delay, set } from "lodash";
import { setError, setStatusCode } from "../../../stores/doctor/DoctorSlice";

const Schedule = () => {
  const { profile, calendar, statusCode, error } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();


  const data = useMemo(
    () => {
      const times = timeSchedule(convertToInt(profile.workingTimeStart), convertToInt(profile.workingTimeEnd), profile.durationPerAppointment);
      return times.map((item, i) => (
        {
          time: `${item.startTime} - ${item.endTime}`,
          Mon: "",
          Tue: "",
          Wed: "",
          Thu: "",
          Fri: "",
          Sat: "",
          Sun: "",
        }
      ))
    },
    [profile.workingTimeStart, profile.workingTimeEnd, profile.durationPerAppointment]
  );

  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const handleItemClick = (rowIndex, index) => {
    if (index === 0) {
      const indexFind = selectedRow.findIndex(item => item.row === rowIndex);
      if (indexFind === -1) {
        setSelectedRow((prev) => [
          ...prev,
          {
            row: rowIndex,
            index: index,
          },
        ]);
      }
      else {
        const newSelectedRow = selectedRow.filter(item => item.row !== rowIndex);
        setSelectedRow(newSelectedRow);
      }

    } else {
      const indexFind = selectedItem.findIndex(item => item.row === rowIndex && item.index === index);
      if (indexFind === -1) {
        setSelectedItem((prev) => [
          ...prev,
          {
            row: rowIndex,
            index: index,
          },
        ]);
      }
      else {
        const newSelectedItem = selectedItem.filter(item => item.row !== rowIndex && item.index !== index);
        setSelectedItem(newSelectedItem);
      }

    }
  };
  useEffect(() => {
    if (statusCode === 200) {
      openNotificationWithIcon(
        "success",
        api,
        "",
        "Create time off successfully!"
      );
      delay(() => {
        setSelectedItem([]);
        setSelectedRow([]);
        dispatch(getDoctorCalendar());
        dispatch(setStatusCode(null));
        //  setIsModalOpen(!isModalOpen);
      }, 1500);
    }
    if (error !== null) {
      openNotificationWithIcon(
        "error",
        api,
        "",
        "Create time off unuccessfully!"
      );

      setSelectedItem([]);
      setSelectedRow([]);
      dispatch(setError(null));
      //   setIsModalOpen(!isModalOpen);

    }
  }, [statusCode, api, error, dispatch]);

  useEffect(() => {
    dispatch(getDoctorCalendar());
  }, [dispatch])

  const goToNextWeek = (date) => {
    return startOfWeek(addWeeks(date, 1), { weekStartsOn: 1 });
  };

  const goToPreviousWeek = (date) => {
    return startOfWeek(subWeeks(date, 1), { weekStartsOn: 1 });
  };

  const handlePrevWeek = () => {
    const prevWeek = goToPreviousWeek(date);
    setDate(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = goToNextWeek(date);
    setDate(nextWeek);
  };
  const handleAction = () => {
    if (status === "busy") {
      setIsModalOpen(true);
    }
    else {
      const body = selectedRow.map((item) => {
        return {
          date: columns[item.index].date,
          startTime: data[item.row].time.split(" - ")[0],
          endTime: data[item.row].time.split(" - ")[1],
          status: 2,
          reason: "break time",
        }
      })
      dispatch(createDoctorTimeOff(body));
    }
  }

  const columns = useMemo(() => {
    const startOfCurrentWeek = startOfWeek(date, { weekStartsOn: 1 });
    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(startOfCurrentWeek, i);
      const dayName = format(date, "EEEE");
      const dayNumber = format(date, "d");
      const newDay = format(date, "yyyy-MM-dd");

      // Tạo Header cho mỗi ngày
      const header = (
        <div className="Schedule-header">
          <span style={{ fontWeight: 400, fontSize: 14 }}>{dayName}</span>
          <span style={{ fontSize: 18 }}>{dayNumber}</span>
        </div>
      );
      daysOfWeek.push({
        Header: header,
        accessor: dayName.slice(0, 3),
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
  console.log(columns.map((item) => item.date));

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");


  const handleOk = () => {
    const body = selectedItem.map((item) => {
      return {
        date: columns[item.index].date,
        startTime: data[item.row].time.split(" - ")[0],
        endTime: data[item.row].time.split(" - ")[1],
        status: 1,
        reason: reason,
      }
    })
    dispatch(createDoctorTimeOff(body));
    setReason("");
    setIsModalOpen(false);

  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setReason("");
  };


  return (
    <div className="Schedule-main">
      <span className="Schedule-title">Doctor Calendar</span>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', fontSize: 20 }} className="Schedule-title" >Add Reason</div>
        <Input onChange={(e) => setReason(e.target.value)} />
      </Modal>
      <div className="Schedule-content">
        {contextHolder}
        <div className="Schedule-content__left">
          <div className="Schedule-content__left-action">
            <Select
              placeholder="-- Select --"
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
            <Button className="Schedule-content__left-button" disabled={status === ""} onClick={() => handleAction()}>Action</Button>
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
              <span className="Schedule-status-text">Examination Schedule</span>
            </div>
            <div className="Schedule-status">
              <div
                className="Schedule-status-color"
                style={{ backgroundColor: "#EEBBF6" }}
              ></div>
              <span className="Schedule-status-text">Video Consultation</span>
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
              {format(startOfWeek(date, { weekStartsOn: 1 }), "MMMM")}{" "}
              <span style={{ color: "#344858", fontWeight: 400 }}>
                {format(startOfWeek(date, { weekStartsOn: 1 }), "d")} -{" "}
                {format(endOfWeek(date, { weekStartsOn: 1 }), "d")},
              </span>{" "}
              <span style={{ color: "#5C768B", fontSize: 20, fontWeight: 400 }}>
                {format(startOfWeek(date, { weekStartsOn: 1 }), "yyyy")}
              </span>
            </span>
            <span className="Schedule-buttonDate">
              <div className="Schedule-prev" onClick={handlePrevWeek}>
                <CaretLeftOutlined className="Schedule-buttonDate__icon" />
              </div>
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
                      className={`Schedule-header__text ${index === 0 ? "border-first" : ""
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
                    ${selectedRow.some((item) => item.row === row.index) &&
                              index !== 0
                              ? "selected"
                              : ""
                            }

                        ${selectedItem.some(
                              (item) =>
                                item.row === row.index && item.index === index
                            )
                              ? "selectedItem"
                              : ""
                            }
                         ${row.index === row.cells.length + 1 && index === 0
                              ? "border-third"
                              : ""
                            }
                          ${row.index === row.cells.length + 1 && index === 7
                              ? "border-fourth"
                              : ""
                            }
                          ${viewSchedule(calendar.timeOffs, calendar.appointments, columns[index].date, data[row.index].time.toString())}

                          ${index !== 0 && viewBreakTime(calendar.timeOffs, data[row.index].time.toString())}
                    `}


                        >
                          {cell.render("Cell")}
                          <label style={{ fontSize: 12, fontWeight: 500 }}>{viewInforSchedule(calendar.appointments, columns[index].date, data[row.index].time.toString())}</label>
                          {index !== 0 && viewSchedule(calendar.timeOffs, calendar.appointments, columns[index].date, data[row.index].time.toString()) === "busy" && viewInforTimeOff(calendar.timeOffs, columns[index].date, data[row.index].time.toString())}
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
    </div>
  );
};

export default Schedule;
