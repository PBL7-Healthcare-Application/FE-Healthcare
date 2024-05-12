

import { Button, Form, Select, Typography } from 'antd'
import { Per, Time } from '../../../constant/options'

const SetUpSchedule = () => {
    return (
        <div className="setting-tab2">
            <span className="setting-font" style={{ fontSize: 25, fontWeight: 600, color: "#185FA0" }}>Set Up Your Schedule</span>
            <div>
                <Form
                    name="normal_login"
                    className="login-form"
                    style={{ minWidth: 620 }}
                    initialValues={{
                        remember: true,
                    }}

                >


                    <Typography className="label">Time per appointment (minute)</Typography>
                    <Form.Item
                        name="per"

                        normalize={(value) => value.trim()}
                    >
                        <Select style={{ height: 40, marginTop: 10 }} options={Per.map((item) => ({ label: item.value, value: item.value }))} />
                    </Form.Item>
                    {/* ================= */}
                    <Typography className="label">Working time start at (hour)</Typography>
                    <Form.Item
                        name="start"

                        normalize={(value) => value.trim()}
                    >
                        <Select style={{ height: 40, marginTop: 10 }} options={Time.map((item) => ({ label: item.value, value: item.value }))} />
                    </Form.Item>
                    {/* ================= */}
                    <Typography className="label">Working time end at (hour)</Typography>
                    <Form.Item
                        name="end"

                        normalize={(value) => value.trim()}
                    >
                        <Select style={{ height: 40, marginTop: 10 }} options={Time.map((item) => ({ label: item.value, value: item.value }))} />

                    </Form.Item>
                    <Form.Item >
                        <div style={{ display: 'flex', flexDirection: 'row', gap: 40 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                style={{ marginTop: 10 }}
                            >
                                Update
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                style={{ marginTop: 10, backgroundColor: '#fff', color: '#185fa0', border: '2px solid #185fa0' }}
                            >
                                Cancel
                            </Button>
                        </div>

                    </Form.Item>

                </Form>
            </div>
        </div>
    )
}

export default SetUpSchedule