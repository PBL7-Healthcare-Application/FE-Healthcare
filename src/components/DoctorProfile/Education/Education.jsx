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
} from "antd";
import "../Certification/Certification.scss";
import { CloseOutlined, DeleteTwoTone, EditOutlined } from "@ant-design/icons";
import { iconCertificate } from "../../../helpers/icon";
import { useSelector } from "react-redux";
import { useState } from "react";

const Education = ({ type }) => {
  const { profile } = useSelector((state) => state.doctor);
  const [education, setEducation] = useState([{}]);
  const [isAdd, setIsAdd] = useState(false);
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
      <Modal open={isAdd} onCancel={() => setIsAdd(false)} width={600}>
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
                      <Form.Item
                        style={{
                          marginBottom: 0,
                        }}
                      >
                        <Form.Item
                          label="School Name"
                          name={[field.name, "schoolName"]}
                          style={{
                            display: "inline-block",
                            width: "calc(50% - 8px)",
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
                        <Form.Item
                          label="Major"
                          name={[field.name, "major"]}
                          style={{
                            display: "inline-block",
                            width: "calc(50% - 8px)",
                            margin: "0 8px",
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
                      </Form.Item>
                      <Form.Item
                        style={{
                          marginBottom: 0,
                        }}
                      >
                        <Form.Item
                          name={[field.name, "startYear"]}
                          label="Start Year"
                          style={{
                            display: "inline-block",
                            width: "calc(50% - 8px)",
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
                        <Form.Item
                          name={[field.name, "endYear"]}
                          label="End Year"
                          style={{
                            display: "inline-block",
                            width: "calc(50% - 8px)",
                            margin: "0 8px",
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
            status: iconCertificate(item?.statusVerified),
          }))}
          bordered
        />
      </div>
    </div>
  );
};

export default Education;
