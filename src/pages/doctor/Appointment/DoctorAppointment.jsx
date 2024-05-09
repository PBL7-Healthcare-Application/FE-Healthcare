import { SearchOutlined } from "@ant-design/icons";
import "./Appointment.scss";
import { Button, Input, Select, Table } from "antd";

const DoctorAppointment = () => {
  const columns = [
    {
      title: "Id",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      phone: 18889898989,
      date: "2021-10-10",
      time: "09:00 - 10:00",
    },
    {
      key: "2",
      name: "Jim Green",
      phone: 18889898888,
      date: "2021-10-10",
      time: "09:00 - 10:00",
    },
    {
      key: "3",
      name: "Joe Black",
      phone: 18900010002,
      date: "2021-10-10",
      time: "09:00 - 10:00",
    },
    {
      key: "4",
      name: "Jim Red",
      phone: 18900010002,
      date: "2021-10-10",
      time: "09:00 - 10:00",
    },
    {
      key: "5",
      name: "Jake White",
      phone: 18900010002,
      date: "2021-10-10",
      time: "09:00 - 10:00",
    },
  ];
  return (
    <div className="DoctorAppointment">
      <div className="DoctorAppointment-filter">
        <div
          className="search-box-content__third"
          style={{
            width: 500,
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <SearchOutlined className="search-box-content_icon" />
          <Input
            type="text"
            className="search__input-text"
            placeholder="Search for a patient..."
            style={{ border: "1px solid #a1a1aa" }}
          />
          <Button className="Schedule-content__left-button">Search</Button>
        </div>
        <div>
          <span>Status</span>
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            //   onChange={handleChange}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </div>
      </div>
      <div className="DoctorAppointment-filter">
        <Table columns={columns} dataSource={data} bordered />
      </div>
    </div>
  );
};

export default DoctorAppointment;
