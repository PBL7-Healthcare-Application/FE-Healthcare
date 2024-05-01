import { Image, Select, Space, Typography } from "antd";
import "./Specialty.scss";
import { useEffect, useState } from "react";
import { getAllSpecialty } from "../../api/doctor.api.js";



// eslint-disable-next-line react/prop-types
const Item = ({ img, name }) => (
  <Space className="select-item">
    <Image src={img} width={30} />
    <Typography className="select-name">{name}</Typography>

  </Space>
)
// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.value ?? "").toLowerCase().includes(input.toLowerCase());

// eslint-disable-next-line react/prop-types
const Specialty = ({ onChange }) => {
  const [selectValue, setSelectValue] = useState("All specialties");
  const [specialties, setSpecialties] = useState([]);
  const handleChange = (value) => {
    onChange(value);
    setSelectValue(value)
  };
  const getSpecialties = async () => {
    try {
      const response = await getAllSpecialty();
      setSpecialties(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSpecialties();
  }, []);
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
      options={specialties.map((item) => ({
        value: item.idSpecialty,
        label2: item.name,
        label: (
          <Item img={item?.image} name={item.name} />
        ),
      }))}


    />
  )
};
export default Specialty;
