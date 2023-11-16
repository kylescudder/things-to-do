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
import { IToDo } from "@/lib/models/todo";
import { ICategory } from "@/lib/models/category";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectElem from "../ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addToDo } from "@/lib/actions/todo.actions";
import dayjs from "dayjs";

const AddToDo = (props: {
  categories: ICategory[];
  func: (todo: IToDo) => void;
}) => {
  const router = useRouter();
  const [targetDate, setTargetDate] = useState(new Date());
  const [categoryId, setCategoryId] = useState("");

  const options = props.categories.map((element) => ({
    _id: element._id,
    icon: element.icon,
    text: element.text,
  }));

  const form = useForm({
    defaultValues: {
      text: "",
      targetDate: new Date(),
      categoryId: "",
      completed: false,
    },
  });
  interface FormUser {
    text: string;
    targetDate: Date;
    categoryId: string;
    completed: boolean;
  }
  const onSubmit = async (values: FormUser) => {
    const payload: IToDo = {
      _id: "",
      text: values.text,
      targetDate: targetDate,
      targetDateString: dayjs(targetDate).format("DD/MM/YYYY HH:mm"),
      categoryId: categoryId,
      completed: values.completed,
      completedDate: new Date(),
    };

    const newToDo: IToDo = await addToDo(payload);
    props.func(newToDo);
    router.refresh();
  };

  const pullData = (data: ICategory) => {
    setCategoryId(data._id);
  };
  return (
    <form
      onSubmit={form.onSubmit((values) => onSubmit(values))}
      className="flex flex-col justify-start gap-10"
    >
      <TextInput
        label="What to do?"
        radius="md"
        placeholder="What do you want to do?"
        className="text-dark-2 dark:text-light-2"
        size="md"
        {...form.getInputProps("text")}
      />
      <DatePickerInput
        label="Target Date"
        radius="md"
        placeholder=""
        className="text-dark-2 dark:text-light-2"
        size="md"
        defaultDate={new Date()}
        //onChange={(date) => setTargetDate(date!)}
        {...form.getInputProps("targetDate")}
      />
      <Select
        radius="md"
        size="md"
        clearable
        //transitionProps={{ transition: "pop-bottom-left", duration: 200 }}
        label="Category"
        placeholder="Pick one"
        data={options}
        {...form.getInputProps("categoryId")}
      />
      <Button className="bg-primary-500" type="submit">
        Add
      </Button>
    </form>
  );
};

export default AddToDo;
