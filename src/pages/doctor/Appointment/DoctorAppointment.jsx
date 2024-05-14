/* eslint-disable no-unused-vars */
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import "./Appointment.scss";
import { Button, Input, Select, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailDoctorAppointment, getDoctorAppointment } from "../../../stores/doctor/DoctorThunk";
import { debounce } from "lodash";
import { getDetailAppointment } from "../../../api/doctor.api";
import { icon } from "../../../helpers/icon";

const DoctorAppointment = () => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
    },
  });
  const [inputSearch, setInputSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [filterAvailable, setFilterAvailable] = useState(null);
  const { ListAppointments, TotalItems, CurrentPage, ItemsPerPage } = useSelector((state) => state.doctor)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  const columns = [
    {
      title: "Id",
      dataIndex: "key",
      align: "center",
    },
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
      title: "Status",
      dataIndex: "status",
      align: "center",
    },
  ];


  const handleStatusChange = (value) => {
    setStatus(value);
    dispatch(getDoctorAppointment({
      search: inputSearch,
      status: value,
      page: 1,
      filterAvailable: filterAvailable !== null ? filterAvailable : undefined
    }
    ));
  }
  const handleAvailableChange = (value) => {
    setFilterAvailable(value);
    dispatch(getDoctorAppointment({
      search: inputSearch,
      status: status !== null ? status : undefined,
      page: 1,
      filterAvailable: value
    }
    ));

  }

  const handleChangeInput = (e) => {
    const newValue = e.target.value;
    setInputSearch(newValue);
    debounceInputKey(
      newValue,
      status,
      1,
      filterAvailable,
    );
  };
  const debounceInputKey = useRef(
    debounce((nextValue, status, page, filterAvailable) => {
      dispatch(
        getDoctorAppointment({
          search: nextValue,
          status: status !== null ? status : undefined,
          page: page,
          filterAvailable: filterAvailable !== null ? filterAvailable : undefined
        })
      );
    }, 500)
  ).current;
  const handleClick = () => {
    dispatch(
      getDoctorAppointment({
        search: inputSearch,
        status: status !== null ? status : undefined,
        page: 1,
        filterAvailable: filterAvailable !== null ? filterAvailable : undefined
      })
    );
  }


  useEffect(() => {
    console.log("DoctorAppointment");
    dispatch(getDoctorAppointment({ status: 0, page: 1 }));
  }, [dispatch])
  return (
    <div className="DoctorAppointment">
      <div
        className="DoctorAppointment-filter"
        style={{ display: "flex", alignItems: "flex-end", gap: 30 }}
      >
        <div style={{ width: 600 }}>
          <div
            className="search-box-content__third"
            style={{
              width: 500,
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
            ref={contentRef}
          >
            <SearchOutlined className="search-box-content_icon" />
            <Input
              type="text"
              className="search__input-text"
              placeholder="Search for a patient..."
              style={{ border: "1px solid #a1a1aa" }}
              onChange={handleChangeInput}
            />
            <Button className="Schedule-content__left-button" onClick={handleClick}>Search</Button>
          </div>
        </div>
        <div className="DoctorAppointment-select">
          <span className="DoctorAppointment-text">Status</span>
          <Select
            placeholder="-- select --"
            style={{ width: 150, height: 46, color: "#6c81a0" }}
            onChange={handleStatusChange}
            options={[
              { value: 0, label: "All" },
              { value: 1, label: "Booked" },
              { value: 3, label: "Completed" },
              { value: 2, label: "Canceled" },
            ]}
          />
        </div>
        <div className="DoctorAppointment-select">
          <span className="DoctorAppointment-text">Available</span>
          <Select
            placeholder="-- select --"
            style={{ width: 150, height: 46, color: "#6c81a0" }}
            onChange={handleAvailableChange}
            options={[
              { value: "TODAY", label: "Today" },
              { value: "TOMORROW", label: "Tomorrow" },
            ]}
          />
        </div>
      </div>
      <div className="DoctorAppointment-filter">
        <Table
          columns={columns}
          dataSource={ListAppointments.map((item, index) => ({
            id: item.idAppointment,
            key: index + 1,
            name: item.namePatient,
            phone: item.phoneNumber,
            date: item.date.split("T")[0],
            time: `${item.startTime} - ${item.endTime}`,
            status: icon(item.status),
          }))}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                dispatch(getDetailDoctorAppointment(record.id));
                navigate(`/dr.Enclinic/appointment/${record.id}`);
                console.log("record");
              },
            };
          }}
          pagination={{
            pageSize: ItemsPerPage,
            total: TotalItems,
            current: CurrentPage,
          }}
        />
      </div>
    </div>
  );
};

export default DoctorAppointment;
