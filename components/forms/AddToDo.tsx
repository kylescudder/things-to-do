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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-dark-2 dark:text-light-2">
                What to do...
              </FormLabel>
              <FormControl>
                <Input
                  required={true}
                  maxLength={100}
                  max={100}
                  type="text"
                  className="account-form_input no-focus dark:bg-dark-2"
                  placeholder="What do you want to do?"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetDate"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w=full">
              <FormLabel className="text-base-semibold text-dark-2 dark:text-light-2">
                Target Date
              </FormLabel>
              <FormControl>
                <DatePicker
                  required={true}
                  dateFormat="dd/MM/yyyy"
                  selected={targetDate}
                  highlightDates={[new Date()]}
                  onChange={(date) => setTargetDate(date!)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w=full">
              <FormLabel className="text-base-semibold text-dark-2 dark:text-light-2">
                Bio
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

export default AddToDo;
