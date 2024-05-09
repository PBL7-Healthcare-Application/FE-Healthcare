import {
  Button,
  Card,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
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
import "./Partner.scss";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";

const Partner = () => {
  const { Option } = Select;
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );
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
                with just 2 simple steps
              </span>
            </div>
            <div className="partner-content3__left-content">
              <div className="partner-content3__left-content__item">
                <Image src={step_1} width={100} preview={false} />
                <div className="partner-content3__left-content__step">
                  <span className="partner-content3__left-content__text">
                    Step 1
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
                <Image src={step_2} width={100} preview={false} />
                <div className="partner-content3__left-content__step">
                  <span className="partner-content3__left-content__text">
                    Step 2
                  </span>
                  <span
                    className="partner-content3__left-content__text"
                    style={{ maxWidth: 300, fontWeight: 400 }}
                  >
                    Enclinic verifies profiles.
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
                className="login-form"
                initialValues={{
                  remember: true,
                  items: [{}],
                }}
                layout="vertical"
                style={{ width: "100%" }}
              >
                <Form.Item
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                    }}
                  >
                    <Input
                      addonBefore={prefixSelector}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="yearOfExperience"
                    label="Year Of Experience"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <InputNumber
                      min={0}
                      defaultValue={0}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Form.Item>
                <Form.Item
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    label="Specialty"
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                    }}
                  >
                    <Select>
                      <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="price"
                    label="Price"
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <InputNumber
                      min={0}
                      defaultValue={0}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Form.Item>
                <Form.Item
                  name="name"
                  label="Clinic Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="upload"
                  label="Upload Business License"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>

                {/* ===== */}
                <Typography style={{ marginBottom: 10 }}>
                  Certificates
                </Typography>
                <Form.List name="items" label="Certificates">
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
                          title={`Certificate ${field.name + 1}`}
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
                              style={{
                                display: "inline-block",
                                width: "calc(50% - 8px)",
                              }}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              name="price"
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
                            name="upload"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                          >
                            <Upload
                              name="logo"
                              action="/upload.do"
                              listType="picture"
                            >
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
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
