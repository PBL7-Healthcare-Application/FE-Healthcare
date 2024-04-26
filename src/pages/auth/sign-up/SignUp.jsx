import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Typography } from "antd";

import { Link } from "react-router-dom";

import "./SignUp.scss";
import Feature from "../../../components/feature/Feature";
import { useState } from "react";
const SignUp = () => {
  const [name, setName] = useState("");
  return (
    <Space className="up-main">
      <Space className="up-left">
        <Space className="up-left_title">
          <Typography className="up-left_title--main">
            The Next Generation
          </Typography>
          <Typography className="up-left_title--sub">
            Of Any Health Concern
          </Typography>
        </Space>
        <Feature />
      </Space>
      <Space className="up-right">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
        >
          <Typography className="up-right__title--main">
            Create an Account
          </Typography>
          <Typography className="up-right__title--sub">
            Create account today and start using Enclinic
          </Typography>

          <Typography className="label">Name</Typography>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
            initialValue={name}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
              className="input__username input"
              onKeyDown={(e) => {
                if (e.keyCode === 32 && name.length === 0) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

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
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className="input__username input"
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
            normalize={(value) => value.trim()}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              className="input__password input"
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Typography className="label">Confirm Password</Typography>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your Confirm Password!",
              },
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
            >
              Sign up
            </Button>
          </Form.Item>
          <Form.Item className="login-form-forgot">
            <Typography className="label">
              Already have an account?{" "}
              <Link to={"/auth/sign-in"}>Sign in here.</Link>
            </Typography>
          </Form.Item>
        </Form>
      </Space>
    </Space>
  );
};

export default SignUp;
