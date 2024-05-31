import { Button, Form, Image, Modal, Select, Typography, notification } from "antd";
import { Per, Time } from "../../../constant/options";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getDoctorProfile,
  setDoctorSchedule,
  updateDoctorWorkingTime,
  updateDoctorWorkingTimeForConflict,
} from "../../../stores/doctor/DoctorThunk";
import { openNotificationWithIcon } from "../../notification/CustomNotify";
import { delay } from "lodash";
import { setError, setMessage, setStatusCode } from "../../../stores/doctor/DoctorSlice";
import { useNavigate } from "react-router-dom";
import { EditFilled } from "@ant-design/icons";
import "./SetUpSchedule.scss";
import warning from "../../../assets/images/warning.png";
import TextArea from "antd/es/input/TextArea";
import { set } from "date-fns";
const SetUpSchedule = () => {
  const { profile, error, statusCode, message, loading } = useSelector((state) => state.doctor);
  const [isDisabled, setIsDisabled] = useState(
    profile?.workingTimeStart !== null
  );
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [isConflict, setIsConflict] = useState(false);
  const [conflict, setConflict] = useState(null);
  const [reason, setReason] = useState("");
  const navigate = useNavigate();
  const handleFinish = (values) => {
    setConflict({
      startTime: values.start,
      endTime: values.end,
      durationPerAppointment: values.per,
    })
    if (profile?.workingTimeStart === null) {
      dispatch(
        setDoctorSchedule({
          startTime: values.start,
          endTime: values.end,
          durationPerAppointment: values.per,
        })
      );
    }
    else {
      dispatch(
        updateDoctorWorkingTime({
          startTime: values.start,
          endTime: values.end,
          durationPerAppointment: values.per,

        })
      );
      setIsEdit(!isEdit);
      setIsDisabled(!isDisabled);

    }


  };
  useEffect(() => {
    if (statusCode === 200) {
      openNotificationWithIcon(
        "success",
        api,
        "",
        message
      );
      delay(() => {
        dispatch(setMessage(null))
        dispatch(setStatusCode(null));
        dispatch(getDoctorProfile());
        setConflict(null);
        setIsConflict(false);
        // navigate("/dr.Enclinic/calendar");
      }, 1500);
    }
    if (statusCode === 409) {
      dispatch(getDoctorProfile());
      setIsConflict(true);
    }
    if (error !== null) {
      openNotificationWithIcon(
        "error",
        api,
        "",
        "Set up your schedule unsuccessfully!"
      );
      delay(() => {
        dispatch(getDoctorProfile());
        dispatch(setError(null));
        setConflict(null);
        setIsConflict(false);
      }, 1500);
    }
  }, [statusCode, api, error, dispatch, navigate]);

  useEffect(() => {
    form.setFieldsValue({
      per: profile?.durationPerAppointment,
      start: profile?.workingTimeStart,
      end: profile?.workingTimeEnd
    })
  }, [form, profile])
  const handleConflict = () => {

    dispatch(updateDoctorWorkingTimeForConflict(
      {
        ...conflict,
        reason: reason
      }
    ))

    setReason("");
    setConflict(null);
  }
  return (
    <div className="setting-tab2">
      <div>
        <Modal open={isConflict}
          onCancel={() => {
            setIsConflict(false);
            setReason("");
            setConflict(null);
          }}
          onOk={handleConflict}
          okButtonProps={{
            disabled: reason.length === 0
          }}
          width={600}>
          <div className="modalConflict">
            <Image src={warning} width={120} preview={false} />
            <span className="setting-font modalConflict-text">There is a conflict with some appointments</span>
            <span className="setting-font" style={{ fontWeight: 400, fontSize: 14, textAlign: 'center', color: "#404040", marginTop: 10 }}>Appointments outside of working hours that you want to update. If you click confirm update, the system will cancel all those appointments and update the working time again.</span>

            <div className="modalConflict-reason">
              <span className="setting-font" style={{ marginBottom: 10, fontSize: 14, textAlign: 'center', color: "#404040", marginTop: 10 }}>Please enter your reason if you choose confirm:</span>
              <TextArea maxLength={100} onChange={(e) => setReason(e.target.value)} />
            </div>
          </div>
        </Modal>
        <Form
          name="normal_login"
          className="login-form"
          style={{ minWidth: 620 }}
          form={form}
          onFinish={handleFinish}
        >
          {contextHolder}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
              position: "relative",
            }}
          >
            {" "}
            <span
              className="setting-font"
              style={{ fontSize: 25, fontWeight: 600, color: "#185FA0" }}
            >
              Schedule Setting
            </span>
            {
              !isEdit && profile?.workingTimeStart !== null && (
                <div className="profile-edit" style={{ position: 'absolute', top: 9, right: 0 }} onClick={() => {
                  setIsEdit(!isEdit);
                  setIsDisabled(!isDisabled);
                }}>
                  <span
                    className="profile-header__font"
                    style={{ fontSize: 18, color: "rgb(45, 135, 243)" }}
                  >
                    Edit
                  </span>
                  <EditFilled className="profile-edit__icon" />
                </div>
              )
            }
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
              disabled={isDisabled}
            />
          </Form.Item>
          {profile?.workingTimeStart === null && (
            <Form.Item>
              <div style={{ display: "flex", flexDirection: "row", gap: 40 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ marginTop: 10 }}
                  loading={loading}
                >
                  Create
                </Button>
              </div>
            </Form.Item>
          )}
          {
            isEdit && (
              <div style={{ display: "flex", flexDirection: "row", gap: 20, justifyContent: 'flex-end' }} >
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ marginTop: 10, width: 150, height: 40, fontWeight: 500 }}
                >
                  Update
                </Button>
                <Button
                  className="login-form-button btn-cancel"
                  style={{ marginTop: 10, width: 150, height: 40, fontWeight: 500 }}
                  onClick={() => {
                    setIsEdit(!isEdit);
                    setIsDisabled(!isDisabled);
                    form.setFieldsValue({
                      per: profile?.durationPerAppointment,
                      start: profile?.workingTimeStart,
                      end: profile?.workingTimeEnd
                    })
                  }}
                >
                  Cancel
                </Button>

              </div>
            )
          }

        </Form>
      </div>
    </div>
  );
};

export default SetUpSchedule;
