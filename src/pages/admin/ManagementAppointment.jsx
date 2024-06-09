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
import { debounce, set } from "lodash";
import { icon } from "../../helpers/icon";

import doctorDefault from "../../assets/images/doctor.jpeg";
import calender from "../../assets/images/calandar.png";
import dolar from "../../assets/images/dollar.png";
import personDefault from "../../assets/images/personDefault.png";
import location from "../../assets/images/location.png";
import problem from "../../assets/images/problem.png";
import { adminGetAppointment } from "../../stores/admin/AdminThunk";
import { da } from "date-fns/locale/da";
import { getAppointmentDetail } from "../../api/admin.api";
import { formatDate } from "../../helpers/timeBooking";
import { se } from "date-fns/locale";
const ManagementAppointment = () => {
  const { paging, listAppointment } = useSelector((state) => state.admin);
  const [page, setPage] = useState(paging?.currentPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState(null);
  const [detail, setDetail] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  const columns = [
    {
      title: "",
      dataIndex: "key",
      align: "center",
      width: "5%",
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
      title: "Date",
      dataIndex: "created",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
    },
  ];
  useEffect(() => {
    dispatch(adminGetAppointment({ page: 1 }));
  }, [dispatch]);
  //

  const handleStatusChange = (value) => {
    setStatus(value !== "All" ? value : null);
    dispatch(
      adminGetAppointment({
        date: date !== null ? date : undefined,
        search: inputSearch !== "" ? inputSearch : undefined,
        status: value !== "All" ? value : undefined,
        page: 1,
      })
    );
  };
  const handlePicker = (value, stringDate) => {
    setDate(stringDate);
    dispatch(
      adminGetAppointment({
        status: status !== null ? status : undefined,
        search: inputSearch !== "" ? inputSearch : undefined,
        date: stringDate,
        page: 1,
      })
    );
  };

  const handleChangeInput = (e) => {
    const newValue = e.target.value;
    setInputSearch(newValue);
    debounceInputKey(newValue, status, date, 1);
  };
  const debounceInputKey = useRef(
    debounce((nextValue, status, date, page) => {
      dispatch(
        adminGetAppointment({
          status: status !== null ? status : undefined,
          search: nextValue,
          date: date !== null ? date : undefined,
          page: 1,
        })
      );
    }, 500)
  ).current;
  const handleClick = () => {
    dispatch(
      adminGetAppointment({
        status: status !== null ? status : undefined,
        search: inputSearch !== "" ? inputSearch : undefined,
        date: date !== null ? date : undefined,
        page: 1,
      })
    )

  };
  useEffect(() => {
    console.log(detail);
  }, [detail]);
  useEffect(() => { }, [dispatch]);
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
              src={detail?.avatarDoctor}
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
                {detail?.nameDoctor}
              </Typography>
              <Typography
                className="appointment-font"
                style={{ fontSize: 15, fontWeight: 400, color: "#6c81a0" }}
              >
                {detail?.medicalSpecialty}
              </Typography>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <Typography
              className="appointment-font"
              style={{ fontSize: 16, fontWeight: 500, color: "#6c81a0" }}
            >
              Information
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
                    {detail?.startTime} - {detail?.endTime}
                  </Typography>
                  <Typography
                    className="appointment-font"
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: "#6c81a0",
                    }}
                  >
                    {formatDate(detail?.date)}
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
                    {detail?.nameClinic}
                  </Typography>
                  <Typography
                    className="appointment-font"
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: "#6c81a0",
                    }}
                  >
                    {detail?.address}
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
                    {detail?.issue}
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
                    VND {detail?.price.toLocaleString("vi-VN")}
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
              User
            </Typography>
            <div className="appointment-right__box successBooking-service">
              <Image
                src={detail?.avatarUser}
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
                  {detail?.nameUser}
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
              placeholder="Search..."
              style={{ border: "1px solid #a1a1aa", fontSize: 13 }}
              onChange={handleChangeInput}
            />
            <Button
              className="Schedule-content__left-button"
              onClick={handleClick}
              style={{ height: 43 }}
            >
              Search
            </Button>
          </div>
        </div>
        <div className="DoctorAppointment-select">
          <span className="DoctorAppointment-text">Status</span>
          <Select
            defaultValue={"All"}
            style={{ width: 150, height: 43, color: "#6c81a0" }}
            onChange={handleStatusChange}
            options={[
              { value: "All", label: "All" },
              { value: 1, label: "Booked" },
              { value: 3, label: "Completed" },
              { value: 2, label: "Canceled" },
            ]}
          />
        </div>
        <div className="DoctorAppointment-select">
          <span className="DoctorAppointment-text">Date</span>
          <DatePicker
            style={{ width: 150, height: 43, color: "#6c81a0" }}
            onChange={handlePicker}
          />
        </div>
      </div>
      <div className="DoctorAppointment-filter">
        <Table
          columns={columns}
          dataSource={listAppointment.map((item, index) => ({
            id: item?.idAppointment,
            key: index + 1,
            doctor: item?.nameDoctor,
            patient: item?.nameUser,
            created: item.date ? item.date.split("T")[0] : "--",
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
              onClick: async (event) => {
                setIsModalOpen(true);
                const res = await getAppointmentDetail(record.id);
                setDetail(res.data);
              },
            };
          }}
          pagination={{
            pageSize: paging?.itemsPerPage,
            total: paging?.totalItems,
            current: paging?.currentPage,
          }}
          onChange={(pagination) => {
            setPage(pagination.current);
            dispatch(
              adminGetAppointment({
                date: date !== null ? date : undefined,
                status: status !== null ? status : undefined,
                page: pagination.current,
              })
            );
          }}
        />
      </div>
    </div>
  );
};

export default ManagementAppointment;
