
import { Image } from "antd"
import "./HealthTool.scss"
import tool from "../../assets/images/tool.svg"
import BMI from "../../assets/images/BMI.webp"
import BMR from "../../assets/images/BMR.webp"
import { useNavigate } from "react-router-dom"
function HealthTool() {
    const navigate = useNavigate();
    return (
        <div className="health">
            <div className="health" style={{ backgroundColor: '#e3f0ff' }}>
                <div className="health-box health-box-header">
                    <div className="health-box-textArea">
                        <span className="health-font" style={{ fontWeight: 600, fontSize: 30, color: "#185fa0" }}>Health Check Tool</span>
                        <span className="health-font" style={{ fontSize: 17 }}>The health tool will help you assess important factors in your overall health and quality of health.</span>
                    </div>

                    <Image src={tool} preview={false} />

                </div>
            </div>
            <div className="health-box" style={{ padding: '20px 43px', height: 500 }}>
                <span className="health-font" style={{ fontSize: 25, fontWeight: 600, color: "#404040" }}>All Tools</span>
                <div className="health-box-list">
                    <div className="health-box-list__item" onClick={() => navigate("/health-tools/bmi")}>
                        <Image src={BMI} width={80} preview={false} />
                        <span className="health-font" style={{ fontSize: 18, fontWeight: 600 }}>BMI Calculator</span>
                    </div>
                    <div className="health-box-list__item" onClick={() => navigate("/health-tools/bmr")}>
                        <Image src={BMR} width={80} preview={false} />
                        <span className="health-font" style={{ fontSize: 18, fontWeight: 600 }}>BMR Calculator</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HealthTool