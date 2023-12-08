'use client'

import React, { useState } from 'react'
import { type IToDo } from '@/lib/models/todo'
import { clickToDo } from '@/lib/actions/todo.actions'
import { successToast } from '@/lib/actions/toast.actions'
import Icon from '../shared/Icon'

export default function ToDo (props: { todoItem: IToDo, func: (todo: IToDo) => void }): JSX.Element {
	const [data, setData] = useState<IToDo>(props.todoItem)

	const handleTodoClick = async (_event: React.MouseEvent<HTMLElement>): Promise<void> => {
		const updatedToDo: IToDo = { ...data, completed: !data.completed }
		await clickToDo(updatedToDo)
		await successToast(updatedToDo)
		setData(updatedToDo)
		props.func(updatedToDo)
	}

	return (
		<div
			className={`dark:bg-dark-4 h-full cursor-pointer rounded-2xl shadow-xl ${
				props.todoItem.completed ? 'dark:shadow-slate-300/60 shadow-blue-300/60' : ''
			} todoItem my-8 flex items-center justify-between w-full`}
			onClick={handleTodoClick}
			data-id={props.todoItem._id}
			data-categoryid={props.todoItem.categoryId}
		>
			<div className={`flex ${data?.completed ? 'completed' : ''} w-full`}>
				<div className="p-4 w-full">
					<span className="md:text-2xl text-sm font-medium text-dark-2 dark:text-white
					inline-block align-middle">
						{props.todoItem.text}
					</span>
				</div>
				{props.todoItem.targetDateString && (
					<div className="p-4 flex flex-col w-2/5 text-right">
						{' '}
						{/* Adjusted width and alignment */}
						<h1 className="md:text-2xl text-sm font-medium text-dark-2 dark:text-white">
							{props.todoItem.targetDateString}
						</h1>
					</div>
				)}
				<div className="p-4 flex flex-col w-1/12 text-right">
					{' '}
					{/* Adjusted width and alignment */}
					<div className="text-dark-2 dark:text-white">
						{data.completed
							? (
								<Icon name={'IconCircleCheckFilled'} stroke="1" strokeLinejoin="miter"
									isActive={false} />
							)
							: (
								<Icon name={'IconCircleCheck'} stroke="1" strokeLinejoin="miter"
									isActive={false} />
							)}
					</div>
				</div>
			</div>
		</div>
	)
}
