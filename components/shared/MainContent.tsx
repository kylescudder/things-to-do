"use client";

import { ICategory } from "@/lib/models/category";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { IIcon } from "@/lib/models/icon";
import mongoose from "mongoose";
import { useState } from "react";
import CustomThemeProvider from "@/components/shared/CustomThemeProvider";

export const MainContent = (props: {
  categories: ICategory[];
  icons: IIcon[];
  userId: mongoose.Types.ObjectId;
  children: React.ReactNode;
}) => {
  const [categoryList, setCategoryList] = useState<ICategory[]>(
    props.categories
  );
	
  const pull_data = async (data: ICategory[]) => {
		const newCatList = [...data];
    newCatList.sort((a, b) => a.text.localeCompare(b.text));
    setCategoryList(newCatList);
	};
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
