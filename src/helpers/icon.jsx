import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Image, Tag } from "antd";
import appointmentIcon from "../assets/images/appointmentIcon.png";
import cancel from "../assets/images/cancel.png";
import { FaRegBookmark } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
export const icon = (status) => {
  switch (status) {
    case 1:
      return (
        <Tag icon={<SyncOutlined spin />} color="processing" style={{ width: 100, display: 'flex', justifyContent: 'center', padding: "3px 0" }}>
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
          rejected
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
          USER
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
          BANED
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