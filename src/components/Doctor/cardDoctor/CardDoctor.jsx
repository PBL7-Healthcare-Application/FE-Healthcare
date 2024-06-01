/* eslint-disable react/prop-types */
import { Button, Image, Space, Typography } from "antd";
import "./cardDoctor.scss";
import { EnvironmentOutlined } from "@ant-design/icons";
import doctorDefault from "../../../assets/images/doctor.jpeg";
import { useNavigate } from "react-router-dom";
import { getDoctorDetail } from "../../../stores/search-doctor/SearchThunk";
import { useDispatch } from "react-redux";
export const CardDoctor = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="cardDoctor">
      <Image
        src={item?.avatar}
        width={80}
        className="cardDoctor_img"
        preview={false}
        fallback={doctorDefault}
      ></Image>
      <Space className="cardDoctor_name">{item?.name}</Space>
      <Space className="cardDoctor_item">
        <svg
          width="22"
          height="22"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.983 14.333c-1.11 0-2.055-.389-2.833-1.166-.778-.778-1.167-1.723-1.167-2.834v-.366a3.483 3.483 0 01-2.258-1.2 3.566 3.566 0 01-.908-2.434V3.1a.58.58 0 01.174-.425.58.58 0 01.426-.175h1.4v-.167a.486.486 0 01.5-.5.487.487 0 01.5.5v1.334a.485.485 0 01-.5.5.484.484 0 01-.5-.5V3.5h-1v2.833c0 .734.26 1.361.783 1.884.522.522 1.15.783 1.883.783.734 0 1.361-.261 1.884-.783.522-.523.783-1.15.783-1.884V3.5h-1v.167a.485.485 0 01-.5.5.484.484 0 01-.5-.5V2.333a.486.486 0 01.5-.5.487.487 0 01.5.5V2.5h1.4a.58.58 0 01.425.175.58.58 0 01.175.425v3.233c0 .934-.303 1.745-.908 2.434a3.485 3.485 0 01-2.259 1.2v.366c0 .834.292 1.542.876 2.126a2.893 2.893 0 002.124.874c.834 0 1.542-.291 2.126-.874a2.895 2.895 0 00.874-2.126V9.25a1.738 1.738 0 01-.858-.609 1.601 1.601 0 01-.342-1.008c0-.478.167-.883.5-1.216.334-.334.734-.5 1.2-.5.478 0 .884.166 1.217.5.333.333.5.738.5 1.216 0 .378-.114.714-.341 1.008-.228.295-.52.498-.876.609v1.083c0 1.111-.389 2.056-1.166 2.834-.778.777-1.723 1.166-2.834 1.166zm3.5-6c.2 0 .37-.07.509-.208a.674.674 0 00.208-.492c0-.2-.07-.37-.208-.508a.692.692 0 00-.509-.208c-.2 0-.366.07-.5.208a.706.706 0 00-.2.508c0 .19.067.353.2.492.134.139.3.208.5.208z"
            fill="#595959"
          ></path>
        </svg>
        <Typography className="cardDoctor_item-text">
          {item?.medicalSpecialty}
        </Typography>
      </Space>
      <Space className="cardDoctor_item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M8.585 11.581v1.217c0 .338.119.626.355.862.237.237.524.355.861.355.338 0 .626-.118.863-.355.237-.236.356-.524.356-.862v-1.217h1.217c.338 0 .625-.118.862-.354.236-.237.355-.524.355-.862 0-.338-.119-.625-.355-.862a1.172 1.172 0 00-.862-.356H11.02V7.93c0-.338-.119-.625-.355-.862a1.172 1.172 0 00-.861-.355c-.338 0-.626.118-.863.355a1.172 1.172 0 00-.356.862v1.217H7.368c-.338 0-.625.118-.862.355a1.172 1.172 0 00-.355.861c0 .338.119.625.355.863.237.237.524.355.862.355h1.217zM4.26 17.667c-.484 0-.898-.173-1.243-.517a1.695 1.695 0 01-.517-1.243V7.593a1.748 1.748 0 01.704-1.408l5.542-4.166c.308-.235.66-.352 1.055-.352.396 0 .748.117 1.058.352L16.4 6.185a1.747 1.747 0 01.704 1.408v8.314c0 .484-.172.898-.517 1.243a1.695 1.695 0 01-1.243.517H4.26zm0-1.46h11.085c.087 0 .16-.029.215-.085a.292.292 0 00.085-.215V7.593a.282.282 0 00-.033-.136.366.366 0 00-.09-.107L9.98 3.193a.261.261 0 00-.177-.066.261.261 0 00-.178.066L4.082 7.35a.365.365 0 00-.089.107.282.282 0 00-.033.136v8.314c0 .087.029.159.085.215a.292.292 0 00.215.084z"
            fill="#595959"
          ></path>
        </svg>
        <Typography className="cardDoctor_item-text">
          Medical Center Japan T-Matsuoka
        </Typography>
      </Space>
      <Space className="cardDoctor_item">
        <EnvironmentOutlined className="cardDoctor_icon" />
        <Typography className="cardDoctor_item-text">
          {item?.address}
        </Typography>
      </Space>
      <Button className="cardDoctor_button cardDoctor_item-text" onClick={() => {
        dispatch(getDoctorDetail(item?.idDoctor));
        navigate(`/doctor/${item.idDoctor}`)
      }}>
        Book Appointment
      </Button>
    </div>
  );
};
