import { Space, Table } from "antd";
import "./Certification.scss"
import { EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { iconCertificate } from "../../../helpers/icon";


const Certification = () => {
    const { profile } = useSelector((state) => state.doctor)
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
    return (
        <div className="certificate-main">
            <span className="setting-font" style={{ fontSize: 25, fontWeight: 600, color: "#185FA0" }}>Certificates</span>
            <div className="certificate">

                <Table columns={columns} dataSource={profile.certificates.map((item, index) => ({
                    id: item.idCertificate,
                    key: index + 1,
                    name: item?.name,
                    year: item?.year,
                    status: iconCertificate(item?.statusVerified)
                }))} bordered />
            </div>
        </div>
    )
}

export default Certification