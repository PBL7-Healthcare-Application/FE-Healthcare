import "./Profile.scss"
import doctorDefault from "../../../assets/images/doctor.jpeg"
import { Button, DatePicker, Form, Image, Input, Select, Typography } from "antd"
import dayjs from "dayjs"
import TextArea from "antd/es/input/TextArea"
const ProfileDr = () => {
    return (
        <div className="profileDr">
            <div className="profile-header" style={{ width: '100%', justifyContent: 'flex-start' }}>
                <Image
                    src={""}
                    width={120}
                    className="profile-header__img"
                    fallback={doctorDefault}
                    preview={false}
                />
                <div className="profile-header__info">
                    <span className="profile-header__font">Bui Van Huy</span>
                    <span
                        className="profile-header__font"
                        style={{ fontSize: 18, color: "rgb(45, 135, 243)" }}
                    >
                        vanhuybuivips@gmail.com
                    </span>
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
                                value={"Bui Van Huy"}
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
                                value={"10 years"}
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
                                defaultValue={"Emergency Medicine"}
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
                            // value={dayjs(new Date(""))}
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
                                defaultValue={"Male"}
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
                                value={"0935350632"}
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
                                defaultValue={"200.000 đ"}
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
                                value={"Phòng khám Bệnh viện Đại học Y Dược 1"}
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
                                value={"20-22 Dương Quang Trung, Phường 10 (Quận 10), Quận 10, Ho Chi Minh City, Vietnam"}
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
        </div>
    )
}

export default ProfileDr