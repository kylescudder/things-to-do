"use client";

import { IToDo } from "@/lib/models/todo";
import { clickToDo } from "@/lib/actions/todo.actions";
import React, { useState } from "react";
import { successToast } from "@/lib/actions/toast.actions";
import { CheckMark } from "./checkmark";

export default function ToDo(todoItem: IToDo) {
  const [data, setData] = useState<IToDo>(todoItem);

  const handleTodoClick = (_event: React.MouseEvent<HTMLElement>) => {
    const updatedToDo: IToDo = { ...data, completed: !data.completed };
    clickToDo(updatedToDo);
    successToast(updatedToDo);
    setData(updatedToDo);
  };
  return (
    <div
      className={`dark:bg-dark-4 h-full cursor-pointer rounded-2xl shadow-xl ${
        todoItem.completed ? "dark:shadow-slate-300/60 shadow-blue-300/60" : ""
      } todoItem my-8 flex items-center justify-between`}
      onClick={handleTodoClick}
      data-id={todoItem._id}
      data-categoryid={todoItem.categoryId}
    >
      <div className={`flex ${data?.completed ? "completed" : ""}`}>
        <div className="p-4">
          <span className="md:text-2xl text-sm font-medium text-dark-2 dark:text-white inline-block align-middle">
            {todoItem.text}
          </span>
        </div>
        {todoItem.targetDateString && (
          <div className="p-4 flex flex-col">
            <h1 className="md:text-2xl text-sm font-medium text-dark-2 dark:text-white">
              {todoItem.targetDateString}
            </h1>
          </div>
        )}
        <div className="p-4 flex flex-col">
          <div className="text-dark-2 dark:text-white md:w-20 w-8">
            <CheckMark completed={data?.completed || false} />
          </div>
        </div>
      </div>
    </div>
  );
}
