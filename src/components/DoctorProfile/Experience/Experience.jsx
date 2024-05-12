import { Space, Table, Tag } from "antd";
import "../Certification/Certification.scss"
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, SyncOutlined } from "@ant-design/icons";


const Experience = () => {
    const columns = [
        {
            title: "Id",
            dataIndex: "key",
            align: 'center'
        },
        {
            title: "Workplace",
            dataIndex: "name",
            align: 'center'
        },

        {
            title: "Position",
            dataIndex: "position",
            align: 'center'
        },
        {
            title: "Start Year",
            dataIndex: "startYear",
            align: 'center'
        },
        {
            title: "End Year",
            dataIndex: "endYear",
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
            name: "Bệnh viện Đại học Y Dược TP.HCM",
            position: "Trưởng khoa Tai Mũi Họng",
            startYear: 2004,
            endYear: 2024,
            status: <Tag icon={<CloseCircleOutlined />} color="error">
                rejected
            </Tag>

        },
        {
            key: "2",
            name: "Đại học Y Dược TP.HCM",
            position: "Giảng viên Bộ môn Tai Mũi Họng",
            startYear: 1995,
            endYear: 2024,
            status: <Tag icon={<CheckCircleOutlined />} color="success">
                Approvaled
            </Tag>


        },
        {
            key: "3",
            name: "Đại học Y Dược TP.HCM",
            position: "Bác sĩ nội trú Bộ môn Tai Mũi Họng",
            startYear: 1990,
            endYear: 1994,
            status: <Tag icon={<SyncOutlined spin />} color="processing">
                Pending
            </Tag>

        },


    ];

    return (
        <div className="certificate-main">
            <span className="setting-font" style={{ fontSize: 25, fontWeight: 600, color: "#185FA0" }}>Experiences</span>
            <div className="certificate">

                <Table columns={columns} dataSource={data} bordered />
            </div>
        </div>
    )
}

export default Experience