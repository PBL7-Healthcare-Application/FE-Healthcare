import { Image } from "antd"
import "./Chat.scss"
import personDefault from "../../../assets/images/personDefault.png"
import MainBefore from "../../../assets/images/MainBefore.webp"
import { IoImages, IoSend, IoVideocam } from "react-icons/io5"
import { useEffect, useRef } from "react"
const Chat = () => {
    const endRef = useRef(null)
    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [])
    return (
        <div className="chat">
            <div className="chat-top">
                <div className="chat-top__user">
                    <Image fallback={personDefault} width={60} preview={false} style={{ borderRadius: '50%' }} />
                    <div className="chat-top__texts">
                        <span className='listUser-item__name'>Jane Coe</span>
                        <div className="chat-top__status">
                            <div className="chat-top__dot"></div>
                            <span className='listUser-item__name' style={{ fontWeight: 500, fontSize: 12, marginTop: 1 }}>Online</span>
                        </div>
                    </div>
                </div>
                <div className="chat-top__icon">
                    <IoVideocam size={30} style={{ marginRight: 10, color: '#185FA0' }} />
                </div>
            </div>
            <div className="chat-middle">
                <div className="chat-middle__message">

                    <div className="texts">
                        <Image src={MainBefore} preview={false} className="img" />
                        <p className="chat-middle__content">Lorem ipsum dolor </p>
                        <span className="chat-middle__time">1 min ago</span>
                    </div>
                </div>
                <div className="chat-middle__message own">
                    <div className="texts">
                        <Image src={MainBefore} preview={false} className="img" />
                        <p className="chat-middle__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum architecto ad adad</p>
                        <span className="chat-middle__time">1 min ago</span>
                    </div>
                </div>
                <div className="chat-middle__message ">
                    <Image fallback={personDefault} className="chat-middle__img" width={40} preview={false} />
                    <div className="texts">

                        <p className="chat-middle__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum architecto dolore in nulla illo similique, rem possimus eveniet fugiat provident dicta eos, </p>
                        <span className="chat-middle__time">1 min ago</span>
                    </div>
                </div>
                <div className="chat-middle__message own">
                    <div className="texts">

                        <p className="chat-middle__content">Lorem ipsum </p>
                        <span className="chat-middle__time">1 min ago</span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>
            <div className="chat-bottom">
                <IoImages size={25} className="chat-bottom__icon" />
                <input placeholder="Type a message" className="chat-bottom__input" />
                <IoSend size={25} className="chat-bottom__icon" style={{ marginRight: 10 }} />
            </div>
        </div>
    )
}

export default Chat