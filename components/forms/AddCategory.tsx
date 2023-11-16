"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { IIcon } from "@/lib/models/icon";
import { addCategory } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/models/category";
import SelectElem from "../ui/select";
import IOption from "@/lib/models/options";
import { useState } from "react";

const AddCategory = (props: {
  icons: IIcon[];
  func: (categories: ICategory) => void;
  userId: string;
}) => {
  const [icon, setIcon] = useState("");
  const options: IOption[] = [];
  props.icons.forEach((element) => {
    const option: IOption = {
      _id: element._id,
      icon: element.icon,
      text: element.text,
    };
    options.push(option);
  });
  const form = useForm({
    defaultValues: {
      text: "",
      icon: "",
    },
  });
  interface formUser {
    text: string;
    icon: string;
  }
  const onSubmit = async (values: formUser) => {
    const payload: ICategory = {
      _id: "",
      text: values.text,
      icon: icon,
      userId: props.userId,
      todoCount: 0
    };
    const newCat = await addCategory(payload);
    props.func(newCat);
  };
  const pullData = (data: IIcon) => {
    setIcon(data.icon?.toString());
  };
  return (
    <form
      onSubmit={form.onSubmit((values) => onSubmit(values))}
      className="flex flex-col justify-start gap-10"
    >
      <TextInput
        label="Category name"
        radius="md"
        placeholder="What'll it be?"
        className="text-dark-2 dark:text-light-2"
        size="md"
        {...form.getInputProps("text")}
      />
      <Select
        radius="md"
        size="md"
        clearable
        //transitionProps={{ transition: "pop-bottom-left", duration: 200 }}
        label="Icon"
        placeholder="Pick one"
        data={options}
        {...form.getInputProps("userID")}
      />
      <Button className="bg-primary-500" type="submit">
        Add
      </Button>
    </form>
  );
};

export default AddCategory;
