import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Image, Tag } from "antd";
import appointmentIcon from "../assets/images/appointmentIcon.png";
import cancel from "../assets/images/cancel.png";
import star from "../assets/images/star.png";
import correct from "../assets/images/correct.png";
import { FaRegBookmark } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { LuLoader } from "react-icons/lu";
export const icon = (status) => {
  switch (status) {
    case 1:
      return (
        <Tag icon={<CheckCircleOutlined />} color="processing" style={{ width: 100, display: 'flex', justifyContent: 'center', padding: "3px 0" }}>
          Booked
        </Tag>
      );
    case 2:
      return (
        <Tag icon={<CloseCircleOutlined />} color="error" style={{ width: 100, display: 'flex', justifyContent: 'center', padding: "3px 0" }}>
          Canceled
        </Tag>
      );
    case 3:
      return (
        <Tag icon={<CheckCircleOutlined />} color="success" style={{ width: 100, display: 'flex', justifyContent: 'center', padding: "3px 0" }}>
          Completed
        </Tag>
      );
    case 4:
      return (
        <Tag icon={<LuLoader />} color="cyan" style={{ width: 100, display: 'flex', justifyContent: 'center', padding: "3px 0", alignItems: 'center', gap: 5 }}>
          Waiting
        </Tag>
      );
    default:
      return <SyncOutlined spin />;
  }
};

export const iconCertificate = (status) => {
  switch (status) {
    case 0:
      return (
        <Tag icon={<SyncOutlined spin />} color="processing" style={{ width: 100, display: 'flex', justifyContent: 'center', padding: "3px 0" }}>
          Pending
        </Tag>
      );
    case 1:
      return (
        <Tag icon={<CheckCircleOutlined />} color="success" style={{ width: 100, display: 'flex', justifyContent: 'center', padding: "3px 0" }}>
          Approved
        </Tag>
      );
    case 2:
      return (
        <Tag icon={<CloseCircleOutlined />} color="error" style={{ width: 100, display: 'flex', justifyContent: 'center', padding: "3px 0" }}>
          Rejected
        </Tag>
      );
    default:
      return <SyncOutlined spin />;
  }
};
export const tabRole = (role) => {
  switch (role) {
    case "User":
      return (
        <Tag color="#ffc53d" style={{ fontWeight: 500 }}>
          PATIENT
        </Tag>
      );
    case "Doctor":
      return (
        <Tag color="#2db7f5" style={{ fontWeight: 500 }}>
          DOCTOR
        </Tag>
      );
    default:
      return <SyncOutlined spin />;
  }
};

export const statusAccount = (status) => {
  switch (status) {
    case true:
      return (
        <Tag color="#f50" style={{ fontWeight: 500 }}>
          BANNED
        </Tag>
      );
    case false:
      return (
        <Tag color="#87d068" style={{ fontWeight: 500 }}>
          ACTIVE
        </Tag>
      );
    default:
      return <SyncOutlined spin />;
  }
};

export const statusNotify = (status) => {
  switch (status) {
    case "New Appointment":
      return <Image src={appointmentIcon} width={45} preview={false} />;
    case "Approval of Information":
      return <FcApproval size={40} />;
    case "Cancel Appointment":
      return <Image src={cancel} width={45} preview={false} />;
    case "New Registration Application":
      return <FaRegBookmark size={32} />;
    case "New information needs to be verified":
      return <Image src={correct} width={45} preview={false} />;
    case "New Rating":
      return <Image src={star} width={45} preview={false} />;
    default:
      return <SyncOutlined spin />;
  }
};

export const iconPartner = (status) => {
  switch (status) {
    case 1:
      return (
        <Tag icon={<CheckCircleOutlined />} color="success" style={{ width: 100, display: 'flex', justifyContent: 'center', padding: "3px 0" }}>
          Approved
        </Tag>
      );
    case 2:
      return (
        <Tag icon={<CloseCircleOutlined />} color="error" style={{ width: 100, display: 'flex', justifyContent: 'center', padding: "3px 0" }}>
          Rejected
        </Tag>
      );
    case 0:
      return (
        <Tag icon={<SyncOutlined spin />} color="processing" style={{ width: 100, display: 'flex', justifyContent: 'center', padding: "3px 0" }}>
          Pending
        </Tag>
      );
    default:
      return <SyncOutlined spin />;
  }
};