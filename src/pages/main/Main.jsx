import { Button, Image, Input, Space, Typography, Progress } from "antd";
import Feature from "../../components/feature/Feature";
import person from "../../assets/images/person.png";
import "./Main.scss";
import Specialty from "../../components/specialty/Specialty";
import { SearchOutlined } from "@ant-design/icons";
import { CardDoctor } from "../../components/cardDoctor/CardDoctor";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export const Main = () => {
  const listGameItem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const CustomDot = ({ onClick, active }) => {
    return (
      <button
        onClick={onClick}
        style={{ background: "none", border: "none", padding: 0 }}
      >
        <div
          style={{
            width: "100%", // Change this to 100% to make the bar full-width
            height: "10px",
            backgroundColor: active ? "blue" : "gray",
          }}
        />
      </button>
    );
  };
  return (
    <>
      <Space className="content">
        <Space className="left">
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
        </Space>
        <Space className="right">
          <Image
            src={person}
            preview={false}
            width="100%"
            height="100%"
            loading="lazy"
          ></Image>
        </Space>
      </Space>
      <div className="doctor">
        <Typography className="left_title--sub doctor-title">
          Top Outstanding Doctors
        </Typography>
        <div className="doctor-slide">
          <Carousel
            className="my-carousel "
            arrows={false}
            showDots={true}
            centerMode={true}
            draggable={true}
            responsive={responsive}
            slidesToSlide={1}
            autoPlaySpeed={3000}
            shouldResetAutoplay={true}
            infinite={true}
            // showDots // ref={slide}
            keyBoardControl={false}
            autoPlay={true}
            transitionDuration={6}
            customDot={<CustomDot />}
          >
            {listGameItem.map((item, index) => {
              return <CardDoctor key={index} />;
            })}
          </Carousel>
        </div>
      </div>
    </>
  );
};
