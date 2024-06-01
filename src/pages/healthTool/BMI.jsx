


import { Button, Image, Slider } from "antd"
import "./HealthTool.scss"
import bmiImg from "../../assets/images/BMI.webp"
import { useState } from "react"
import { adviceBMI, inforBMI } from "../../helpers/BMI";
import { MdInfo } from "react-icons/md";
import { BiSolidError } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
function BMI() {
    // const [gender, setGender] = useState(null);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [result, setResult] = useState(0);
    const [action, setAction] = useState(false);

    const caculateBMI = () => {
        const bmi = weight / ((height / 100) * (height / 100));
        setResult(bmi.toFixed(1));
        setAction(true);
    }
    return (
        <div className="health" style={{ height: 'fit-content', marginBottom: 50 }}>
            <div className="health" style={{ backgroundColor: '#e3f0ff' }}>
                <div className="health-box health-box-header">
                    <div className="health-box-textArea">
                        <span className="health-font" style={{ fontWeight: 600, fontSize: 30, color: "#185fa0" }}>BMI Caculator Online</span>
                        <span className="health-font" style={{ fontSize: 17 }}>This calculator provides body mass index (BMI) and the corresponding BMI weight status category for adults 20 years and older.</span>
                    </div>
                    <Image src={bmiImg} preview={false} width={150} />

                </div>
            </div>
            <div className="health-box" style={{ padding: '20px 0', }}>
                <div className="health-box-list" style={{ justifyContent: 'center' }}>
                    {/* <div className="bmi-item">
                        <span className="health-font" style={{ fontSize: 20, color: '#1D93E3', fontWeight: 500 }}>Gender</span>
                        <Radio.Group onChange={handleGender}>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 30 }}>
                                <div className="bmi-item__gender">
                                    <svg width="32" height="46" viewBox="0 0 32 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.0047 0C7.1821 0 0 6.9312 0 15.4539C0 23.0045 5.6516 29.3073 13.049 30.6478V35.3184H8.85535C7.37399 35.3184 6.17581 36.4803 6.17581 37.9091C6.17581 39.3378 7.37399 40.4998 8.85535 40.4998H13.049V43.4093C13.049 44.8403 14.2519 46 15.7332 46C17.2146 46 18.4198 44.8358 18.4198 43.4093V40.4998H22.824C24.3054 40.4998 25.5059 39.3333 25.5059 37.9091C25.5059 36.4736 24.3054 35.3184 22.824 35.3184H18.4198V30.7315C26.1214 29.6011 32 23.1809 32 15.4539C32 6.9312 24.8273 0 16.0047 0ZM16.0047 25.7241C10.1378 25.7241 5.36844 21.1146 5.36844 15.4494C5.36844 9.78415 10.1378 5.17466 16.0047 5.17466C21.8669 5.17466 26.6386 9.78415 26.6386 15.4494C26.6386 21.1146 21.8692 25.7241 16.0047 25.7241Z" fill={gender === true ? "#1D93E3" : "#D7D9DD"}></path>
                                    </svg>
                                    <Radio value={true} className="health-font" style={{ fontSize: 18, fontWeight: 500, color: gender === true ? "#1D93E3" : "#D7D9DD" }}>Male</Radio>
                                </div>
                                <div className="bmi-item__gender">
                                    <svg width="32" height="46" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M38.1958 0.783022C38.1819 0.77161 38.1634 0.762479 38.1541 0.751067C37.5283 0.143908 36.6616 -0.0957596 35.8597 0.0343458L26.5848 0.153038C25.1178 0.173581 23.9451 1.35823 23.9636 2.80308C23.9822 4.24337 25.0923 5.31845 26.652 5.38236L29.7576 5.34356L25.2128 9.81964C22.5105 7.85664 19.2567 6.79526 15.8336 6.79526C11.6017 6.79526 7.62247 8.41815 4.6305 11.3649C-1.5435 17.4479 -1.5435 27.3473 4.6305 33.4303C7.62247 36.3771 11.6017 38 15.8336 38C20.0632 38 24.0448 36.3771 27.0367 33.4303C32.5062 28.039 33.1389 19.6551 28.9163 13.5813L33.6881 8.8952V12.3167C33.6881 13.7616 34.8794 14.9303 36.3441 14.9303C37.8157 14.9303 39 13.7593 39 12.3167V2.63873C39 1.94484 38.701 1.27377 38.1958 0.783022ZM23.2823 29.7326C19.3053 33.6495 12.3689 33.6495 8.38727 29.7326C4.28055 25.6902 4.28055 19.1073 8.38727 15.0627C10.3781 13.1042 13.0224 12.0246 15.8359 12.0246C18.6518 12.0246 21.2915 13.1042 23.2869 15.0627C27.3913 19.105 27.3913 25.6902 23.2823 29.7326Z" fill={gender === false ? "#1D93E3" : "#D7D9DD"}></path>
                                    </svg>
                                    <Radio value={false} className="health-font" style={{ fontSize: 18, fontWeight: 500, color: gender === false ? "#1D93E3" : "#D7D9DD" }}>Female</Radio>
                                </div>
                            </div>
                        </Radio.Group>
                    </div> */}
                    <div className="bmi-item" style={{ gap: 5 }}>
                        <span className="health-font" style={{ fontSize: 20, color: '#1D93E3', fontWeight: 500 }}>Height</span>
                        <div>
                            <span className="health-font" style={{ fontWeight: 600, fontSize: 30 }}>{height}</span>
                            <span className="health-font" style={{ fontSize: 18, fontWeight: 500, color: '#1D93E3' }}>{" "}cm</span>
                        </div>
                        <div style={{ width: '100%', padding: "0 20px" }}>
                            <Slider
                                value={height}
                                min={0}
                                max={250}
                                onChange={setHeight}
                                tooltip={{ open: false }}

                            />
                        </div>
                    </div>
                    <div className="bmi-item" style={{ gap: 5 }}>
                        <span className="health-font" style={{ fontSize: 20, color: '#1D93E3', fontWeight: 500 }}>Weight</span>
                        <div>
                            <span className="health-font" style={{ fontWeight: 600, fontSize: 30 }}>{weight}</span>
                            <span className="health-font" style={{ fontSize: 18, fontWeight: 500, color: '#1D93E3' }}>{" "}kg</span>
                        </div>
                        <div style={{ width: '100%', padding: "0 20px" }}>
                            <Slider
                                value={weight}
                                min={0}
                                max={200}
                                onChange={setWeight}
                                tooltip={{ open: false }}

                            />
                        </div>
                    </div>
                </div>
                <div className="bmi-action">
                    <Button className="bmi-button" disabled={height <= 0 && weight <= 0} onClick={caculateBMI}>Caculate</Button>
                    <Button className="bmi-button__reset" onClick={() => {
                        // setGender(null);
                        setHeight(0);
                        setWeight(0);
                        setResult(0);
                        setAction(false);
                    }}>Reset</Button>
                </div>
                <div className="bmi-result" style={{ position: 'relative' }}>
                    <div className="bmi-result__left" style={{ backgroundColor: inforBMI(result).color }}>
                        <span className="health-font" style={{ fontSize: 18, color: '#fff', fontWeight: 500 }}>Your BMI results</span>
                        <span className="health-font" style={{ fontSize: 25, color: '#fff', fontWeight: 500 }}>{result}</span>
                    </div >
                    <div className="bmi-result__right">
                        <span className="health-font" style={{ fontSize: 18, color: '#534E56', fontWeight: 500 }}>Your BMI review</span>
                        <span className="health-font" style={{ fontSize: 18, color: '#404040', fontWeight: 500 }}>According to the BMI, you have {inforBMI(result).text}</span>
                    </div>
                    {
                        !action && (
                            <div className="bmi-result__new">
                                Please enter your information to view the results
                            </div>
                        )
                    }
                </div>

                {
                    action && (
                        <>
                            <div className="bmi-result bmi-result__advice" style={{ marginBottom: 20 }}>
                                <div className="bmi-result__advice-title">
                                    <MdInfo size={30} color="#2d87f3" />
                                    <span className="health-font" style={{ fontSize: 18, color: '#404040', fontWeight: 500 }}>Health Status</span>
                                </div>
                                <div className="health-font" style={{ fontSize: 15, color: '#404040', fontWeight: 400 }}>{adviceBMI(result, height).status}</div>
                            </div>
                            <div className="bmi-result bmi-result__advice" style={{ marginBottom: 20, marginTop: 20 }}>
                                <div className="bmi-result__advice-title">
                                    <BiSolidError size={30} color="rgb(255, 181, 33)" />
                                    <span className="health-font" style={{ fontSize: 18, color: '#404040', fontWeight: 500 }}>Health Risk</span>
                                </div>
                                <div className="health-font" style={{ fontSize: 15, color: '#404040', fontWeight: 400 }}>{adviceBMI(result, height).risk}</div>
                            </div>
                            <div className="bmi-result bmi-result__advice" style={{ marginBottom: 20, marginTop: 20 }}>
                                <div className="bmi-result__advice-title">
                                    <FaCheckCircle size={28} color="#00B16A" />
                                    <span className="health-font" style={{ fontSize: 18, color: '#404040', fontWeight: 500 }}>{adviceBMI(result, height / 100).advice.title}</span>
                                </div>
                                <div className="health-font" style={{ fontSize: 15, color: '#404040', fontWeight: 400 }}>{adviceBMI(result, height).advice.content}</div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default BMI