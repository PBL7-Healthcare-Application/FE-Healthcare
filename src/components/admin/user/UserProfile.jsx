/* eslint-disable react/prop-types */
import "../../DoctorProfile/Profile/Profile.scss";
import { Button, DatePicker, Form, Input, Select, Typography } from "antd";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import { useState } from "react";

const UserProfile = ({ role }) => {
  const { profile } = useSelector((state) => state.doctor);
  const [isEdit, setIsEdit] = useState(false);

  const handleCancel = () => {
    setIsEdit(!isEdit);
  };
  const handleSave = () => {};
  return (
    <div className="profileDr" style={{ padding: "0 30px" }}>
      <div className="profileDr-content" style={{ marginTop: 0 }}>
        <Form
          name="normal_login"
          className="profileDr-content__form"
          initialValues={{
            remember: true,
          }}
          //   onFinish={onFinish}
        >
          <Form.Item
            style={{
              marginBottom: 0,
              marginRight: 30,
            }}
          >
            <Form.Item name="Name" normalize={(value) => value.trim()}>
              <Typography className="label">Name</Typography>
              <Input
                value={profile?.name}
                className={`input__username input ${
                  !isEdit && "profileDr-input"
                }`}
                disabled={!isEdit}
                onChange={(e) => {
                  e.target.value = e.target.value.trim();
                }}
              />
            </Form.Item>
          </Form.Item>
          {/* ============================== */}

          {role === "DOCTOR" && (
            <Form.Item
              style={{
                marginBottom: 0,
              }}
            >
              <Form.Item
                name="Name"
                normalize={(value) => value.trim()}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 30px)",
                }}
              >
                <Typography className="label">Year Of Experience</Typography>
                <Input
                  value={profile?.yearExperience}
                  className={`input__username input ${
                    !isEdit && "profileDr-input"
                  }`}
                  disabled={!isEdit}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </Form.Item>
              <Form.Item
                name="email"
                normalize={(value) => value.trim()}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 30px)",
                  margin: "0 30px",
                }}
              >
                <Typography className="label">Specialty</Typography>
                <Select
                  defaultValue={profile?.medicalSpecialty}
                  style={{ margin: "8px 0", height: 46 }}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                  disabled={!isEdit}
                />
              </Form.Item>
            </Form.Item>
          )}

          {/* ============================== */}

          <Form.Item
            style={{
              marginBottom: 0,
            }}
          >
            <Form.Item
              name="Name"
              normalize={(value) => value.trim()}
              style={{
                display: "inline-block",
                width: "calc(50% - 30px)",
              }}
            >
              <Typography className="label">Date Of Birth</Typography>
              <DatePicker
                className="profile-datePicker"
                style={{ marginTop: 10 }}
                value={dayjs(new Date(profile?.dob))}
                disabled={!isEdit}
              />
            </Form.Item>
            <Form.Item
              name="email"
              normalize={(value) => value.trim()}
              style={{
                display: "inline-block",
                width: "calc(50% - 30px)",
                margin: "0 30px",
              }}
            >
              <Typography className="label">Gender</Typography>
              <Select
                defaultValue={profile?.gender}
                style={{ margin: "8px 0", height: 46 }}
                onChange={(e) => {
                  e.target.value = e.target.value.trim();
                }}
                disabled={!isEdit}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item
            style={{
              marginBottom: 0,
            }}
          >
            <Form.Item
              name="Name"
              normalize={(value) => value.trim()}
              style={{
                display: "inline-block",
                width: "calc(50% - 30px)",
              }}
            >
              <Typography className="label">Phone Number</Typography>
              <Input
                value={profile?.phoneNumber}
                className={`input__username input ${
                  !isEdit && "profileDr-input"
                }`}
                disabled={!isEdit}
                onChange={(e) => {
                  e.target.value = e.target.value.trim();
                }}
              />
            </Form.Item>
            {role === "DOCTOR" ? (
              <Form.Item
                name="email"
                normalize={(value) => value.trim()}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 30px)",
                  margin: "0 30px",
                }}
              >
                <Typography className="label">Fees</Typography>
                <Input
                  className={`input__username input ${
                    !isEdit && "profileDr-input"
                  }`}
                  disabled={!isEdit}
                  defaultValue={profile?.price?.toLocaleString("vi-VN")}
                  style={{ margin: "8px 0", height: 46 }}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </Form.Item>
            ) : (
              <Form.Item
                name="email"
                normalize={(value) => value.trim()}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 30px)",
                  margin: "0 30px",
                }}
              >
                <Typography className="label">Address</Typography>
                <Input
                  value={profile?.address}
                  className={`input__username input ${
                    !isEdit && "profileDr-input"
                  }`}
                  disabled={!isEdit}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </Form.Item>
            )}
          </Form.Item>
          {role === "DOCTOR" && (
            <Form.Item
              style={{
                marginBottom: 0,
                marginRight: 30,
              }}
            >
              <Form.Item name="Name" normalize={(value) => value.trim()}>
                <Typography className="label">Enclinic Name</Typography>
                <Input
                  value={profile?.nameClinic}
                  className={`input__username input ${
                    !isEdit && "profileDr-input"
                  }`}
                  disabled={!isEdit}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </Form.Item>
            </Form.Item>
          )}
          {role === "DOCTOR" && (
            <Form.Item
              style={{
                marginBottom: 0,
                marginRight: 30,
              }}
            >
              <Form.Item name="Name" normalize={(value) => value.trim()}>
                <Typography className="label">Address</Typography>
                <Input
                  value={profile?.address}
                  className={`input__username input ${
                    !isEdit && "profileDr-input"
                  }`}
                  disabled={!isEdit}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </Form.Item>
            </Form.Item>
          )}

          {role === "DOCTOR" && (
            <Form.Item style={{ marginRight: 30 }}>
              <Typography className="label">Desciption</Typography>
              <TextArea
                value={profile?.description}
                className={`profileDr-font ${!isEdit && "profileDr-input"}`}
                placeholder="Controlled autosize"
                autoSize={{ minRows: 3, maxRows: 5 }}
                style={{
                  marginTop: 10,
                }}
                disabled={!isEdit}
              />
            </Form.Item>
          )}
          {/* <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            style={{ marginTop: 10, }}
                        >
                            Sign in
                        </Button>
                    </Form.Item> */}
        </Form>
      </div>
      {isEdit && (
        <div
          className="profile-buttonArea"
          style={{ marginTop: 30, justifyContent: "center" }}
        >
          <Button
            className="result-third__button-text profile-buttonArea__button-save"
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
          <Button
            className="result-third__button-text profile-buttonArea__button"
            // disabled={isDisabled}
            onClick={() => handleSave()}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
