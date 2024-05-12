import { Space, Table, Tag } from "antd";
import "../Certification/Certification.scss"
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, SyncOutlined } from "@ant-design/icons";


const Education = () => {
    const columns = [
        {
            title: "Id",
            dataIndex: "key",
            align: 'center'
        },
        {
            title: "School Name",
            dataIndex: "name",
            align: 'center'
        },

        {
            title: "Major",
            dataIndex: "major",
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
            name: "Han hua Chistian Hospital, Đài Loan",
            major: "Cardiology",
            startYear: 2010,
            endYear: 2015,
            status: <Tag icon={<SyncOutlined spin />} color="processing">
                Pending
            </Tag>

        },
        {
            key: "2",
            name: "North Carolina, Mỹ",
            major: "Tu nghiệp chuyên môn",
            startYear: 2009,
            endYear: 2010,
            status: <Tag icon={<CheckCircleOutlined />} color="success">
                Approvaled
            </Tag>


        },
        {
            key: "3",
            name: "Đại học Y Dược TP.HCM",
            major: "Tốt nghiệp Tiến sĩ chuyên khoa Tai Mũi Họng",
            startYear: 1995,
            endYear: 2000,
            status: <Tag icon={<CloseCircleOutlined />} color="error">
                rejected
            </Tag>

        },


    ];

    return (
        <div className="certificate-main">
            <span className="setting-font" style={{ fontSize: 25, fontWeight: 600, color: "#185FA0" }}>Educations</span>
            <div className="certificate">

                <Table columns={columns} dataSource={data} bordered />
            </div>
        </div>
    )
}

export default Education