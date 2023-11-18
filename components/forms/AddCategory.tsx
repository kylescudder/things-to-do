'use client'

import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { type IIcon } from '@/lib/models/icon'
import { addCategory } from '@/lib/actions/category.actions'
import { type ICategory } from '@/lib/models/category'
import { Button, Select, TextInput } from '@mantine/core'
import { type option } from '@/lib/models/select-options'

const AddCategory = (props: { icons: IIcon[], func: (categories: ICategory) => void, userId: string }) => {
	const [icon] = useState('')

	const options: option[] = props.icons.map((icon: IIcon) => ({
		value: icon._id,
		label: icon.text
	}))

	const form = useForm({
		initialValues: {
			text: '',
			icon: ''
		}
	})
	interface formUser {
		text: string
		icon: string
	}
	const onSubmit = async (values: formUser): Promise<void> => {
		const payload: ICategory = {
			_id: '',
			text: values.text,
			icon,
			userId: props.userId,
			todoCount: 0
		}
		const newCat = await addCategory(payload)
		if (newCat !== null) {
			props.func(newCat)
		}
	}
	return (
		<form
			onSubmit={form.onSubmit(async (values) => {
				await onSubmit(values)
			})}
			className="flex flex-col justify-start gap-10"
		>
			<TextInput
				label="Category name"
				radius="md"
				placeholder="What'll it be?"
				className="text-dark-2 dark:text-light-2"
				size="md"
				{...form.getInputProps('text')}
			/>
			<Select
				radius="md"
				size="md"
				clearable
				transitionProps={{ transition: 'pop-bottom-left', duration: 200 }}
				label="Icon"
				placeholder="Pick one"
				data={options}
				{...form.getInputProps('userID')}
			/>
			<Button className="bg-primary-500" type="submit">
				Add
			</Button>
		</form>
	)
}

export default AddCategory
