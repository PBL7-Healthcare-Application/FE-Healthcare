/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import "./CardTime.scss";

const CardTime = ({ startTime, endTime, hadleClick }) => {
  const { isTimeSelected } = useSelector((state) => state.search);
  return (
    <div
      className={`cardTime ${
        (isTimeSelected?.startTime === startTime) &
        (isTimeSelected?.endTime === endTime)
          ? " cardTime__active"
          : ""
      }`}
      onClick={() => {
        hadleClick({
          startTime: startTime,
          endTime: endTime,
        });
      }}
    >
      <p className="cardTime__text">
        {startTime} - {endTime}
      </p>
    </div>
  );
};

export default CardTime;
