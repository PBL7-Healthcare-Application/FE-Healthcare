/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Image, Tabs } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import Experience from "../../DoctorProfile/Experience/Experience";
import Education from "../../DoctorProfile/Education/Education";
import Certification from "../../DoctorProfile/Certification/Certification";
import back from "../../../assets/images/back.png";

import { EditFilled } from "@ant-design/icons";
import UserInfor from "./UserInfor";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminPartnerDetail } from "../../../stores/admin/AdminThunk";
import PartnerProfile from "./PartnerProfile";

const DetailUser = ({ partner }) => {
  const { TabPane } = Tabs;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { partnerDetail } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getAdminPartnerDetail(id))
  }, [id, dispatch]);
  return (
    <div className="setting">
      <div
        style={{ marginTop: 10, marginLeft: 20, marginBottom: 20 }}
        onClick={() => navigate(-1)}
      >
        <Image src={back} preview={false} className="appointmentDetail-icon" />
      </div>

      <Tabs
        onChange={(e) => {
          // if (e === "2") navigate("/dr.Enclinic/setting/work-schedule")
          // if (e === "1") navigate("/dr.Enclinic/setting/profile/personal")
          // if (e === "3") navigate("/dr.Enclinic/setting/account/password")
        }}
      >
        <TabPane key={1} tab="Profile">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <UserInfor type={"profile"} partner={partner} />
            {/* <UserProfile role={location?.state.role} /> */}
            <PartnerProfile />
          </div>
        </TabPane>
        {location?.state.role === "DOCTOR" && partnerDetail?.certificates.length > 0 && (
          <TabPane key={2} tab={<span>Certification <span>({partnerDetail?.certificates.length})</span></span>}>
            <UserInfor partner={partner} />
            <Certification type={"Admin"} />
          </TabPane>
        )}
        {location?.state.role === "DOCTOR" && partnerDetail?.workingProcess.length > 0 && (
          <TabPane key={3} tab={<span>Experience <span>({partnerDetail?.workingProcess.length})</span></span>}>
            <UserInfor partner={partner} />
            <Experience type={"Admin"} />
          </TabPane>
        )}
        {location?.state.role === "DOCTOR" && partnerDetail?.trainingProcess.length > 0 && (
          <TabPane key={4} tab={<span>Education <span>({partnerDetail?.trainingProcess.length})</span></span>}>
            <UserInfor partner={partner} />
            <Education type={"Admin"} />
          </TabPane>
        )}
      </Tabs>
    </div>
  );
};

export default DetailUser;
