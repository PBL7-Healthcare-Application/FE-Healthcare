/* eslint-disable react/prop-types */
import { Button, Card, DatePicker, Form, Image, Input, Modal, Space, Table, Upload } from "antd";
import "./Certification.scss";
import { CloseOutlined, DeleteTwoTone, EditOutlined, UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { iconCertificate } from "../../../helpers/icon";
import { useState } from "react";
import certificate from "../../../assets/images/certificate.png";
import calandar from "../../../assets/images/calandar.png";

const Certification = ({ type }) => {
  const { profile } = useSelector((state) => state.doctor);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [key, setKey] = useState(0);
  const [isAdd, setIsAdd] = useState(false);
  const [certificate, setCertificate] = useState([{}]);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const propsUpload = {
    // action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    maxCount: 1,
    accept: "image/* ",
    onChange({ file, fileList }) {
      if (file.status === "error") {
        return { ...file, status: "error" };
      }

      if (file.status === "removed") {
        return undefined;
      }
      if (file.status === "done") {
        return { ...file, status: "done" };
      }
      return file;
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        console.log("Not an image file!");
      }
      return isImage || Upload.LIST_IGNORE;
    },
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
      {type === "DOCTOR" && (
        <span
          className="setting-font"
          style={{ fontSize: 25, fontWeight: 600, color: "#185FA0" }}
        >
          Certificates
        </span>
      )}
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}>
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
      <Modal onCancel={() => setIsAdd(false)} open={isAdd}>
        <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
          <span
            className="setting-font"
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#185FA0",
            }}
          >
            Certificate
          </span>
        </div>
        <Form style={{ marginTop: 20 }} initialValues={{
          certificate

        }}>
          <Form.Item style={{ width: "100%" }}>
            <Form.List name="certificate" label="Certificates">
              {(fields, { add, remove }) => (
                <div
                  style={{
                    display: "flex",
                    rowGap: 16,
                    flexDirection: "column",
                  }}
                >
                  {fields.map((field) => (
                    <Card
                      size="small"
                      key={field.key}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      <Form.Item
                        style={{
                          marginBottom: 0,
                        }}
                      >
                        <Form.Item
                          label="Certificate"
                          name={[field.name, "name"]}
                          style={{
                            display: "inline-block",
                            width: "calc(50% - 8px)",
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Certificate is required",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, "year"]}
                          rules={[
                            {
                              required: true,
                              message: "Year is required",
                            },
                          ]}
                          label="Year"
                          style={{
                            display: "inline-block",
                            width: "calc(50% - 8px)",
                            margin: "0 8px",
                          }}
                        >
                          <DatePicker
                            picker="year"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Form.Item>
                      <Form.Item
                        name={[field.name, "image"]}
                        rules={[
                          {
                            required: true,
                            message: "Image Certificate is required",
                          },
                        ]}
                      >
                        <Upload {...propsUpload} listType="picture">
                          <Button icon={<UploadOutlined />}>
                            Click to upload
                          </Button>
                        </Upload>
                      </Form.Item>
                    </Card>
                  ))}

                  <Button type="dashed" onClick={() => add()} block>
                    + Add Item
                  </Button>
                </div>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      </Modal>
      <div className="certificate">
        {
          type === "DOCTOR" && (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
              <Button className="certificate-button" onClick={() => setIsAdd(true)}>Add Certificate</Button>
            </div>
          )
        }
        <Table
          pagination={false}
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
