
import { Image, Progress, Rate, Typography } from "antd"
import { useEffect, useState } from "react";
import { getRating } from "../../../api/user.api";
import { getDoctorById } from "../../../api/doctor.api";
import doctorDefault from "../../../assets/images/doctor.jpeg";
import Rating from "../../../components/Rate/Rate";
import "./RatingDoctor.scss"


const RatingDoctor = () => {
    const [doctorDetail, setDoctorDetail] = useState({});
    const [listRate, setListRate] = useState([]);
    const [tableOfrate, setTableOfRate] = useState(null);

    const getInfor = async () => {
        const id = JSON.parse(localStorage.getItem("doctor")).idDoctor;
        const promises = [getDoctorById(id), getRating(id)];


        const [doctor, list] = await Promise.all(promises);

        setDoctorDetail(doctor.data);
        setListRate(list.data);
        setTableOfRate(list.statisticalTableOfRating);
    }

    useEffect(() => {
        getInfor();
    }, [])
    return (
        <div className="DoctorAppointment-filter">
            <div className="detailDr-content__left" style={{ height: '100%' }}>
                <div className="detailDr-content__left-profile" style={{ marginBottom: 20 }}>
                    <Image
                        src={doctorDetail?.avatar}
                        width={150}
                        style={{ borderRadius: 6 }}
                        preview={false}
                        fallback={doctorDefault}
                    />
                    <div className="detailDr-content__left-profile--infor">
                        <div>
                            <Typography className="detailDr-content__left-profile--infor__name">
                                {doctorDetail?.name}
                            </Typography>
                            <Typography className="detailDr-content__left-profile--infor__specialty">
                                {doctorDetail?.medicalSpecialty}
                            </Typography>
                        </div>

                    </div>
                </div>

                <div style={{ marginTop: 20, height: '100%' }} >
                    <div className="detailDr-content__left-information__profile rate">
                        <div className="rate__box">
                            <div className="rate__box__child">
                                <span className="rate__text rate__totalPoint">
                                    {parseFloat(doctorDetail?.rateAverage).toFixed(1)}
                                    <span className="rate__text rate__scale-point">
                                        /5
                                    </span>
                                </span>
                                <span
                                    className="rate__text rate__review"
                                    style={{ width: "100%" }}
                                >
                                    {doctorDetail?.numberOfComment} reviews
                                </span>
                            </div>
                            <div>
                                <Rate value={doctorDetail?.rateAverage} />
                            </div>
                        </div>
                        <div
                            style={{
                                width: "100%",
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                            }}
                        >
                            <div className="rate__item">
                                <span
                                    className="rate__text rate__review"
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 400,
                                        marginTop: 17,
                                    }}
                                >
                                    5 star
                                </span>
                                <div style={{ width: "100%" }}>
                                    <Progress
                                        percent={
                                            tableOfrate?.five > 0
                                                ? (tableOfrate?.five /
                                                    doctorDetail?.numberOfComment) *
                                                100
                                                : 100
                                        }
                                        size="small"
                                        showInfo={false}
                                        strokeColor={
                                            tableOfrate?.five > 0
                                                ? "rgb(255, 181, 33)"
                                                : "#fef9c3"
                                        }
                                    />
                                </div>
                            </div>
                            <div className="rate__item">
                                <span
                                    className="rate__text rate__review"
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 400,
                                        marginTop: 17,
                                    }}
                                >
                                    4 star
                                </span>
                                <div style={{ width: "100%" }}>
                                    <Progress
                                        percent={
                                            tableOfrate?.four > 0
                                                ? (tableOfrate?.four /
                                                    doctorDetail?.numberOfComment) *
                                                100
                                                : 100
                                        }
                                        size="small"
                                        showInfo={false}
                                        strokeColor={
                                            tableOfrate?.four > 0
                                                ? "rgb(255, 181, 33)"
                                                : "#fef9c3"
                                        }
                                    />
                                </div>
                            </div>
                            <div className="rate__item">
                                <span
                                    className="rate__text rate__review"
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 400,
                                        marginTop: 17,
                                    }}
                                >
                                    3 star
                                </span>
                                <div style={{ width: "100%" }}>
                                    <Progress
                                        percent={
                                            tableOfrate?.three > 0
                                                ? (tableOfrate?.three /
                                                    doctorDetail?.numberOfComment) *
                                                100
                                                : 100
                                        }
                                        size="small"
                                        showInfo={false}
                                        strokeColor={
                                            tableOfrate?.three > 0
                                                ? "rgb(255, 181, 33)"
                                                : "#fef9c3"
                                        }
                                    />
                                </div>
                            </div>
                            <div className="rate__item">
                                <span
                                    className="rate__text rate__review"
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 400,
                                        marginTop: 17,
                                    }}
                                >
                                    2 star
                                </span>
                                <div style={{ width: "100%" }}>
                                    <Progress
                                        percent={
                                            tableOfrate?.two > 0
                                                ? (tableOfrate?.two /
                                                    doctorDetail?.numberOfComment) *
                                                100
                                                : 100
                                        }
                                        size="small"
                                        showInfo={false}
                                        strokeColor={
                                            tableOfrate?.two > 0
                                                ? "rgb(255, 181, 33)"
                                                : "#fef9c3"
                                        }
                                    />
                                </div>
                            </div>
                            <div className="rate__item">
                                <span
                                    className="rate__text rate__review"
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 400,
                                        marginTop: 17,
                                    }}
                                >
                                    1 star
                                </span>
                                <div style={{ width: "100%" }}>
                                    <Progress
                                        percent={
                                            tableOfrate?.one > 0
                                                ? (tableOfrate?.one /
                                                    doctorDetail?.numberOfComment) *
                                                100
                                                : 100
                                        }
                                        size="small"
                                        showInfo={false}
                                        strokeColor={
                                            tableOfrate?.one > 0
                                                ? "rgb(255, 181, 33)"
                                                : "#fef9c3"
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="detailDr-content__left-information__profile"
                        style={{ marginTop: 50, height: 300, overflowY: 'scroll' }}
                    >
                        {listRate.map((item, index) => (
                            <Rating key={index} item={item} />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RatingDoctor