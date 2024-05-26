/* eslint-disable react/prop-types */
import { Image, Rate } from "antd"
import "./Rate.scss"

import persondefault from "../../assets/images/personDefault.png"
import { format } from "timeago.js"

const Rating = ({ item }) => {
    return (
        <div className="review">
            <div className="review__box">
                <div className="review__infor">
                    <Image fallback={persondefault} width={60} style={{ borderRadius: "50%" }} src={item?.urlAvatarUserRating} />
                    <div className="review__infor" style={{ flexDirection: 'column', gap: 5, }}>
                        <span className="review__text" style={{ fontSize: 16, fontWeight: 600 }}>{item?.nameUserRating}</span>
                        <span className="review__text">{format(item?.createdAt)}</span>
                    </div>
                </div>
                <Rate value={4} />
            </div>
            <span className="review__text" style={{ letterSpacing: 0.6, fontSize: 15 }}>{item?.comment}</span>
        </div>
    )
}

export default Rating