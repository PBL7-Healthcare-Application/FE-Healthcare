import { Form, Image, Input, Modal, Space, Table } from "antd";
import "./Certification.scss";
import { DeleteTwoTone, EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { iconCertificate } from "../../../helpers/icon";
import { useState } from "react";
import certificate from "../../../assets/images/certificate.png";
import calandar from "../../../assets/images/calandar.png";

const Certification = () => {
  const { profile } = useSelector((state) => state.doctor);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [key, setKey] = useState(0);

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
  return (
    <div className="certificate-main">
      <span
        className="setting-font"
        style={{ fontSize: 25, fontWeight: 600, color: "#185FA0" }}
      >
        Certificates
      </span>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                src="https://cdn.venngage.com/template/thumbnail/small/5bdeb833-5514-4c2d-9d67-b269371bb924.webp"
                width={"100%"}
                style={{ borderRadius: 10 }}
              />
            </div>
            <div className="certificate-modal__infor">
              <Form>
                <Form.Item>
                  <div>
                    <Image src={certificate} preview={false} width={30} />
                    <span className="setting-font" style={{ color: "#696862" }}>
                      Name
                    </span>
                  </div>
                  <span
                    className="setting-font"
                    style={{ color: "#696862", marginTop: 10 }}
                  >
                    {key > 0 && profile?.certificates[key - 1].name}
                  </span>
                  {/* <Input
                    value={profile?.address}
                    className={`input__username input ${
                      true && "profileDr-input"
                    }`}
                    disabled={true}
                    onChange={(e) => {
                      e.target.value = e.target.value.trim();
                    }}
                    style={{ height: 30 }}
                  /> */}
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
                    {key > 0 && profile?.certificates[key - 1].year}
                  </span>
                  {/* <Input
                    value={profile?.address}
                    className={`input__username input ${
                      true && "profileDr-input"
                    }`}
                    disabled={true}
                    onChange={(e) => {
                      e.target.value = e.target.value.trim();
                    }}
                    style={{ height: 30 }}
                  /> */}
                </Form.Item>
                <span>
                  {iconCertificate(
                    key > 0 && profile?.certificates[key - 1].statusVerified
                  )}
                </span>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
      <div className="certificate">
        <Table
          columns={columns}
          dataSource={profile?.certificates.map((item, index) => ({
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

export default Certification;
