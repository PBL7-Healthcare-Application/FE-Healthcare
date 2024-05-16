/* eslint-disable no-unused-vars */
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import "./Schedule.scss";

import { useEffect, useMemo, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { useTable } from "react-table";
import { Button, Select } from "antd";

import {
  format,
  addDays,
  startOfWeek,
  addWeeks,
  subWeeks,
  endOfWeek,
} from "date-fns";
import { useSelector } from "react-redux";
import {
  addMinutes,
  convertTime,
  formatTime,
} from "../../../helpers/timeBooking";
const Schedule = () => {
  const { profile } = useSelector((state) => state.doctor);
  let temp = convertTime(profile.workingTimeStart);

  const data = useMemo(
    () =>
      new Array(
        parseInt(profile.workingTimeEnd.split(":")[0]) -
          parseInt(profile.workingTimeStart.split(":")[0]) -
          1
      )
        .fill(0)
        .map((_, i) => {
          const result = {
            time: `${formatTime(
              addMinutes(temp, profile.durationPerAppointment)
            )} - ${formatTime(
              addMinutes(temp + 1, profile.durationPerAppointment)
            )}`,
            Mon: "",
            Tue: "",
            Wed: "",
            Thu: "",
            Fri: "",
            Sat: "",
            Sun: "",
          };

          temp = addMinutes(temp, profile.durationPerAppointment);

          return result;
        }),
    []
  );
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [date, setDate] = useState(new Date());
  const handleItemClick = (rowIndex, index) => {
    console.log(rowIndex, index);
    if (index === 0) {
      setSelectedRow((prev) => [
        ...prev,
        {
          row: rowIndex,
          index: index,
        },
      ]);
    } else {
      setSelectedItem((prev) => [
        ...prev,
        {
          row: rowIndex,
          index: index,
        },
      ]);
    }
  };

  useEffect(() => {
    console.log(date);
  }, [date]);
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

  const columns = useMemo(() => {
    const startOfCurrentWeek = startOfWeek(date, { weekStartsOn: 1 });
    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(startOfCurrentWeek, i);
      const dayName = format(date, "EEEE");
      const dayNumber = format(date, "d");

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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="Schedule-main">
      <span className="Schedule-title">Doctor Calendar</span>
      <div className="Schedule-content">
        <div className="Schedule-content__left">
          <div className="Schedule-content__left-action">
            <Select
              placeholder="-- select --"
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
                  value: "Break time",
                  label: "Break time",
                },
              ]}
            />
            <Button className="Schedule-content__left-button">Action</Button>
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
                       
                    `}
                        >
                          {cell.render("Cell")}
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
