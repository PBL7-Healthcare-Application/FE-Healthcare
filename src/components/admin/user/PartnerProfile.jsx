/* eslint-disable react/prop-types */
import "../../DoctorProfile/Profile/Profile.scss";
import { Button, DatePicker, Form, Image, Input, Select, Space, Typography } from "antd";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import { useState } from "react";

const PartnerProfile = () => {
    const { partnerDetail } = useSelector((state) => state.admin);
    const [isEdit, setIsEdit] = useState(false);

    const handleCancel = () => {
        setIsEdit(!isEdit);
    };
    const handleSave = () => { };
    return (
        <div className="profileDr" style={{ padding: "0 30px" }}>
            <div className="profileDr-content" style={{ marginTop: 0 }}>
                <Form
                    name="normal_login"
                    className="profileDr-content__form"
                    initialValues={{
                        remember: true,
                    }}
                //   onFinish={onFinish}
                >


                    <div style={{ width: '100%', flexDirection: 'row', display: 'flex', gap: 30, alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Form.Item
                                name="Name"
                                normalize={(value) => value.trim()}
                            // style={{
                            //     display: "inline-block",
                            //     width: "calc(50% - 30px)",
                            // }}
                            >
                                <Typography className="label">Business License</Typography>
                                <Image src="https://californiahealthskills.com/wp-content/uploads/2023/03/Business-License.png" style={{ marginTop: 8 }} />
                            </Form.Item>

                        </div>
                        <div style={{ width: '100%', flex: 1 }}>
                            <Form.Item
                                name="Name"
                                normalize={(value) => value.trim()}
                                style={{ marginRight: 30 }}
                            // style={{
                            //     display: "inline-block",
                            //     width: "calc(50% - 30px)",
                            // }}
                            >
                                <Typography className="label">Specialty</Typography>
                                <Input
                                    value={partnerDetail?.medicalSpecialty}
                                    className={`input__username input ${!isEdit && "profileDr-input"
                                        }`}
                                    disabled={!isEdit}
                                    onChange={(e) => {
                                        e.target.value = e.target.value.trim();
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                normalize={(value) => value.trim()}
                                style={{ marginRight: 30 }}
                            // style={{
                            //     display: "inline-block",
                            //     width: "calc(50% - 30px)",
                            //     margin: "0 30px",
                            // }}
                            >
                                <Typography className="label">Phone Number</Typography>
                                <Input
                                    className={`input__username input ${!isEdit && "profileDr-input"
                                        }`}
                                    disabled={!isEdit}
                                    // defaultValue={partnerDetail?.price?.toLocaleString("vi-VN")}
                                    style={{ margin: "8px 0", height: 46 }}
                                    onChange={(e) => {
                                        e.target.value = e.target.value.trim();
                                    }}
                                    value={partnerDetail?.phoneNumber}
                                />
                            </Form.Item>



                            <Form.Item name="Name" normalize={(value) => value.trim()} style={{ marginRight: 30 }}>
                                <Typography className="label">Year Of Experience</Typography>
                                <Input
                                    value={partnerDetail?.nameClinic}
                                    className={`input__username input ${!isEdit && "profileDr-input"
                                        }`}
                                    disabled={!isEdit}
                                    onChange={(e) => {
                                        e.target.value = e.target.value.trim();
                                    }}
                                />
                            </Form.Item>



                        </div>
                    </div>
                    {/* ============================== */}
                    <Form.Item
                        style={{
                            marginBottom: 0,
                            marginRight: 30,
                        }}
                    >
                        <Form.Item name="Name" normalize={(value) => value.trim()}>
                            <Typography className="label">Clinic Name</Typography>
                            <Input
                                value={partnerDetail?.address}
                                className={`input__username input ${!isEdit && "profileDr-input"
                                    }`}
                                disabled={!isEdit}
                                onChange={(e) => {
                                    e.target.value = e.target.value.trim();
                                }}
                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        style={{
                            marginBottom: 0,
                            marginRight: 30,
                        }}
                    >
                        <Form.Item name="Name" normalize={(value) => value.trim()}>
                            <Typography className="label">Address</Typography>
                            <Input
                                value={partnerDetail?.address}
                                className={`input__username input ${!isEdit && "profileDr-input"
                                    }`}
                                disabled={!isEdit}
                                onChange={(e) => {
                                    e.target.value = e.target.value.trim();
                                }}
                            />
                        </Form.Item>
                    </Form.Item>





                </Form>
            </div>

        </div>
    );
};

export default PartnerProfile;
