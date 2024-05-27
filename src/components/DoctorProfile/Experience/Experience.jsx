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
import { setError, setStatusCode } from "../../../stores/doctor/DoctorSlice";
import { openNotificationWithIcon } from "../../notification/CustomNotify";
import {
  doctorAddExperience,
  doctorUpdateExperience,
  getDoctorProfile,
} from "../../../stores/doctor/DoctorThunk";
import dayjs from "dayjs";
import { setMessage } from "../../../stores/admin/AdminSlice";

const Experience = ({ type }) => {
  const { profile, statusCode, error, loading, message } = useSelector(
    (state) => state.doctor
  );
  const [experience, setExperience] = useState([{}]);
  const [iD, setID] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const columns = [
    {
      title: "Id",
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
              setIsAdd(true);
              setIsEdit(true);
              setID(record?.id);
              form.setFieldsValue({
                experience: [
                  {
                    position: record?.position,
                    workplace: record?.name,
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
          />
          <DeleteTwoTone
            twoToneColor="#EB1B36"
            className="function-box__delete"
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
      setExperience([{}]);
      form.resetFields();
    }
    if (error !== null) {
      openNotificationWithIcon("error", api, "", error);
      dispatch(setError(null));
      setIsAdd(false);
      setIsEdit(false);
      setExperience([{}]);
      form.resetFields();
    }
  }, [statusCode, error, api, dispatch]);

  const onFinish = (values) => {
    const body = values.experience.map((item) => {
      return {
        workplace: item.workplace,
        position: item.position,
        startYear: item.startYear.$y,
        endYear: item.endYear.$y,
      };
    });
    if (isEdit) {
      dispatch(
        doctorUpdateExperience({
          ...body[0],
          idWorkingProcess: iD,
        })
      );
    } else {
      dispatch(doctorAddExperience(body));
    }
  };
  return (
    <div className="certificate-main">
      {type === "DOCTOR" && (
        <span
          className="setting-font"
          style={{ fontSize: 25, fontWeight: 600, color: "#185FA0" }}
        >
          Experiences
        </span>
      )}
      <Modal
        open={isAdd}
        onCancel={() => {
          setIsAdd(false);
          setExperience([{}]);
          form.resetFields();
          setIsEdit(false);
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
            Experience
          </span>
        </div>
        <Form
          style={{ marginTop: 20 }}
          initialValues={{
            experience,
          }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item style={{ width: "100%" }}>
            <Form.List name="experience">
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
                          <Typography>Workplace</Typography>
                          <Form.Item
                            name={[field.name, "workplace"]}
                            style={{
                              margin: "8px 0",
                            }}
                            rules={[
                              {
                                required: true,
                                message: "Workplace is required",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </div>
                        <div style={{ flex: 1 }}>
                          <Typography>Position</Typography>
                          <Form.Item
                            name={[field.name, "position"]}
                            style={{
                              margin: "8px 0",
                            }}
                            rules={[
                              {
                                required: true,
                                message: "Position is required",
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
                            style={{ margin: "8px 0" }}
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
                            style={{ margin: "8px 0" }}
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
              Add Experience
            </Button>
          </div>
        )}
        {contextHolder}
        <Table
          pagination={false}
          columns={columns}
          dataSource={profile?.workingProcess.map((item, index) => ({
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

export default Experience;
