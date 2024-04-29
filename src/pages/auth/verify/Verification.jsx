import { Button, Form, Input, Space, Typography, notification } from "antd";
import { useNavigate } from "react-router-dom";

import "./Verification.scss";
import Feature from "../../../components/feature/Feature";
import { createRef, useEffect, useState } from "react";
import { SetError } from "../../../stores/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { ResendOTP, VerifyEmail } from "../../../stores/auth/AuthThunk";
import { openNotificationWithIcon } from "../../../components/notification/CustomNotify";
import { delay } from "lodash";
const otpFields = new Array(6).fill(0);
const Verification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [amountOfResend, setAmountOfResend] = useState(3);
  const [api, contextHolder] = notification.useNotification();
  const { user, error } = useSelector((state) => state.auth);
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const otpRefs = Array.from({ length: 6 }, () => createRef());
  const [seconds, setSeconds] = useState(120);
  const [reSend, setResend] = useState(false);
  const handleInputChange = (e, index) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = e.target.value;
    setOtpValues(newOtpValues);

    if (e.target.value.length === 1 && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus();
    }
  };
  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timerId); // Clear the timer if the component is unmounted
    }
    if (seconds === 0) {
      setResend(true);
    }
  }, [seconds]);

  const handleResend = () => {
    const email = JSON.parse(localStorage.getItem("profile"));
    dispatch(
      ResendOTP({
        email: email.email,
      })
    );
    openNotificationWithIcon(
      "info",
      api,
      "",
      "We sent the verification code to your Email"
    );
    setSeconds(120);
    setAmountOfResend(amountOfResend - 1);
    setResend(false);
  };

  useEffect(() => {
    console.log(`UserVer::`, user);
    if (user) {
      if (user.role === "User") {
        openNotificationWithIcon("success", api, "", "Sign In Success!");
        delay(() => {
          navigate("/");
        }, 1500);
      }
    }
    if (error) {
      openNotificationWithIcon("error", api, "", error);
      dispatch(SetError());
    }
    return () => {};
  }, [user, error, navigate, api, dispatch]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const onFinish = (values) => {
    const otp = Object.values(values).join("");
    const email = localStorage.getItem("profile");
    dispatch(VerifyEmail({ email: JSON.parse(email).email, otp: otp }));
  };

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
          onFinish={onFinish}
        >
          {contextHolder}
          <Typography className="in-right__title--main">
            Verification Code
          </Typography>
          <Typography className="in-right__title--sub">
            We have sent the verification code to your Email
          </Typography>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {otpFields.map((_, index) => (
              <Form.Item key={index} name={`verify${index}`}>
                <Input
                  maxLength={1}
                  className="input__otp input"
                  style={{
                    width: "40px",
                    height: "40px",
                    textAlign: "center",
                    padding: 10,
                    fontWeight: 600,
                  }}
                  autoComplete="off"
                  value={otpValues[index]}
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      handleInputChange(e, index);
                    }
                  }}
                  ref={otpRefs[index]}
                  inputMode="numeric"
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && otpValues[index] === "") {
                      // If the Backspace key is pressed and the current field is empty,
                      // move the focus to the previous field
                      const previousField = otpRefs[index - 1];
                      if (previousField) {
                        previousField.current.focus();
                      }
                    }
                  }}
                />
              </Form.Item>
            ))}
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ letterSpacing: 0.8, fontWeight: 600 }}
            >
              Verify OTP
            </Button>
          </Form.Item>
          <Form.Item className="login-form-forgot">
            <Typography className="label">
              Request new OTP in{" "}
              {reSend ? (
                amountOfResend > 0 ? (
                  <div className="resend" onClick={handleResend}>
                    Resend OTP.
                  </div>
                ) : (
                  ""
                )
              ) : (
                <>
                  {minutes}:
                  {remainingSeconds < 10
                    ? `0${remainingSeconds}`
                    : remainingSeconds}
                </>
              )}
            </Typography>
          </Form.Item>
        </Form>
      </Space>
    </Space>
  );
};

export default Verification;
