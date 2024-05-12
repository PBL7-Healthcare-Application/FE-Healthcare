
import { Button, Image, Typography } from "antd";
import "./AppointmentDetail.scss";
import personDefault from "../../../assets/images/personDefault.png";
import location from "../../../assets/images/location.png";
import calender from "../../../assets/images/calandar.png";
import problem from "../../../assets/images/problem.png";
import back from "../../../assets/images/back.png";
import { useNavigate } from "react-router-dom";

export const AppointmentDetail = () => {
    const navigate = useNavigate();
    return (
        <div className="appointmentDetail">
            <span className="setting-font" style={{ fontSize: 25, fontWeight: 600, color: "#185FA0" }}>Detail Appointment</span>
            <div className="appointmentDetail-main">
                <div style={{ marginTop: 10, marginLeft: 20 }} onClick={() => navigate(-1)}>
                    <Image src={back} preview={false} className="appointmentDetail-icon" />
                </div>
                <div className="appointmentDetail-content">
                    <div className="appointmentDetail-left">
                        <Image src={""} width={200} preview={false} fallback={personDefault} className="appointmentDetail-left__image" />
                        <span className="appointmentDetail-font">Bui Van Huy</span>
                    </div>
                    <div className="appointmentDetail-right">
                        <div className="cardAppointment--item">
                            <Image
                                src={calender}
                                width={23}
                                className="appointment-right__content-icon"
                                preview={false}
                            />
                            <div>
                                <Typography
                                    className="appointment-font"
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        letterSpacing: 0.4,
                                    }}
                                >
                                    {"07:00 - 08:00"}
                                </Typography>
                                <Typography
                                    className="appointment-font"
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 400,
                                        color: "#6c81a0",
                                    }}
                                >
                                    {"Sunday, May 12, 2024"}
                                </Typography>
                            </div>
                        </div>
                        <div className="cardAppointment--item">
                            <Image
                                src={location}
                                width={23}
                                className="appointment-right__content-icon"
                                preview={false}
                            />
                            <div>
                                <Typography
                                    className="appointment-font"
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        letterSpacing: 0.4,
                                    }}
                                >
                                    {"Phòng khám Đa khoa Saigon Healthcare"}
                                </Typography>
                                <Typography
                                    className="appointment-font"
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 400,
                                        color: "#6c81a0",
                                    }}
                                >
                                    {"45 Đường Thành Thái, phường 14, Quận 10, Thành phố Hồ Chí Minh, Vietnam"}
                                </Typography>
                            </div>
                        </div>
                        <div className="cardAppointment--item">
                            <Image
                                src={problem}
                                width={23}
                                className="appointment-right__content-icon"
                                preview={false}
                            />
                            <div>

                                <Typography
                                    className="appointment-font"
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 400,
                                        color: "#6c81a0",
                                    }}
                                >
                                    {"I had a headache"}
                                </Typography>
                            </div>
                        </div>
                        <div className="cardAppointment--item">
                            <Image
                                src={""}
                                width={23}
                                className="appointment-right__content-icon"
                                preview={false}
                            />
                            <span className="appointmentDetail-left__status">Booked</span>
                        </div>

                        <div className="appointmentDetail-right__buttonView">
                            <Button className="appointmentDetail-right__button">Cancel</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
