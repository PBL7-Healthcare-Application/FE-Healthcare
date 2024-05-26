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
import { doctorAddEducation, getDoctorProfile } from "../../../stores/doctor/DoctorThunk";

const Education = ({ type }) => {
  const { profile, loading, statusCode, error } = useSelector((state) => state.doctor);
  const [education, setEducation] = useState([{}]);
  const [isAdd, setIsAdd] = useState(false);
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
      render: () => (
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
      ),
    },
  ];
  useEffect(() => {
    if (statusCode === 200) {
      dispatch(setStatusCode(null));
      openNotificationWithIcon("success", api, "", "Update Profile Successfully!");
      dispatch(getDoctorProfile());
      setIsAdd(false);
      setEducation([{}]);
    }
    if (error !== null) {
      openNotificationWithIcon("error", api, "", error);
      dispatch(setError(null));
      setIsAdd(false);
      setEducation([{}]);
    }
  }, [statusCode, error, api, dispatch]);
  const onFinish = (values) => {
    const body = values.education.map((item) => {
      return {
        schoolName: item.schoolName,
        major: item.major,
        startYear: item.startYear.$y,
        endYear: item.endYear.$y,
      }
    })
    dispatch(doctorAddEducation(body));
  }
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
      <Modal open={isAdd}
        onCancel={() => {
          setIsAdd(false)
          setEducation([{}])
        }}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        width={600}>
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
                          gap: 30
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <Typography>School Name</Typography>
                          <Form.Item
                            name={[field.name, "schoolName"]}
                            style={{
                              margin: '8px 0'
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
                              margin: '8px 0'
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
                          gap: 30
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <Typography>Start Year</Typography>
                          <Form.Item
                            name={[field.name, "startYear"]}
                            style={{
                              margin: '8px 0'
                            }}
                            rules={[
                              {
                                required: true,
                                message: "Start year is required",
                              },
                            ]}
                          >
                            <DatePicker picker="year" style={{ width: "100%" }} />
                          </Form.Item>
                        </div>
                        <div style={{ flex: 1 }}>
                          <Typography>End Year</Typography>
                          <Form.Item
                            name={[field.name, "endYear"]}
                            style={{
                              margin: '8px 0'
                            }}
                            rules={[
                              {
                                required: true,
                                message: "End year is required",
                              },
                            ]}
                          >
                            <DatePicker picker="year" style={{ width: "100%" }} />
                          </Form.Item>
                        </div>

                      </div>
                    </Card>
                  ))}

                  <Button type="dashed" onClick={() => add()} block>
                    + Add Item
                  </Button>
                </div>
              )}
            </Form.List>
          </Form.Item>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button htmlType="submit" className="appointmentDetail-right__buttonEx" loading={loading}>Create</Button>
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
            status: <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}> {iconCertificate(item?.statusVerified)}</div>,
          }))}
          bordered
        />
      </div>
    </div>
  );
};

export default Education;
