import Select, { ActionMeta, SingleValue } from "react-select";
import Icon from "../shared/Icon";
import IOption from "@/lib/models/options";
import { ICategory } from "@/lib/models/category";
import { useTheme } from "next-themes";
import { ObjectId } from "bson";

export const SelectElem = (props: {
  options: IOption[];
  func: (selectedOption: ICategory) => void;
}) => {
    const handleSelectChange = (
      selectedOption: SingleValue<IOption>,
      _actionMeta: ActionMeta<IOption>
    ) => {
      if (selectedOption != null) {
        const newCat: ICategory = {
          _id: new ObjectId(selectedOption._id),
          text: selectedOption.text,
          icon: selectedOption.icon,
          todoCount: 0,
          userId: new ObjectId
        }
        props.func(newCat);
      }
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
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary25: darkMode ? "#505966" : "border-gray-300",
          primary: darkMode ? "#877EFF" : "border-gray-300",
          neutral0: darkMode ? "#121417" : "border-gray-300",
        },
      })}
      placeholder="Select Option"
      options={props.options}
      getOptionLabel={(option: IOption) => (
        `<div style={{ display: "flex", alignItems: "center" }}>
          ${<Icon
            name={option.icon}
            stroke="1"
            strokeLinejoin="miter"
            isActive={false}
          />}
          <span style={{ marginLeft: 5 }}>${option.text}</span>
        </div>`
      )}
      onChange={handleSelectChange}
    />
  );
};
export default SelectElem;
