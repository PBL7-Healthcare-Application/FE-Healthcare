/* eslint-disable react/prop-types */
import { Modal, Select, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { iconCertificate } from "../../../helpers/icon";
import { useState } from "react";
import { addVerifyCertificate } from "../../../stores/admin/AdminSlice";

const CertificateAdmin = ({ partner }) => {
  const { partnerDetail } = useSelector((state) => state.admin);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const dispatch = useDispatch();
  const handleVerify = (value, record) => {
    dispatch(
      addVerifyCertificate({
        idCertificate: record?.id,
        statusVerified: value,
      })
    );
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
      title: "Year",
      dataIndex: "year",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
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
        <>
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
        </>
      ),
    });
  }
  return (
    <div className="certificate-main">
      {/* <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      ></Modal> */}

      <div className="certificate">
        <Table
          pagination={false}
          columns={columns}
          dataSource={partnerDetail?.certificates.map((item, index) => ({
            id: item.idCertificate,
            key: index + 1,
            name: item?.name,
            year: item?.year,
            status: iconCertificate(item?.statusVerified),
          }))}
          bordered
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setIsModalOpen(true);
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default CertificateAdmin;
