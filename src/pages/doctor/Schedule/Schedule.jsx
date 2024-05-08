import "./Schedule.scss";

import React, { useMemo } from "react";
import { useTable } from "react-table";

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
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState([]);
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
        Header: "Time",
        accessor: "time", // accessor is the "key" in the data
      },
      {
        Header: "Mon",
        accessor: "Mon",
      },
      {
        Header: "Tue",
        accessor: "Tue",
      },
      {
        Header: "Wed",
        accessor: "Wed",
      },
      {
        Header: "Thu",
        accessor: "Thu",
      },
      {
        Header: "Fri",
        accessor: "Fri",
      },
      {
        Header: "Sat",
        accessor: "Sat",
      },
      {
        Header: "Sun",
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
                  className={` ${index === 0 ? "border-first" : ""}  ${
                    index === 7 ? "border-second" : ""
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
                           row.index === row.cells.length && index === 0
                             ? "border-third"
                             : ""
                         }
                          ${
                            row.index === row.cells.length && index === 7
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
  );
};

export default Schedule;
