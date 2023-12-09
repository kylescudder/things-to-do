'use client'

import React, { useState } from 'react'
import { useForm } from '@mantine/form'
import dayjs from 'dayjs'
import { type IToDo } from '@/lib/models/todo'
import { type ICategory } from '@/lib/models/category'
import { addToDo } from '@/lib/actions/todo.actions'
import { Button, Select, TextInput } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { type option } from '@/lib/models/select-options'

const AddToDo = (
	props: {
		categories: ICategory[] | null
		todoAdded: (todo: IToDo) => void
	}
): JSX.Element => {
	const [targetDate] = useState(new Date())

	let options: option[] = []
	if (props.categories) {
		options = props.categories.map((category: ICategory | null) => ({
			value: category?._id ?? '',
			label: category?.text ?? ''
		}))
	}

	const form = useForm({
		initialValues: {
			text: '',
			targetDate: new Date(),
			categoryId: '',
			completed: false
		}
	})
	interface FormUser {
		text: string
		targetDate: Date
		categoryId: string
		completed: boolean
	}
	const onSubmit = async (values: FormUser): Promise<void> => {
		const payload: IToDo = {
			_id: '',
			text: values.text,
			targetDate: values.targetDate,
			targetDateString: dayjs(targetDate).format('DD/MM/YYYY HH:mm'),
			categoryId: values.categoryId,
			completed: values.completed,
			completedDate: new Date()
		}

		const newToDo: IToDo | null = await addToDo(payload)
		if (newToDo) {
			props.todoAdded(newToDo)
		}
	}

	// const pullData = (data: ICategory): void => {
	//	setCategoryId(data._id)
	// }
	return (
		<form
			onSubmit={form.onSubmit(async (values) => {
				await onSubmit(values)
			})}
			className="flex flex-col justify-start gap-10"
		>
			<TextInput
				label="What to do?"
				radius="md"
				placeholder="What do you want to do?"
				className="text-dark-2 dark:text-light-2"
				size="md"
				{...form.getInputProps('text')}
			/>
			<DateTimePicker
				label="Target Date"
				radius="md"
				placeholder=""
				className="text-dark-2 dark:text-light-2"
				size="md"
				defaultValue={new Date()}
				valueFormat="DD/MM/YYYY hh:mm"
				// onChange={(date) => setTargetDate(date!)}
				{...form.getInputProps('targetDate')}
			/>
			<Select
				radius="md"
				size="md"
				clearable
				transitionProps={{ transition: 'pop-bottom-left', duration: 200 }}
				label="Category"
				placeholder="Pick one"
				data={options}
				{...form.getInputProps('categoryId')}
			/>
			<Button className="bg-primary-500" type="submit">
				Add
			</Button>
		</form>
	)
}

export default AddToDo
