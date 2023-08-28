"use client";

import { ICategory } from "@/lib/models/category";
import { IIcon } from "@/lib/models/icon";
import AddToDo from "../forms/AddToDo";
import AddCategory from "../forms/AddCategory";
import { useEffect, useState } from "react";

export default function RightSidebar(props: {
  categories: ICategory[];
  icons: IIcon[];
  userId: string;
  func: (categories: ICategory[]) => void;
  newToDo: (todo: IToDo) => void;
}) {
  const [categoryList, setCategoryList] = useState<ICategory[]>(
    props.categories
  );
  useEffect(() => {
    setCategoryList(props.categories);
  }, [props.categories]);

  const pullData = (data: ICategory) => {
    const newCatList = [...categoryList, data];
    newCatList.sort((a, b) => a.text.localeCompare(b.text));
    setCategoryList(newCatList);
    props.func(newCatList);
  };
  const pullToDo = (data: IToDo) => {
    props.newToDo(data);
  };
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-dark-2 dark:text-light-1">
          Add To Do
        </h3>
        <div className="mt-7 flex w-[350px] flex-col gap-9">
          <AddToDo func={pullToDo} categories={categoryList} />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-dark-2 dark:text-light-1">
          Add Category
        </h3>
        <h5 className="text-dark-2 dark:text-light-1">
          Can't find the right category? That's cool, just create it!
        </h5>
        <div className="mt-7 flex w-[350px] flex-col gap-10">
          <AddCategory
            icons={props.icons}
            userId={props.userId}
            func={pullData}
          />
        </div>
      </div>
    </section>
  );
}
