
import { Tabs } from "antd";
import "./Setting.scss"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { linksAccount, linksDoctorProfile } from "../../../constant/links";
import { DownOutlined, RightOutlined } from "@ant-design/icons";



const Setting = () => {
    const { TabPane } = Tabs;
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const navItem = linksDoctorProfile.map((item, index) => {
        return (
            <Link key={index} className={`setting-tab1__left-nav ${pathname.toString() === item.href.toString() ? "setting-tab1__left-active" : ""}`} to={item.href}>
                <span className="setting-font" style={{ color: pathname.toString() === item.href.toString() ? "#3372fe" : "" }}>{item.label}</span>
                {
                    pathname.toString() === item.href.toString() ? <DownOutlined style={{ fontSize: 18, color: '#3372fe' }} /> : <RightOutlined style={{ fontSize: 18, color: '#6c81a0' }} />
                }
            </Link>
        )
    })

    const navAccountItem = linksAccount.map((item, index) => {
        return (
            <Link key={index} className={`setting-tab1__left-nav2 ${pathname.toString() === item.href.toString() ? "setting-tab1__left-active" : ""}`} to={item.href}>
                <span className="setting-font" style={{ color: pathname.toString() === item.href.toString() ? "#3372fe" : "" }}>{item.label}</span>
                {
                    pathname.toString() === item.href.toString() ? <DownOutlined style={{ fontSize: 18, color: '#3372fe' }} /> : <RightOutlined style={{ fontSize: 18, color: '#6c81a0' }} />
                }
            </Link>
        )
    })
    return (
        <div className="setting">
            <Tabs onChange={(e) => {
                if (e === "2") navigate("/dr.Enclinic/setting/work-schedule")
                if (e === "1") navigate("/dr.Enclinic/setting/profile/personal")
                if (e === "3") navigate("/dr.Enclinic/setting/account/password")
            }}>
                <TabPane key={1} tab="Profile">
                    <div className="setting-tab1">
                        <div className="setting-tab1__left">{navItem}</div>
                        <div className="setting-tab1__right"><Outlet /></div>
                    </div>
                </TabPane>
                <TabPane key={2} tab="Schedule">
                    <Outlet />
                </TabPane>
                <TabPane key={3} tab="Account">
                    <div className="setting-tab1">
                        <div className="setting-tab1__left">{navAccountItem}</div>
                        <div className="setting-tab1__right"><Outlet /></div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Setting