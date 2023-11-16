"use client";

import { useForm } from "@mantine/form";
import { useState } from "react";
import { IIcon } from "@/lib/models/icon";
import { addCategory } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/models/category";
import { Button, Select, TextInput } from "@mantine/core";
import { option } from "@/lib/models/select-options";

const AddCategory = (props: {
  icons: IIcon[];
  func: (categories: ICategory) => void;
  userId: string;
}) => {
	const [icon, setIcon] = useState("");
	
  const options: option[] = props.icons.map((icon: IIcon) => ({
    value: icon._id,
    label: icon.text,
  }));

  const form = useForm({
    initialValues: {
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
      icon,
      userId: props.userId,
      todoCount: 0,
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
