import { Button, Form, Input, Space, Typography } from "antd";
import { Link } from "react-router-dom";

import "./Verification.scss";
import Feature from "../../../components/feature/Feature";
import { createRef, useState } from "react";
const otpFields = new Array(6).fill(0);
const Verification = () => {
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const otpRefs = Array.from({ length: 6 }, () => createRef());
  const handleInputChange = (e, index) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = e.target.value;
    setOtpValues(newOtpValues);

    if (e.target.value.length === 1 && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus();
    }
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
        >
          <Typography className="in-right__title--main">
            Verification Code
          </Typography>
          <Typography className="in-right__title--sub">
            We have sent the verification code to your Email
          </Typography>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {otpFields.map((_, index) => (
              <Form.Item key={index}>
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
                  onChange={(e) => handleInputChange(e, index)}
                  ref={otpRefs[index]}
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
              Request new OTP in <Link to={"/auth/sign-up"}>Resend OTP.</Link>
            </Typography>
          </Form.Item>
        </Form>
      </Space>
    </Space>
  );
};

export default Verification;
