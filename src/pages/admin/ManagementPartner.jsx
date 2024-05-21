/* eslint-disable no-unused-vars */
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteTwoTone,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import "./admin.scss";
import {
  Button,
  DatePicker,
  Image,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { icon } from "../../helpers/icon";

import doctorDefault from "../../assets/images/doctor.jpeg";
import calender from "../../assets/images/calandar.png";
import dolar from "../../assets/images/dollar.png";
import personDefault from "../../assets/images/personDefault.png";
import location from "../../assets/images/location.png";
import problem from "../../assets/images/problem.png";
const ManagementPartner = () => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [filterAvailable, setFilterAvailable] = useState(null);
  const { ListAppointments, TotalItems, CurrentPage, ItemsPerPage } =
    useSelector((state) => state.doctor);
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
      title: "Doctor",
      dataIndex: "doctor",
      align: "center",
    },

    {
      title: "Specialty",
      dataIndex: "specialty",
      align: "center",
    },
    {
      title: "Created Date",
      dataIndex: "created",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
    },
    {
      title: "Action",
      key: "function",
      dataIndex: "function",
      align: "center",
      className: "function-box",
      width: "10%",
      onCell: () => {
        return {
          onClick: (e) => {
            e.stopPropagation();
          },
        };
      },
      render: () => (
        <>
          <Space size={"middle"}>
            <DeleteTwoTone
              twoToneColor="#EB1B36"
              className="function-box__delete"
            />
          </Space>
        </>
      ),
    },
  ];
  const data = [
    {
      key: 1,
      doctor: "Dr. Smith",
      specialty: "Dentistry",
      created: "2022-01-01",
      status: 1,
    },
    {
      key: 2,
      doctor: "Dr. Johnson",
      specialty: "Dentistry",
      created: "2022-01-02",
      status: 2,
    },
  ];
  //

  const handleStatusChange = (value) => {
    setStatus(value);
  };
  const handleAvailableChange = (value) => {
    setFilterAvailable(value);
  };

  const handleChangeInput = (e) => {
    const newValue = e.target.value;
    setInputSearch(newValue);
    debounceInputKey(newValue, status, 1, filterAvailable);
  };
  const debounceInputKey = useRef(
    debounce((nextValue, status, page, filterAvailable) => {}, 500)
  ).current;
  const handleClick = () => {};

  useEffect(() => {}, [dispatch]);
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
            <Button
              className="Schedule-content__left-button"
              onClick={handleClick}
            >
              Search
            </Button>
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
          <span className="DoctorAppointment-text">Date</span>
          <DatePicker style={{ width: 150, height: 46, color: "#6c81a0" }} />
        </div>
      </div>
      <div className="DoctorAppointment-filter">
        <Table
          columns={columns}
          dataSource={data.map((item, index) => ({
            id: item.key,
            key: index + 1,
            doctor: item.doctor,
            specialty: item.specialty,
            created: item.created,
            status: icon(item.status),
          }))}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                navigate(`/admin/partners/${record.id}`, {
                  state: { role: "DOCTOR" },
                });
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

export default ManagementPartner;
