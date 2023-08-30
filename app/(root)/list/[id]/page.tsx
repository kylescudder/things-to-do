import ToDoList from "@/components/shared/ToDoList";
import { getToDos } from "@/lib/actions/todo.actions";
import { IToDo } from "@/lib/models/todo";
import React from "react";

export default async function List({ params }: { params: { id: string } }) {
  const todos: IToDo[] = await getToDos(params.id);

  return (
    <div>
      <ToDoList todos={todos} />
    </div>
  );
}
