
import { Divider, Tabs } from "antd";
import "./MyAppointment.scss";
import CardAppointment from "../../../components/cardAppointment/CardAppointment";

const MyAppointment = () => {
    const { TabPane } = Tabs;


    return (
        <div style={{ padding: "20px 0" }}>
            <span className="profile-title">My Appointment</span>
            <Divider />
            <div style={{ padding: "0 30px" }}>
                <Tabs>
                    <TabPane tab="Booked" key={1}>
                        <div className="myAppointment">
                            <CardAppointment />
                            <CardAppointment />
                        </div>
                    </TabPane>
                    <TabPane tab="Completed" key={2}></TabPane>
                    <TabPane tab="Canceled" key={3}></TabPane>
                </Tabs>
            </div>
        </div>
    )
}


export default MyAppointment;