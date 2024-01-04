'use client'

import React, { useEffect, useState } from 'react'
import { type IToDo } from '@/lib/models/todo'
import ToDo from '../ui/ToDo'

export default function ToDoList (props: { todos: IToDo[] | null }): JSX.Element {
	const [todoList, setToDoList] = useState<IToDo[]>([])

	useEffect(() => {
		function fetchTodos (): void {
			try {
				const fetchedTodos: IToDo[] | null = props.todos
				if (fetchedTodos) {
					setToDoList(fetchedTodos)
				}
			} catch (error) {
				console.error('Error fetching todos:', error)
			}
		}

		fetchTodos()
	}, [])

	const pullData = (data: IToDo): void => {
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

	if (!todoList) {
		return <p>Loading...</p>
	}
	return (
		<div>
			{(() => {
				let currentCategory = ''
				return todoList.map((todoItem: IToDo) => {
					let label = null
					if (!todoItem.category) {
						todoItem.category = 'Uncategorized'
					}
					if (todoItem.category !== currentCategory) {
						label = <div><p className='font-bold text-1xl'>{todoItem.category}</p></div>
						currentCategory = todoItem.category
					}
					return (
						<div key={todoItem._id}>
							{label}
							<ToDo func={pullData} todoItem={todoItem} />
						</div>
					)
				})
			})()}
		</div>
	)
}
