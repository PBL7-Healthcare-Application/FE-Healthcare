/* eslint-disable react/prop-types */
import { Modal, Space, Table } from "antd";
import { iconCertificate } from "../../../helpers/icon";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { verifyAdminEducation } from "../../../stores/admin/AdminThunk";

const EducationAdmin = ({ partner }) => {
  const { partnerDetail } = useSelector((state) => state.admin);
  const [isAdd, setIsAdd] = useState(false);

  const dispatch = useDispatch();
  const handleAproval = (record) => {
    dispatch(
      verifyAdminEducation({
        idDoctor: partnerDetail?.idDoctor,
        trainingProcesses: [
          {
            idTrainingProcess: record?.id,
            statusVerified: 1,
          }
        ]
      })
    );
  };
  const handleReject = (record) => {
    dispatch(
      verifyAdminEducation({
        idDoctor: partnerDetail?.idDoctor,
        trainingProcesses: [
          {
            idTrainingProcess: record?.id,
            statusVerified: 2,
          }
        ]
      })
    );
  };
  const columns = [
    {
      title: "",
      dataIndex: "key",
      align: "center",
      width: "5%",
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
      width: "10%",
    },
    {
      title: "End Year",
      dataIndex: "endYear",
      align: "center",
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      width: "15%",
    },
  ];

  if (partner === "partner") {
    columns.push({
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
      render: (text, record) => (
        <Space size={"middle"} align="center" direction="horizontal">

          {
            record.verify === 0 && (
              <>
                <IoMdCheckmarkCircleOutline
                  className="function-box__delete"
                  size={28}
                  style={{ cursor: "pointer", color: "#87d068" }}
                  color="#ff4d4f"
                  onClick={() => handleAproval(record)}
                />

                <IoCloseCircleOutline
                  className="function-box__delete"
                  size={30}
                  style={{ cursor: "pointer" }}
                  color="#ff4d4f"
                  onClick={() => handleReject(record)}
                />
              </>
            )
          }

        </Space>
      ),
    });
  }
  return (
    <div className="certificate-main">
      <Modal open={isAdd} onCancel={() => setIsAdd(false)} width={600}></Modal>
      <div className="certificate">
        <Table
          pagination={false}
          columns={columns}
          dataSource={partnerDetail?.trainingProcess.map((item, index) => ({
            id: item.idTrainingProcess,
            key: index + 1,
            name: item?.schoolName,
            major: item?.major,
            startYear: item?.startYear,
            endYear: item?.endYear,
            status: (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {" "}
                {iconCertificate(item?.statusVerified)}
              </div>
            ),
            verify: item?.statusVerified,
          }))}
          bordered
        />
      </div>
    </div>
  );
};

export default EducationAdmin;
