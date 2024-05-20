import { Space, Table } from "antd";
import "../Certification/Certification.scss";
import { DeleteTwoTone, EditOutlined } from "@ant-design/icons";
import { iconCertificate } from "../../../helpers/icon";
import { useSelector } from "react-redux";

const Experience = () => {
  const { profile } = useSelector((state) => state.doctor);
  const columns = [
    {
      title: "Id",
      dataIndex: "key",
      align: "center",
    },
    {
      title: "Workplace",
      dataIndex: "name",
      align: "center",
    },

    {
      title: "Position",
      dataIndex: "position",
      align: "center",
    },
    {
      title: "Start Year",
      dataIndex: "startYear",
      align: "center",
    },
    {
      title: "End Year",
      dataIndex: "endYear",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
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
          <DeleteTwoTone
            twoToneColor="#EB1B36"
            className="function-box__delete"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="certificate-main">
      <span
        className="setting-font"
        style={{ fontSize: 25, fontWeight: 600, color: "#185FA0" }}
      >
        Experiences
      </span>
      <div className="certificate">
        <Table
          columns={columns}
          dataSource={profile?.workingProcess.map((item, index) => ({
            id: item.idWorkingProcess,
            key: index + 1,
            name: item?.workplace,
            position: item?.position,
            startYear: item?.startYear,
            endYear: item?.endYear,
            status: iconCertificate(item?.statusVerified),
          }))}
          bordered
        />
      </div>
    </div>
  );
};

export default Experience;
