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
import { adminGetUserDetail, getAdminPartnerDetail } from "../../../stores/admin/AdminThunk";
import PartnerProfile from "./PartnerProfile";
import CertificateAdmin from "../partners/CertificateAdmin";
import ExperienceAdmin from "../partners/ExperienceAdmin";
import EducationAdmin from "../partners/EducationAdmin";
import { FaCheck, FaExclamation, FaRegCheckCircle } from "react-icons/fa";

const DetailUser = ({ partner }) => {
  const { TabPane } = Tabs;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { partnerDetail } = useSelector((state) => state.admin);
  // console.log(pa);
  useEffect(() => {
    if (partner) {
      dispatch(getAdminPartnerDetail(id))
    } else {
      dispatch(adminGetUserDetail(id))
    }
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
            {/* <UserInfor type={"profile"} partner={partner} /> */}
            {partner ? (
              <>
                <UserInfor type={"profile"} partner={partner} />
                <PartnerProfile partner={partner} />
              </>
            ) : (
              <>
                <UserInfor type={"profile"} partner={partner} />
                <UserProfile role={location?.state.role} />
              </>
            )}
          </div>
        </TabPane>
        {location?.state.role === "DOCTOR" &&
          partnerDetail?.certificates?.length > 0 && (
            <TabPane
              key={2}
              tab={
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                  Certification{" "}
                  <span>({partnerDetail?.certificates?.length})</span>
                  {partner === "partner" && !partnerDetail.isVerifiedInfoCertificate && <span style={{ marginLeft: 2 }}><FaExclamation color="#ef4444" size={18} /></span>}
                </span>
              }
            >
              <UserInfor partner={partner} type={"certificate"} />
              <CertificateAdmin partner={partner} />
            </TabPane>
          )}
        {location?.state.role === "DOCTOR" &&
          partnerDetail?.workingProcess?.length > 0 && (
            <TabPane
              key={3}
              tab={
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                  Experience{" "}
                  <span>({partnerDetail?.workingProcess?.length})</span>
                  {partner === "partner" && !partnerDetail.isVerifiedInfoWorkingProcess && <span style={{ marginLeft: 2 }}><FaExclamation color="#ef4444" size={18} /></span>}
                </span>
              }
            >
              <UserInfor partner={partner} type={"experience"} />
              <ExperienceAdmin partner={partner} />
            </TabPane>
          )}
        {location?.state.role === "DOCTOR" &&
          partnerDetail?.trainingProcess?.length > 0 && (
            <TabPane
              key={4}
              tab={
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                  Education{" "}
                  <span>({partnerDetail?.trainingProcess?.length})</span>
                  {partner === "partner" && !partnerDetail.isVerifiedInfoTrainingProcess && <span style={{ marginLeft: 2 }}><FaExclamation color="#ef4444" size={18} /></span>}
                </span>
              }
            >
              <UserInfor partner={partner} type={"education"} />
              <EducationAdmin partner={partner} />
            </TabPane>
          )}
      </Tabs>
    </div>
  );
};

export default DetailUser;
