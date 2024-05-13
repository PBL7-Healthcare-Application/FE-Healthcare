/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Form,
  Image,
  Input,
  Select,
  Typography,
  Upload,
} from "antd";
import partner1 from "../../assets/images/partner1.webp";
import error from "../../assets/images/error.png";
import benefit_1 from "../../assets/images/benefit_1.webp";
import benefit_2 from "../../assets/images/benefit_2.webp";
import benefit_3 from "../../assets/images/benefit_3.webp";
import benefit_4 from "../../assets/images/benefit_4.webp";
import step_1 from "../../assets/images/step_1.webp";
import step_2 from "../../assets/images/step_2.webp";
import step_3 from "../../assets/images/step_3.webp";
import verify from "../../assets/images/verify.avif";
import "./Partner.scss";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllSpecialty } from "../../api/doctor.api";
import getImageUpload from "../../helpers/uploadCloudinary";

const Partner = () => {
  const [isEducation, setIsEducation] = useState(false);
  const [isExperience, setIsExperience] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [form] = Form.useForm();
  const [certificates] = useState([{}]);
  const [educations] = useState([{}]);
  const [experiences] = useState([{}]);
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
  useEffect(() => {
    form.setFieldsValue({
      certificates,
      educations,
      experiences,
    });
  }, [form, certificates, educations, experiences]);

  const getSpecialties = async () => {
    try {
      const response = await getAllSpecialty();
      setSpecialties(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSpecialties();
  }, []);

  const onFinish = async (values) => {
    console.log(values);
    // const res = await getImageUpload(values.businessLicense.file.originFileObj);
    // console.log(res);
    form.resetFields();
    form.setFieldsValue({
      certificates,
      educations,
      experiences,
    });
  };
  return (
    <div className="partner">
      <div className="partner-main">
        <div className="partner-content1">
          <div className="partner-content1__left">
            <div style={{ width: "100%" }}>
              <span className="partner-font">Enclinic</span>
            </div>
            <span
              className="partner-font"
              style={{ fontSize: 40, color: "#000", fontWeight: 600 }}
            >
              {" "}
              need dedicated doctors like you
            </span>
            <div style={{ width: "100%", marginTop: 40 }}>
              <a href="#form" className="partner-content1__left-button">
                Join Our Team
              </a>
            </div>
          </div>
          <div className="partner-content1__right">
            <Image
              src={partner1}
              fallback={error}
              preview={false}
              width="100%"
              className="partner-content1__right-img"
            />
          </div>
        </div>
        <div className="partner-content2">
          <span
            className="partner-font"
            style={{
              fontSize: 35,
              color: "#000",
              fontWeight: 600,
              marginBottom: 30,
            }}
          >
            What are the benefits of being a doctor?
          </span>
          <div className="partner-content2__benefit">
            <div className="partner-content2__item">
              <Image src={benefit_1} width={200} preview={false} />
              <span className="partner-content2__item-textMain">
                Convenient Health Consultation
              </span>
              <span className="partner-content2__item-text">
                Doctors can easily provide direct medical examinations and
                treatments to multiple individuals, as well as offer
                consultations to patients from anywhere without the need for
                travel
              </span>
            </div>
            {/* ====== */}
            <div className="partner-content2__item">
              <Image src={benefit_2} width={200} preview={false} />
              <span className="partner-content2__item-textMain">
                Flexible Time
              </span>
              <span className="partner-content2__item-text">
                Doctors can choose the most suitable time of the day to
                participate in medical examinations or consultations.
              </span>
            </div>
            {/* ======= */}
            <div className="partner-content2__item">
              <Image src={benefit_3} width={200} preview={false} />
              <span className="partner-content2__item-textMain">
                Developing Skills & Expertise
              </span>
              <span className="partner-content2__item-text">
                Participating in answering health-related inquiries helps
                improve the skills of doctors, as well as allows them to acquire
                additional knowledge through sharing with other colleagues at
                Enclinic.
              </span>
            </div>
            {/* ======= */}
            <div className="partner-content2__item">
              <Image src={benefit_4} width={200} preview={false} />
              <span className="partner-content2__item-textMain">
                Enhancing Reputation & Income
              </span>
              <span className="partner-content2__item-text">
                With the doctor rating system, assisting more people will
                enhance trust from users and increase income opportunities
                through direct health consultations.
              </span>
            </div>
          </div>
        </div>
        <div className="partner-content3">
          <div className="partner-content3__left">
            <div className="partner-content3__left-textArea">
              <span className="partner-content3__left-text">
                Create a doctor profile
              </span>
              <span
                className="partner-content3__left-text"
                style={{ color: "#185FA0", fontSize: 40 }}
              >
                Free
              </span>
              <span className="partner-content3__left-text">
                with just 4 simple steps
              </span>
            </div>
            <div className="partner-content3__left-content">
              <div className="partner-content3__left-content__item">
                <Image src={step_3} width={100} preview={false} />
                <div className="partner-content3__left-content__step">
                  <span className="partner-content3__left-content__text">
                    Step 1
                  </span>
                  <span
                    style={{ maxWidth: 300, fontWeight: 400 }}
                    className="partner-content3__left-content__text"
                  >
                    Complete all information for the User's profile.
                  </span>
                </div>
              </div>
              <div className="partner-content3__left-content__item">
                <Image src={step_1} width={100} preview={false} />
                <div className="partner-content3__left-content__step">
                  <span className="partner-content3__left-content__text">
                    Step 2
                  </span>
                  <span
                    style={{ maxWidth: 300, fontWeight: 400 }}
                    className="partner-content3__left-content__text"
                  >
                    Create a new doctor profile using the registration form.
                  </span>
                </div>
              </div>
              <div className="partner-content3__left-content__item">
                <Image src={verify} width={100} preview={false} />
                <div className="partner-content3__left-content__step">
                  <span className="partner-content3__left-content__text">
                    Step 3
                  </span>
                  <span
                    className="partner-content3__left-content__text"
                    style={{ maxWidth: 300, fontWeight: 400 }}
                  >
                    Enclinic verifies profiles.
                  </span>
                </div>
              </div>
              <div className="partner-content3__left-content__item">
                <Image src={step_2} width={100} preview={false} />
                <div className="partner-content3__left-content__step">
                  <span className="partner-content3__left-content__text">
                    Step 4
                  </span>
                  <span
                    className="partner-content3__left-content__text"
                    style={{ maxWidth: 300, fontWeight: 400 }}
                  >
                    Provide additional information about the doctor's missing
                    details.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="partner-content3__right">
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {" "}
              <span
                className="partner-content3__left-text"
                style={{ fontSize: 20 }}
                id="form"
              >
                Register as Collaborator
              </span>
            </div>
            <div style={{ marginTop: 20 }}>
              <Form
                name="normal_login"
                // className="login-form"
                form={form}
                onFinish={onFinish}
                layout="vertical"
                style={{
                  width: "100%",
                  backgroundColor: "#fafafa",
                  padding: 20,
                  borderRadius: 10,
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  style={{ marginBottom: 10, fontWeight: 500, fontSize: 20 }}
                >
                  Information
                </Typography>
                <Form.Item className="login-form" style={{ width: "100%" }}>
                  <Form.Item
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    <Form.Item
                      label="Specialty"
                      name="specialty"
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Specialty is required",
                        },
                      ]}
                    >
                      <Select
                        options={specialties.map((item) => ({
                          label: item.name,
                          value: item.idSpecialty,
                        }))}
                      />
                    </Form.Item>
                    <Form.Item
                      name="nameClinic"
                      label="Clinic Name"
                      rules={[
                        {
                          required: true,
                          message: "Clinic Name is required",
                        },
                      ]}
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>

                  <Form.Item
                    name="businessLicense"
                    label="Upload Business License"
                    rules={[
                      {
                        required: true,
                        message: "Business License is required",
                      },
                    ]}
                  >
                    <Upload {...propsUpload}>
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
                </Form.Item>
                {/* ===== */}
                <Typography
                  style={{ marginBottom: 10, fontWeight: 500, fontSize: 20 }}
                >
                  Certificates
                </Typography>
                <Form.Item className="login-form" style={{ width: "100%" }}>
                  <Form.List name="certificates" label="Certificates">
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
                                name={[field.name, "certificate"]}
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
                              name={[field.name, "imgCertificate"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Image Certificate is required",
                                },
                              ]}
                            >
                              <Upload {...propsUpload}>
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

                {/* ===== */}
                <div className="partner-content3__education">
                  <Checkbox
                    value={isEducation}
                    onChange={(e) => setIsEducation(e.target.checked)}
                  />
                  <Typography style={{ fontWeight: 500, fontSize: 20 }}>
                    Educations
                  </Typography>
                </div>
                {isEducation && (
                  <Form.Item className="login-form" style={{ width: "100%" }}>
                    <Form.List name="educations" label="Certificates">
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
                                >
                                  <DatePicker
                                    picker="year"
                                    style={{ width: "100%" }}
                                  />
                                </Form.Item>
                                <Form.Item
                                  name={[field.name, "endYear"]}
                                  label="End Year"
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
                            </Card>
                          ))}

                          <Button type="dashed" onClick={() => add()} block>
                            + Add Item
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                )}

                {/* ====== */}
                <div className="partner-content3__education">
                  <Checkbox
                    value={isExperience}
                    onChange={(e) => setIsExperience(e.target.checked)}
                  />
                  <Typography style={{ fontWeight: 500, fontSize: 20 }}>
                    Experiences
                  </Typography>
                </div>
                {isExperience && (
                  <Form.Item className="login-form" style={{ width: "100%" }}>
                    <Form.List name="experiences">
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
                                  label="Workplace"
                                  name={[field.name, "workPlace"]}
                                  style={{
                                    display: "inline-block",
                                    width: "calc(50% - 8px)",
                                  }}
                                >
                                  <Input />
                                </Form.Item>
                                <Form.Item
                                  label="Position"
                                  name={[field.name, "position"]}
                                  style={{
                                    display: "inline-block",
                                    width: "calc(50% - 8px)",
                                    margin: "0 8px",
                                  }}
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
                                >
                                  <DatePicker
                                    picker="year"
                                    style={{ width: "100%" }}
                                  />
                                </Form.Item>
                                <Form.Item
                                  name={[field.name, "endYear"]}
                                  label="End Year"
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
                            </Card>
                          ))}

                          <Button type="dashed" onClick={() => add()} block>
                            + Add Item
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                )}

                <Form.Item
                  style={{
                    width: "100%",
                    marginTop: 30,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button htmlType="submit" className="partner-button">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
