import { Image, Space, Typography } from "antd"
import "./CardContent.scss"


export const CardContent = ({ img, title, content }) => {
    return <Space direction="vertical" className="card-content__main">
        <Image src={img} width={260} />
        <Typography className="card-content__title">{title}</Typography>
        <Typography className="card-content__content">{content}</Typography>
    </Space>
}