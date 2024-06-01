/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Typography,
  notification,
} from "antd";
import "../Certification/Certification.scss";
import { CloseOutlined, DeleteTwoTone, EditOutlined } from "@ant-design/icons";
import { iconCertificate } from "../../../helpers/icon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setError,
  setMessage,
  setStatusCode,
} from "../../../stores/doctor/DoctorSlice";
import { openNotificationWithIcon } from "../../notification/CustomNotify";
import {
  doctorAddEducation,
  doctorDeleteEducation,
  doctorUpdateEducation,
  getDoctorProfile,
} from "../../../stores/doctor/DoctorThunk";
import dayjs from "dayjs";

const Education = ({ type }) => {
  const { profile, loading, statusCode, error, message } = useSelector(
    (state) => state.doctor
  );
  const [education, setEducation] = useState([{}]);
  const [idAppointment, setIdAppointment] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isDelete, setIsDelete] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const columns = [
    {
      title: "",
      dataIndex: "key",
      align: "center",
      width: "5%",
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
          <EditOutlined
            className="certificate-iconEdit"
            style={{ fontSize: 20, color: "rgb(51, 114, 254)" }}
            onClick={() => {
              console.log(record);
              setIsAdd(true);
              setIsEdit(true);
              setIdAppointment(record?.id);
              form.setFieldsValue({
                education: [
                  {
                    schoolName: record?.name,
                    major: record?.major,
                    startYear:
                      record?.startYear &&
                      dayjs(record?.startYear?.toString(), "YYYY"),
                    endYear:
                      record?.endYear &&
                      dayjs(record?.endYear?.toString(), "YYYY"),
                  },
                ],
              });
            }}

          //   onClick={handleShowDeleteModal}
          />
          <DeleteTwoTone
            twoToneColor="#EB1B36"
            className="function-box__delete"
            onClick={() => {
              setIsDelete(true);
              setIdAppointment(record?.id);
            }}
          />
        </Space>
      ),
    },
  ];
  useEffect(() => {
    if (statusCode === 200) {
      dispatch(setStatusCode(null));
      dispatch(setMessage(null));
      openNotificationWithIcon("success", api, "", message);
      dispatch(getDoctorProfile());
      setIsAdd(false);
      setIsEdit(false);
      setIsDelete(false);
      setEducation([{}]);
      form.resetFields();
    }
    if (error !== null) {
      openNotificationWithIcon("error", api, "", error);
      dispatch(setError(null));
      setIsAdd(false);
      setIsEdit(false);
      setIsDelete(false);
      setEducation([{}]);
      form.resetFields();
    }
  }, [statusCode, error, api, dispatch]);
  const onFinish = (values) => {
    const body = values.education.map((item) => {
      return {
        schoolName: item.schoolName,
        major: item.major,
        startYear: item.startYear.$y,
        endYear: item.endYear.$y,
      };
    });
    if (isEdit) {
      dispatch(
        doctorUpdateEducation({
          ...body[0],
          idTrainingProcess: idAppointment,
        })
      );
    } else {
      dispatch(doctorAddEducation(body));
    }
  };
  return (
    <div className="certificate-main">
      {type === "DOCTOR" && (
        <span
          className="setting-font"
          style={{ fontSize: 25, fontWeight: 600, color: "#185FA0" }}
        >
          Educations
        </span>
      )}
      <Modal open={isDelete}

        onCancel={() => setIsDelete(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}>
        <div className="modalDelete">
          <span className="setting-font" style={{ color: "#404040", fontSize: 18, fontWeight: 500 }}>Are you sure you want to delete this education?</span>
          <div className="modalDelete-btn">
            <Button className="modalDelete-btn__Delete" onClick={() => dispatch(doctorDeleteEducation(idAppointment))}>Delete</Button>
            <Button className="modalDelete-btn__Cancel" onClick={() => setIsDelete(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={isAdd}
        onCancel={() => {
          setIsEdit(false);
          setIsAdd(false);
          setEducation([{}]);
          form.resetFields();
        }}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        width={600}
      >
        <div
          style={{ width: "100%", justifyContent: "center", display: "flex" }}
        >
          <span
            className="setting-font"
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#185FA0",
            }}
          >
            Education
          </span>
        </div>
        <Form
          style={{ marginTop: 20 }}
          initialValues={{
            education,
          }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item style={{ width: "100%" }}>
            <Form.List name="education" label="Certificates">
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
                          display: "flex",
                          rowGap: 16,
                          flexDirection: "row",
                          gap: 30,
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <Typography>School Name</Typography>
                          <Form.Item
                            name={[field.name, "schoolName"]}
                            style={{
                              margin: "8px 0",
                            }}
                            rules={[
                              {
                                required: true,
                                message: "School Name is required",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </div>

                        <div style={{ flex: 1 }}>
                          <Typography>Major</Typography>
                          <Form.Item
                            name={[field.name, "major"]}
                            style={{
                              margin: "8px 0",
                            }}
                            rules={[
                              {
                                required: true,
                                message: "Major is required",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          rowGap: 16,
                          flexDirection: "row",
                          gap: 30,
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <Typography>Start Year</Typography>
                          <Form.Item
                            name={[field.name, "startYear"]}
                            style={{
                              margin: "8px 0",
                            }}
                            rules={[
                              {
                                required: true,
                                message: "Start year is required",
                              },
                            ]}
                          >
                            <DatePicker
                              picker="year"
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </div>
                        <div style={{ flex: 1 }}>
                          <Typography>End Year</Typography>
                          <Form.Item
                            name={[field.name, "endYear"]}
                            style={{
                              margin: "8px 0",
                            }}
                            rules={[
                              {
                                required: true,
                                message: "End year is required",
                              },
                            ]}
                          >
                            <DatePicker
                              picker="year"
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </div>
                      </div>
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
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
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
              Add Education
            </Button>
          </div>
        )}
        {contextHolder}
        <Table
          pagination={false}
          columns={columns}
          dataSource={profile?.trainingProcess.map((item, index) => ({
            id: item.idTrainingProcess,
            key: index + 1,
            name: item?.schoolName,
            major: item?.major,
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
                {" "}
                {iconCertificate(item?.statusVerified)}
              </div>
            ),
          }))}
          bordered
        />
      </div>
    </div>
  );
};

export default Education;
