'use client'

import React, { useEffect, useState } from 'react'
import { type IToDo } from '@/lib/models/todo'
import ToDo from '../ui/ToDo'

export default function ToDoList (props: { todos: IToDo[] }): JSX.Element {
	const [todoList, setToDoList] = useState<IToDo[]>([])

	useEffect(() => {
		function fetchTodos (): void {
			try {
				const fetchedTodos: IToDo[] = props.todos
				setToDoList(fetchedTodos)
			} catch (error) {
				console.error('Error fetching todos:', error)
			}
		}

		fetchTodos()
	}, [])

	const pullData = (data: IToDo) => {
		setToDoList((prevTodoList) => {
			const updatedList = prevTodoList.filter((todo) => todo._id !== data._id)

			if (data.completed) {
				updatedList.push(data) // Add the completed task back to the list
			} else {
				updatedList.push(data) // Update the task in the list

				// Sort the updated list based on targetDate
				updatedList.sort((a, b) => (
					new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
				))
			}

			return updatedList
		})
	}

	if (todoList === null) {
		return <p>Loading...</p>
	}
	return (
		<div>
			{todoList.map((todoItem: IToDo) => (
				<ToDo key={todoItem._id} func={pullData} todoItem={todoItem} />
			))}
		</div>
	)
}
