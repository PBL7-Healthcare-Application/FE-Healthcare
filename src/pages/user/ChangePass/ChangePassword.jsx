import { Button, Form, Input, Typography, notification } from "antd";
import "./ChangePassword.scss";
import { LockOutlined } from "@ant-design/icons";
import { passwordRegex } from "../../../constant/regex";
import { useDispatch, useSelector } from "react-redux";
import { changeUserPassword } from "../../../stores/user/UserThunk";
import { useEffect } from "react";
import deleteToken from "../../../helpers/deleteToken";
import { setError, setStatusCode } from "../../../stores/user/UserSlice";
import { useNavigate } from "react-router-dom";
import { openNotificationWithIcon } from "../../../components/notification/CustomNotify";
import { delay } from "lodash";
import { logOut } from "../../../stores/auth/AuthSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { statusCode, error } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const onSubmit = (values) => {
    dispatch(
      changeUserPassword({
        oldPassword: values.CurrentPassword,
        newPassword: values.NewPassword,
      })
    );
  };

  useEffect(() => {
    if (statusCode === 200) {
      openNotificationWithIcon("success", api, "", "Change Password Success!");
      dispatch(setStatusCode(null));
      dispatch(logOut());
      localStorage.removeItem("user");
      deleteToken();
      delay(() => {
        navigate("/");
      }, 1500);
    }
    if (error !== null) {
      openNotificationWithIcon("error", api, "", "Change Password Failed!");
      dispatch(setError(null));
    }
  }, [statusCode, dispatch, navigate, api, error]);
  return (
    <div className="ChangePass">
      <span className="ChangePass-title">Change Password</span>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <span className="ChangePass-text">
          Protect your account with a strong and unique password. We recommend
          changing your password regularly
        </span>
        <Form
          name="normal_login"
          className="ChangePass-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
        >
          {contextHolder}
          <Typography className="label">Current Password</Typography>
          <Form.Item
            name="CurrentPassword"
            rules={[
              {
                required: true,
                message: "Please input your Current Password!",
              },
              {
                pattern: passwordRegex,
                message:
                  "Password must have at least 8 characters and 1 uppercase letter and 1 special character.",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              className="input__password input"
              type="password"
              placeholder="Current Password"
            />
          </Form.Item>
          <Typography className="label">New Password</Typography>
          <Form.Item
            name="NewPassword"
            rules={[
              {
                required: true,
                message: "Please input your New Password!",
              },
              {
                pattern: passwordRegex,
                message:
                  "Password must have at least 8 characters and 1 uppercase letter and 1 special character.",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              className="input__password input"
              type="password"
              placeholder="New Password"
            />
          </Form.Item>
          <Typography className="label">Confirm Password</Typography>
          <Form.Item
            name="ConfirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your Confirm Password!",
              },
              {
                pattern: passwordRegex,
                message:
                  "Password must have at least 8 characters and 1 uppercase letter and 1 special character.",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("NewPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              className="input__password input"
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ marginTop: 10 }}
            >
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
