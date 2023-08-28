"use client";

import NavOptions from "./NavOptions";
import Logout from "./Logout";
import { ICategory } from "@/lib/models/category";

export default function LeftSidebar(props: {
  categories: ICategory[];
  func: (categories: ICategory[]) => void;
}) {
  const pullData = (data: ICategory[]) => {
    props.func(data);
  };

  return (
    <section
      className="custom-scrollbar 
		leftsidebar"
    >
      <div
        className="flex 
			w-full flex-1
			flex-col gap-3 px-6"
      >
        <NavOptions
          func={pullData}
          position="leftsidebar"
          categories={props.categories}
        />
      </div>
      <div className="mt-10 px-6">
        <Logout placement="" />
      </div>
    </section>
  );
}
