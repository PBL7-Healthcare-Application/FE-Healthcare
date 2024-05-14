import "./Profile.scss"
import doctorDefault from "../../../assets/images/doctor.jpeg"
import { Button, DatePicker, Form, Image, Input, Select, Typography } from "antd"
import dayjs from "dayjs"
import TextArea from "antd/es/input/TextArea"
import { useSelector } from "react-redux"
import { EditFilled } from "@ant-design/icons"
import { useState } from "react"
const ProfileDr = () => {
    const { profile } = useSelector((state) => state.doctor)
    const [isEdit, setIsEdit] = useState(false);

    const handleCancel = () => {
        setIsEdit(!isEdit);
    }
    const handleSave = () => {

    }
    return (
        <div className="profileDr">
            <div className="profile-header" style={{ width: '100%', justifyContent: 'flex-start' }}>
                <Image
                    src={profile?.avatar}
                    width={120}
                    className="profile-header__img"
                    fallback={doctorDefault}
                    preview={false}
                />
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div className="profile-header__info">
                        <span className="profile-header__font">{profile?.name}</span>
                        <span
                            className="profile-header__font"
                            style={{ fontSize: 18, color: "rgb(45, 135, 243)" }}
                        >
                            {profile?.email}
                        </span>
                    </div>
                    {!isEdit && <div className="profile-edit" onClick={() => setIsEdit(!isEdit)}>
                        <span
                            className="profile-header__font"
                            style={{ fontSize: 18, color: "rgb(45, 135, 243)" }}
                        >
                            Edit
                        </span>
                        <EditFilled className="profile-edit__icon" />
                    </div>}
                </div>
            </div>
            <div className="profileDr-content">
                <Form
                    name="normal_login"
                    className="profileDr-content__form"
                    initialValues={{
                        remember: true,
                    }}
                //   onFinish={onFinish}
                >
                    <Form.Item style={{
                        marginBottom: 0,
                        marginRight: 30
                    }}>

                        <Form.Item
                            name="Name"
                            normalize={(value) => value.trim()}

                        >
                            <Typography className="label">Name</Typography>
                            <Input
                                value={profile?.name}
                                className="input__username input"
                                onChange={(e) => {
                                    e.target.value = e.target.value.trim();
                                }}
                            />
                        </Form.Item>

                    </Form.Item>
                    {/* ============================== */}

                    <Form.Item style={{
                        marginBottom: 0,
                    }}>

                        <Form.Item
                            name="Name"
                            normalize={(value) => value.trim()}
                            style={{
                                display: "inline-block",
                                width: "calc(50% - 30px)",
                            }}
                        >
                            <Typography className="label">Year Of Experience</Typography>
                            <Input
                                value={profile?.yearExperience}
                                className="input__username input"
                                onChange={(e) => {
                                    e.target.value = e.target.value.trim();
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            normalize={(value) => value.trim()}
                            style={{
                                display: "inline-block",
                                width: "calc(50% - 30px)",
                                margin: '0 30px'
                            }}
                        >
                            <Typography className="label">Specialty</Typography>
                            <Select
                                defaultValue={profile?.medicalSpecialty}
                                style={{ margin: '8px 0', height: 46 }}
                                onChange={(e) => {
                                    e.target.value = e.target.value.trim();
                                }}
                            />
                        </Form.Item>
                    </Form.Item>

                    {/* ============================== */}

                    <Form.Item style={{
                        marginBottom: 0,
                    }}>

                        <Form.Item
                            name="Name"
                            normalize={(value) => value.trim()}
                            style={{
                                display: "inline-block",
                                width: "calc(50% - 30px)",
                            }}
                        >
                            <Typography className="label">Date Of Birth</Typography>
                            <DatePicker
                                className="profile-datePicker"
                                style={{ marginTop: 10 }}
                                value={dayjs(new Date(profile?.dob))}
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            normalize={(value) => value.trim()}
                            style={{
                                display: "inline-block",
                                width: "calc(50% - 30px)",
                                margin: '0 30px'
                            }}
                        >
                            <Typography className="label">Gender</Typography>
                            <Select
                                defaultValue={profile?.gender}
                                style={{ margin: '8px 0', height: 46 }}
                                onChange={(e) => {
                                    e.target.value = e.target.value.trim();
                                }}
                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item style={{
                        marginBottom: 0,
                    }}>

                        <Form.Item
                            name="Name"
                            normalize={(value) => value.trim()}
                            style={{
                                display: "inline-block",
                                width: "calc(50% - 30px)",
                            }}
                        >
                            <Typography className="label">Phone Number</Typography>
                            <Input
                                value={profile?.phoneNumber}
                                className="input__username input"
                                onChange={(e) => {
                                    e.target.value = e.target.value.trim();
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            normalize={(value) => value.trim()}
                            style={{
                                display: "inline-block",
                                width: "calc(50% - 30px)",
                                margin: '0 30px'
                            }}
                        >
                            <Typography className="label">Fees</Typography>
                            <Select
                                defaultValue={profile?.price.toLocaleString("vi-VN")}
                                style={{ margin: '8px 0', height: 46 }}
                                onChange={(e) => {
                                    e.target.value = e.target.value.trim();
                                }}
                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item style={{
                        marginBottom: 0,
                        marginRight: 30
                    }}>

                        <Form.Item
                            name="Name"
                            normalize={(value) => value.trim()}

                        >
                            <Typography className="label">Enclinic Name</Typography>
                            <Input
                                value={profile?.nameClinic}
                                className="input__username input"
                                onChange={(e) => {
                                    e.target.value = e.target.value.trim();
                                }}
                            />
                        </Form.Item>

                    </Form.Item>
                    <Form.Item style={{
                        marginBottom: 0,
                        marginRight: 30
                    }}>

                        <Form.Item
                            name="Name"
                            normalize={(value) => value.trim()}

                        >
                            <Typography className="label">Address</Typography>
                            <Input
                                value={profile?.address}
                                className="input__username input"
                                onChange={(e) => {
                                    e.target.value = e.target.value.trim();
                                }}
                            />
                        </Form.Item>

                    </Form.Item>

                    <Form.Item style={{ marginRight: 30 }}>
                        <Typography className="label">Desciption</Typography>
                        <TextArea
                            value={profile?.description}
                            className="profileDr-font"
                            placeholder="Controlled autosize"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            style={{
                                marginTop: 10
                            }}
                        />
                    </Form.Item>
                    {/* <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            style={{ marginTop: 10, }}
                        >
                            Sign in
                        </Button>
                    </Form.Item> */}
                </Form>
            </div>
            {isEdit && (
                <div className="profile-buttonArea" style={{ marginTop: 30, justifyContent: 'center' }}>
                    <Button
                        className="result-third__button-text profile-buttonArea__button-save"
                        onClick={() => handleCancel()}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="result-third__button-text profile-buttonArea__button"
                        // disabled={isDisabled}
                        onClick={() => handleSave()}
                    >
                        Save
                    </Button>
                </div>
            )}

        </div>
    )
}

export default ProfileDr