import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Badge, Image, Layout, Menu, Space } from "antd";
import "../doctor/DoctorLayout.scss";
import title from "../../assets/images/title.png";
import logo from "../../assets/images/logo.png";
import { FaRegBookmark, FaUsers } from "react-icons/fa";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SignInBtn from "../../components/header/SignInBtn";
import getToken from "../../helpers/getToken";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../stores/auth/AuthSlice";
import deleteToken from "../../helpers/deleteToken";
import "./AdminLayout.scss";
import { TiThList } from "react-icons/ti";
import { getUserProfile } from "../../stores/user/UserThunk";
import { IoNotifications } from "react-icons/io5";
import Notify from "../../components/notify/Notify";
import { setNotify, setNotifyOld } from "../../stores/Chat/ChatSlice";
import { collection, onSnapshot, query } from "firebase/firestore";
import { dbNotify } from "../../helpers/firebase";
import { orderBy } from "lodash";
const { Header, Sider, Content } = Layout;
const AdminLayout = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [current, setCurrent] = useState("/appointment");
  const location = useLocation();
  const [token, setToken] = useState("");
  const [isNoti, setIsNoti] = useState(false);
  const [countNoti, setCountNoti] = useState("");
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.profile);
  useEffect(() => {
    const endpoint = location.pathname;
    setCurrent(`/${endpoint.split("/")[2]}`);
  }, [location.pathname]);
  useEffect(() => {
    const token = getToken();
    setToken(token);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNoti && event.target.closest(".notification-icon") === null) {
        setIsNoti(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isNoti]);
  useEffect(() => {
    const notifyCollection = collection(dbNotify, "notifications");
    const q = query(notifyCollection, orderBy("createAt", "asc")); // replace 'yourCollectionName' with the name of your collection
    const unSub = onSnapshot(q, (snapshot) => {
      const notifyData = snapshot.docs.map((doc) => ({
        id: doc.id, // get the id of the document
        ...doc.data(), // get the data of the document
      }));
      const listFilter = notifyData.filter((item) => {
        if (item?.idAdmin) {
          return item.idAdmin === profile?.idUser && !item.isRead;
        }
      });
      const listFilterOld = notifyData.filter((item) => {
        if (item?.idAdmin) {
          return item.idAdmin === profile?.idUser && item.isRead;
        }
      });
      setCountNoti(listFilter?.length);
      dispatch(setNotify(listFilter));
      dispatch(setNotifyOld(listFilterOld));
    });
    return () => {
      unSub();
    };
  }, [dispatch, profile]);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
      dispatch(getUserProfile());
    }
    return () => { };
  }, [token, dispatch]);

  useEffect(() => {
    if (profile === null) {
      const token = getToken();
      if (!token) {
        setIsLogin(false);
      }
    }
  }, [profile]);

  const onNavItemClick = (e) => {
    setCurrent(e.key);
    navigate(`/admin${e.key}`);
  };
  const handleLogout = async () => {
    dispatch(logOut());
    localStorage.removeItem("profile");
    localStorage.removeItem("user");
    deleteToken();
    navigate("/");
  };

  return (
    <Layout style={{ backgroundColor: "#fff" }}>

      <Sider
        trigger={null}
        collapsible
        className="adminSlider"
        style={{ width: 310 }}
      >
        <div className="customSlider__logo">
          <Image src={logo} preview={false} width="60%" />
          <Image src={title} preview={false} width="70%" />
        </div>
        <Menu
          className="sidebar__nav"
          mode="inline"
          selectedKeys={[current]}
          items={[
            {
              key: "/users",
              icon: <FaUsers size={25} color="#b5bad4" />,
              label: "Users",
            },
            {
              key: "/appointments",
              icon: <FaRegBookmark size={25} color="#b5bad4" />,
              label: "Appointments",
            },
            {
              key: "/partners",
              icon: <TiThList size={25} color="#b5bad4" />,
              label: "Partners",
            },
          ]}
          onClick={onNavItemClick}
        />
        <div className="sidebar__logout" onClick={handleLogout}>
          <LogoutOutlined style={{ fontSize: 25, color: "#b5bad4" }} />
          <span className="sidebar__logout__text">Sign Out</span>
        </div>
      </Sider>



      <Layout style={{ backgroundColor: "#f1f5f9" }}>
        <Header className="customSlider__header">
          {isLogin ? (
            <Space className="avt">
              <div style={{ position: "relative" }}>
                <span
                  style={{ marginRight: 10, color: "#404040", marginTop: 5 }}
                  className="sidebar__logout__text"
                >
                  {profile?.name}
                </span>
                <Avatar
                  className="avt-avatar"
                  size="large"
                  style={{
                    backgroundColor: "#fde3cf",
                    color: "#f56a00",
                  }}
                >
                  {profile?.name[0]}
                </Avatar>
              </div>
              <Badge
                count={countNoti}
                style={{ cursor: "pointer" }}
                size="large"
                offset={[-5, 3]}
              >
                <div
                  className="notification-icon"
                  onClick={() => setIsNoti(!isNoti)}
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    padding: 10,
                    paddingBottom: 5,
                    backgroundColor: isNoti ? "#E3F2FE" : "#E4E6EB",
                    borderRadius: "50%",
                  }}
                >
                  <IoNotifications
                    size={26}
                    color={`${isNoti ? "#4096ff" : "#404040"}`}
                  />
                  {isNoti && <Notify onClose={() => setIsNoti(!isNoti)} />}
                </div>
              </Badge>
            </Space>
          ) : (
            <SignInBtn />
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            // backgroundColor: "#F5F7FA"
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
