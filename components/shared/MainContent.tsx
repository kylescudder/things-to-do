"use client";

import { ICategory } from "@/lib/models/category";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { IIcon } from "@/lib/models/icon";
import { useEffect, useState } from "react";
import CustomThemeProvider from "@/components/shared/CustomThemeProvider";
import { IToDo } from "@/lib/models/todo";

export const MainContent = (props: {
  categories: ICategory[];
  icons: IIcon[];
  userId: string;
  children: React.ReactNode;
}) => {
  const [categoryList, setCategoryList] = useState<ICategory[]>(
    props.categories
  );
  useEffect(() => {
  }, categoryList);

  const pullData = async (data: ICategory[]) => {
    const newCatList = [...data];
    newCatList.sort((a, b) => a.text.localeCompare(b.text));
    setCategoryList(newCatList);
    console.log('pullData: ', categoryList)
  };
  const pullToDo = (data: IToDo) => {
    const updatedCategoryList = categoryList.map((category) => {
      if (category._id === data.categoryId) {
        category.todoCount++;
      }
      return category;
    });

    setCategoryList(updatedCategoryList);
  }
  return (
    <CustomThemeProvider>
      <main className="flex flex-row">
        <LeftSidebar
          func={pullData}
          categories={categoryList}
        />
        <section className="main-container">
          <div className="w-full max-w-4xl">{props.children}</div>
        </section>
        <RightSidebar
          menuState={false}
          categories={categoryList}
          icons={props.icons}
          userId={props.userId}
          func={pullData}
          newToDo={pullToDo}
        />
      </main>
    </CustomThemeProvider>
  );
};
