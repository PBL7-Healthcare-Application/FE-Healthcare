import { Image, Select, Space, Typography } from "antd";
import "./Specialty.scss";
import { useEffect, useRef, useState } from "react";
import { getAllSpecialty } from "../../api/doctor.api.js";
import { useSelector } from "react-redux";



// eslint-disable-next-line react/prop-types
const Item = ({ img, name }) => (
  <Space className="select-item">
    <Image src={img} width={30} preview={false} />
    <Typography className="select-name">{name}</Typography>

  </Space>
)
// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label2 ?? "").toLowerCase().includes(input.toLowerCase());

// eslint-disable-next-line react/prop-types
const Specialty = ({ onChange }) => {
  const { id_Specialty } = useSelector((state) => state.search)
  const [selectValue, setSelectValue] = useState("All specialties");
  const [specialties, setSpecialties] = useState([]);
  const selectRef = useRef();
  const handleChange = (value) => {
    selectRef.current.blur();
    onChange(value);
    setSelectValue(value)
  };
  const getSpecialties = async () => {
    try {

      const response = await getAllSpecialty();
      setSpecialties(
        [{
          idSpecialty: 0,
          name: "All specialties",
          image: "https://res.cloudinary.com/dbtam9pnc/image/upload/v1713669571/Doctor/cfpvhhgnhbagpcwhwsxl.png"
        }, ...response.data]
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSpecialties();
  }, []);

  useEffect(() => {
    setSelectValue(id_Specialty)
  }, [id_Specialty])
  return (

    <Select
      ref={selectRef}
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
