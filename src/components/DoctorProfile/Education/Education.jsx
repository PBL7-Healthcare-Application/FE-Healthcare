import { Space, Table } from "antd";
import "../Certification/Certification.scss";
import { DeleteTwoTone, EditOutlined } from "@ant-design/icons";
import { iconCertificate } from "../../../helpers/icon";
import { useSelector } from "react-redux";

const Education = () => {
  const { profile } = useSelector((state) => state.doctor);
  const columns = [
    {
      title: "Id",
      dataIndex: "key",
      align: "center",
    },
    {
      title: "School Name",
      dataIndex: "name",
      align: "center",
    },

    {
      title: "Major",
      dataIndex: "major",
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
        Educations
      </span>
      <div className="certificate">
        <Table
          columns={columns}
          dataSource={profile?.trainingProcess.map((item, index) => ({
            id: item.idTrainingProcess,
            key: index + 1,
            name: item?.schoolName,
            major: item?.major,
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

export default Education;
