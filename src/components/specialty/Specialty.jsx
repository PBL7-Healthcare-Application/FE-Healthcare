import { Divider, Image, Select, Space, Typography } from "antd";
import "./Specialty.scss";
import { specialty } from "../../api/fetchAPI.js";
import { useState } from "react";



const Item = ({ img, name }) => (
  <Space className="select-item">
    <Image src={img} width={30} />
    <Typography className="select-name">{name}</Typography>

  </Space>
)
// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.value ?? "").toLowerCase().includes(input.toLowerCase());

const Specialty = () => {
  const [selectValue, setSelectValue] = useState("");

  const onChange = (value) => {

    setSelectValue(value.value);
  };
  return (

    <Select
      className="my-select"
      showSearch
      placement="bottomLeft"
      placeholder="All specialties"
      optionFilterProp="children"
      dropdownStyle={{ width: 230 }}
      onChange={onChange}
      optionLabelProp="label2"
      filterOption={filterOption}
      value={selectValue}
      options={specialty.map((item) => ({
        value: item.value,
        label2: item.value,
        label: (
          <Item img={item.image} name={item.value} />
        ),
      }))}
      labelInValue

    />
  )
};
export default Specialty;
