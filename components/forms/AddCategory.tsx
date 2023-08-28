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
    };
    const newCat = await addCategory(payload);
    props.func(newCat);
  };
  const pullData = (data: IIcon) => {
    setIcon(data.icon?.toString());
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w=full">
              <FormLabel className="text-base-semibold text-dark-2 dark:text-light-2">
                Category
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus dark:bg-dark-2"
                  placeholder="What is the new category?"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w=full">
              <FormLabel className="text-base-semibold text-dark-2 dark:text-light-2">
                Icon
              </FormLabel>
              <FormControl>
                <SelectElem func={pullData} options={options} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="bg-primary-500" type="submit">
          Add
        </Button>
      </form>
    </Form>
  );
};

export default AddCategory;
