/* eslint-disable react/no-unescaped-entities */
import { Divider, Image, Modal, Select, Tabs, notification } from "antd";
import "./MyAppointment.scss";
import CardAppointment from "../../../components/cardAppointment/CardAppointment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  cancelUserAppointment,
  getUserAppointment,
} from "../../../stores/user/UserThunk";
import NotFound from "../../../components/cardAppointment/NotFound";
import disappointed from "../../../assets/images/disappointed.png";
import { Reason } from "../../../constant/options";
import { openNotificationWithIcon } from "../../../components/notification/CustomNotify";
import { delay } from "lodash";
import { setError, setStatusCode } from "../../../stores/user/UserSlice";
const MyAppointment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [idAppointment, setIdAppointment] = useState("");
  const [reason, setReason] = useState("-- Select --");
  const { TabPane } = Tabs;
  const [api, contextHolder] = notification.useNotification();
  const { ListAppointments, statusCode, error } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();

  const handleCancel = (id) => {
    setIdAppointment(id);
    setIsModalOpen(!isModalOpen);
  };
  const handleSelectChange = (value) => {
    setIsDisabled(false);
    setReason(value);
  };
  const handleOk = () => {
    setReason("-- Select --");
    setIsDisabled(true);
    dispatch(
      cancelUserAppointment({
        idAppointment: idAppointment,
        reason: reason,
      })
    );
  };

  useEffect(() => {
    if (statusCode === 200) {
      openNotificationWithIcon(
        "success",
        api,
        "",
        "The appointment has been successfully cancelled!"
      );
      delay(() => {
        dispatch(getUserAppointment(1));
        dispatch(setStatusCode(null));
        setIsModalOpen(!isModalOpen);
      }, 1500);
    }
    if (error !== null) {
      localStorage.removeItem("appointment");
      openNotificationWithIcon(
        "error",
        api,
        "",
        "The appointment has been unsuccessfully cancelled!"
      );
      delay(() => {
        dispatch(setError(null));
        setIsModalOpen(!isModalOpen);
      }, 1500);
    }
  }, [statusCode, api, error, dispatch, isModalOpen]);

  useEffect(() => {
    dispatch(getUserAppointment(1));
  }, [dispatch]);

  return (
    <div style={{ padding: "20px 0" }}>
      {contextHolder}
      <span className="profile-title">My Appointment</span>
      <Divider />
      <div style={{ padding: "0 30px" }}>
        <Tabs onChange={(key) => dispatch(getUserAppointment(key))}>
          <TabPane tab="Booked" key={1}>
            <div className="myAppointment">
              {ListAppointments !== null ? (
                ListAppointments.map((item, index) => {
                  return (
                    <CardAppointment
                      key={index}
                      appointment={item}
                      type={1}
                      onCancel={(id) => handleCancel(id)}
                    />
                  );
                })
              ) : (
                <NotFound />
              )}
            </div>
            <Modal
              title="Cancel appointment"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okButtonProps={{
                disabled: isDisabled,
              }}
            >
              <div className="myAppointment-cancel">
                <Image src={disappointed} preview={false} width={90} />
                <div className="myAppointment-cancel__content">
                  <span className="myAppointment-cancel__content-text">
                    We're sorry!
                  </span>
                  <span
                    className="myAppointment-cancel__content-text"
                    style={{ fontSize: 14, fontWeight: 400 }}
                  >
                    Please help us understand more about the reason behind
                    canceling your appointment so we can improve our service in
                    the future.
                  </span>
                </div>
                <div
                  className="myAppointment-cancel__content"
                  style={{ marginTop: 12 }}
                >
                  <span
                    className="myAppointment-cancel__content-text"
                    style={{ fontSize: 14, fontWeight: 500 }}
                  >
                    Reason
                  </span>
                  <Select
                    value={reason}
                    placeholder={"-- Select --"}
                    style={{ width: "100%" }}
                    onChange={(value) => handleSelectChange(value)}
                    options={Reason}
                  />
                </div>
              </div>
            </Modal>
          </TabPane>
          <TabPane tab="Completed" key={3}>
            <div className="myAppointment">
              {ListAppointments !== null ? (
                ListAppointments.map((item, index) => {
                  return (
                    <CardAppointment key={index} appointment={item} type={2} />
                  );
                })
              ) : (
                <NotFound />
              )}
            </div>
          </TabPane>
          <TabPane tab="Canceled" key={2}>
            <div className="myAppointment">
              {ListAppointments !== null ? (
                ListAppointments.map((item, index) => {
                  return (
                    <CardAppointment key={index} appointment={item} type={3} />
                  );
                })
              ) : (
                <NotFound />
              )}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default MyAppointment;
