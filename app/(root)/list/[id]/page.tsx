import React from 'react'
import ToDoList from '@/components/shared/ToDoList'
import { getToDos } from '@/lib/actions/todo.actions'
import { type IToDo } from '@/lib/models/todo'

export default async function List ({ params }: { params: { id: string } }): Promise<JSX.Element> {
	const todos: IToDo[] | null = await getToDos(params.id)

	return (
		<div>
			<ToDoList todos={todos} />
		</div>
	)
}
