import { Image, Select, Space, Typography } from "antd";
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

const Specialty = ({ onChange }) => {
  const [selectValue, setSelectValue] = useState("All specialties");

  const handleChange = (value) => {

    onChange(value.value);
    setSelectValue(value.value)
  };
  return (

    <Select
      className="my-select"
      showSearch
      placement="bottomLeft"
      placeholder="All specialties"
      optionFilterProp="children"
      dropdownStyle={{ width: 230 }}
      onChange={handleChange}
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


    />
  )
};
export default Specialty;
