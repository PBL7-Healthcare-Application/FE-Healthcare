/* eslint-disable no-unused-vars */
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteTwoTone,
  EditOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";

import { Button, Input, Select, Space, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { debounce } from "lodash";
import { statusAccount, tabRole } from "../../helpers/icon";

const ManagementUser = () => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
    },
  });
  const data = [
    {
      key: "1",
      name: "Nguyễn Văn A",
      created: "2021-09-01",
      role: "DOCTOR",
      status: "ACTIVE",
    },
    {
      key: "2",
      name: "Trần Thị B",
      created: "2021-08-01",
      role: "USER",
      status: "BAN",
    },
    {
      key: "3",
      name: "Lê Văn C",
      created: "2021-07-01",
      role: "USER",
      status: "ACTIVE",
    },
    {
      key: "4",
      name: "Phạm Thị D",
      created: "2021-06-01",
      role: "DOCTOR",
      status: "ACTIVE",
    },
  ];
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
      title: "Name",
      dataIndex: "name",
      align: "center",
    },

    {
      title: "Created Date",
      dataIndex: "created",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
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
            <EditOutlined
              className="certificate-iconEdit"
              style={{ fontSize: 20, color: "rgb(51, 114, 254)" }}
              //   onClick={handleShowDeleteModal}
            />
            <DeleteTwoTone
              twoToneColor="#EB1B36"
              className="function-box__delete"
            />
          </Space>
        </>
      ),
    },
  ];

  const handleStatusChange = (value) => {};
  const handleAvailableChange = (value) => {};

  const handleChangeInput = (e) => {
    const newValue = e.target.value;
    setInputSearch(newValue);
    debounceInputKey(newValue, status, 1, filterAvailable);
  };
  const debounceInputKey = useRef(
    debounce((nextValue, status, page, filterAvailable) => {
      dispatch();
    }, 500)
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
              placeholder="Search ..."
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
          <span className="DoctorAppointment-text">Role</span>
          <Select
            placeholder="-- select --"
            style={{ width: 150, height: 46, color: "#6c81a0" }}
            onChange={handleStatusChange}
            options={[
              { value: 0, label: "All" },
              { value: "USER", label: "User" },
              { value: "DOCTOR", label: "Doctor" },
            ]}
          />
        </div>
        <div className="DoctorAppointment-select">
          <span className="DoctorAppointment-text">Status</span>
          <Select
            placeholder="-- select --"
            style={{ width: 150, height: 46, color: "#6c81a0" }}
            onChange={handleAvailableChange}
            options={[
              { value: "All", label: "All" },
              { value: "ACTIVE", label: "Active" },
              { value: "BAN", label: "Ban" },
            ]}
          />
        </div>
      </div>
      <div className="DoctorAppointment-filter">
        <Table
          columns={columns}
          dataSource={data.map((item, index) => ({
            id: item.key,
            key: item.key,
            name: item.name,
            created: item.created,
            role: tabRole(item.role),
            status: statusAccount(item.status),
          }))}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                // dispatch(getDetailDoctorAppointment(record.id));
                // navigate(`/dr.Enclinic/appointment/${record.id}`);
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

export default ManagementUser;
