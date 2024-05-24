/* eslint-disable no-unused-vars */
import { SearchOutlined } from "@ant-design/icons";

import {
  Button,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  notification,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { debounce } from "lodash";
import { statusAccount, tabRole } from "../../helpers/icon";
import { BiSolidLock } from "react-icons/bi";
import {
  disableAccountUser,
  getAdminUser,
} from "../../stores/admin/AdminThunk";
import { openNotificationWithIcon } from "../../components/notification/CustomNotify";
import { setError, setStatusCode } from "../../stores/admin/AdminSlice";

const ManagementUser = () => {
  const { listUser, paging, statusCode, error } = useSelector(
    (state) => state.admin
  );
  const [inputSearch, setInputSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [role, setRole] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [page, setPage] = useState(paging?.currentPage);
  const [email, setEmail] = useState(null);
  const [api, contextHolder] = notification.useNotification();
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
      render: (text, record) => (
        <>
          <Space size={"middle"} align="center" direction="horizontal">
            <BiSolidLock
              className="function-box__delete"
              size={30}
              style={{ cursor: "pointer" }}
              color="#ff4d4f"
              onClick={() => {
                setIsDisabled(!isDisabled);
                setEmail(record.email);
              }}
            />
          </Space>
        </>
      ),
    },
  ];

  const handleStatusChange = (value) => {
    setStatus(value !== "All" ? value : null);
    dispatch(
      getAdminUser({
        search: inputSearch !== null ? inputSearch : undefined,
        status: value !== "All" ? value : undefined,
        role: role !== null ? role : undefined,
        page: page,
      })
    );
  };
  const handleRoleChange = (value) => {
    setRole(value !== 0 ? value : null);
    dispatch(
      getAdminUser({
        search: inputSearch !== null ? inputSearch : undefined,
        status: status !== null ? status : undefined,
        role: value !== 0 ? value : undefined,
        page: page,
      })
    );
  };

  const handleChangeInput = (e) => {
    const newValue = e.target.value;
    setInputSearch(newValue);
    debounceInputKey(newValue, status, role, page);
  };
  const debounceInputKey = useRef(
    debounce((newValue, status, role, page) => {
      dispatch(
        getAdminUser({
          search: newValue,
          status: status !== null ? status : undefined,
          role: role !== null ? role : undefined,
          page: page,
        })
      );
    }, 500)
  ).current;
  const handleClick = () => {
    dispatch(
      getAdminUser({
        search: inputSearch,
        status: status !== null ? status : undefined,
        role: role !== null ? role : undefined,
        page: page,
      })
    );
    contentRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const handleOk = () => {
    dispatch(
      disableAccountUser({
        email: email,
      })
    );

    setIsDisabled(false);
  };
  const handleCancel = () => {
    setIsDisabled(false);
  };

  useEffect(() => {
    dispatch(getAdminUser({ page: 1 }));
  }, [dispatch]);
  useEffect(() => {
    if (statusCode === 200) {
      openNotificationWithIcon("success", api, "", "Disable Account Success!");
      dispatch(setStatusCode(null));
      dispatch(
        getAdminUser({
          search: inputSearch !== "" ? inputSearch : undefined,
          status: status !== null ? status : undefined,
          role: role !== null ? role : undefined,
          page: page,
        })
      );
    }
    if (error !== null) {
      openNotificationWithIcon("error", api, "", "Disable Account Failed!");
      dispatch(setError(null));
    }
  }, [statusCode, dispatch, navigate, api, error]);
  return (
    <div className="DoctorAppointment">
      {contextHolder}
      <Modal open={isDisabled} onOk={handleOk} onCancel={handleCancel}>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <span className="ChangePass-title">Disable Account</span>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ margin: "20px", marginBottom: 5 }}>
              <svg
                width="120"
                height="120"
                viewBox="0 0 98 86"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M41.0729 0.816044C37.5539 1.41404 33.9639 2.85004 31.2599 4.76505C29.1539 6.27304 26.1859 9.55204 24.9409 11.73C19.2919 21.615 21.7579 34.061 30.7329 40.859C33.8919 43.229 37.8419 44.856 41.4799 45.239L42.9879 45.407L42.8919 41.673C42.7719 36.072 43.7779 31.309 45.9799 26.929C48.0139 22.884 51.6049 18.647 55.2669 15.967C57.1819 14.555 62.1839 11.85 62.8539 11.85C63.5719 11.85 63.4519 11.3 62.4229 9.86304C59.5029 5.79404 54.8109 2.58704 49.8089 1.31804C47.5589 0.744041 43.1069 0.481045 41.0729 0.816044Z"
                  fill="#BFBFBF"
                ></path>
                <path
                  d="M70.2021 16.183C67.7601 16.494 65.1511 17.308 62.6141 18.529C47.2721 25.997 44.0641 46.462 56.3911 58.357C59.3591 61.253 63.4761 63.503 67.6641 64.556C69.4351 65.011 70.4171 65.082 73.5041 65.082C76.7351 65.058 77.5251 64.986 79.5841 64.436C91.3361 61.3 98.9951 50.386 97.8951 38.346C96.6031 24.44 84.0371 14.388 70.2021 16.183ZM76.5691 32.626L79.7281 29.443L82.1701 31.908L84.6351 34.349L81.4521 37.532L78.2921 40.691L81.4041 43.803L84.5161 46.915L82.1221 49.309L79.7281 51.703L76.6161 48.591L73.5041 45.479L70.4411 48.543C68.7651 50.218 67.2811 51.583 67.1621 51.583C66.8511 51.583 62.4951 47.227 62.4951 46.916C62.4951 46.796 63.8601 45.312 65.5351 43.637L68.5981 40.573L65.4861 37.461L62.3741 34.349L64.7671 31.955L67.1611 29.561L70.2731 32.673L73.3851 35.785L76.5691 32.626Z"
                  fill="#F44D2C"
                ></path>
                <path
                  d="M23.72 46.341C11.776 52.828 3.686 63.646 1.005 76.715C0.742 77.96 0.478 79.803 0.407 80.784C0.311 81.765 0.192 83.201 0.12 83.944L0 85.332H44.184H88.344V83.585C88.344 81.359 87.961 78.343 87.387 75.758C86.693 72.79 85.449 69.056 85.137 69.056C84.97 69.056 84.228 69.271 83.486 69.535C79.082 71.091 73.194 71.617 68.67 70.875C60.556 69.535 53.16 64.987 48.54 58.453C47.989 57.711 47.487 57.089 47.391 57.089C47.271 57.089 46.601 58.166 45.835 59.483C45.093 60.799 44.423 61.924 44.327 61.972C44.255 62.02 42.795 59.626 41.072 56.634L37.985 51.2L36.07 50.673C33.557 49.955 30.302 48.399 27.836 46.724C26.76 45.958 25.778 45.36 25.683 45.36C25.587 45.36 24.701 45.814 23.72 46.341Z"
                  fill="#BFBFBF"
                ></path>
              </svg>
            </div>

            <span
              className="ChangePass-text"
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: 18,
              }}
            >
              Are you sure you want to disable this account ?
            </span>
            <span
              className="ChangePass-text"
              style={{
                width: "80%",
                textAlign: "center",
                fontSize: 16,
                marginBottom: 20,
              }}
            >
              {email}
            </span>
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
            onChange={handleRoleChange}
            options={[
              { value: 0, label: "All" },
              { value: 1, label: "User" },
              { value: 2, label: "Doctor" },
            ]}
          />
        </div>
        <div className="DoctorAppointment-select">
          <span className="DoctorAppointment-text">Status</span>
          <Select
            placeholder="-- select --"
            style={{ width: 150, height: 46, color: "#6c81a0" }}
            onChange={handleStatusChange}
            options={[
              { value: "All", label: "All" },
              { value: false, label: "Active" },
              { value: true, label: "Baned" },
            ]}
          />
        </div>
      </div>
      <div className="DoctorAppointment-filter">
        <Table
          columns={columns}
          dataSource={listUser.map((item, index) => ({
            id: item?.email,
            key: index,
            name: item?.email,
            created: item?.createdDate ? item?.createdDate.split("T")[0] : "--",
            role: tabRole(item?.role),
            status: statusAccount(item?.isLocked),
            email: item?.email,
            r: item.role === "User" ? "USER" : "DOCTOR",
          }))}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                // dispatch(getDetailDoctorAppointment(record.id));
                navigate(`/admin/users/detail/${record.id}`, {
                  state: { role: record.r },
                });
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
              getAdminUser({
                search: inputSearch !== "" ? inputSearch : undefined,
                status: status !== null ? status : undefined,
                role: role !== null ? role : undefined,
                page: pagination.current,
              })
            );
          }}
        />
      </div>
    </div>
  );
};

export default ManagementUser;
