/* eslint-disable react/prop-types */
import { EditFilled } from "@ant-design/icons";
import personDefault from "../../../assets/images/personDefault.png";
import { Button, Image } from "antd";
const UserInfor = ({ type, partner }) => {
  console.log(type, partner);
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
        src={""}
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
          <span className="profile-header__font">{"Bui Van Huy"}</span>
          <span
            className="profile-header__font"
            style={{ fontSize: 18, color: "rgb(45, 135, 243)" }}
          >
            {"vanhuy@gmail.com"}
          </span>
        </div>
        {type === "profile" && partner !== "partner" && (
          <div className="profile-edit">
            <span
              className="profile-header__font"
              style={{ fontSize: 18, color: "rgb(45, 135, 243)" }}
            >
              Edit
            </span>
            <EditFilled className="profile-edit__icon" />
          </div>
        )}
        {partner === "partner" && (
          <div className="profile-edit">
            <Button
              className="login-form-button"
              style={{
                marginTop: 10,
                color: "#ffff",
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
