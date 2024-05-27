import { Divider } from "antd";
import CardMedical from "./CardMedical";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../../components/cardAppointment/NotFound";
import { useEffect } from "react";
import { userGetMedical } from "../../../stores/user/UserThunk";

const MedicalHistory = () => {
  const { MedicalHistory } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userGetMedical());
  }, [dispatch]);
  return (
    <div style={{ padding: "20px 0" }}>
      <span className="profile-title">My Medical History</span>
      <Divider />
      <div
        className="myAppointment"
        style={{ paddingLeft: 20, paddingRight: 20 }}
      >
        {MedicalHistory?.length > 0 ? (
          MedicalHistory?.map((item, index) => (
            <CardMedical key={index} item={item} />
          ))
        ) : (
          <NotFound content={"You don't have any medical history"} />
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;
