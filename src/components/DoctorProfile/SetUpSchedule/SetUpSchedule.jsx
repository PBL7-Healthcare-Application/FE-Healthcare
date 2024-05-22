import { Button, Form, Select, Typography, notification } from "antd";
import { Per, Time } from "../../../constant/options";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getDoctorProfile,
  setDoctorSchedule,
} from "../../../stores/doctor/DoctorThunk";
import { openNotificationWithIcon } from "../../notification/CustomNotify";
import { delay } from "lodash";
import { setError, setStatusCode } from "../../../stores/doctor/DoctorSlice";
import { useNavigate } from "react-router-dom";

const SetUpSchedule = () => {
  const { profile, error, statusCode } = useSelector((state) => state.doctor);
  const [isDisabled, setIsDisabled] = useState(
    profile?.workingTimeStart !== null
  );
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const handleFinish = (values) => {
    dispatch(getDoctorProfile());
    dispatch(
      setDoctorSchedule({
        startTime: values.start,
        endTime: values.end,
        durationPerAppointment: values.per,
      })
    );
  };
  useEffect(() => {
    if (statusCode === 200) {
      openNotificationWithIcon(
        "success",
        api,
        "",
        "Set up your schedule successfully!"
      );
      delay(() => {
        dispatch(setStatusCode(null));
        navigate("/dr.Enclinic/calendar");
      }, 1500);
    }
    if (error !== null) {
      openNotificationWithIcon(
        "error",
        api,
        "",
        "Set up your schedule unsuccessfully!"
      );
      delay(() => {
        dispatch(setError(null));
      }, 1500);
    }
  }, [statusCode, api, error, dispatch, navigate]);

  return (
    <div className="setting-tab2">
      <div>
        <Form
          name="normal_login"
          className="login-form"
          style={{ minWidth: 620 }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleFinish}
        >
          {contextHolder}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            {" "}
            <span
              className="setting-font"
              style={{ fontSize: 25, fontWeight: 600, color: "#185FA0" }}
            >
              Schedule Setting
            </span>
          </div>

          <Typography className="label">
            Time per appointment (minute)
          </Typography>
          <Form.Item
            name="per"
            rules={[
              {
                required: true,
                message: "Please input your Time per appointment!",
              },
            ]}
            normalize={(value) => value.trim()}
          >
            <Select
              style={{ height: 40, marginTop: 10 }}
              options={Per.map((item) => ({
                label: item.value,
                value: item.value,
              }))}
              defaultValue={profile?.durationPerAppointment}
              disabled={isDisabled}
            />
          </Form.Item>
          {/* ================= */}
          <Typography className="label">
            Working time start at (hour)
          </Typography>
          <Form.Item
            name="start"
            rules={[
              {
                required: true,
                message: "Please input your Working time start!",
              },
            ]}
            normalize={(value) => value.trim()}
          >
            <Select
              style={{ height: 40, marginTop: 10 }}
              options={Time.map((item) => ({
                label: item.value,
                value: item.value,
              }))}
              defaultValue={profile?.workingTimeStart}
              disabled={isDisabled}
            />
          </Form.Item>
          {/* ================= */}
          <Typography className="label">Working time end at (hour)</Typography>
          <Form.Item
            name="end"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("start") < value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Working time end must be greater than working time start"
                    )
                  );
                },
              }),
              {
                required: true,
                message: "Please input your Working time end!",
              },
            ]}
            normalize={(value) => value.trim()}
          >
            <Select
              style={{ height: 40, marginTop: 10 }}
              options={Time.map((item) => ({
                label: item.value,
                value: item.value,
              }))}
              defaultValue={profile?.workingTimeEnd}
              disabled={isDisabled}
            />
          </Form.Item>
          {!isDisabled && (
            <Form.Item>
              <div style={{ display: "flex", flexDirection: "row", gap: 40 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ marginTop: 10 }}
                >
                  Update
                </Button>
              </div>
            </Form.Item>
          )}
        </Form>
      </div>
    </div>
  );
};

export default SetUpSchedule;
