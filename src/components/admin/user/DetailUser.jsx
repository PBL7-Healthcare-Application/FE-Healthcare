/* eslint-disable no-unused-vars */

import { Image, Tabs } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import Experience from "../../DoctorProfile/Experience/Experience";
import Education from "../../DoctorProfile/Education/Education";
import Certification from "../../DoctorProfile/Certification/Certification";
import back from "../../../assets/images/back.png";



const DetailUser = () => {
    const { TabPane } = Tabs;
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)
    return (
        <div className="setting">
            <div style={{ marginTop: 10, marginLeft: 20, marginBottom: 20 }} onClick={() => navigate(-1)}>
                <Image src={back} preview={false} className="appointmentDetail-icon" />
            </div>
            <Tabs onChange={(e) => {
                // if (e === "2") navigate("/dr.Enclinic/setting/work-schedule")
                // if (e === "1") navigate("/dr.Enclinic/setting/profile/personal")
                // if (e === "3") navigate("/dr.Enclinic/setting/account/password")
            }}>
                <TabPane key={1} tab="Profile">
                    <UserProfile role={location?.state.role} />
                </TabPane>
                {
                    location?.state.role === "DOCTOR" && <TabPane key={2} tab="Experience">
                        <Experience />
                    </TabPane>
                }
                {
                    location?.state.role === "DOCTOR" && <TabPane key={3} tab="Education">
                        <Education />
                    </TabPane>
                }
                {
                    location?.state.role === "DOCTOR" && <TabPane key={4} tab="Certification">
                        <Certification />
                    </TabPane>
                }
            </Tabs>
        </div>
    )
}

export default DetailUser