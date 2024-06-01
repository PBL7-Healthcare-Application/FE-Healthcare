/* eslint-disable react/prop-types */
import personDefault from "../../../assets/images/personDefault.png";
import { Button, Image, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminPartnerDetail,
  verifyAdminCertificate,
  verifyAdminEducation,
  verifyAdminExperience,
  verifyAdminProfile,
} from "../../../stores/admin/AdminThunk";
import { useEffect, useState } from "react";
import { openNotificationWithIcon } from "../../notification/CustomNotify";
import {
  setError,
  setMessage,
  setStatusCode,
  setVerifyCertificate,
  setVerifyEducation,
  setVerifyExperience,
} from "../../../stores/admin/AdminSlice";
const UserInfor = ({ type, partner }) => {
  const {
    partnerDetail,
    message,
    statusCode,
    error,
    verifyCertificate,
    verifyEducation,
    verifyExperience,
  } = useSelector((state) => state.admin);
  const [disable, setDisabled] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "profile") {
      setDisabled(partnerDetail?.statusVerified === 1 ? true : false);
    }
    if (type === "certificate") {
      setDisabled(partnerDetail?.isVerifiedInfoCertificate);
    }
    if (type === "education") {
      setDisabled(partnerDetail?.isVerifiedInfoTrainingProcess);
    }
    if (type === "experience") {
      setDisabled(partnerDetail?.isVerifiedInfoWorkingProcess);
    }
  }, [partnerDetail, type])
  const handleApproval = () => {
    if (type === "profile") {
      dispatch(
        verifyAdminProfile({
          idDoctor: partnerDetail?.idDoctor,
          statusVerified: 1,
        })
      );
    }
    if (type === "certificate") {
      dispatch(
        verifyAdminCertificate({
          idDoctor: partnerDetail?.idDoctor,
          certificates: verifyCertificate,
        })
      );
    }
    if (type === "education") {
      dispatch(
        verifyAdminEducation({
          idDoctor: partnerDetail?.idDoctor,
          trainingProcesses: verifyEducation,
        })
      );
    }
    if (type === "experience") {
      dispatch(
        verifyAdminExperience({
          idDoctor: partnerDetail?.idDoctor,
          workingProcesses: verifyExperience,
        })
      );
    }
  };
  useEffect(() => {
    if (statusCode === 200) {
      openNotificationWithIcon("success", api, "", message);
      dispatch(setStatusCode(null));
      dispatch(setMessage(null));
      setDisabled(true);
      if (type === "certificate") {
        dispatch(setVerifyCertificate());
      }
      if (type === "education") {
        dispatch(setVerifyEducation());
      }
      if (type === "experience") {
        dispatch(setVerifyExperience());
      }
      dispatch(getAdminPartnerDetail(partnerDetail?.idDoctor));
    }
    if (error !== null) {
      openNotificationWithIcon("error", api, "", error);
      dispatch(setError(null));
    }
  }, [statusCode, dispatch, api, error, message]);
  return (
    <div
      className="profile-header"
      style={{
        width: "100%",
        justifyContent: "flex-start",
        padding: "10px 30px",
      }}
    >
      {contextHolder}
      <Image
        src={partnerDetail?.avatar}
        width={120}
        className="profile-header__img"
        fallback={personDefault}
        preview={false}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="profile-header__info">
          <span className="profile-header__font">{partnerDetail?.name}</span>
          <span
            className="profile-header__font"
            style={{ fontSize: 18, color: "rgb(45, 135, 243)" }}
          >
            {partnerDetail?.email}
          </span>
        </div>
        {partner === "partner" && (
          <div className="profile-edit">
            <Button
              type="primary"
              className="login-form-button"
              style={{
                marginTop: 10,
                // color: "#ffff",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
              disabled={disable}
              onClick={() => handleApproval()}
            >
              Approval
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfor;
