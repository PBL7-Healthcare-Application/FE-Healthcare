import Typography from "antd/es/typography/Typography";
import "./Search.scss";
import Specialty from "../../components/specialty/Specialty";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Radio,
  Input,
  Slider,
  Space,
  Rate,
  Pagination,
} from "antd";
import CardResult from "../../components/Doctor/cardResult/CardResult";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomSkeleton from "../../components/customSkeleton/CustomSkeleton";
import { debounce } from "lodash";
import { getSearchResult } from "../../stores/search-doctor/SearchThunk";
import { useNavigate, useParams } from "react-router-dom";
import { setIdSpecialty } from "../../stores/search-doctor/SearchSlice";
const Search = () => {
  const { searchResult, loading, keyword, id_Specialty, pagingpagination } = useSelector(
    (state) => state.search
  );
  const [inputValue, setInputValue] = useState(keyword);
  const [specialty, setSpecialty] = useState(id_Specialty);
  const [filterAvailable, setFilterAvailable] = useState("");
  const [years, setYears] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const contentRef = useRef(null);

  const handleClear = () => {
    console.log(params);
    setYears(0);
    setMinPrice(0);
    setMaxPrice(1000000);
    setInputValue("");
    setFilterAvailable("");
    dispatch(setIdSpecialty("All specialties"));
    dispatch(
      getSearchResult({
        sortBy: "exp_desc",
      })
    );
  };

  const onYearChange = (newValue) => {
    setYears(newValue);
  };
  const handleChange = (value) => {
    setSpecialty(value);
  };
  const handleChangeInput = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    debounceInputKey(
      newValue,
      specialty,
      years,
      minPrice,
      maxPrice,
      filterAvailable
    );
  };
  const debounceInputKey = useRef(
    debounce((nextValue, specialty, year, min, max, available) => {
      dispatch(
        getSearchResult({
          keyword: nextValue,
          IdSpecialty:
            specialty === "All specialties" || specialty === 0
              ? undefined
              : specialty,
          sortBy: "exp_desc",
          exp: year !== 0 ? year : undefined,
          minPrice: min !== 0 ? min : undefined,
          maxPrice: max,
          filterAvailable: available,
        })
      );
    }, 500)
  ).current;

  const handleClickSearch = () => {
    if (specialty === "All specialties" || specialty === 0) {
      dispatch(
        getSearchResult({
          keyword: inputValue,
          sortBy: "exp_desc",
          exp: years !== 0 ? years : undefined,
          minPrice: minPrice !== 0 ? minPrice : undefined,
          maxPrice: maxPrice,
          filterAvailable: filterAvailable,
        })
      );
      navigate(`/search/doctor?name=${inputValue}&specialty=all`);
    } else {
      dispatch(
        getSearchResult({
          keyword: inputValue,
          IdSpecialty: specialty,
          exp: years !== 0 ? years : undefined,
          minPrice: minPrice !== 0 ? minPrice : undefined,
          maxPrice: maxPrice,
          sortBy: "exp_desc",
          filterAvailable: filterAvailable,
        })
      );
      navigate(`/search/doctor?name=${inputValue}&specialty=${specialty}`);
    }
  };

  const handleAvailable = (e) => {
    setFilterAvailable(e.target.value);
    dispatch(
      getSearchResult({
        keyword: inputValue,
        IdSpecialty:
          specialty === "All specialties" || specialty === 0
            ? undefined
            : specialty,
        sortBy: "exp_desc",
        exp: years !== 0 ? years : undefined,
        minPrice: minPrice !== 0 ? minPrice : undefined,
        maxPrice: maxPrice,
        filterAvailable: e.target.value,
      })
    );
  };

  useEffect(() => {
    if (searchResult.length === 0) {
      dispatch(
        getSearchResult({
          sortBy: "exp_desc",
        })
      );
    }
  }, []);

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
            <Button
              className="search-box-content__button"
              onClick={handleClickSearch}
            >
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
            {loading ? (
              <CustomSkeleton />
            ) : searchResult.length > 0 ? (
              searchResult.map((item, index) => (
                <CardResult key={index} doctor={item} />
              ))
            ) : (
              <div className="notfound">
                <svg
                  width="140"
                  height="140"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M60 120c33.137 0 60-26.863 60-60S93.137 0 60 0 0 26.863 0 60s26.863 60 60 60z"
                    fill="#E3F2FF"
                  ></path>
                  <ellipse
                    cx="60"
                    cy="108.36"
                    rx="48"
                    ry="3.36"
                    fill="#91CAFF"
                  ></ellipse>
                  <path
                    d="M100.218 100.595a5.353 5.353 0 000-7.57L79.524 72.344l-7.57 7.57 20.695 20.682a5.353 5.353 0 007.569 0z"
                    fill="#2743AD"
                  ></path>
                  <path
                    d="M53.986 21.003c18.22 0 32.987 14.767 32.987 32.986 0 18.218-14.768 32.986-32.986 32.986C35.767 86.975 21 72.207 21 53.989c0-18.215 14.768-32.986 32.986-32.986zm0 58.434c14.056 0 25.45-11.393 25.45-25.448 0-14.056-11.394-25.45-25.45-25.45-14.055 0-25.448 11.394-25.448 25.45-.004 14.055 11.393 25.448 25.448 25.448z"
                    fill="#2C74DF"
                  ></path>
                  <path
                    d="M71.982 71.984a25.367 25.367 0 007.454-17.995c0-14.056-11.394-25.45-25.45-25.45a25.367 25.367 0 00-17.994 7.454c-1.777-1.776-3.602-3.51-5.308-5.35 4.648-4.148 9.603-7.243 15.741-8.68 5.94-1.393 11.906-1.055 17.734.645 10.315 3.343 18.707 12.098 21.61 22.545 3.025 10.88-.087 23.38-7.89 31.577l-.568.586-5.329-5.332z"
                    fill="#2D87F3"
                  ></path>
                  <path
                    opacity="0.19"
                    d="M35.994 71.985c-9.938-9.939-9.938-26.052 0-35.99 9.938-9.938 26.051-9.938 35.99 0 9.938 9.938 9.938 26.051 0 35.99-9.939 9.938-26.052 9.938-35.99 0z"
                    fill="#fff"
                  ></path>
                  <path
                    d="M32.7 53.989s9.53 9.63 21.283 9.63c11.753 0 21.283-9.63 21.283-9.63s-9.53-9.631-21.283-9.631c-11.752 0-21.282 9.63-21.282 9.63z"
                    fill="#fff"
                  ></path>
                  <path
                    d="M50.532 62.977a9.63 9.63 0 01-5.524-12.449 9.63 9.63 0 0112.449-5.524 9.63 9.63 0 015.524 12.449 9.63 9.63 0 01-12.449 5.524z"
                    fill="#FFD658"
                  ></path>
                </svg>
                <Typography
                  className="search-text"
                  style={{ fontSize: 25, fontWeight: 600 }}
                >
                  Not Found
                </Typography>
              </div>
            )}
          </div>

          <div className="search-result__filter">
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
                  <Radio.Group
                    className="search-result__filter-box-radio"
                    value={filterAvailable}
                    onChange={(e) => handleAvailable(e)}
                  >
                    <Radio
                      value={"TODAY"}
                      className="search-result__filter-box-radio__item"
                      checked={true}
                    >
                      Today
                    </Radio>
                    <Radio
                      value={"TOMORROW"}
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

                <Slider
                  onChange={onYearChange}
                  tooltip={{ open: false }}
                  value={years}
                  onChangeComplete={(value) => {
                    dispatch(
                      getSearchResult({
                        keyword: inputValue,
                        IdSpecialty:
                          specialty === "All specialties" || specialty === 0
                            ? undefined
                            : specialty,
                        sortBy: "exp_desc",
                        exp: value,
                        minPrice: minPrice !== 0 ? minPrice : undefined,
                        maxPrice: maxPrice,
                        filterAvailable: filterAvailable,
                      })
                    );
                  }}
                />
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
                        dispatch(
                          getSearchResult({
                            keyword: inputValue,
                            IdSpecialty:
                              specialty === "All specialties"
                                ? undefined
                                : specialty,
                            sortBy: "exp_desc",
                            exp: e.target.value,
                            minPrice: minPrice !== 0 ? minPrice : undefined,
                            maxPrice: maxPrice,
                            filterAvailable: filterAvailable,
                          })
                        );
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
                  tooltip={{ open: false }}
                  onChangeComplete={(value) => {
                    dispatch(
                      getSearchResult({
                        keyword: inputValue,
                        IdSpecialty:
                          specialty === "All specialties"
                            ? undefined
                            : specialty,
                        sortBy: "exp_desc",
                        exp: years,
                        minPrice: parseInt(value[0] + "0000"),
                        maxPrice: parseInt(value[1] + "0000"),
                        filterAvailable: filterAvailable,
                      })
                    );
                  }}
                  onChange={(value) => {
                    if (value[0] > 0) {
                      setMinPrice(value[0] + "0000");
                    } else setMinPrice(value[0]);
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
                    <div style={{ position: "relative" }}>
                      <input
                        value={minPrice}
                        className="search-result__filter__experience--input"
                        style={{ width: "100%", paddingLeft: 10 }}
                        onChange={(e) => setMinPrice(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            dispatch(
                              getSearchResult({
                                keyword: inputValue,
                                IdSpecialty:
                                  specialty === "All specialties"
                                    ? undefined
                                    : specialty,
                                sortBy: "exp_desc",
                                exp: years,
                                minPrice: e.target.value,
                                maxPrice: maxPrice,
                                filterAvailable: filterAvailable,
                              })
                            );
                          }
                        }}
                      />
                      <span
                        className="search-text"
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "#000",
                          fontSize: 20,
                        }}
                      >
                        ₫
                      </span>
                    </div>
                  </Space>
                  <Space className="search-result__filter__price--input">
                    <Typography className="search-result__filter__experience--label">
                      Max
                    </Typography>
                    <div style={{ position: "relative" }}>
                      <input
                        value={maxPrice}
                        className="search-result__filter__experience--input"
                        style={{ width: "100%", paddingLeft: 10 }}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            dispatch(
                              getSearchResult({
                                keyword: inputValue,
                                IdSpecialty:
                                  specialty === "All specialties" ||
                                    specialty === 0
                                    ? undefined
                                    : specialty,
                                sortBy: "exp_desc",
                                exp: years,
                                minPrice: minPrice,
                                maxPrice: e.target.value,
                                filterAvailable: filterAvailable,
                              })
                            );
                          }
                        }}
                      />
                      <span
                        className="search-text"
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "#000",
                          fontSize: 20,
                        }}
                      >
                        ₫
                      </span>
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
                <Divider
                  style={{
                    backgroundColor: "rgb(228, 232, 236)",
                    width: "100%",
                    marginBottom: 8,
                  }}
                />
                <div className="clear" onClick={handleClear}>
                  <DeleteOutlined className="clear-icon" />
                  <Typography
                    className="search-result__filter__experience--label"
                    style={{ fontSize: 16, fontWeight: 500 }}
                  >
                    Clear All
                  </Typography>
                </div>
              </Space>
            </div>
          </div>
        </div>
      </div>
      {searchResult.length > 0 && (
        <div className="search-pagination">
          <Pagination
            current={pagingpagination?.currentPage}
            total={pagingpagination?.totalPages}
            showTotal={false}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
