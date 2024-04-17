import { Divider, Select } from "antd";
import "./Specialty.scss";
import Icon from "@ant-design/icons/lib/components/Icon";
const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
const Specialty = () => (
  <Select
    className="my-select"
    dropdownRender={(menu) => (
      <div>
        {menu}
        <Divider style={{ margin: "4px 0" }} />
        <div style={{ padding: "8px", cursor: "pointer" }}>
          <Icon type="plus" /> Add item
        </div>
      </div>
    )}
    showSearch
    placeholder="All specialties"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={filterOption}
    options={[
      {
        value: "jack",
        label: "Jack",
      },
      {
        value: "lucy",
        label: "Lucy",
      },
      {
        value: "tom",
        label: "Tom",
      },
    ]}
  />
);
export default Specialty;
