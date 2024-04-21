import Typography from "antd/es/typography/Typography";
import "./Search.scss"
import Specialty from "../../components/specialty/Specialty";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import CardResult from "../../components/cardResult/CardResult";
const Search = () => {
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
                        <Button className="search-box-content__button">Search For Result</Button>
                    </div>
                </div>
            </div>
            <div className="search-content" style={{ backgroundColor: "#fff", paddingTop: 40 }}>
                <div className="search-result">
                    <div className="search-result__item">
                        <CardResult />
                        <CardResult />
                    </div>
                    <div className="search-result__filter">huy  </div>
                </div>
            </div>
        </div>
    )
}

export default Search;