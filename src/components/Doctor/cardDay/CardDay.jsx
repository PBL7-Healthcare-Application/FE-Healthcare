/* eslint-disable react/prop-types */
import { Typography } from "antd";
import "./CardDay.scss";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types, no-unused-vars
const CardDay = ({
  // eslint-disable-next-line react/prop-types
  dateOfWeek,
  date,
  month,
  available,
  item,
  handleClick,
  index,
}) => {
  const { isSelected } = useSelector((state) => state.search);

  return (
    <div
      className={`dayBox ${isSelected === index ? " dayBox__active" : ""}`}
      onClick={() => {
        handleClick(index, item);
      }}
    >
      <Typography className="dayBox__title">{dateOfWeek}</Typography>
      <Typography
        className="dayBox__title"
        style={{ fontWeight: 600, fontSize: 15, color: "rgb(64, 64, 64)" }}
      >
        {date}/{month}
      </Typography>
      <Typography
        className="dayBox__title"
        style={{ color: "rgb(24, 95, 160)", fontSize: 12 }}
      >
        {available} available
      </Typography>
    </div>
  );
};

export default CardDay;
