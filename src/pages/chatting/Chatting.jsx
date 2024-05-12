
import Chat from "../../components/chatting/Chat/Chat"
import ListUser from "../../components/chatting/List/List"
import "./Chatting.scss"

const Chatting = () => {
    return (
        <div className="chatting">
            <div className="chatting-container">
                <ListUser />
                <Chat />
            </div>
        </div>
    )
}

export default Chatting