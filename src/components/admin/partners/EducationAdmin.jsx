/* eslint-disable react/prop-types */
import { Modal, Select, Space, Table } from "antd";
import { DeleteTwoTone, EditOutlined } from "@ant-design/icons";
import { iconCertificate } from "../../../helpers/icon";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addVerifyEducation } from "../../../stores/admin/AdminSlice";

const EducationAdmin = () => {
  const { partnerDetail } = useSelector((state) => state.admin);
  const [isAdd, setIsAdd] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const dispatch = useDispatch();
  const handleVerify = (value, record) => {
    dispatch(
      addVerifyEducation({
        idTrainingProcess: record?.id,
        statusVerified: value,
      })
    );
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "key",
      align: "center",
    },
    {
      title: "School Name",
      dataIndex: "name",
      align: "center",
    },

    {
      title: "Major",
      dataIndex: "major",
      align: "center",
    },
    {
      title: "Start Year",
      dataIndex: "startYear",
      align: "center",
    },
    {
      title: "End Year",
      dataIndex: "endYear",
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
        <Space size={"middle"}>
          <Select
            disabled={isDisable}
            onChange={(value) => handleVerify(value, record)}
            placeholder="-- select --"
            style={{ height: 32, color: "#6c81a0" }}
            //   onChange={handleTypePartnerChange}
            options={[
              { value: 1, label: "Approved" },
              { value: 2, label: "Reject" },
            ]}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="certificate-main">
      <Modal open={isAdd} onCancel={() => setIsAdd(false)} width={600}></Modal>
      <div className="certificate">
        <Table
          pagination={false}
          columns={columns}
          dataSource={partnerDetail?.trainingProcess.map((item, index) => ({
            id: item.idTrainingProcess,
            key: index + 1,
            name: item?.schoolName,
            major: item?.major,
            startYear: item?.startYear,
            endYear: item?.endYear,
            status: iconCertificate(item?.statusVerified),
          }))}
          bordered
        />
      </div>
    </div>
  );
};

export default EducationAdmin;
