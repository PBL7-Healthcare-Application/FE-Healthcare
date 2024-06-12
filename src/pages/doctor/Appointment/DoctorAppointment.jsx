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

  const [inputSearch, setInputSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [filterAvailable, setFilterAvailable] = useState(null);
  const { ListAppointments, paging } = useSelector((state) => state.doctor)
  const [page, setPage] = useState(paging?.currentPage);
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
      search: inputSearch !== "" ? inputSearch : undefined,
      status: value,
      page: 1,
      filterAvailable: filterAvailable !== null ? filterAvailable : undefined
    }
    ));
  }
  const handleAvailableChange = (value) => {
    setFilterAvailable(value === "all" ? null : value);
    dispatch(getDoctorAppointment({
      search: inputSearch !== "" ? inputSearch : undefined,
      status: status !== null ? status : undefined,
      page: 1,
      filterAvailable: value === "all" ? undefined : value
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
        search: inputSearch !== "" ? inputSearch : undefined,
        status: status !== null ? status : undefined,
        page: 1,
        filterAvailable: filterAvailable !== null ? filterAvailable : undefined
      })
    );
  }


  useEffect(() => {
    dispatch(getDoctorAppointment({ page: 1 }));
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
              style={{ border: "1px solid #a1a1aa", fontSize: 13 }}
              onChange={handleChangeInput}
            />
            <Button className="Schedule-content__left-button" style={{ height: 42 }} onClick={handleClick}>Search</Button>
          </div>
        </div>
        <div className="DoctorAppointment-select">
          <span className="DoctorAppointment-text">Status</span>
          <Select
            defaultValue={"Booked"}
            style={{ width: 150, height: 42, color: "#6c81a0" }}
            onChange={handleStatusChange}
            options={[
              { value: 0, label: "All" },
              { value: 1, label: "Booked" },
              { value: 3, label: "Completed" },
              { value: 2, label: "Canceled" },
              { value: 4, label: "Waiting" },
            ]}
          />
        </div>
        <div className="DoctorAppointment-select">
          <span className="DoctorAppointment-text">Available</span>
          <Select
            defaultValue={"All"}
            style={{ width: 150, height: 42, color: "#6c81a0" }}
            onChange={handleAvailableChange}
            options={[
              { value: "all", label: "All" },
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
            status: <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>{icon(item.status)}</div>,
          }))}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                dispatch(getDetailDoctorAppointment(record.id));
                navigate(`/dr.Enclinic/appointment/${record.id}`);
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
              getDoctorAppointment({
                search: inputSearch !== "" ? inputSearch : undefined,
                status: status !== null ? status : 0,
                page: pagination.current,
                filterAvailable: filterAvailable !== null ? filterAvailable : undefined
              })
            );
          }}
        />
      </div>
    </div>
  );
};

export default DoctorAppointment;
