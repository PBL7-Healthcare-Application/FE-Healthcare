/* eslint-disable react/prop-types */
import { Modal, Select, Space, Table } from "antd";
import { iconCertificate } from "../../../helpers/icon";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addVerifyExperience } from "../../../stores/admin/AdminSlice";

const ExperienceAdmin = ({ partner }) => {
  const { partnerDetail } = useSelector((state) => state.admin);
  const [isAdd, setIsAdd] = useState(false);

  const dispatch = useDispatch();
  const handleVerify = (value, record) => {
    dispatch(
      addVerifyExperience({
        idWorkingProcess: record?.id,
        statusVerified: value,
      })
    );
  };
  const columns = [
    {
      title: "",
      dataIndex: "key",
      align: "center",
      width: "5%",
    },
    {
      title: "Workplace",
      dataIndex: "name",
      align: "center",
    },

    {
      title: "Position",
      dataIndex: "position",
      align: "center",
    },
    {
      title: "Start Year",
      dataIndex: "startYear",
      align: "center",
      width: "10%",
    },
    {
      title: "End Year",
      dataIndex: "endYear",
      align: "center",
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      width: "15%",
    },
  ];
  if (partner === "partner") {
    columns.push({
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
            // disabled={record.verify === 1 ? true : false}
            onChange={(value) => handleVerify(value, record)}
            placeholder="--Select--"
            style={{ height: 32, color: "#6c81a0" }}
            //   onChange={handleTypePartnerChange}
            options={[
              { value: 1, label: "Approved" },
              { value: 2, label: "Reject" },
            ]}
          />
        </Space>
      ),
    });
  }

  return (
    <div className="certificate-main">
      <Modal open={isAdd} onCancel={() => setIsAdd(false)} width={600}></Modal>
      <div className="certificate">
        <Table
          pagination={false}
          columns={columns}
          dataSource={partnerDetail?.workingProcess.map((item, index) => ({
            id: item.idWorkingProcess,
            key: index + 1,
            name: item?.workplace,
            position: item?.position,
            startYear: item?.startYear,
            endYear: item?.endYear,
            status: (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {iconCertificate(item?.statusVerified)}
              </div>
            ),
            verify: item?.statusVerified,
          }))}
          bordered
        />
      </div>
    </div>
  );
};

export default ExperienceAdmin;
