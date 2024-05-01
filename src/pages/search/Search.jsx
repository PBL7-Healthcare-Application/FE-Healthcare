import Typography from "antd/es/typography/Typography";
import "./Search.scss";
import Specialty from "../../components/specialty/Specialty";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Radio,
  Input,
  Slider,
  Space,
  Rate,
  Pagination,
  Skeleton,
} from "antd";
import CardResult from "../../components/Doctor/cardResult/CardResult";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomSkeleton from "../../components/customSkeleton/CustomSkeleton";
import { debounce } from "lodash";
import { getSearchResult } from "../../stores/search-doctor/SearchThunk";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const { searchResult, loading } = useSelector((state) => state.search);
  const [inputValue, setInputValue] = useState("");
  const [specialty, setSpecialty] = useState("All specialties")
  const [years, setYears] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const onYearChange = (newValue) => {
    setYears(newValue);
    console.log(newValue);
  };
  const handleChange = (value) => {
    setSpecialty(value);
  };
  const handleChangeInput = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    debounceInputKey(newValue, specialty)
  };
  const debounceInputKey = useRef(
    debounce((nextValue, specialty) => {
      dispatch(getSearchResult({ keyword: nextValue, IdSpecialty: specialty, sortBy: "exp_desc" }));
    }, 500)
  ).current;

  const handleClickSearch = () => {
    dispatch(getSearchResult({ keyword: inputValue, IdSpecialty: specialty, sortBy: "exp_desc" }));
    navigate(`/search/doctor?name=${inputValue}&specialty=${specialty}`);
  }


  return (
    <div className="search-main">
      <div className="search-content">
        <div className="search-box">
          <div className="search-box-content__first">
            <Typography className="search-label">Location</Typography>
            <Typography className="search-text">Da Nang City</Typography>
          </div>
          <div className="search-divider"></div>
          <div className="search-box-content__second">
            <Typography className="search-label">Specialty</Typography>
            <Specialty onChange={handleChange} />
          </div>
          <div className="search-divider"></div>
          <div className="search-box-content__third" ref={contentRef}>
            <SearchOutlined className="search-box-content_icon" />
            <Input
              type="text"
              className="search__input-text"
              placeholder="Search for a doctor..."
              value={inputValue}
              onChange={handleChangeInput}
            />
          </div>
          <div className="search-box-content__fourth">
            <Button className="search-box-content__button" onClick={handleClickSearch}>
              Search For Result
            </Button>
          </div>
        </div>
      </div>
      <div
        className="search-content"
        style={{ backgroundColor: "#fff", paddingTop: 40 }}
      >
        <div className="search-result">
          <div className="search-result__item">
            {loading ? <CustomSkeleton />
              :
              (
                searchResult.length > 0 ? (searchResult.map((item, index) => (
                  <CardResult key={index} doctor={item} />
                ))) : <div className="notfound"><svg width="140" height="140" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M60 120c33.137 0 60-26.863 60-60S93.137 0 60 0 0 26.863 0 60s26.863 60 60 60z" fill="#E3F2FF"></path><ellipse cx="60" cy="108.36" rx="48" ry="3.36" fill="#91CAFF"></ellipse><path d="M100.218 100.595a5.353 5.353 0 000-7.57L79.524 72.344l-7.57 7.57 20.695 20.682a5.353 5.353 0 007.569 0z" fill="#2743AD"></path><path d="M53.986 21.003c18.22 0 32.987 14.767 32.987 32.986 0 18.218-14.768 32.986-32.986 32.986C35.767 86.975 21 72.207 21 53.989c0-18.215 14.768-32.986 32.986-32.986zm0 58.434c14.056 0 25.45-11.393 25.45-25.448 0-14.056-11.394-25.45-25.45-25.45-14.055 0-25.448 11.394-25.448 25.45-.004 14.055 11.393 25.448 25.448 25.448z" fill="#2C74DF"></path><path d="M71.982 71.984a25.367 25.367 0 007.454-17.995c0-14.056-11.394-25.45-25.45-25.45a25.367 25.367 0 00-17.994 7.454c-1.777-1.776-3.602-3.51-5.308-5.35 4.648-4.148 9.603-7.243 15.741-8.68 5.94-1.393 11.906-1.055 17.734.645 10.315 3.343 18.707 12.098 21.61 22.545 3.025 10.88-.087 23.38-7.89 31.577l-.568.586-5.329-5.332z" fill="#2D87F3"></path><path opacity="0.19" d="M35.994 71.985c-9.938-9.939-9.938-26.052 0-35.99 9.938-9.938 26.051-9.938 35.99 0 9.938 9.938 9.938 26.051 0 35.99-9.939 9.938-26.052 9.938-35.99 0z" fill="#fff"></path><path d="M32.7 53.989s9.53 9.63 21.283 9.63c11.753 0 21.283-9.63 21.283-9.63s-9.53-9.631-21.283-9.631c-11.752 0-21.282 9.63-21.282 9.63z" fill="#fff"></path><path d="M50.532 62.977a9.63 9.63 0 01-5.524-12.449 9.63 9.63 0 0112.449-5.524 9.63 9.63 0 015.524 12.449 9.63 9.63 0 01-12.449 5.524z" fill="#FFD658"></path></svg>
                  <Typography className="search-text" style={{ fontSize: 25, fontWeight: 600 }}>Not Found</Typography>
                </div>
              )
            }

          </div>
          {
            searchResult.length > 0 && (<div className="search-result__filter">
              <div className="search-result__filter-box">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Space>
                    <Divider
                      type="vertical"
                      style={{ backgroundColor: "#2d87f3", width: 2 }}
                    />
                    <Typography className="search-result__filter-box-label">
                      Available
                    </Typography>
                  </Space>
                  <Space style={{ marginTop: 5 }}>
                    <Radio.Group className="search-result__filter-box-radio">
                      <Radio
                        value={1}
                        className="search-result__filter-box-radio__item"
                      >
                        Any day
                      </Radio>
                      <Radio
                        value={3}
                        className="search-result__filter-box-radio__item"
                      >
                        Today
                      </Radio>
                      <Radio
                        value={4}
                        className="search-result__filter-box-radio__item"
                      >
                        Tomorrow
                      </Radio>
                    </Radio.Group>
                  </Space>
                  <Divider
                    style={{
                      backgroundColor: "rgb(228, 232, 236)",
                      width: "100%",
                      marginBottom: 8,
                    }}
                  />

                  {/*  */}

                  <Space>
                    <Divider
                      type="vertical"
                      style={{ backgroundColor: "#2d87f3", width: 2 }}
                    />
                    <Typography className="search-result__filter-box-label">
                      Years&apos; experience
                    </Typography>
                  </Space>

                  <Slider onChange={onYearChange} tooltip={
                    { open: false }
                  } value={years} onChangeComplete={() => { console.log("Clickkkkk") }} />
                  <Space
                    direction="vertical"
                    className="search-result__filter__experience"
                  >
                    <Typography className="search-result__filter__experience--label">
                      Years&apos; experience
                    </Typography>
                    <input
                      onChange={(e) => setYears(e.target.value)}
                      value={years}
                      className="search-result__filter__experience--input"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          console.log(years);
                        }
                      }}

                    />
                  </Space>
                  <Divider
                    style={{
                      backgroundColor: "rgb(228, 232, 236)",
                      width: "100%",
                      marginBottom: 8,
                    }}
                  />

                  {/*  */}

                  <Space>
                    <Divider
                      type="vertical"
                      style={{ backgroundColor: "#2d87f3", width: 2 }}
                    />
                    <Typography className="search-result__filter-box-label">
                      Fees
                    </Typography>
                  </Space>
                  <Slider
                    range={{
                      draggableTrack: true,
                    }}
                    value={[minPrice / 10000, maxPrice / 10000]}
                    tooltip={
                      { open: false }
                    }
                    onChangeComplete={(value) => {
                      console.log(`click`, value);
                    }}
                    onChange={(value) => {
                      if (value[0] > 0) {
                        setMinPrice(value[0] + "0000");
                      }
                      else setMinPrice(value[0])
                      setMaxPrice(value[1] + "0000");
                    }}

                  />
                  <div
                    direction="horizontal"
                    className="search-result__filter__price"
                  >
                    <Space className="search-result__filter__price--input">
                      <Typography className="search-result__filter__experience--label">
                        Min
                      </Typography>
                      <div style={{ position: 'relative' }}>
                        <input
                          value={minPrice}
                          className="search-result__filter__experience--input"
                          style={{ width: "100%", paddingLeft: 10 }}
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <span className="search-text" style={{ position: 'absolute', left: 0, color: '#000', fontSize: 20 }}>₫</span>
                      </div>

                    </Space>
                    <Space className="search-result__filter__price--input">
                      <Typography className="search-result__filter__experience--label">
                        Max
                      </Typography>
                      <div style={{ position: 'relative' }}>
                        <input
                          value={maxPrice}
                          className="search-result__filter__experience--input"
                          style={{ width: "100%", paddingLeft: 10 }}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                        <span className="search-text" style={{ position: 'absolute', left: 0, color: '#000', fontSize: 20 }}>₫</span>
                      </div>
                    </Space>
                  </div>

                  <Divider
                    style={{
                      backgroundColor: "rgb(228, 232, 236)",
                      width: "100%",
                      marginBottom: 8,
                    }}
                  />

                  {/*  */}
                  <Space>
                    <Space direction="vertical">
                      <Space>
                        <Divider
                          type="vertical"
                          style={{ backgroundColor: "#2d87f3", width: 2 }}
                        />
                        <Typography className="search-result__filter-box-label">
                          Rate
                        </Typography>
                      </Space>
                      <Rate onChange={(value) => console.log(value)} />
                    </Space>
                  </Space>
                </Space>
              </div>
            </div>)
          }
        </div>
      </div>
      <div className="search-pagination">
        <Pagination
          defaultCurrent={3}
          total={500}
          showTotal={false}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Search;
