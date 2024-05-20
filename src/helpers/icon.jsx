import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";

export const icon = (status) => {
  switch (status) {
    case 1:
      return (
        <Tag icon={<SyncOutlined spin />} color="processing">
          Booked
        </Tag>
      );
    case 2:
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          Canceled
        </Tag>
      );
    case 3:
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
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
        <Tag icon={<SyncOutlined spin />} color="processing">
          Pending
        </Tag>
      );
    case 1:
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          Approved
        </Tag>
      );
    case 2:
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          rejected
        </Tag>
      );
    default:
      return <SyncOutlined spin />;
  }
};
export const tabRole = (role) => {
  switch (role) {
    case "USER":
      return (
        <Tag color="#ffc53d" style={{ fontWeight: 500 }}>
          USER
        </Tag>
      );
    case "DOCTOR":
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
    case "BAN":
      return (
        <Tag color="#f50" style={{ fontWeight: 500 }}>
          BAN
        </Tag>
      );
    case "ACTIVE":
      return (
        <Tag color="#87d068" style={{ fontWeight: 500 }}>
          ACTIVE
        </Tag>
      );
    default:
      return <SyncOutlined spin />;
  }
};
