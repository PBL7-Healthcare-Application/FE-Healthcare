/* eslint-disable no-unused-vars */
import {
  Button,
  DatePicker,
  Divider,
  Image,
  Radio,
  Typography,
  notification,
} from "antd";
import "./Profile.scss";
import { EditFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import personDefaults from "../../../assets/images/personDefault.png";
import { openNotificationWithIcon } from "../../../components/notification/CustomNotify";
import { updateUserProfile } from "../../../stores/user/UserThunk";
import dayjs from "dayjs";
import { setError, setStatusCode } from "../../../stores/user/UserSlice";
import { useNavigate } from "react-router-dom";
import { delay } from "lodash";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { profile, statusCode, error } = useSelector((state) => state.profile);
  const [profiles, setProfiles] = useState(profile);
  const [isDisabled, setIsDisabled] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (field) => {
    setIsDisabled(false);
    setProfiles((prev) => ({
      ...prev,
      [field.name]: field.value,
    }));
  };
  const handleCancel = () => {
    setIsEdit(!isEdit);
    setProfiles(profile);
  };
  const handleSave = () => {
    const { avatar, ...restOfProfiles } = profiles;
    const allValuesNotNull = Object.values(restOfProfiles).every(
      (value) => value !== null
    );
    if (!allValuesNotNull) {
      setIsDisabled(true);
      openNotificationWithIcon(
        "error",
        api,
        "",
        "All fields must be filled out."
      );

      return;
    }
    if (profiles.phoneNumber !== null) {
      const regex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
      if (!regex.test(profiles.phoneNumber)) {
        setIsDisabled(true);
        openNotificationWithIcon(
          "error",
          api,
          "",
          "Invalid phone number. Please enter a valid Vietnamese phone number."
        );
        return;
      }
    }
    dispatch(updateUserProfile(profiles));
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    if (profile !== null) {
      setProfiles(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (statusCode === 200) {
      openNotificationWithIcon(
        "success",
        api,
        "",
        "The profile has been successfully updated!"
      );
      dispatch(setStatusCode(null));
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(profile));
      delay(() => {
        if (JSON.parse(localStorage.getItem("partner")) !== null) {
          navigate("/partner")
        }
      }, 1500);
    }
    if (error !== null) {
      openNotificationWithIcon(
        "error",
        api,
        "",
        "The profile has been unsuccessfully updated!"
      );
      dispatch(setError(null));
      setProfiles(profile);
    }
  }, [statusCode, dispatch, api, profile, error, navigate]);

  return (
    <div style={{ padding: "20px 0" }}>
      <span className="profile-title">My Profile</span>
      <Divider />
      <div style={{ padding: "0 20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {contextHolder}
          <div className="profile-header">
            <Image
              src={profiles?.avatar}
              width={110}
              className="profile-header__img"
              fallback={personDefaults}
              preview={false}
            />
            <div className="profile-header__info">
              <span className="profile-header__font">{profiles?.name}</span>
              <span
                className="profile-header__font"
                style={{ fontSize: 18, color: "rgb(45, 135, 243)" }}
              >
                {profiles?.email}
              </span>
            </div>
          </div>
          {!isEdit && (
            <div className="profile-edit" onClick={() => setIsEdit(!isEdit)}>
              <span
                className="profile-header__font"
                style={{ fontSize: 18, color: "rgb(45, 135, 243)" }}
              >
                Edit
              </span>
              <EditFilled className="profile-edit__icon" />
            </div>
          )}
        </div>
        <div className="profile-content">
          <div style={{ width: "100%" }}>
            <Typography className="profile-header__font profile-header__label">
              Name
            </Typography>
            <div
              className={`profile-content__coverInput ${isEdit ? "profile-content__coverInput-active" : ""
                }`}
            >
              <input
                className="profile-input"
                disabled={!isEdit}
                value={profiles?.name}
                onChange={(e) =>
                  handleChange({ name: "name", value: e.target.value })
                }
              />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <Typography className="profile-header__font profile-header__label">
              Date Of Birth
            </Typography>
            <div
              className={`profile-content__coverInput ${isEdit ? "profile-radio-active" : ""
                }`}
            >
              {!isEdit ? (
                <input
                  className="profile-input"
                  disabled={true}
                  placeholder="Email"
                  value={profiles?.dob ? profiles?.dob.split("T")[0] : "--"}
                />
              ) : (
                <DatePicker
                  className="profile-datePicker"
                  onChange={(date, dateString) =>
                    handleChange({ name: "dob", value: dateString })
                  }
                  value={dayjs(new Date(profiles?.dob))}
                />
              )}
            </div>
          </div>
          <div
            style={{ width: "100%" }}
            className={`${isEdit ? "profile-radio-change" : ""}`}
          >
            <Typography className="profile-header__font profile-header__label">
              Gender
            </Typography>
            <div
              className={`profile-content__coverInput ${isEdit ? "profile-radio-active" : ""
                }`}
            >
              {!isEdit ? (
                <input
                  className="profile-input"
                  disabled={true}
                  value={
                    profiles?.gender
                      ? profiles?.gender === true
                        ? "Male"
                        : "Female"
                      : "--"
                  }
                />
              ) : (
                <Radio.Group
                  value={profiles?.gender}
                  onChange={(e) =>
                    handleChange({ name: "gender", value: e.target.value })
                  }
                >
                  <Radio value={true} className="profile-radio">
                    Male
                  </Radio>
                  <Radio value={false} className="profile-radio">
                    Female
                  </Radio>
                </Radio.Group>
              )}
            </div>
          </div>
          <div
            style={{ width: "100%" }}
            className={`${isEdit ? "profile-radio-change" : ""}`}
          >
            <Typography className="profile-header__font profile-header__label">
              Address
            </Typography>
            <div
              className={`profile-content__coverInput ${isEdit ? "profile-content__coverInput-active" : ""
                }`}
            >
              <input
                className="profile-input"
                disabled={!isEdit}
                value={
                  profiles?.address ? profiles?.address : isEdit ? "" : "--"
                }
                onChange={(e) =>
                  handleChange({ name: "address", value: e.target.value })
                }
              />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <Typography className="profile-header__font profile-header__label">
              Phone Number
            </Typography>
            <div
              className={`profile-content__coverInput ${isEdit ? "profile-content__coverInput-active" : ""
                }`}
            >
              <input
                className="profile-input"
                disabled={!isEdit}
                value={
                  profiles?.phoneNumber
                    ? profiles?.phoneNumber
                    : isEdit
                      ? ""
                      : "--"
                }
                onChange={(e) =>
                  handleChange({ name: "phoneNumber", value: e.target.value })
                }
              />
            </div>
          </div>
          {isEdit && (
            <div className="profile-buttonArea">
              <Button
                className="result-third__button-text profile-buttonArea__button-save"
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>
              <Button
                className="result-third__button-text profile-buttonArea__button"
                disabled={isDisabled}
                onClick={() => handleSave()}
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Profile;
