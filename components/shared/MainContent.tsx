"use client";

import { ICategory } from "@/lib/models/category";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { IIcon } from "@/lib/models/icon";
import mongoose from "mongoose";
import { useState } from "react";

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
    <main className="flex flex-row">
      <LeftSidebar func={pull_data} categories={categoryList} />
      <section className="main-container">
        <div className="w-full max-w-4xl">{props.children}</div>
      </section>
      <RightSidebar
        categories={categoryList}
        icons={props.icons}
        userId={props.userId}
        func={pull_data}
      />
    </main>
  );
};
