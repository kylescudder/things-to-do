"use client";

import { ICategory } from "@/lib/models/category";
import { IIcon } from "@/lib/models/icon";
import AddToDo from "@/components/forms/AddToDo";
import AddCategory from "@/components/forms/AddCategory";
import { useEffect, useState } from "react";
import { IToDo } from "@/lib/models/todo";

export default function RightSidebar(props: {
  categories: ICategory[];
  icons: IIcon[];
  userId: string;
  func: (categories: ICategory[]) => void;
  newToDo: (todo: IToDo) => void;
  menuState: boolean;
}) {
  const [categoryList, setCategoryList] = useState<ICategory[]>(
    props.categories
  );
  const [open, setOpen] = useState<boolean>(props.menuState);

  useEffect(() => {
    props.func(categoryList);
    setOpen(props.menuState);
  }, [categoryList, props.menuState]);

  const pullData = (data: ICategory) => {
    const newCatList = [...categoryList, data];
    newCatList.sort((a, b) => a.text.localeCompare(b.text));
    setCategoryList(newCatList);
  };
  const pullToDo = (data: IToDo) => {
    props.newToDo(data);
  };
  return (
    <section
      className={`custom-scrollbar 
      sticky right-0 top-0 z-20 h-screen w-fit justify-between
      overflow-auto border-l border-l-dark-4 bg-light-2
    dark:bg-dark-2 flex flex-col pb-0 ${open ? "" : "pt-28 max-md:hidden"}`}
    >
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
