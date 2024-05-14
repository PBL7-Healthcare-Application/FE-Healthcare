import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";
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
            return <Tag icon={<CloseCircleOutlined />} color="error">
                Canceled
            </Tag>;
        case 3:
            return (
                <Tag icon={<CheckCircleOutlined />} color="success">
                    Completed
                </Tag>
            );
        default:
            return <SyncOutlined spin />;

    }
}

export const iconCertificate = (status) => {
    switch (status) {
        case 0:
            return (
                <Tag icon={<SyncOutlined spin />} color="processing">
                    Pending
                </Tag>
            );
        case 1:
            return <Tag icon={<CheckCircleOutlined />} color="success">
                Approved
            </Tag>
        case 2:
            return (
                <Tag icon={<CloseCircleOutlined />} color="error">
                    rejected
                </Tag>
            );
        default:
            return <SyncOutlined spin />;

    }
}