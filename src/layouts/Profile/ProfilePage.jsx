import { Image } from "antd";
import medicalHistory from "../../assets/images/medicalHistory.png";
import resetPassword from "../../assets/images/resetPassword.png";
import security from "../../assets/images/security.png";
import logout from "../../assets/images/logout.png";
import "./ProfilePage.scss";
import { DownOutlined, SettingFilled, UpOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../stores/auth/AuthSlice";
import deleteToken from "../../helpers/deleteToken";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [setting, setSetting] = useState(false);
  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("profile");
    localStorage.removeItem("user");
    deleteToken();
    navigate("/");
  };
  return (
    <div className="layoutProfile">
      <div className="layoutProfile-main">
        <div className="layoutProfile-left layoutProfile-box">
          <Link className="layoutProfile-left__box" to="/user/profile">
            {console.log(pathname.split("/").filter(Boolean)[1])}
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="rgb(108, 129, 160)"
              xmlns="http://www.w3.org/2000/svg"
              data-custo="fill"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8C8 5.79 9.79 4 12 4C14.21 4 16 5.79 16 8ZM4 18C4 15.34 9.33 14 12 14C14.67 14 20 15.34 20 18V19C20 19.55 19.55 20 19 20H5C4.45 20 4 19.55 4 19V18Z"
                fill="rgb(108, 129, 160)"
              ></path>
            </svg>
            <span
              className={`layoutProfile-left__box-text  ${pathname.split("/").filter(Boolean)[1] === "profile"
                  ? "layoutProfile-left__box-active"
                  : ""
                }`}
            >
              My Profile
            </span>
          </Link>
          <Link className="layoutProfile-left__box" to="/user/appointment">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.7935 3.86471V7.58302H1.20801V3.86471C1.20801 3.30889 1.52093 2.826 1.98064 2.58358C2.18249 2.47638 2.41235 2.41602 2.6567 2.41602H21.3448C21.9006 2.41602 22.3835 2.72893 22.626 3.18865C22.7332 3.3905 22.7935 3.62036 22.7935 3.86471Z"
                fill="#2B94FF"
              ></path>
              <path
                d="M7.00354 2.41602V5.12024C7.00354 5.3868 6.7872 5.60314 6.52064 5.60314H4.2993C4.03274 5.60314 3.81641 5.3868 3.81641 5.12024V2.41602H7.00354Z"
                fill="#2685F1"
              ></path>
              <path
                d="M19.4127 2.41602V5.12024C19.4127 5.3868 19.1964 5.60314 18.9298 5.60314H16.7085C16.4419 5.60314 16.2256 5.3868 16.2256 5.12024V2.41602H19.4127Z"
                fill="#2685F1"
              ></path>
              <path
                d="M1.98065 2.58398V7.58343H1.20801V3.86511C1.20801 3.3093 1.52093 2.8264 1.98065 2.58398Z"
                fill="#2685F1"
              ></path>
              <path
                d="M5.16723 10.4707H7.65173C7.78506 10.4707 7.89318 10.5788 7.89318 10.7122V13.1967C7.89318 13.33 7.78506 13.4381 7.65173 13.4381H5.16723C5.0339 13.4381 4.92578 13.33 4.92578 13.1967V10.7122C4.92578 10.5788 5.0339 10.4707 5.16723 10.4707Z"
                fill="#D2D6DC"
              ></path>
              <path
                d="M5.16723 14.1621H7.65173C7.78506 14.1621 7.89318 14.2702 7.89318 14.4036V16.8886C7.89318 17.0219 7.78506 17.13 7.65173 17.13H5.16723C5.0339 17.13 4.92578 17.0219 4.92578 16.8886V14.4036C4.92578 14.2702 5.0339 14.1621 5.16723 14.1621Z"
                fill="#D2D6DC"
              ></path>
              <path
                d="M5.16723 17.8564H7.65173C7.78506 17.8564 7.89318 17.9646 7.89318 18.0979V20.5824C7.89318 20.7157 7.78506 20.8239 7.65173 20.8239H5.16723C5.0339 20.8239 4.92578 20.7157 4.92578 20.5824V18.0979C4.92578 17.9646 5.0339 17.8564 5.16723 17.8564Z"
                fill="#D2D6DC"
              ></path>
              <path
                d="M8.85864 10.4707H11.3963C11.5296 10.4707 11.6377 10.5788 11.6377 10.7122V13.1967C11.6377 13.33 11.5296 13.4381 11.3963 13.4381H8.85864C8.72531 13.4381 8.61719 13.33 8.61719 13.1967V10.7122C8.61719 10.5788 8.72531 10.4707 8.85864 10.4707Z"
                fill="#D2D6DC"
              ></path>
              <path
                d="M8.85864 14.1621H11.3963C11.5296 14.1621 11.6377 14.2702 11.6377 14.4036V16.8886C11.6377 17.0219 11.5296 17.13 11.3963 17.13H8.85864C8.72531 17.13 8.61719 17.0219 8.61719 16.8886V14.4036C8.61719 14.2702 8.72531 14.1621 8.85864 14.1621Z"
                fill="#D2D6DC"
              ></path>
              <path
                d="M8.85864 17.8564H11.3963C11.5296 17.8564 11.6377 17.9646 11.6377 18.0979V20.5824C11.6377 20.7157 11.5296 20.8239 11.3963 20.8239H8.85864C8.72531 20.8239 8.61719 20.7157 8.61719 20.5824V18.0979C8.61719 17.9646 8.72531 17.8564 8.85864 17.8564Z"
                fill="#D2D6DC"
              ></path>
              <path
                d="M12.6038 10.4707H15.1414C15.2747 10.4707 15.3828 10.5788 15.3828 10.7122V13.1967C15.3828 13.33 15.2747 13.4381 15.1414 13.4381H12.6038C12.4704 13.4381 12.3623 13.33 12.3623 13.1967V10.7122C12.3623 10.5788 12.4704 10.4707 12.6038 10.4707Z"
                fill="#D2D6DC"
              ></path>
              <path
                d="M12.6038 14.1621H15.1414C15.2747 14.1621 15.3828 14.2702 15.3828 14.4036V16.8886C15.3828 17.0219 15.2747 17.13 15.1414 17.13H12.6038C12.4704 17.13 12.3623 17.0219 12.3623 16.8886V14.4036C12.3623 14.2702 12.4704 14.1621 12.6038 14.1621Z"
                fill="#D2D6DC"
              ></path>
              <path
                d="M12.6038 17.8564H15.1414C15.2747 17.8564 15.3828 17.9646 15.3828 18.0979V20.5824C15.3828 20.7157 15.2747 20.8239 15.1414 20.8239H12.6038C12.4704 20.8239 12.3623 20.7157 12.3623 20.5824V18.0979C12.3623 17.9646 12.4704 17.8564 12.6038 17.8564Z"
                fill="#D2D6DC"
              ></path>
              <path
                d="M19.0739 10.7122V13.1967C19.0739 13.33 18.9657 13.4381 18.8324 13.4381H16.3479C16.2146 13.4381 16.1064 13.33 16.1064 13.1967V10.7122C16.1064 10.5788 16.2146 10.4707 16.3479 10.4707H18.8324C18.9657 10.4707 19.0739 10.5788 19.0739 10.7122Z"
                fill="#D2D6DC"
              ></path>
              <path
                d="M16.3479 14.1621H18.8324C18.9657 14.1621 19.0739 14.2702 19.0739 14.4036V16.8886C19.0739 17.0219 18.9657 17.13 18.8324 17.13H16.3479C16.2146 17.13 16.1064 17.0219 16.1064 16.8886V14.4036C16.1064 14.2702 16.2146 14.1621 16.3479 14.1621Z"
                fill="#D2D6DC"
              ></path>
              <path
                d="M16.3479 17.8564H18.8324C18.9657 17.8564 19.0739 17.9646 19.0739 18.0979V20.5824C19.0739 20.7157 18.9657 20.8239 18.8324 20.8239H16.3479C16.2146 20.8239 16.1064 20.7157 16.1064 20.5824V18.0979C16.1064 17.9646 16.2146 17.8564 16.3479 17.8564Z"
                fill="#D2D6DC"
              ></path>
              <path
                d="M1.20801 7.24316V22.551C1.20801 23.3512 1.85654 23.9997 2.6567 23.9997H21.3448C22.145 23.9997 22.7935 23.3512 22.7935 22.551V7.24316H1.20801Z"
                fill="#F7F9FC"
              ></path>
              <path
                d="M7.00238 0.482897V4.34608C7.00238 4.61264 6.78604 4.82897 6.51948 4.82897H5.07079C4.80423 4.82897 4.58789 4.61264 4.58789 4.34608V0.482897C4.58789 0.216338 4.80423 0 5.07079 0H6.51948C6.78604 0 7.00238 0.216338 7.00238 0.482897Z"
                fill="#284A75"
              ></path>
              <path
                d="M4.92578 10.4707H7.89318V13.4381H4.92578V10.4707Z"
                fill="#FFB521"
              ></path>
              <path
                d="M16.1064 10.4707H19.0739V13.4381H16.1064V10.4707Z"
                fill="#FFB521"
              ></path>
              <path
                d="M8.61719 10.4707H11.6377V13.4381H8.61719V10.4707Z"
                fill="#FFB521"
              ></path>
              <path
                d="M4.92578 14.1621H7.89318V17.13H4.92578V14.1621Z"
                fill="#FFB521"
              ></path>
              <path
                d="M16.1064 14.1621H19.0739V17.13H16.1064V14.1621Z"
                fill="#D2D6DC"
              ></path>
              <path
                d="M8.61719 14.1621H11.6377V17.13H8.61719V14.1621Z"
                fill="#FFB521"
              ></path>
              <path
                d="M4.92578 17.8525H7.89318V20.82H4.92578V17.8525Z"
                fill="#D2D6DC"
              ></path>
              <path
                d="M16.1064 17.8525H19.0739V20.82H16.1064V17.8525Z"
                fill="#D2D6DC"
              ></path>
              <path
                d="M8.61719 17.8525H11.6377V20.82H8.61719V17.8525Z"
                fill="#D2D6DC"
              ></path>
              <path
                d="M12.3623 10.4707H15.3828V13.4381H12.3623V10.4707Z"
                fill="#FFB521"
              ></path>
              <path
                d="M12.3623 14.1621H15.3828V17.13H12.3623V14.1621Z"
                fill="#FFB521"
              ></path>
              <path
                d="M12.3623 17.8525H15.3828V20.82H12.3623V17.8525Z"
                fill="#D2D6DC"
              ></path>
              <path
                d="M19.4135 0.482897V4.34608C19.4135 4.61264 19.1972 4.82897 18.9306 4.82897H17.4819C17.2154 4.82897 16.999 4.61264 16.999 4.34608V0.482897C16.999 0.216338 17.2154 0 17.4819 0H18.9306C19.1972 0 19.4135 0.216338 19.4135 0.482897Z"
                fill="#284A75"
              ></path>
              <path
                d="M1.20801 7.24316V22.551C1.20801 23.3512 1.85654 23.9997 2.6567 23.9997H3.19175C2.51618 23.877 2.00479 23.286 2.00479 22.5752V8.26787C2.05936 8.12059 2.20084 8.0158 2.36696 8.0158H22.7935V7.26731V7.24316H1.20801Z"
                fill="#D2D6DC"
              ></path>
              <path
                d="M5.84343 4.82897H5.07079C4.80423 4.82897 4.58789 4.61264 4.58789 4.34608V0.482897C4.58789 0.216338 4.80423 0 5.07079 0H5.36053V4.34608C5.36053 4.61264 5.57687 4.82897 5.84343 4.82897Z"
                fill="#1B3250"
              ></path>
              <path
                d="M18.2546 4.82897H17.4819C17.2154 4.82897 16.999 4.61264 16.999 4.34608V0.482897C16.999 0.216338 17.2154 0 17.4819 0H17.7717V4.34608C17.7717 4.61264 17.988 4.82897 18.2546 4.82897Z"
                fill="rgb(108, 129, 160)"
              ></path>
            </svg>
            <span
              className={`layoutProfile-left__box-text  ${pathname.split("/").filter(Boolean)[1] === "appointment"
                  ? "layoutProfile-left__box-active"
                  : ""
                }`}
            >
              My Appointment
            </span>
          </Link>
          <Link className="layoutProfile-left__box" to="/user/medical-history">
            <Image src={medicalHistory} width={24} preview={false} />
            <span
              className={`layoutProfile-left__box-text  ${pathname.split("/").filter(Boolean)[1] === "medical-history"
                  ? "layoutProfile-left__box-active"
                  : ""
                }`}
            >
              My Medical History
            </span>
          </Link>
          <div
            className="layoutProfile-left__box"
            onClick={() => setSetting(!setting)}
          >
            <SettingFilled className="layoutProfile-left__box-icon" />
            <span
              className="layoutProfile-left__box-text"
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              Account Settings
              {setting ? <UpOutlined /> : <DownOutlined />}
            </span>
          </div>
          {setting && (
            <div
              className={`layoutProfile-left__setting  ${setting ? "layoutProfile-left__setting-show" : ""
                }`}
            >
              <Link className="layoutProfile-left__box" to="/user/password">
                <Image src={resetPassword} width={24} preview={false} />
                <span
                  className={`layoutProfile-left__box-text  ${pathname.split("/").filter(Boolean)[1] === "password"
                      ? "layoutProfile-left__box-active"
                      : ""
                    }`}
                  style={{ marginTop: 6 }}
                >
                  Change Password
                </span>
              </Link>
              <Link
                className="layoutProfile-left__box"
                to="/user/disable-account"
              >
                <Image src={security} width={24} preview={false} />
                <span
                  className={`layoutProfile-left__box-text  ${pathname.split("/").filter(Boolean)[1] === "disable-account"
                      ? "layoutProfile-left__box-active"
                      : ""
                    }`}
                >
                  Disable Account
                </span>
              </Link>
            </div>
          )}
          <div className="layoutProfile-left__box" onClick={handleLogout}>
            <Image src={logout} width={24} preview={false} />
            <span className="layoutProfile-left__box-text">Sign Out</span>
          </div>
        </div>
        <div
          className="layoutProfile-right layoutProfile-box"
          style={{ padding: 0 }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
