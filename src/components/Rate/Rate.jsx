import { Image, Rate } from "antd"
import "./Rate.scss"

import persondefault from "../../assets/images/personDefault.png"

const Rating = () => {
    return (
        <div className="review">
            <div className="review__box">
                <div className="review__infor">
                    <Image fallback={persondefault} width={60} style={{ borderRadius: "50%" }} />
                    <div className="review__infor" style={{ flexDirection: 'column', gap: 5, }}>
                        <span className="review__text" style={{ fontSize: 16, fontWeight: 600 }}>Nguyễn Văn A</span>
                        <span className="review__text">1 month ago</span>
                    </div>
                </div>
                <Rate value={4} />
            </div>
            <span className="review__text" style={{ letterSpacing: 0.6, fontSize: 15 }}>Bác sĩ giải thích rõ ràng, tận tâm, chuyên nghiệp, nghiệp vụ xuất sắc và kinh nghiệm trong ngành. Tôi cảm thấy an tâm và cực kỳ hài lòng với dịch vụ</span>
        </div>
    )
}

export default Rating