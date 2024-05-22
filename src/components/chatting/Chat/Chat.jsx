import { Badge, Image, Spin, Upload } from "antd";
import "./Chat.scss";
import personDefault from "../../../assets/images/personDefault.png";
import { IoImages, IoSend, IoVideocam } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../helpers/firebase";
import { useDispatch, useSelector } from "react-redux";
import getImageUpload, {
  uploadImageForChating,
} from "../../../helpers/uploadCloudinary";
import { format } from "timeago.js";
import { setUser } from "../../../stores/Chat/ChatSlice";
import { PlusOutlined } from "@ant-design/icons";
const Chat = () => {
  const [chat, setChat] = useState();
  const [text, setText] = useState("");
  const endRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { chatId, user, chatUser } = useSelector((state) => state.chat);
  const [fileList, setFileList] = useState([]);
  const [urlList, setUrlList] = useState([]);
  const [isUploadImg, setIsUploadImg] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", user.id), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        dispatch(setUser(data));
      } else {
        console.log("No such document!");
      }
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [user.id, dispatch]);

  useEffect(() => {
    console.log(urlList);
    console.log(fileList);
  }, [urlList, fileList]);

  const handleSend = async () => {
    if (text === "" && urlList.length <= 0) return;
    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: chatUser.id,
          text,
          createdAt: new Date(),
          img: urlList.length > 0 ? urlList : [],
        }),
      });

      const userIDs = [chatUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === chatUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
      endRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.log(err);
    } finally {
      setFileList([]);
      setUrlList([]);
      setText("");
      setIsUploadImg(true);
    }
  };

  const handleImg = async (e) => {
    try {
      setLoading(true);
      const res = await getImageUpload(e.target.files[0]);
      setUrlList((prev) => [...prev, res]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsUploadImg(false);
      setFileList((prev) => [...prev, e.target.files[0]]);
    }
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 5,
        }}
      >
        Upload
      </div>
    </button>
  );
  useEffect(() => {
    if (fileList.length === 0) setIsUploadImg(true);
  }, [fileList]);
  const handleCustomRequest = async (options) => {
    try {
      const res = await uploadImageForChating(options);
      setUrlList((prev) => [...prev, res]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="chat">
      <div className="chat-top">
        <div className="chat-top__user">
          <Image
            src={user.avatar}
            fallback={personDefault}
            width={60}
            preview={false}
            style={{ borderRadius: "50%" }}
          />
          <div className="chat-top__texts">
            <span className="listUser-item__name">{user.usename}</span>
            <div className="chat-top__status">
              {user.online == true ? (
                <>
                  <div className="chat-top__dot"></div>
                  <span
                    className="listUser-item__name"
                    style={{ fontWeight: 500, fontSize: 12, marginTop: 1 }}
                  >
                    Online
                  </span>
                </>
              ) : (
                <span
                  className="listUser-item__name"
                  style={{ fontWeight: 500, fontSize: 12, marginTop: 1 }}
                >
                  {format(user?.lastSeen)}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="chat-top__icon">
          <IoVideocam size={30} style={{ marginRight: 10, color: "#185FA0" }} />
        </div>
      </div>
      <div className="chat-middle">
        {chat?.messages?.map((item, index) => (
          <div
            className={
              item.senderId === chatUser.id
                ? "chat-middle__message own"
                : "chat-middle__message"
            }
            key={index}
          >
            {item.senderId === chatUser.id ? (
              ""
            ) : (
              <Image
                fallback={personDefault}
                className="chat-middle__img"
                width={40}
                preview={false}
                src={user.avatar}
              />
            )}
            <div className="texts">
              {item.img?.length > 0 &&
                item.img.map((img, index) => (
                  <Image
                    src={img}
                    preview={false}
                    className="img"
                    key={index}
                  />
                ))}
              {item.text && <p className="chat-middle__content">{item.text}</p>}
              <span className="chat-middle__time">
                {format(item.createdAt.toDate())}
              </span>
            </div>
          </div>
        ))}

        <div ref={endRef}></div>
      </div>
      <div className="chat-bottom">
        {!isUploadImg && (
          <Upload
            customRequest={handleCustomRequest}
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            onRemove={() => urlList.pop()}
            style={{
              width: 10,
            }}
            accept="image/*"
          >
            {fileList.length >= 3 ? null : uploadButton}
          </Upload>
        )}
        <div className="chat-bottom__content">
          {isUploadImg && (
            <div>
              <label htmlFor="file">
                {loading ? (
                  <Spin />
                ) : (
                  <Badge>
                    <IoImages size={25} className="chat-bottom__icon" />
                  </Badge>
                )}
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleImg}
                accept="image/*"
              />
            </div>
          )}
          <input
            placeholder="Type a message"
            className="chat-bottom__input"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <IoSend
            size={25}
            className="chat-bottom__icon"
            style={{ marginRight: 10 }}
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
