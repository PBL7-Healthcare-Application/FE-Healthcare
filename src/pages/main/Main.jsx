import { Button, Image, Input, Space, Typography } from "antd";
import Feature from "../../components/feature/Feature";
import person from "../../assets/images/person.png";
import "./Main.scss";
import Specialty from "../../components/specialty/Specialty";
import { SearchOutlined } from "@ant-design/icons";
import { CardDoctor } from "../../components/Doctor/cardDoctor/CardDoctor";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CardContent } from "../../components/cardContent/CardContent";
import content1 from "../../assets/images/content_1.webp";
import content2 from "../../assets/images/content_2.webp";
import content3 from "../../assets/images/content_3.webp";
import content4 from "../../assets/images/content_4.webp";
import { useState } from "react";
import { responsive } from "../../constant/responsiveCarousel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSearchResult } from "../../stores/search-doctor/SearchThunk";
import { setSearch } from "../../stores/search-doctor/SearchSlice";
export const Main = () => {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("All specialties");
  const listGameItem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line react/prop-types, no-unused-vars
  const CustomDot = ({ onClick, active, index, carouselState }) => {
    // eslint-disable-next-line react/prop-types, no-unused-vars
    const { currentSlide } = carouselState;
    return (
      <li
        style={{
          background: active ? "#185FA0" : "#ccc",
          width: 20,
          height: 5,
          marginLeft: 2,
        }}
      >
        <button
          style={{ background: "transparent", border: "none" }}
          onClick={() => onClick()}
        ></button>
      </li>
    );
  };
  const handleChange = (value) => {
    setSpecialty(value);
  };
  const handleClick = () => {
    if (specialty === "All specialties" || specialty === 0) {
      dispatch(
        getSearchResult({
          keyword: name,
          sortBy: "exp_desc",
        })
      );
      dispatch(setSearch({ keyword: name, id: specialty }));
      navigate(`/search/doctor?name=${name}&specialty=all`);
    } else {
      console.log(specialty);
      dispatch(
        getSearchResult({
          keyword: name,
          IdSpecialty: specialty,
          sortBy: "exp_desc",
        })
      );
      dispatch(setSearch({ keyword: name, id: specialty }));
      navigate(`/search/doctor?name=${name}&specialty=${specialty}`);
    }
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
              <Specialty onChange={handleChange} />
            </div>
            <div className="divide"></div>
            <div className="search__find">
              <div className="search__input">
                <SearchOutlined className="search_icon" style={{ zIndex: 1 }} />
                <Input
                  type="text"
                  className="search__input-text"
                  placeholder="Search for a doctor..."
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <Button className="search__button" onClick={handleClick}>
                Search For Result
              </Button>
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
                return <CardDoctor key={index} />;
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
          <CardContent
            img={content1}
            title="Based on verified information"
            content="All articles from Enclinic are written based on medical news, research, and scientific reports from leading educational and healthcare organizations."
          />
          <CardContent
            img={content2}
            title="Consulted with medical professionals"
            content="The team of doctors has many years of experience and works at famous hospitals."
          />
          <CardContent
            img={content3}
            title="Regularly updated"
            content="We work with doctors and healthcare experts to continuously update articles to ensure accuracy."
          />
          <CardContent
            img={content4}
            title="Reliable"
            content="At Enclinic, the healthcare website, we are committed to providing accurate, easily accessible informations, that help readers make the most informed decisions for their own health ."
          />
        </div>
      </div>
    </>
  );
};
