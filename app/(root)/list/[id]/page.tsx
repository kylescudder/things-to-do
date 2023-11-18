import React from 'react'
import ToDoList from '@/components/shared/ToDoList'
import { getToDos } from '@/lib/actions/todo.actions'
import { type IToDo } from '@/lib/models/todo'

	const todos: IToDo[] = await getToDos(params.id)
export default async function List ({ params }: { params: { id: string } }): Promise<JSX.Element> {

	return (
		<div>
			<ToDoList todos={todos} />
		</div>
	)
}
