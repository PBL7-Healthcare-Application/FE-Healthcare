import { Button, Divider, Image, Input, Space, Typography } from "antd";
import Feature from "../../components/feature/Feature";
import person from "../../assets/images/person.png";
import "./Main.scss";
import Specialty from "../../components/specialty/Specialty";
export const Main = () => {
  return (
    <Space className="content">
      <Space className="left">
        <Space className="left_title">
          <Typography className="left_title--first">Consult Top</Typography>
          <Typography className="left_title--second">Doctors Online</Typography>
          <Typography className="left_title--sub">
            for any health concern
          </Typography>
        </Space>
        <Feature />
        <Space className="search">
          <Space className="search__select">
            <Typography>Specialty</Typography>
            <Specialty />
          </Space>
          <Divider type="vertical" />
          <Space className="search__find">
            <Space className="search__select">
              <Typography>Search Doctor, clinics, etc.</Typography>
              <Input type="text" />
            </Space>
            <Button className="search__button">Search For Result</Button>
          </Space>
        </Space>
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
  );
};
