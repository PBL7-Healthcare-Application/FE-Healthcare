/* eslint-disable react/no-unescaped-entities */
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Typography, notification } from "antd";
import { useNavigate } from "react-router-dom";
import "./SignIn.scss";
import Feature from "../../../components/feature/Feature";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ResetPasswordUser } from "../../../stores/auth/AuthThunk";
import { SetError, SetStatusCode } from "../../../stores/auth/AuthSlice";
import { openNotificationWithIcon } from "../../../components/notification/CustomNotify";
import { delay } from "lodash";


const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [messageApi, contextHolder] = message.useMessage();
  const { statusCode, error, loading } = useSelector((state) => state.auth);
  const [api, contextHolder] = notification.useNotification();


  useEffect(() => {
    if (statusCode === 200) {
      dispatch(SetStatusCode(null));
      openNotificationWithIcon("success", api, "", "Reset Password Successfully!");
      delay(() => {
        navigate("/auth/sign-in");
      }, 1500);
    }
    if (error !== null) {
      openNotificationWithIcon("error", api, "", error);
      dispatch(SetError(null));
    }
  }, [statusCode, error, api, dispatch, navigate]);




  const onFinish = (values) => {
    dispatch(ResetPasswordUser(values));
  };

  return (
    <Space className="in-main">
      <Space className="in-left">
        <Space className="in-left_title">
          <Typography className="in-left_title--main">Take Care Of</Typography>
          <Typography className="in-left_title--sub">
            Your Health Mission
          </Typography>
        </Space>
        <Feature />
      </Space>
      <Space className="in-right">
        {contextHolder}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Typography className="in-right__title--main" style={{ textAlign: 'left' }}>
            Forgot Password
          </Typography>
          <Typography className="in-right__title--sub" style={{ textAlign: 'left' }}>
            Enter your email address and we'll send you a new password.
          </Typography>

          <Typography className="label">Email</Typography>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
            normalize={(value) => value.trim()}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className="input__username input"
              onChange={(e) => {
                e.target.value = e.target.value.trim();
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ marginTop: 10 }}
              loading={loading}
            >
              Send
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Space>
  );
};

export default ResetPassword;
