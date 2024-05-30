/* eslint-disable no-unused-vars */
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
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
const ManagementAppointment = () => {
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
      title: "Patient",
      dataIndex: "patient",
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
  ];
  const data = [
    {
      key: 1,
      doctor: "Dr. Smith",
      patient: "John Doe",
      created: "2022-01-01",
      status: 1,
    },
    {
      key: 2,
      doctor: "Dr. Johnson",
      patient: "Jane Doe",
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
      <Modal
        open={isModalOpen}
        className="modal"
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => setIsModalOpen(false)}
      >
        <div
          className="appointment-box successBooking-box"
          style={{ marginTop: 40, minWidth: 550 }}
        >
          <div className="appointment-left__infor--box">
            <Image
              src={""}
              width={90}
              className="appointment-left__infor--img"
              fallback={doctorDefault}
              preview={false}
            />
            <div
              className="appointment-left__infor--left"
              style={{ justifyContent: "flex-start" }}
            >
              <Typography
                className="appointment-font"
                style={{ fontSize: 20, fontWeight: 500, letterSpacing: 0.4 }}
              >
                {"Bui Van Huy"}
              </Typography>
              <Typography
                className="appointment-font"
                style={{ fontSize: 15, fontWeight: 400, color: "#6c81a0" }}
              >
                {"Tim mach"}
              </Typography>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <Typography
              className="appointment-font"
              style={{ fontSize: 16, fontWeight: 500, color: "#6c81a0" }}
            >
              Appointment schedule information
            </Typography>
            <div className="appointment-right__box">
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
                    7:00 - 8:00
                  </Typography>
                  <Typography
                    className="appointment-font"
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: "#6c81a0",
                    }}
                  >
                    Tuesday, May 21, 2024
                  </Typography>
                </div>
              </div>
              <div className="appointment-right__content">
                <Image
                  src={location}
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
                    Enclinic
                  </Typography>
                  <Typography
                    className="appointment-font"
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: "#6c81a0",
                    }}
                  >
                    Hoa Phong, Hoa Vang, Da Nang
                  </Typography>
                </div>
              </div>
              <div className="appointment-right__content">
                <Image
                  src={problem}
                  width={28}
                  className="appointment-right__content-icon"
                  preview={false}
                />
                <div>
                  <Typography
                    className="appointment-font"
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: "#6c81a0",
                    }}
                  >
                    I had problems with my heart
                  </Typography>
                </div>
              </div>
              <div className="appointment-right__content">
                <Image
                  src={dolar}
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
                      color: "#D84023",
                    }}
                  >
                    500.000 ₫
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== */}
          <div style={{ marginTop: 20 }}>
            <Typography
              className="appointment-font"
              style={{ fontSize: 16, fontWeight: 500, color: "#6c81a0" }}
            >
              Service User
            </Typography>
            <div className="appointment-right__box successBooking-service">
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
                  {"van Huy Bui"}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Modal>
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
            patient: item.patient,
            created: item.created,
            status: (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {icon(item.status)}
              </div>
            ),
          }))}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setIsModalOpen(true);
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

export default ManagementAppointment;
