import Select from "react-select";
import Icon from "../shared/Icon";
import IOption from "@/lib/models/options";
import { ICategory } from "@/lib/models/category";
import { useTheme } from "next-themes";

export const SelectElem = (props: {
  options: IOption[];
  func: (selectedOption: ICategory) => void;
}) => {
  const handleSelectChange = (selectedOption: ICategory) => {
    props.func(selectedOption);
  };
  const { theme, setTheme } = useTheme();
  const darkMode = theme === "light" ? false : true;
  return (
    <Select
      required={true}
      className={`text-dark-2 dark:text-white ${
        darkMode ? "border-gray-600" : "border-gray-300"
      }`}
      classNamePrefix="react-select"
      theme={(theme) => ({
        ...theme,
        borderRadius: "0.375rem",
        colors: {
          ...theme.colors,
          primary25: darkMode ? "#505966" : "border-gray-300",
          primary: darkMode ? "#877EFF" : "border-gray-300",
          neutral0: darkMode ? "#121417" : "border-gray-300",
        },
      })}
      placeholder="Select Option"
      options={props.options}
      getOptionLabel={(e) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Icon name={e.icon} stroke="1" strokeLinejoin="miter" isActive={false} />
          <span style={{ marginLeft: 5 }}>{e.text}</span>
        </div>
      )}
      onChange={handleSelectChange}
    />
  );
};
export default SelectElem;
