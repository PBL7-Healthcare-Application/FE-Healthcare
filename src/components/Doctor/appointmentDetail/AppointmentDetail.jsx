/* eslint-disable react/no-unescaped-entities */

import { Button, Image, Input, Modal, Typography, notification } from "antd";
import "./AppointmentDetail.scss";
import personDefault from "../../../assets/images/personDefault.png";
import location from "../../../assets/images/location.png";
import calender from "../../../assets/images/calandar.png";
import problem from "../../../assets/images/problem.png";
import disappointed from "../../../assets/images/disappointed.png";
import back from "../../../assets/images/back.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../helpers/timeBooking";
import { icon } from "../../../helpers/icon";
import { useEffect, useState } from "react";
import { cancelDoctorAppointment } from "../../../stores/doctor/DoctorThunk";
import { openNotificationWithIcon } from "../../notification/CustomNotify";
import { delay } from "lodash";
import { setError, setStatusCode } from "../../../stores/doctor/DoctorSlice";

export const AppointmentDetail = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [reason, setReason] = useState("");
    const [idAppointment, setIdAppointment] = useState("");
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const { appointmentDetail, error, statusCode } = useSelector((state) => state.doctor);
    const dispatch = useDispatch();
    const handleCancel = (id) => {
        setIdAppointment(id);
        setIsModalOpen(!isModalOpen);
    };
    const handleInputChange = (value) => {
        setIsDisabled(false);
        setReason(value);
    };
    const handleOk = () => {
        // setReason("-- Select --");
        setReason("");
        setIsDisabled(true);
        dispatch(
            cancelDoctorAppointment({
                idAppointment: idAppointment,
                reason: reason,
            })
        );
    };

    useEffect(() => {
        if (statusCode === 200) {
            openNotificationWithIcon(
                "success",
                api,
                "",
                "The appointment has been successfully cancelled!"
            );
            delay(() => {
                dispatch(setStatusCode(null));
                setIsModalOpen(!isModalOpen);
                navigate(-1);
            }, 1500);
        }
        if (error !== null) {
            openNotificationWithIcon(
                "error",
                api,
                "",
                "The appointment has been unsuccessfully cancelled!"
            );
            delay(() => {
                dispatch(setError(null));
                setIsModalOpen(!isModalOpen);
            }, 1500);
        }
    }, [statusCode, api, error, dispatch, isModalOpen, navigate]);

    return (
        <div className="appointmentDetail">
            <span className="setting-font" style={{ fontSize: 25, fontWeight: 600, color: "#185FA0" }}>Detail Appointment</span>
            <div className="appointmentDetail-main">
                {contextHolder}
                <div style={{ marginTop: 10, marginLeft: 20 }} onClick={() => navigate(-1)}>
                    <Image src={back} preview={false} className="appointmentDetail-icon" />
                </div>
                <div className="appointmentDetail-content">
                    <div className="appointmentDetail-left">
                        <Image src={appointmentDetail?.avatarUser} width={200} preview={false} fallback={personDefault} className="appointmentDetail-left__image" />
                        <span className="appointmentDetail-font">{appointmentDetail?.nameUser}</span>
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
                                    {appointmentDetail?.startTime} - {appointmentDetail?.endTime}
                                </Typography>
                                <Typography
                                    className="appointment-font"
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 400,
                                        color: "#6c81a0",
                                    }}
                                >
                                    {formatDate(appointmentDetail?.date)}
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
                                    {appointmentDetail?.nameClinic}
                                </Typography>
                                <Typography
                                    className="appointment-font"
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 400,
                                        color: "#6c81a0",
                                    }}
                                >
                                    {appointmentDetail?.address ? appointmentDetail?.address : "--"}
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
                                    {appointmentDetail?.issue}
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
                            {icon(appointmentDetail?.status)}
                        </div>


                        <div className="appointmentDetail-right__buttonView" style={{ marginTop: 50 }}>
                            {
                                appointmentDetail?.status === 4 && (
                                    <Button className="appointmentDetail-right__buttonEx" onClick={() => navigate("/dr.Enclinic/examination", {
                                        state: {
                                            idUser: appointmentDetail?.idUser,
                                        }
                                    })} >Examination</Button>
                                )
                            }
                            {
                                appointmentDetail?.status !== 2 && appointmentDetail?.status !== 3 && (
                                    <Button className="appointmentDetail-right__button" onClick={() => handleCancel(appointmentDetail?.idAppointment)}>Cancel</Button>
                                )}
                        </div>





                    </div>
                    <Modal
                        title="Cancel appointment"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={() => setIsModalOpen(!isModalOpen)}
                        okButtonProps={{
                            disabled: isDisabled,
                        }}
                    >
                        <div className="myAppointment-cancel">
                            <Image src={disappointed} preview={false} width={90} />
                            <div className="myAppointment-cancel__content">
                                <span className="myAppointment-cancel__content-text">
                                    We're sorry!
                                </span>
                                <span
                                    className="myAppointment-cancel__content-text"
                                    style={{ fontSize: 14, fontWeight: 400 }}
                                >
                                    Please help us understand more about the reason behind
                                    canceling your appointment so we can improve our service in
                                    the future.
                                </span>
                            </div>
                            <div
                                className="myAppointment-cancel__content"
                                style={{ marginTop: 12 }}
                            >
                                <span
                                    className="myAppointment-cancel__content-text"
                                    style={{ fontSize: 14, fontWeight: 500 }}
                                >
                                    Reason
                                </span>
                                <Input onChange={(e) => handleInputChange(e.target.value)} />
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
