/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import "./CardTime.scss";

const CardTime = ({ startTime, endTime, hadleClick, isBooking }) => {
  const { isTimeSelected } = useSelector((state) => state.search);
  return (
    <div
      className={`cardTime ${(isTimeSelected?.startTime === startTime) &
        (isTimeSelected?.endTime === endTime)
        ? " cardTime__active"
        : ""
        } ${isBooking ? "cardTime__disable" : ""}`}
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
