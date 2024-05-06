import { Button, DatePicker, Divider, Image, Radio, Typography } from "antd";
import "./Profile.scss"
import { EditFilled } from "@ant-design/icons";
import { useState } from "react";

const Profile = () => {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <div style={{ padding: "20px 0" }}>
            <span className="profile-title">My Profile</span>
            <Divider />
            <div style={{ padding: "0 20px" }}>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div className="profile-header">
                        <Image src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-1/321425310_853450245775265_1754860979446746751_n.jpg?stp=dst-jpg_p200x200&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE2J5Lg7joaQIt4jTxEtVk15M-AD6jnwyPkz4APqOfDI1cb2gTCgHmrH3lqi3Ubc980huxs92EZwcgzc4ssQCR6&_nc_ohc=vPhjxHq-w_8Q7kNvgHLDOZ_&_nc_ht=scontent.fdad1-3.fna&oh=00_AfAeO-WRqvDkGAG4hDF88qppikRTR0ctWOYlU1kQMhjx-A&oe=663CDAB1" width={110} className="profile-header__img" />
                        <div className="profile-header__info">
                            <span className="profile-header__font">Nguyen Van A</span>
                            <span className="profile-header__font" style={{ fontSize: 18, color: "rgb(45, 135, 243)" }} >vanhuybuivips@gmail.com </span>
                        </div>
                    </div>
                    {
                        !isEdit && (
                            <div className="profile-edit" onClick={() => setIsEdit(!isEdit)}>
                                <span className="profile-header__font" style={{ fontSize: 18, color: "rgb(45, 135, 243)" }} >Edit</span>
                                <EditFilled className="profile-edit__icon" />
                            </div>
                        )
                    }
                </div>
                <div className="profile-content">

                    <div style={{ width: '100%' }}>
                        <Typography className="profile-header__font profile-header__label">Name</Typography>
                        <div className={`profile-content__coverInput ${isEdit ? "profile-content__coverInput-active" : ""}`}>
                            <input
                                className="profile-input"
                                disabled={!isEdit}
                                value={"Nguyen Van A"}
                            />
                        </div>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Typography className="profile-header__font profile-header__label">Date Of Birth</Typography>
                        <div className={`profile-content__coverInput ${isEdit ? "profile-radio-active" : ""}`}>
                            {
                                !isEdit ? (
                                    <input
                                        className="profile-input"
                                        disabled={true}
                                        placeholder="Email"
                                        value={"01/01/1999"}
                                    />
                                ) : (<DatePicker className="profile-datePicker" />)
                            }
                        </div>
                    </div>
                    <div style={{ width: '100%' }} className={`${isEdit ? "profile-radio-change" : ""}`}>
                        <Typography className="profile-header__font profile-header__label">Gender</Typography>
                        <div className={`profile-content__coverInput ${isEdit ? "profile-radio-active" : ""}`}>
                            {
                                !isEdit ? (
                                    <input
                                        className="profile-input"
                                        disabled={true}
                                        value={"Male"}
                                    />
                                ) : (
                                    <Radio.Group >
                                        <Radio value={1} className="profile-radio">Male</Radio>
                                        <Radio value={2} className="profile-radio">Female</Radio>
                                    </Radio.Group>
                                )
                            }
                        </div>
                    </div>
                    <div style={{ width: '100%' }} className={`${isEdit ? "profile-radio-change" : ""}`}>
                        <Typography className="profile-header__font profile-header__label">Address</Typography>
                        <div className={`profile-content__coverInput ${isEdit ? "profile-content__coverInput-active" : ""}`}>
                            <input
                                className="profile-input"
                                disabled={!isEdit}
                                value={"Ha Noi"}
                            />
                        </div>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Typography className="profile-header__font profile-header__label">Phone Number</Typography>
                        <div className={`profile-content__coverInput ${isEdit ? "profile-content__coverInput-active" : ""}`}>
                            <input
                                className="profile-input"
                                disabled={!isEdit}
                                value={"0905196237"}
                            />
                        </div>
                    </div>
                    {isEdit && (
                        <div className="profile-buttonArea">
                            <Button className="result-third__button-text profile-buttonArea__button-save" onClick={() => setIsEdit(!isEdit)}>Cancel</Button>
                            <Button className="result-third__button-text profile-buttonArea__button">Save</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Profile;