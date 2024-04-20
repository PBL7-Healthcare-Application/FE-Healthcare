import { Button, Image, Input, Space, Typography, Progress } from "antd";
import Feature from "../../components/feature/Feature";
import person from "../../assets/images/person.png";
import "./Main.scss";
import Specialty from "../../components/specialty/Specialty";
import { SearchOutlined } from "@ant-design/icons";
import { CardDoctor } from "../../components/cardDoctor/CardDoctor";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CardContent } from "../../components/cardContent/CardContent";
import content1 from "../../assets/images/content_1.webp";
import content2 from "../../assets/images/content_2.webp";
import content3 from "../../assets/images/content_3.webp";
import content4 from "../../assets/images/content_4.webp";
export const Main = () => {
  const listGameItem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1350 },
      items: 4,
      slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1350, min: 988 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 988, min: 698 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    xl: {
      breakpoint: { max: 698, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  const CustomDot = ({ onClick, active, index, carouselState }) => {
    const { currentSlide } = carouselState;
    return (
      <li style={{ background: active ? '#185FA0' : '#ccc', width: 20, height: 5, marginLeft: 2, }}>
        <button
          style={{ background: 'transparent', border: 'none' }}
          onClick={() => onClick()}
        >

        </button>
      </li>
    );
  };
  return (
    <>
      <div className="content">
        <div className="left">
          <Space className="left_title">
            <Typography className="left_title--first">Consult Top</Typography>
            <Typography className="left_title--second">
              Doctors Online
            </Typography>
            <Typography className="left_title--sub">
              for any health concern
            </Typography>
          </Space>
          <Feature />
          <div className="search">
            <div className="search__select">
              <Typography className="search__label">Specialty</Typography>
              <Specialty />
            </div>
            <div className="divide"></div>
            <div className="search__find">
              <div className="search__input">
                <SearchOutlined className="search_icon" />
                <Input
                  type="text"
                  className="search__input-text"
                  placeholder="Search for a doctor..."
                />
              </div>
              <Button className="search__button">Search For Result</Button>
            </div>
          </div>
        </div>
        <Space className="right">
          <Image
            src={person}
            preview={false}
            // width="100%"
            // height="100%"
            loading="lazy"
          ></Image>
        </Space>
      </div>
      <div className="doctor">
        <Typography className="left_title--sub doctor-title">
          Top Outstanding Doctors
        </Typography>
        <div className="doctor-slide">
          <div className="parent">
            <Carousel
              responsive={responsive}
              autoPlay={true}
              swipeable={true}
              draggable={true}
              showDots={true}
              infinite={true}
              partialVisible={false}
              customDot={<CustomDot />}
              arrows={false}
              autoPlaySpeed={3000}

            >
              {listGameItem.map((item, index) => {
                return <CardDoctor key={index} value={index} />;
              })}
            </Carousel>
          </div>
        </div>
      </div>
      <div className="doctor" style={{ marginBottom: "60px" }}>
        <Typography className="left_title--sub doctor-title">
          Enclinic brings you the health information you need.
        </Typography>
        <div className="card-content">
          <CardContent img={content1} title="Based on verified information" content="All articles from Hello Bacsi are written based on medical news, research, and scientific reports from leading educational and healthcare organizations" />
          <CardContent img={content2} title="Based on verified information" content="All articles from Hello Bacsi are written based on medical news, research, and scientific reports from leading educational and healthcare organizations" />
          <CardContent img={content3} title="Based on verified information" content="All articles from Hello Bacsi are written based on medical news, research, and scientific reports from leading educational and healthcare organizations" />
          <CardContent img={content4} title="Based on verified information" content="All articles from Hello Bacsi are written based on medical news, research, and scientific reports from leading educational and healthcare organizations" />
        </div>
      </div>
    </>
  );
};
