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
import { iconPartner } from "../../helpers/icon";


import Specialty from "../../components/specialty/Specialty";
import { getAdminPartner } from "../../stores/admin/AdminThunk";
import { getAllSpecialty } from "../../api/doctor.api";
const ManagementPartner = () => {
  const { partner, paging } = useSelector((state) => state.admin);
  const [inputSearch, setInputSearch] = useState("");
  const [specialty, setSpecialty] = useState(null);
  const [typePartner, setTypePartner] = useState(null);
  const [page, setPage] = useState(paging?.currentPage);
  const [specialties, setSpecialties] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  const columns = [
    {
      title: "Id",
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
      width: "15%",
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

  const getSpecialties = async () => {
    try {
      const response = await getAllSpecialty();

      setSpecialties(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSpecialty = (value) => {
    setSpecialty(value !== 0 ? value : null);
    dispatch(
      getAdminPartner({
        page: 1,
        idSpecialty: value !== 0 ? value : undefined,
        TypePartner: typePartner !== null ? typePartner : undefined,
        search: inputSearch !== "" ? inputSearch : undefined,
      })
    );
  };
  const handleTypePartnerChange = (value) => {
    setTypePartner(value !== "All" ? value : null);
    dispatch(
      getAdminPartner({
        page: page,
        idSpecialty: specialty !== null ? specialty : undefined,
        TypePartner: value !== "All" ? value : undefined,
        search: inputSearch !== "" ? inputSearch : undefined,
      })
    );
  };

  const handleChangeInput = (e) => {
    const newValue = e.target.value;
    setInputSearch(newValue);
    debounceInputKey(newValue, specialty, page, typePartner);
  };
  const debounceInputKey = useRef(
    debounce((nextValue, idSpecialty, page, typePartner) => {
      dispatch(
        getAdminPartner({
          page: page,
          idSpecialty: idSpecialty !== null ? idSpecialty : undefined,
          TypePartner: typePartner !== null ? typePartner : undefined,
          search: nextValue !== "" ? nextValue : undefined,
        })
      );
    }, 500)
  ).current;
  const handleClick = () => {
    dispatch(
      getAdminPartner({
        page: page,
        idSpecialty: specialty !== null ? specialty : undefined,
        TypePartner: typePartner !== null ? typePartner : undefined,
        search: inputSearch !== "" ? inputSearch : undefined,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getAdminPartner({
        page: 1,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    getSpecialties();

  }, [])
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
          <span className="DoctorAppointment-text">Specialty</span>
          <div style={{ width: 200 }}>
            <Select
              defaultValue={"All"}
              style={{ height: 43, width: 200 }}
              options={[
                { value: 0, label: "All" },
                ...specialties.map((item) => ({
                  label: item.name,
                  value: item.idSpecialty,
                })),
              ]}
              onChange={(value) => handleSpecialty(value)}
            />
          </div>
        </div>
        <div className="DoctorAppointment-select">
          <span className="DoctorAppointment-text">Type</span>
          <Select
            defaultValue={"New Partner"}
            style={{ width: 150, height: 42, color: "#6c81a0" }}
            onChange={handleTypePartnerChange}
            options={[
              // { value: "All", label: "All" },
              { value: 1, label: "New Partner" },
              { value: 2, label: "Old Partner" },
            ]}
          />
        </div>
      </div>
      <div className="DoctorAppointment-filter">
        <Table
          columns={columns}
          dataSource={partner?.map((item, index) => ({
            id: item.idDoctor,
            key: index + 1,
            doctor: item.name,
            specialty: item.medicalSpecialty,
            created: item.created ? item.created : "N/A",
            status: (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {iconPartner(item.statusVerified)}
              </div>
            ),
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
            pageSize: paging?.itemsPerPage,
            total: paging?.totalItems,
            current: paging?.currentPage,
          }}
          onChange={(pagination) => {
            setPage(pagination.current);
            dispatch(
              getAdminPartner({
                page: pagination.current,
                idSpecialty: specialty !== null ? specialty : undefined,
                TypePartner: typePartner !== null ? typePartner : undefined,
                search: inputSearch !== "" ? inputSearch : undefined,
              })
            );
          }}
        />
      </div>
    </div>
  );
};

export default ManagementPartner;
