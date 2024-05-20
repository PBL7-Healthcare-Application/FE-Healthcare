import { SearchOutlined } from "@ant-design/icons";
import "./Examination.scss";
import { Button, Divider, Form, Image, Input } from "antd";
import person from "../../../assets/images/personDefault.png";
import CardExamination from "./CardExamination";
import height from "../../../assets/images/height.png";
import scale from "../../../assets/images/scale.png";
import temperatures from "../../../assets/images/temperatures.png";
import TextArea from "antd/es/input/TextArea";
const Examination = () => {
  return (
    <div className="exam">
      <div className="exam_left">
        <div className="exam_left-search">
          <div
            className="search-box-content__third"
            style={{
              width: 500,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginTop: 0,
            }}
          >
            <SearchOutlined className="search-box-content_icon" />
            <Input
              type="text"
              className="search__input-text"
              placeholder="Search for a patient..."
              style={{ border: "1px solid #a1a1aa" }}
              // onChange={handleChangeInput}
            />
            <Button className="Schedule-content__left-button">Search</Button>
          </div>
        </div>
        <div className="exam_left-content exam_left-search">
          <div className="exam_left-content__infor">
            <Image
              fallback={person}
              width={110}
              style={{ borderRadius: "50%" }}
              preview={false}
            />
            <div className="exam_left-content__textArea">
              <span className="exam_left-content__text">Bui Van Huy</span>
              <span
                className="exam_left-content__text"
                style={{ fontSize: 18, fontWeight: 400 }}
              >
                0935350632
              </span>
            </div>
          </div>
          <div className="exam_left-history">
            <span
              className="exam_left-content__text"
              style={{ fontSize: 20, fontWeight: 500 }}
            >
              Medical History
            </span>
            <div className="exam_left-history__content">
              <div className="exam_left-history__box">
                <CardExamination />
                <CardExamination />
                <CardExamination />
              </div>
            </div>
          </div>
          <div className="exam_left-history__button">
            <Button
              className="Schedule-content__left-button"
              style={{ width: "120px" }}
            >
              Reschedule
            </Button>
            <Button className="Schedule-content__left-button">Add New</Button>
          </div>
        </div>
      </div>
      <div className="exam_right">
        <div className="exam_left-content__infor">
          <Image
            fallback={person}
            width={110}
            style={{ borderRadius: "50%" }}
            preview={false}
          />
          <div className="exam_left-content__textArea">
            <span className="exam_left-content__text">Bui Van Huy</span>
            <span
              className="exam_left-content__text"
              style={{ fontSize: 18, fontWeight: 400 }}
            >
              0935350632
            </span>
          </div>
        </div>
        <Divider />
        <Form style={{ marginTop: 20 }}>
          <div className="exam_right-vital">
            <span
              className="exam_left-content__text"
              style={{ fontSize: 18, fontWeight: 500 }}
            >
              Vitals
            </span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: 20,
                marginTop: 20,
              }}
            >
              <Form.Item style={{ flex: 1 }}>
                <div className="exam_right-vital__label">
                  <Image
                    src={height}
                    width={24}
                    className="appointment-right__content-icon"
                    preview={false}
                  />
                  <span
                    className="exam_left-content__text"
                    style={{ fontSize: 13, marginTop: 4 }}
                  >
                    Height (cm)
                  </span>
                </div>
                <Input />
              </Form.Item>
              <Form.Item style={{ flex: 1 }}>
                <div className="exam_right-vital__label">
                  <Image
                    src={scale}
                    width={24}
                    className="appointment-right__content-icon"
                    preview={false}
                  />
                  <span
                    className="exam_left-content__text"
                    style={{ fontSize: 13, marginTop: 4 }}
                  >
                    Weight (kg)
                  </span>
                </div>
                <Input />
              </Form.Item>
              <Form.Item style={{ flex: 1 }}>
                <div className="exam_right-vital__label">
                  <Image
                    src={temperatures}
                    width={24}
                    className="appointment-right__content-icon"
                    preview={false}
                  />
                  <span
                    className="exam_left-content__text"
                    style={{ fontSize: 13, marginTop: 4 }}
                  >
                    Temperatures (°C)
                  </span>
                </div>
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="exam_right-vital" style={{ marginTop: 30 }}>
            <span
              className="exam_left-content__text"
              style={{ fontSize: 18, fontWeight: 500 }}
            >
              Diseases
            </span>
            <Form.Item style={{ marginTop: 20 }}>
              <TextArea
                style={{ height: 200, fontSize: 16 }}
                placeholder="Enter patient's diseases ..."
              />
            </Form.Item>
          </div>
          <div
            style={{
              width: "100%",
              marginTop: 40,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              className="Schedule-content__left-button"
              style={{ width: "120px" }}
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Examination;
