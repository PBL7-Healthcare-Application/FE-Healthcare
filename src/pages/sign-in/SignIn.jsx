import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./SignIn.scss";
const SignIn = () => {


  return (

    <Space className="main">
      <Space className="left">
        <Space className="left_title">
          <Typography className="left_title--main">The Next Generation</Typography>
          <Typography className="left_title--sub">Of Any Health Concern</Typography>
        </Space>
        <Space className="left__content">

          <Space className="left__content-item">
            <Space className="left__content-item-img">
              <Image src={logo} preview={false} width={80} loading="lazy"></Image>
            </Space>
            <Typography className="left__content-item-name">Appointment</Typography>
          </Space>



          <Space className="left__content-item">
            <Space className="left__content-item-img">
              <Image src={logo} preview={false} width={80} loading="lazy"></Image>
            </Space>
            <Typography className="left__content-item-name">Appointment</Typography>
          </Space>



          <Space className="left__content-item">
            <Space className="left__content-item-img">
              <Image src={logo} preview={false} width={80} loading="lazy"></Image>
            </Space>
            <Typography className="left__content-item-name">Appointment</Typography>
          </Space>



          <Space className="left__content-item">
            <Space className="left__content-item-img">
              <Image src={logo} preview={false} width={80} loading="lazy"></Image>
            </Space>
            <Typography className="left__content-item-name">Appointment</Typography>
          </Space>

        </Space>
      </Space>
      <Space className="right">

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}

        >
          <Typography className="right__title--main">Welcome Back</Typography>
          <Typography className="right__title--sub">Please enter your details below to continue</Typography>

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
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
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
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              className="input__password input"
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>


          </Form.Item>
          <Form.Item className="login-form-forgot ">
            <Typography className="label"><Link >Forgot password ?</Link></Typography>
          </Form.Item>
          <Form.Item className="login-form-forgot" >
            <Typography className="label">Don’t have an account? <Link >Sign up here.</Link></Typography>
          </Form.Item>
        </Form>
      </Space>
    </Space>
  );
};

export default SignIn;
