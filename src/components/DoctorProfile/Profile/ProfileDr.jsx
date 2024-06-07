import "./Profile.scss";
import doctorDefault from "../../../assets/images/doctor.jpeg";
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Select,
  Spin,
  Typography,
  notification,
} from "antd";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { EditFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllSpecialty } from "../../../api/doctor.api";
import {
  getDoctorProfile,
  updateDoctorProfile,
} from "../../../stores/doctor/DoctorThunk";
import { setError, setStatusCode } from "../../../stores/doctor/DoctorSlice";
import { openNotificationWithIcon } from "../../notification/CustomNotify";
import { FaCamera } from "react-icons/fa";
import getImageUpload from "../../../helpers/uploadCloudinary";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../helpers/firebase";
import { fetchLocation } from "../../../helpers/location";
const ProfileDr = () => {
  const { profile, statusCode, error, loading } = useSelector(
    (state) => state.doctor
  );
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const handleCancel = () => {
    form.setFieldsValue({
      name: profile?.name,
      year: profile?.yearExperience,
      idSpecialty: specialties.find(
        (item) => item.name === profile?.medicalSpecialty
      )?.idSpecialty,
      dob: dayjs(new Date(profile?.dob)),
      gender: profile?.gender,
      phone: profile?.phoneNumber,
      fee: profile?.price && profile?.price?.toLocaleString("vi-VN"),
      clinicName: profile?.nameClinic,
      address: profile?.address,
      description: profile?.description,
    });
    setIsEdit(false);
  };
  const dispatch = useDispatch();
  const getSpecialties = async () => {
    try {
      const response = await getAllSpecialty();

      setSpecialties(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSpecialties();
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      name: profile?.name,
      year: profile?.yearExperience,
      idSpecialty: specialties?.find(
        (item) => item.name === profile?.medicalSpecialty
      )?.idSpecialty,
      dob: dayjs(new Date(profile?.dob)),
      gender: profile?.gender,
      phone: profile?.phoneNumber,
      fee: profile?.price?.toLocaleString("vi-VN"),
      clinicName: profile?.nameClinic,
      address: profile?.address,
      description: profile?.description,
    });
  }, [form, profile, specialties]);

  useEffect(() => {
    if (statusCode === 200) {
      dispatch(setStatusCode(null));
      openNotificationWithIcon(
        "success",
        api,
        "",
        "Update Profile Successfully!"
      );
      dispatch(getDoctorProfile());
      setIsEdit(false);
    }
    if (error !== null) {
      openNotificationWithIcon("error", api, "", error);
      dispatch(setError(null));
    }
  }, [statusCode, error, api, dispatch]);

  const onFinish = async (values) => {
    const location = await fetchLocation(values.address);
    const body = {
      name: values.name,
      dob: values.dob,
      phoneNumber: values.phone,
      address: values.address,
      avatar: null,
      gender: values.gender,
      latitude: location.lat.toString(),
      longtitude: location.lng.toString(),
      yearExperience: values.year,
      price: values.fee,
      description: values.description,
      idSpecialty: values.idSpecialty,
    };
    dispatch(updateDoctorProfile(body));
  };

  const handleImg = async (e) => {
    const file = e.target.files[0];
    const url = await getImageUpload(file);
    dispatch(
      updateDoctorProfile({
        ...profile,
        avatar: url,
      })
    );
    try {
      const userSnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", profile?.email))
      );
      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        console.log(userDoc);
        await updateDoc(doc(db, "users", userDoc.id), {
          avatar: url,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profileDr">
      <div
        className="profile-header"
        style={{ width: "100%", justifyContent: "flex-start" }}
      >
        {contextHolder}
        <div style={{ position: "relative" }}>
          <Image
            src={profile?.avatar}
            width={120}
            className="profile-header__img"
            fallback={doctorDefault}
            preview={false}
            style={{ backgroundColor: "#f1f5f9" }}
          />
          <label
            htmlFor="file"
            style={{
              position: "absolute",
              right: 10,
              bottom: 0,
              width: 35,
              height: 35,
              backgroundColor: "#B1B8C3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
            }}
          >
            {loading ? (
              <Spin />
            ) : (
              <FaCamera
                size={20}
                className="chat-bottom__icon"
                color="#172C4C"
              />
            )}
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
            accept="image/*"
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className="profile-header__info">
            <span className="profile-header__font">{profile?.name}</span>
            <span
              className="profile-header__font"
              style={{ fontSize: 18, color: "rgb(45, 135, 243)" }}
            >
              {profile?.email}
            </span>
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
      </div>
      <div className="profileDr-content">
        <Form
          name="normal_login"
          className="profileDr-content__form"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            style={{
              marginBottom: 0,
              marginRight: 30,
            }}
          >
            <Typography className="label">Name</Typography>
            <Form.Item
              name="name"
              normalize={(value) => value.trim()}
              rules={[
                {
                  required: isEdit,
                  message: "Name is required",
                },
              ]}
            >
              <Input
                className={`input__username input ${
                  !isEdit && "profileDr-input"
                }`}
                disabled={!isEdit}
                onChange={(e) => {
                  e.target.value = e.target.value.trim();
                }}
              />
            </Form.Item>
          </Form.Item>
          {/* ============================== */}

          <div
            style={{
              marginBottom: 0,
              width: "97%",
              flexDirection: "row",
              display: "flex",
              gap: 40,
            }}
          >
            <div style={{ flex: 1 }}>
              <Typography className="label">Year Of Experience</Typography>
              <Form.Item
                name="year"
                normalize={(value) => value.trim()}
                rules={[
                  {
                    required: isEdit,
                    message: "Year Of Experience is required",
                  },
                ]}
              >
                <Input
                  className={`input__username input ${
                    !isEdit && "profileDr-input"
                  }`}
                  disabled={!isEdit}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </Form.Item>
            </div>

            <div style={{ flex: 1 }}>
              <Typography className="label">Specialty</Typography>
              <Form.Item
                name="idSpecialty"
                rules={[
                  {
                    required: isEdit,
                    message: "Specialty is required",
                  },
                ]}
              >
                <Select
                  style={{ margin: "8px 0", height: 46 }}
                  options={specialties.map((item) => ({
                    label: item.name,
                    value: item.idSpecialty,
                  }))}
                  disabled={!isEdit}
                />
              </Form.Item>
            </div>
          </div>

          {/* ============================== */}

          <div
            style={{
              marginBottom: 0,
              width: "97%",
              flexDirection: "row",
              display: "flex",
              gap: 40,
            }}
          >
            <div style={{ flex: 1 }}>
              <Typography className="label">Date Of Birth</Typography>
              <Form.Item
                name="dob"
                normalize={(value) => value.trim()}
                rules={[
                  {
                    required: isEdit,
                    message: "Date Of Birth is required",
                  },
                ]}
              >
                <DatePicker
                  className="profile-datePicker"
                  style={{ marginTop: 10 }}
                  disabled={!isEdit}
                />
              </Form.Item>
            </div>
            <div style={{ flex: 1 }}>
              <Typography className="label">Gender</Typography>
              <Form.Item
                name="gender"
                rules={[
                  {
                    required: isEdit,
                    message: "Gender is required",
                  },
                ]}
              >
                <Select
                  options={[
                    {
                      label: "Male",
                      value: true,
                    },
                    {
                      label: "Female",
                      value: false,
                    },
                  ]}
                  style={{ margin: "8px 0", height: 46 }}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                  disabled={!isEdit}
                />
              </Form.Item>
            </div>
          </div>

          <div
            style={{
              marginBottom: 0,
              width: "97%",
              flexDirection: "row",
              display: "flex",
              gap: 40,
            }}
          >
            <div style={{ flex: 1 }}>
              <Typography className="label">Phone Number</Typography>
              <Form.Item
                name="phone"
                normalize={(value) => value.trim()}
                rules={[
                  {
                    required: isEdit,
                    message: "Phone Number is required",
                  },
                ]}
              >
                <Input
                  className={`input__username input ${
                    !isEdit && "profileDr-input"
                  }`}
                  disabled={!isEdit}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </Form.Item>
            </div>
            <div style={{ flex: 1 }}>
              <Typography className="label">Fees</Typography>
              <Form.Item
                name="fee"
                normalize={(value) => value.trim()}
                rules={[
                  {
                    required: isEdit,
                    message: "Fees is required",
                  },
                ]}
              >
                <Input
                  className={`input__username input ${
                    !isEdit && "profileDr-input"
                  }`}
                  disabled={!isEdit}
                  style={{ margin: "8px 0", height: 46 }}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item
            style={{
              marginBottom: 0,
              marginRight: 30,
            }}
            rules={[
              {
                required: isEdit,
                message: "Enclinic Name is required",
              },
            ]}
          >
            <Typography className="label">Enclinic Name</Typography>
            <Form.Item name="clinicName" normalize={(value) => value.trim()}>
              <Input
                className={`input__username input ${
                  !isEdit && "profileDr-input"
                }`}
                disabled={!isEdit}
                onChange={(e) => {
                  e.target.value = e.target.value.trim();
                }}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item
            style={{
              marginBottom: 0,
              marginRight: 30,
            }}
          >
            <Typography className="label">Address</Typography>
            <Form.Item
              name="address"
              normalize={(value) => value.trim()}
              rules={[
                {
                  required: isEdit,
                  message: "Address is required",
                },
              ]}
            >
              <Input
                className={`input__username input ${
                  !isEdit && "profileDr-input"
                }`}
                disabled={!isEdit}
                onChange={(e) => {
                  e.target.value = e.target.value.trim();
                }}
              />
            </Form.Item>
          </Form.Item>
          <Typography className="label">Desciption</Typography>
          <Form.Item
            name="description"
            style={{ marginRight: 30 }}
            rules={[
              {
                required: isEdit,
                message: "Desciption is required",
              },
            ]}
          >
            <TextArea
              className={`profileDr-font ${!isEdit && "profileDr-input"}`}
              placeholder="Controlled autosize"
              autoSize={{ minRows: 3, maxRows: 5 }}
              style={{
                marginTop: 10,
              }}
              disabled={!isEdit}
            />
          </Form.Item>
          {isEdit && (
            <div
              className="profile-buttonArea"
              style={{ marginTop: 30, justifyContent: "center" }}
            >
              <Button
                className="result-third__button-text profile-buttonArea__button-save"
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>
              <Button
                className="result-third__button-text profile-buttonArea__button"
                // disabled={isDisabled}
                htmlType="submit"
                loading={loading}
              >
                Save
              </Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default ProfileDr;
