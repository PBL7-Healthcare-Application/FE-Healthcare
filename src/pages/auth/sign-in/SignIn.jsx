import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Typography, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.scss";
import Feature from "../../../components/feature/Feature";
import { passwordRegex } from "../../../constant/regex";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { signInUser } from "../../../stores/auth/AuthThunk";
import { SetError } from "../../../stores/auth/AuthSlice";
import { openNotificationWithIcon } from "../../../components/notification/CustomNotify";
import { delay } from "lodash";
import { getUserProfile } from "../../../stores/user/UserThunk";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../helpers/firebase";
import { handleUpdateStatus } from "../../../helpers/chat";
import { createAccountFirebase } from "../../../helpers/firebaseHelper";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [messageApi, contextHolder] = message.useMessage();
  const { user, error, loading } = useSelector((state) => state.auth);
  const [api, contextHolder] = notification.useNotification();
  const { chatUser } = useSelector((state) => state.chat);
  const handleChat = async (email) => {
    try {
      await signInWithEmailAndPassword(auth, email, email);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (chatUser !== null) {
      handleUpdateStatus(chatUser.id, true);
    }
  }, [chatUser]);

  useEffect(() => {
    if (user) {
      createAccountFirebase(user.email, user.name);
      if (user.role === "User") {
        handleChat(user.email);
        openNotificationWithIcon("success", api, "", "Sign In Success!");
        delay(() => {
          if (localStorage.getItem("appointment") !== null) {
            dispatch(getUserProfile());
            navigate("/booking/doctor");
          } else if (localStorage.getItem("partner") !== null) {
            navigate("/partner");
          } else {
            navigate("/");
          }
        }, 1500);
      } else if (user.role === "Doctor") {
        handleChat(user.email);
        openNotificationWithIcon("success", api, "", "Sign In Success!");
        delay(() => {
          navigate("/dr.Enclinic/appointment");
        }, 1500);
      } else if (user.role === "Admin") {
        openNotificationWithIcon("success", api, "", "Sign In Success!");
        delay(() => {
          navigate("/admin/users");
        }, 1500);
      }
    }
    if (error) {
      openNotificationWithIcon("error", api, "", error);
      dispatch(SetError());
    }
    return () => { };
  }, [user, error, navigate, api, dispatch]);

  const onFinish = (values) => {
    dispatch(signInUser(values));
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
          <Typography className="in-right__title--main">
            Welcome Back
          </Typography>
          <Typography className="in-right__title--sub">
            Enter your details below
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
          <Typography className="label">Password</Typography>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
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
              placeholder="Password"
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
