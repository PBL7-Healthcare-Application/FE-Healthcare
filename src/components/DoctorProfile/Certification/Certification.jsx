/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Table,
  Typography,
  Upload,
  notification,
} from "antd";
import "./Certification.scss";
import {
  CloseOutlined,
  DeleteTwoTone,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { iconCertificate } from "../../../helpers/icon";
import { useEffect, useState } from "react";
import certificateImg from "../../../assets/images/certificate.png";
import calandar from "../../../assets/images/calandar.png";
import { doctorAddCertificate, doctorDeleteCertificate, doctorUpdateCertificate, getDoctorProfile } from "../../../stores/doctor/DoctorThunk";
import { openNotificationWithIcon } from "../../notification/CustomNotify";
import { setError, setMessage, setStatusCode } from "../../../stores/doctor/DoctorSlice";
import dayjs from "dayjs";
import getImageUpload from "../../../helpers/uploadCloudinary";

const Certification = ({ type }) => {
  const [api, contextHolder] = notification.useNotification();
  const { profile, loading, statusCode, error, message } = useSelector((state) => state.doctor);
  const [form] = Form.useForm();
  const [fileUrl, setFileUrl] = useState(null);
  const [iD, setId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [key, setKey] = useState(0);
  const [isAdd, setIsAdd] = useState(false);
  const [certificate, setCertificate] = useState([{}]);
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const propsUpload = {
    maxCount: 1,
    accept: "image/* ",
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        console.log("Not an image file!");
        return false; // Prevent upload if file is not an image
      }
      return false;
    },
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
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      width: "20%",
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
          <Space size={"middle"}>
            <EditOutlined
              className="certificate-iconEdit"
              style={{ fontSize: 20, color: "rgb(51, 114, 254)" }}
              onClick={() => {
                setIsEdit(true);
                setIsAdd(true);
                setId(record?.id);
                form.setFieldsValue({
                  certificate: [
                    {
                      name: record?.name,
                      year: record?.year && dayjs(record?.year?.toString(), "YYYY"),
                    },
                  ],
                });
                setFileUrl(record?.image);
              }}
            />
            <DeleteTwoTone
              twoToneColor="#EB1B36"
              className="function-box__delete"
              onClick={() => {
                setIsDelete(true);
                setId(record?.id);
              }}
            />
          </Space>
        </>
      ),
    },
  ];
  const onFinish = (values) => {
    if (isEdit) {
      dispatch(doctorUpdateCertificate({
        name: values.certificate[0].name,
        year: values.certificate[0].year.$y,
        image: fileUrl,
        idCertificate: iD
      }))
    }
    else {
      dispatch(doctorAddCertificate(values.certificate));
    }
  }
  useEffect(() => {
    if (statusCode === 200) {
      dispatch(setStatusCode(null));

      openNotificationWithIcon("success", api, "", message);
      dispatch(setMessage(null));
      dispatch(getDoctorProfile());
      setIsAdd(false);
      setIsEdit(false);
      setIsDelete(false);
      setCertificate([{}]);
      setFileUrl(null);
      form.resetFields();
    }
    if (error !== null) {
      openNotificationWithIcon("error", api, "", error);
      dispatch(setError(null));
      setIsAdd(false);
      setIsEdit(false);
      setIsDelete(false);
      setCertificate([{}]);
      setFileUrl(null);
      form.resetFields();
    }
  }, [statusCode, error, api, dispatch]);



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
      <Modal open={isDelete}
        onCancel={() => setIsDelete(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}>
        <div className="modalDelete">
          <span className="setting-font" style={{ color: "#404040", fontSize: 18, fontWeight: 500 }}>Are you sure you want to delete this certificate?</span>
          <div className="modalDelete-btn">
            <Button className="modalDelete-btn__Delete" onClick={() => dispatch(doctorDeleteCertificate(iD))}>Delete</Button>
            <Button className="modalDelete-btn__Cancel" onClick={() => setIsDelete(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
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
                src={key > 0 && profile?.certificates[key - 1].image}
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
                </Form.Item>
                <span>
                  {iconCertificate(
                    key > 0 && profile?.certificates[key - 1].statusVerified
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal onCancel={() => {
        setIsEdit(false)
        setIsAdd(false)
        setCertificate([{}])
        form.resetFields()
      }} open={isAdd} okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}>
        <div
          style={{ width: "100%", justifyContent: "center", display: "flex" }}
        >
          {contextHolder}
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
        <Form
          style={{ marginTop: 20 }}
          initialValues={{
            certificate,
          }}
          onFinish={onFinish}
          form={form}
        >
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
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: "row",
                          gap: 20
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <Typography>Certificate</Typography>
                          <Form.Item
                            name={[field.name, "name"]}
                            rules={[
                              {
                                required: true,
                                message: "Certificate is required",
                              },
                            ]}
                            style={{
                              margin: "8px 0",
                            }}
                          >
                            <Input />
                          </Form.Item>
                        </div>
                        <div style={{ flex: 1 }}>
                          <Typography>Year</Typography>
                          <Form.Item
                            name={[field.name, "year"]}
                            rules={[
                              {
                                required: true,
                                message: "Year is required",
                              },
                            ]}

                            style={{
                              margin: "8px 0",
                            }}
                          >
                            <DatePicker picker="year" style={{ width: "100%" }} />
                          </Form.Item>
                        </div>
                      </div>
                      {!isEdit ? <Form.Item
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
                      </Form.Item> : (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                          <div style={{ flex: 1 }}><Image src={fileUrl} width={300} /></div>
                          <div style={{ flex: 1 }}>
                            <input
                              type="file"
                              id="img"
                              accept="image/*"
                              onChange={async (e) => {
                                const res = await getImageUpload(e.target.files[0]);
                                setFileUrl(res);
                              }}
                              style={{ display: 'none' }} // Ẩn input mặc định
                            />
                            <label htmlFor="img" style={{ cursor: 'pointer' }} className="customizeUpload">
                              <UploadOutlined style={{ fontSize: 20, marginRight: 5 }} />
                              Upload
                              {/* <Button icon={<UploadOutlined />} className="customizeUpload">Upload</Button> */}
                            </label>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}

                  {!isEdit && (
                    <Button type="dashed" onClick={() => add()} block>
                      + Add Item
                    </Button>
                  )}
                </div>
              )}
            </Form.List>
          </Form.Item>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            {!isEdit ? (
              <Button
                htmlType="submit"
                className="appointmentDetail-right__buttonEx"
                loading={loading}
              >
                Create
              </Button>
            ) : (
              <Button
                htmlType="submit"
                className="appointmentDetail-right__buttonEx"
                loading={loading}
              >
                Update
              </Button>
            )}
          </div>
        </Form>
      </Modal>
      <div className="certificate">
        {type === "DOCTOR" && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 10,
            }}
          >
            <Button
              className="certificate-button"
              onClick={() => setIsAdd(true)}
            >
              Add Certificate
            </Button>
          </div>
        )}
        <Table
          pagination={false}
          columns={columns}
          dataSource={profile?.certificates.map((item, index) => ({
            id: item.idCertificate,
            key: index + 1,
            name: item?.name,
            year: item?.year,
            status: <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}> {iconCertificate(item?.statusVerified)}</div>,
            image: item?.image,
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
