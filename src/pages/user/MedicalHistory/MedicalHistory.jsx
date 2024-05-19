import { Divider } from "antd";
import CardMedical from "./CardMedical";







const MedicalHistory = () => {
  return <div style={{ padding: '20px 0' }}>
    <span className="profile-title">My Medical History</span>
    <Divider />
    <div className="myAppointment" style={{ paddingLeft: 20, paddingRight: 20 }}>
      <CardMedical />
      <CardMedical />
    </div>
  </div>;
};

export default MedicalHistory;
