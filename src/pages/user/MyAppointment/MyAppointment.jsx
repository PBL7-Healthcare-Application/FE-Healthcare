import { Divider, Tabs } from "antd";
import "./MyAppointment.scss";
import CardAppointment from "../../../components/cardAppointment/CardAppointment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserAppointment } from "../../../stores/user/UserThunk";
import NotFound from "../../../components/cardAppointment/NotFound";

const MyAppointment = () => {
  const { TabPane } = Tabs;
  const { ListAppointments } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAppointment(1));
  }, [dispatch]);

  return (
    <div style={{ padding: "20px 0" }}>
      <span className="profile-title">My Appointment</span>
      <Divider />
      <div style={{ padding: "0 30px" }}>
        <Tabs onChange={(key) => dispatch(getUserAppointment(key))}>
          <TabPane tab="Booked" key={1}>
            <div className="myAppointment">
              {ListAppointments !== null ? (
                ListAppointments.map((item, index) => {
                  return (
                    <CardAppointment key={index} appointment={item} type={1} />
                  );
                })) : (<NotFound />)}
            </div>
          </TabPane>
          <TabPane tab="Completed" key={2}>
            {ListAppointments !== null ? (
              ListAppointments.map((item, index) => {
                return (
                  <CardAppointment key={index} appointment={item} type={2} />
                );
              })) : (<NotFound />)}
          </TabPane>
          <TabPane tab="Canceled" key={3}>
            {ListAppointments !== null ? (
              ListAppointments.map((item, index) => {
                return (
                  <CardAppointment key={index} appointment={item} type={3} />
                );
              })) : (<NotFound />)}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default MyAppointment;
