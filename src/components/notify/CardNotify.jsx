/* eslint-disable react/prop-types */

import "./Notify.scss";
import { statusNotify } from "../../helpers/icon";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailDoctorAppointment,
  getDoctorProfile,
} from "../../stores/doctor/DoctorThunk";
import { doc, updateDoc } from "firebase/firestore";
import { dbNotify } from "../../helpers/firebase";

function CardNotify({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.doctor);
  const handleRedirect = async () => {
    await updateDoc(doc(dbNotify, "notifications", item.id), {
      isRead: true, // replace with the fields you want to update
    });
    if (
      item?.title === "New Appointment"
    ) {
      if (item?.idDoctor) {
        dispatch(getDetailDoctorAppointment(item?.idAppointment));
        navigate(`/dr.Enclinic/appointment/${item?.idAppointment}`);
      } else {
        navigate(`/user/appointment`);
      }
    }
    if (item?.title === "Cancel Appointment") {
      if (item?.idReceiver === profile?.idDoctor) {
        dispatch(getDetailDoctorAppointment(item?.idAppointment));
        navigate(`/dr.Enclinic/appointment/${item?.idAppointment}`);
      }
      else {
        navigate(`/user/appointment`);
      }
    }
    if (item?.title === "Approval of Information") {
      dispatch(getDoctorProfile());
      navigate(`/dr.Enclinic/setting/profile/personal`);
    }
    if (item?.title === "New Registration Application") {
      navigate(`/admin/partners`);
    }
    if (item?.title === "New information needs to be verified") {
      navigate(`/admin/partners`);
    }
    if (item?.title === "New Rating") {
      navigate(`/dr.Enclinic/rating`);
    }
  };
  return (
    <div style={{ width: "100%" }} onClick={() => handleRedirect()}>
      <div className="cardNotify">
        {/* <Image src={appointmentIcon} width={45} preview={false} /> */}
        {statusNotify(item?.title)}
        <div className="cardNotify-content">
          <span className="cardNotify-font" style={{ color: "#404040" }}>
            {item?.title}
          </span>
          <span
            className="cardNotify-font"
            style={{ fontSize: 13, fontWeight: 500 }}
          >
            {item?.body}
          </span>
          <span
            className="cardNotify-font"
            style={{ fontSize: 12, fontWeight: 400 }}
          >
            {format(item?.timestamp.toDate().toISOString())}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CardNotify;
