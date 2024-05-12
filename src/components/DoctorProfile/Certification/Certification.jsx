import { Space, Table, Tag } from "antd";
import "./Certification.scss"
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, SyncOutlined } from "@ant-design/icons";


const Certification = () => {
    const columns = [
        {
            title: "Id",
            dataIndex: "key",
            align: 'center'
        },
        {
            title: "Name",
            dataIndex: "name",
            align: 'center'
        },

        {
            title: "Year",
            dataIndex: "year",
            align: 'center'
        },
        {
            title: "Status",
            dataIndex: "status",
            align: 'center'
        },
        {
            title: "Action",
            key: "function",
            dataIndex: "function",
            align: "center",
            className: "function-box",
            width: "10%",
            onCell: () => {
                return {
                    onClick: (e) => {
                        e.stopPropagation();
                    },
                };
            },
            render: () => (
                <Space size={"middle"}>
                    <EditOutlined
                        className="certificate-iconEdit"
                        style={{ fontSize: 20, color: "rgb(51, 114, 254)" }}
                    //   onClick={handleShowDeleteModal}
                    />
                </Space>
            ),
        },

    ];
    const data = [
        {
            key: "1",
            name: "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
            year: 2015,
            status: <Tag icon={<CheckCircleOutlined />} color="success">
                Approvaled
            </Tag>

        },
        {
            key: "2",
            name: "Certificate of Advanced Cardiac Life Support (ACLS)",
            year: 2015,
            status: <Tag icon={<SyncOutlined spin />} color="processing">
                Pending
            </Tag>

        },
        {
            key: "3",
            name: "Certificate of Advanced Cardiac Life Support (ACLS)",
            year: 2015,
            status: <Tag icon={<CloseCircleOutlined />} color="error">
                rejected
            </Tag>

        },
        {
            key: "4",
            name: "Fellow of the Royal College of Physicians (FRCP)",
            year: 2015,
            status: <Tag icon={<SyncOutlined spin />} color="processing">
                Pending
            </Tag>

        },

    ];

    return (
        <div className="certificate-main">
            <span className="setting-font" style={{ fontSize: 25, fontWeight: 600, color: "#185FA0" }}>Certificates</span>
            <div className="certificate">

                <Table columns={columns} dataSource={data} bordered />
            </div>
        </div>
    )
}

export default Certification