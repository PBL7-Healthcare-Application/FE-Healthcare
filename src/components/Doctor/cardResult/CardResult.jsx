/* eslint-disable react/prop-types */
import { Button, Image, Space, Typography } from "antd";
import "./CardResult.scss";
import {
  DollarOutlined,
  EnvironmentOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorDetail } from "../../../stores/search-doctor/SearchThunk";
import {
  setIsSelected,
} from "../../../stores/search-doctor/SearchSlice";

import doctorDefault from "../../../assets/images/doctor.jpeg";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../helpers/firebase";
import getToken from "../../../helpers/getToken";
import { changeChat, setChatSelected } from "../../../stores/Chat/ChatSlice";


// eslint-disable-next-line react/prop-types
const CardResult = ({ doctor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDetail = () => {
    // eslint-disable-next-line react/prop-types
    dispatch(setIsSelected(0));
    dispatch(getDoctorDetail(doctor?.idDoctor));
    navigate(`/doctor/${doctor.idDoctor}`);
  };
  const { chatUser } = useSelector((state) => state.chat);
  const { profile } = useSelector((state) => state.profile);
  const token = getToken();


  const checkExist = async (user) => {
    try {
      const userChatsRef = collection(db, "userchats");
      const userChatsDoc = await getDoc(doc(userChatsRef, user.id));
      if (userChatsDoc.exists()) {
        const userChatsData = userChatsDoc.data();
        const userChatIds = userChatsData.chats.map((chat) => chat.receiverId);
        if (userChatIds.includes(chatUser.id)) {
          console.log("userChatsData", userChatsData);
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handAddNewChat = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      let DoctorChat = null;
      const userRef = collection(db, "users");
      console.log(`huy1`, doctor);
      const q = query(userRef, where("email", "==", doctor.email));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        DoctorChat = querySnapShot.docs[0].data();
      }
      console.log(`huy`, DoctorChat);
      const exist = await checkExist(DoctorChat);
      if (exist) {
        const newChatRef = doc(chatRef);
        await setDoc(newChatRef, {
          createdAt: serverTimestamp(),
          messages: [],
        });
        await updateDoc(doc(userChatsRef, DoctorChat.id), {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: chatUser.id,
            updatedAt: Date.now(),
          }),
        });
        await updateDoc(doc(userChatsRef, chatUser.id), {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: DoctorChat.id,
            updatedAt: Date.now(),
          }),
        });
      } else {
        var user = null;
        const queryUser = query(userRef, where("email", "==", profile.email));
        const querySnapShotUser = await getDocs(queryUser);
        if (!querySnapShot.empty) {
          user = querySnapShotUser.docs[0].data();
          const userChatsRef = doc(db, "userchats", user.id);
          const userChatsSnapshot = await getDoc(userChatsRef);
          if (userChatsSnapshot.exists()) {
            const userChatsData = userChatsSnapshot.data();
            // userChatsData bây giờ chứa dữ liệu của userChatsRef
            const userChats = userChatsData?.chats?.filter(item => item.receiverId === DoctorChat.id);
            dispatch(setChatSelected(userChats[0]?.chatId));
            dispatch(changeChat({ chatId: userChats[0]?.chatId, user: DoctorChat }));
          }
        }

      }
      navigate("/chatting");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="result" onClick={handleDetail}>
      <div className="result-first">
        <Image
          src={doctor?.avatar}
          className="result-first__img"
          preview={false}
          fallback={doctorDefault}
          width={150}
        />
        <Space className="result-first__title">
          <Typography className="result-first__title-text">
            {doctor?.yearExperience} years exp
          </Typography>
        </Space>
      </div>
      <div className="result-second">
        <Space>
          <Typography className="result-second__name">
            {doctor?.name}
          </Typography>
          {/* <CheckCircleFilled style={{ color: "green" }} /> */}
        </Space>
        <Typography className="result-second__specialty">
          {doctor?.medicalSpecialty}
        </Typography>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Space className="result-second__address">
            <EnvironmentOutlined className="result-second__address-icon" />
            <Typography className="result-second__specialty">
              {doctor?.address ? doctor?.address : "--"}
            </Typography>
          </Space>
          <Space className="result-second__address">
            <DollarOutlined className="result-second__address-icon" />
            <Typography className="result-second__specialty">
              VND {doctor?.price && doctor?.price.toLocaleString("vi-VN")}
            </Typography>
          </Space>
        </div>
      </div>
      <div className="result-third">
        <div className="result-third__rate">
          {doctor?.rateAverage && (
            <Space className="result-third__rate-item">
              <StarFilled className="result-third__rate-icon" />
              <Typography className="result-third__rate-text">
                {parseFloat(doctor?.rateAverage).toFixed(1)}/5
              </Typography>
            </Space>
          )}
        </div>
        {
          token && (
            <div
              className="result-third__button"
              onClick={(e) => {
                e.stopPropagation();
                handAddNewChat();
              }}
            >
              <Button className="result-third__button-text">Chat now</Button>
              {/* <Button className="result-third__button-text">View details</Button> */}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default CardResult;
