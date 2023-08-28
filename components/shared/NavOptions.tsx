"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Icon from "./Icon";
import { ICategory } from "@/lib/models/category";
import HoldToDeleteComponent from "../ui/hold-to-delete-button";
import { deleteToast } from "@/lib/actions/toast.actions";
import { deleteCategory, getCategoryCount } from "@/lib/actions/category.actions";

export default function NavOptions(props: {
  position: string;
  categories: ICategory[];
  func: (categories: ICategory[]) => void;
}) {
  const [categoryList, setCategoryList] = useState<ICategory[]>(
    props.categories
  );
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
  }, [categoryList]);
  
  return (
    <div className="contents w-full">
      <Link
        href="/"
        className={`${props.position}_link 
        ${pathname === "/" && "bg-primary-500"}`}
      >
        <Icon name={"IconHome"} stroke="1" strokeLinejoin="miter" isActive={false} />
        {props.position === "leftsidebar" ? (
          <p className="text-dark-2 dark:text-light-1 max-lg:hidden flex relative">
            Home
          </p>
        ) : (
          <p className="text-subtle-medium text-dark-2 dark:text-light-1 max-sm:hidden">
            {"Home".split(/\s+/)[0]}
          </p>
        )}
      </Link>
      {categoryList.map((category) => {
        const isActive =
          (pathname.includes(category._id.toString().toLowerCase()) &&
            category._id.toString().toLowerCase().length > 1) ||
          pathname === category._id.toString().toLowerCase();
        return (
          <HoldToDeleteComponent
            key={category._id.toString()}
            isActive={isActive}
            text={`${category.text} (${category.todoCount})`}
            icon={category.icon}
            holdText={`Deleting ${category.text}...`}
            onHoldStart={() => {
              const updatedArray = categoryList.filter(
                (item) => item._id !== category._id
              );
              setCategoryList(updatedArray);
              deleteToast(category);
              deleteCategory(category)
              props.func(updatedArray);
              //TODO Delete from DB
            }}
            onHoldEnd={() => {
              router.push(`/list/${category._id}`);
            }}
          ></HoldToDeleteComponent>
        );
      })}
    </div>
  );
}
