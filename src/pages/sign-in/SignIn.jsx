import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Typography } from "antd";
import { Link } from "react-router-dom";

import "./SignIn.scss";
import Feature from "../../components/feature/Feature";
const SignIn = () => {
  return (
    <Space className="in-main">
      <Space className="in-left">
        <Space className="in-left_title">
          <Typography className="in-left_title--main">
            The Next Generation
          </Typography>
          <Typography className="in-left_title--sub">
            Of Any Health Concern
          </Typography>
        </Space>
        <Feature />
      </Space>
      <Space className="in-right">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
        >
          <Typography className="in-right__title--main">Welcome Back</Typography>
          <Typography className="in-right__title--sub">
            Please enter your details below to continue
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
              onChange={(e) => { e.target.value = e.target.value.trim(); }}
            />
          </Form.Item>
          <Typography className="label">Password</Typography>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              className="input__password input"
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign in
            </Button>
          </Form.Item>
          <Form.Item className="login-form-forgot ">
            <Typography className="label">
              <Link>Forgot password ?</Link>
            </Typography>
          </Form.Item>
          <Form.Item className="login-form-forgot">
            <Typography className="label">
              Don’t have an account?{" "}
              <Link to={"/auth/sign-up"}>Sign up here.</Link>
            </Typography>
          </Form.Item>
        </Form>
      </Space>
    </Space>
  );
};

export default SignIn;
