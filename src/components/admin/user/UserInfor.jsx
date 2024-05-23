/* eslint-disable react/prop-types */
import { EditFilled } from "@ant-design/icons";
import personDefault from "../../../assets/images/personDefault.png";
import { Button, Image } from "antd";
import { useSelector } from "react-redux";
const UserInfor = ({ type, partner }) => {
  const { partnerDetail } = useSelector((state) => state.admin);
  return (
    <div
      className="profile-header"
      style={{
        width: "100%",
        justifyContent: "flex-start",
        padding: "10px 30px",
      }}
    >
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
        {/* {type === "profile" && partner !== "partner" && (
          <div className="profile-edit">
            <span
              className="profile-header__font"
              style={{ fontSize: 18, color: "rgb(45, 135, 243)" }}
            >
              Edit
            </span>
            <EditFilled className="profile-edit__icon" />
          </div>
        )} */}
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
