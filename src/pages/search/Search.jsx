import Typography from "antd/es/typography/Typography";
import "./Search.scss";
import Specialty from "../../components/specialty/Specialty";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Radio, Slider, Space } from "antd";
import CardResult from "../../components/cardResult/CardResult";
import { useState } from "react";
const Search = () => {
  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };
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
            <Specialty />
          </div>
          <div className="search-divider"></div>
          <div className="search-box-content__third">
            <SearchOutlined className="search-box-content_icon" />
            <Input
              type="text"
              className="search__input-text"
              placeholder="Search for a doctor..."
            />
          </div>
          <div className="search-box-content__fourth">
            <Button className="search-box-content__button">
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
            <CardResult />
            <CardResult />
            <CardResult />
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
                <Space style={{ marginTop: 20 }}>
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
                  }}
                />

                {/*  */}

                <Space>
                  <Divider
                    type="vertical"
                    style={{ backgroundColor: "#2d87f3", width: 2 }}
                  />
                  <Typography className="search-result__filter-box-label">
                    Years' experience
                  </Typography>
                </Space>

                <Slider defaultValue={30} />
                <Space direction="vertical">
                  <Typography>Years' experience</Typography>
                  <Input />
                </Space>
                <Divider
                  style={{
                    backgroundColor: "rgb(228, 232, 236)",
                    width: "100%",
                  }}
                />
              </Space>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
