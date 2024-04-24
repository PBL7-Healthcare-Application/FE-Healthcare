
import { Typography } from "antd";
import "./CardDay.scss"



const CardDay = () => {



    return (
        <div className="dayBox">
            <Typography className="dayBox__title">Wed</Typography>
            <Typography className="dayBox__title" style={{ fontWeight: 600, fontSize: 15, color: "rgb(64, 64, 64)" }}>24/4</Typography>
            <Typography className="dayBox__title" style={{ color: 'rgb(24, 95, 160)', fontSize: 12 }}>10 available</Typography>
        </div>
    )
}

export default CardDay;