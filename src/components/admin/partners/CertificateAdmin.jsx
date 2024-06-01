/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Form, Image, Modal, Select, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { iconCertificate } from "../../../helpers/icon";
import { useState } from "react";
import { addVerifyCertificate } from "../../../stores/admin/AdminSlice";
import certificateImg from "../../../assets/images/certificate.png";
import calandar from "../../../assets/images/calandar.png";
const CertificateAdmin = ({ partner }) => {
  const { partnerDetail } = useSelector((state) => state.admin);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [key, setKey] = useState(0);
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
      title: "Year",
      dataIndex: "year",
      align: "center",
      width: "20%",
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
        <>
          <Space size={"middle"}>
            <Select
              disabled={record.verify === 1 ? true : false}
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
        </>
      ),
    });
  }
  return (
    <div className="certificate-main">
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="certificate-modal">
          <span
            className="setting-font"
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#185FA0",
              marginBottom: 30,
            }}
          >
            Certificate
          </span>
          <div className="certificate-modal__item">
            <div style={{ width: "50%" }}>
              <Image
                src={key > 0 && partnerDetail?.certificates[key - 1].image}
                width={"100%"}
                style={{ borderRadius: 10 }}
              />
            </div>
            <div className="certificate-modal__infor">
              <div>
                <Form.Item>
                  <div>
                    <Image src={certificateImg} preview={false} width={30} />
                    <span className="setting-font" style={{ color: "#696862" }}>
                      Name
                    </span>
                  </div>
                  <span
                    className="setting-font"
                    style={{ color: "#696862", marginTop: 10 }}
                  >
                    {key > 0 && partnerDetail?.certificates[key - 1].name}
                  </span>
                </Form.Item>
                <Form.Item>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image src={calandar} preview={false} width={30} />
                    <span
                      className="setting-font"
                      style={{ color: "#696862", marginLeft: 5 }}
                    >
                      Year
                    </span>
                  </div>
                  <span
                    className="setting-font"
                    style={{ color: "#696862", marginTop: 10 }}
                  >
                    {key > 0 && partnerDetail?.certificates[key - 1].year}
                  </span>
                </Form.Item>
                <span>
                  {iconCertificate(
                    key > 0 && partnerDetail?.certificates[key - 1].statusVerified
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="certificate">
        <Table
          pagination={false}
          columns={columns}
          dataSource={partnerDetail?.certificates.map((item, index) => ({
            id: item.idCertificate,
            key: index + 1,
            name: item?.name,
            year: item?.year,
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
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setKey(record.key);
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
