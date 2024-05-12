import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import "./Schedule.scss";

import { useMemo, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { useTable } from "react-table";
import { Button, Select } from "antd";

const Schedule = () => {
    const startTime = 8;
    const endTime = 16;
    const data = useMemo(
        () =>
            new Array(endTime - startTime + 1).fill(0).map((_, i) => ({
                time: `${startTime + i}:00`,
                Mon: "",
                Tue: "",
                Wed: "",
                Thu: "",
                Fri: "",
                Sat: "",
                Sun: "",
            })),
        []
    );
    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);
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
    const columns = useMemo(
        () => [
            {
                Header: <FaRegClock size={32} color="#3b82f6" />,
                accessor: "time", // accessor is the "key" in the data
            },
            {
                Header: <div className="Schedule-header">
                    <span style={{ fontWeight: 400, fontSize: 14 }}>Monday</span>
                    <span style={{ fontSize: 18 }}>8</span>
                </div>,
                accessor: "Mon",
            },
            {
                Header: <div className="Schedule-header">
                    <span style={{ fontWeight: 400, fontSize: 14 }}>Tuesday</span>
                    <span style={{ fontSize: 18 }}>9</span>
                </div>,
                accessor: "Tue",
            },
            {
                Header: <div className="Schedule-header">
                    <span style={{ fontWeight: 400, fontSize: 14 }}>Wednesday</span>
                    <span style={{ fontSize: 18 }}>10</span>
                </div>,
                accessor: "Wed",
            },
            {
                Header: <div className="Schedule-header">
                    <span style={{ fontWeight: 400, fontSize: 14 }}>Thursday</span>
                    <span style={{ fontSize: 18 }}>11</span>
                </div>,
                accessor: "Thu",
            },
            {
                Header: <div className="Schedule-header">
                    <span style={{ fontWeight: 400, fontSize: 14 }}>Friday</span>
                    <span style={{ fontSize: 18 }}>12</span>
                </div>,
                accessor: "Fri",
            },
            {
                Header: <div className="Schedule-header">
                    <span style={{ fontWeight: 400, fontSize: 14 }}>Saturday</span>
                    <span style={{ fontSize: 18 }}>13</span>
                </div>,
                accessor: "Sat",
            },
            {
                Header: <div className="Schedule-header">
                    <span style={{ fontWeight: 400, fontSize: 14 }}>Sunday</span>
                    <span style={{ fontSize: 18 }}>14</span>
                </div>,
                accessor: "Sun",
            },
        ],
        []
    );

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
                                width: '100%',
                                height: 40,

                            }}
                            options={[
                                {
                                    value: 'busy',
                                    label: 'Busy',
                                },
                                {
                                    value: 'Break time',
                                    label: 'Break time',
                                },
                            ]}
                        />
                        <Button className="Schedule-content__left-button">Action</Button>
                    </div>
                    <div style={{ width: '100%', gap: 20, display: 'flex', flexDirection: 'column' }}>
                        <div className="Schedule-status">
                            <div className="Schedule-status-color" style={{ backgroundColor: '#fff' }}></div>
                            <span className="Schedule-status-text">Available</span>
                        </div>
                        <div className="Schedule-status">
                            <div className="Schedule-status-color"></div>
                            <span className="Schedule-status-text">Examination Schedule</span>
                        </div>
                        <div className="Schedule-status">
                            <div className="Schedule-status-color" style={{ backgroundColor: '#EEBBF6' }}></div>
                            <span className="Schedule-status-text">Video Consultation</span>
                        </div>
                        <div className="Schedule-status">
                            <div className="Schedule-status-color" style={{ backgroundColor: '#FFA996' }}></div>
                            <span className="Schedule-status-text">Break time</span>
                        </div>
                        <div className="Schedule-status">
                            <div className="Schedule-status-color" style={{ backgroundColor: '#A5ADF3' }}></div>
                            <span className="Schedule-status-text">Busy</span>
                        </div>
                    </div>
                </div>
                <div style={{ flex: 8 }}>
                    <div className="Schedule-date">
                        <span className="Schedule-title" style={{ color: "#344858", fontSize: 28, marginBottom: 10 }}>May <span style={{ color: "#344858", fontWeight: 400 }}>
                            8 - 15</span>, <span style={{ color: '#5C768B', fontSize: 20, fontWeight: 400 }}>2024</span></span>
                        <span className="Schedule-buttonDate">
                            <div className="Schedule-prev">
                                <CaretLeftOutlined className="Schedule-buttonDate__icon" />
                            </div>
                            <div className="Schedule-next">
                                <CaretRightOutlined className="Schedule-buttonDate__icon" />
                            </div>
                        </span>
                    </div>
                    <table
                        {...getTableProps()}
                        style={{
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
                                            className={`Schedule-header__text ${index === 0 ? "border-first" : ""}  ${index === 7 ? "border-second" : ""
                                                }`}
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
                         ${row.index === row.cells.length && index === 0
                                                            ? "border-third"
                                                            : ""
                                                        }
                          ${row.index === row.cells.length && index === 7
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
                    </table></div>
            </div>

        </div>
    );
};

export default Schedule;
