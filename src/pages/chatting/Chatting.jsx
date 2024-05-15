
import { useSelector } from "react-redux";
import Chat from "../../components/chatting/Chat/Chat"
import ListUser from "../../components/chatting/List/List"
import "./Chatting.scss"

const Chatting = () => {
    const { chatId } = useSelector((state) => state.chat);
    return (
        <div className="chatting">
            <div className="chatting-container">
                <ListUser />
                {chatId && <Chat />}
            </div>
        </div>
    )
}

export default Chatting