import { Button, Form, Select, Typography, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openNotificationWithIcon } from "../../../components/notification/CustomNotify";
import { setStatusCode } from "../../../stores/user/UserSlice";
import { logOut } from "../../../stores/auth/AuthSlice";
import deleteToken from "../../../helpers/deleteToken";
import { delay } from "lodash";
import { disableUserAccount } from "../../../stores/user/UserThunk";

const DisableAccount = () => {
  const dispatch = useDispatch();
  const { statusCode } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [isDisable, setIsDisable] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const handleSelect = () => {
    setIsDisable(false);
  };

  const onSubmit = (values) => {
    dispatch(
      disableUserAccount({
        reason: values.reason,
      })
    );
  };
  useEffect(() => {
    if (statusCode === 200) {
      openNotificationWithIcon("success", api, "", "Disable Account Success!");
      dispatch(setStatusCode(null));
      dispatch(logOut());
      localStorage.removeItem("user");
      deleteToken();
      delay(() => {
        navigate("/");
      }, 1500);
    }
  }, [statusCode, dispatch, navigate, api]);
  return (
    <div className="ChangePass">
      <span className="ChangePass-title">Disable Account</span>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ margin: "20px" }}>
          <svg
            width="120"
            height="120"
            viewBox="0 0 98 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M41.0729 0.816044C37.5539 1.41404 33.9639 2.85004 31.2599 4.76505C29.1539 6.27304 26.1859 9.55204 24.9409 11.73C19.2919 21.615 21.7579 34.061 30.7329 40.859C33.8919 43.229 37.8419 44.856 41.4799 45.239L42.9879 45.407L42.8919 41.673C42.7719 36.072 43.7779 31.309 45.9799 26.929C48.0139 22.884 51.6049 18.647 55.2669 15.967C57.1819 14.555 62.1839 11.85 62.8539 11.85C63.5719 11.85 63.4519 11.3 62.4229 9.86304C59.5029 5.79404 54.8109 2.58704 49.8089 1.31804C47.5589 0.744041 43.1069 0.481045 41.0729 0.816044Z"
              fill="#BFBFBF"
            ></path>
            <path
              d="M70.2021 16.183C67.7601 16.494 65.1511 17.308 62.6141 18.529C47.2721 25.997 44.0641 46.462 56.3911 58.357C59.3591 61.253 63.4761 63.503 67.6641 64.556C69.4351 65.011 70.4171 65.082 73.5041 65.082C76.7351 65.058 77.5251 64.986 79.5841 64.436C91.3361 61.3 98.9951 50.386 97.8951 38.346C96.6031 24.44 84.0371 14.388 70.2021 16.183ZM76.5691 32.626L79.7281 29.443L82.1701 31.908L84.6351 34.349L81.4521 37.532L78.2921 40.691L81.4041 43.803L84.5161 46.915L82.1221 49.309L79.7281 51.703L76.6161 48.591L73.5041 45.479L70.4411 48.543C68.7651 50.218 67.2811 51.583 67.1621 51.583C66.8511 51.583 62.4951 47.227 62.4951 46.916C62.4951 46.796 63.8601 45.312 65.5351 43.637L68.5981 40.573L65.4861 37.461L62.3741 34.349L64.7671 31.955L67.1611 29.561L70.2731 32.673L73.3851 35.785L76.5691 32.626Z"
              fill="#F44D2C"
            ></path>
            <path
              d="M23.72 46.341C11.776 52.828 3.686 63.646 1.005 76.715C0.742 77.96 0.478 79.803 0.407 80.784C0.311 81.765 0.192 83.201 0.12 83.944L0 85.332H44.184H88.344V83.585C88.344 81.359 87.961 78.343 87.387 75.758C86.693 72.79 85.449 69.056 85.137 69.056C84.97 69.056 84.228 69.271 83.486 69.535C79.082 71.091 73.194 71.617 68.67 70.875C60.556 69.535 53.16 64.987 48.54 58.453C47.989 57.711 47.487 57.089 47.391 57.089C47.271 57.089 46.601 58.166 45.835 59.483C45.093 60.799 44.423 61.924 44.327 61.972C44.255 62.02 42.795 59.626 41.072 56.634L37.985 51.2L36.07 50.673C33.557 49.955 30.302 48.399 27.836 46.724C26.76 45.958 25.778 45.36 25.683 45.36C25.587 45.36 24.701 45.814 23.72 46.341Z"
              fill="#BFBFBF"
            ></path>
          </svg>
        </div>

        <span
          className="ChangePass-text"
          style={{ width: "80%", textAlign: "left", margin: "10px 0" }}
        >
          Dear {user?.email}
        </span>
        <span
          className="ChangePass-text"
          style={{ width: "80%", textAlign: "left", marginBottom: 10 }}
        >
          We apologize that your account has been disabled. Our goal is to offer
          you a hassle-free healthcare experience. We always strive to support
          you and hope to have the opportunity to help you with any issues or
          problems you may be having with your account.
        </span>
        <span
          className="ChangePass-text"
          style={{ width: "80%", textAlign: "left" }}
        >
          After your account is disabled at Enclinic, you will have 30 days to
          restore your account by logging in again. If you do not perform this
          action, your account with data will be permanently deleted.
        </span>
        <Form
          name="normal_login"
          className="ChangePass-form"
          initialValues={{
            remember: true,
          }}
          style={{
            width: "80%",
            padding: 0,
            marginTop: 30,
          }}
          onFinish={onSubmit}
        >
          {contextHolder}
          <Typography
            className="label"
            style={{ color: "#000", fontWeight: 500 }}
          >
            Why do you want to disable the account?
          </Typography>
          <Form.Item
            name="reason"
            rules={[
              {
                required: true,
                message: "Please input your Current Password!",
              },
            ]}
          >
            <Select
              placeholder={"-- Select --"}
              style={{
                width: "100%",
                height: 40,
              }}
              onChange={handleSelect}
              options={[
                {
                  value: "I want to create another account",
                  label: "I want to create another account",
                },
                {
                  value: "Delete account permanently, I will be back later",
                  label: "Delete account permanently, I will be back later",
                },
                {
                  value: "Others",
                  label: "Others",
                },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ marginTop: 10 }}
              disabled={isDisable}
            >
              Disable Account
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DisableAccount;
