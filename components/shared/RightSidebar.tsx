'use client'

import React, { useEffect, useState } from 'react'
import { type ICategory } from '@/lib/models/category'
import { type IIcon } from '@/lib/models/icon'
import AddToDo from '@/components/forms/AddToDo'
import AddCategory from '@/components/forms/AddCategory'
import { type IToDo } from '@/lib/models/todo'

export default function RightSidebar (props: {
	categories: ICategory[]
	icons: IIcon[]
	userId: string
	func: (categories: ICategory[]) => void
	newToDo: (todo: IToDo) => void
	menuState: boolean
	pullRightSideBarOpen: (open: boolean) => void
}): JSX.Element {
	const [categoryList, setCategoryList] = useState<ICategory[]>(props.categories)
	const [open, setOpen] = useState<boolean>(props.menuState)

	useEffect(() => {
		props.func(categoryList)
		setOpen(props.menuState)
	}, [categoryList, props.menuState])

	const pullData = (data: ICategory): void => {
		const newCatList = [...categoryList, data]
		newCatList.sort((a, b) => a.text.localeCompare(b.text))
		setCategoryList(newCatList)
		props.pullRightSideBarOpen(false)
	}
	const todoAdded = (data: IToDo): void => {
		props.newToDo(data)
		props.pullRightSideBarOpen(false)
	}
	return (
		<section
			className={`custom-scrollbar 
      sticky right-0 top-0 z-20 h-screen w-fit justify-between
      overflow-auto bg-light-2
    dark:bg-dark-2 flex flex-col pb-0 ${open ? '' : 'px-6 border-l border-l-dark-4 pt-28 max-md:hidden'}`}
		>
			<div className="flex flex-1 flex-col justify-start">
				<h3 className="text-heading4-medium text-dark-2 dark:text-light-1">Add To Do</h3>
				<div className="mt-7 flex w-[350px] flex-col gap-9">
					<AddToDo todoAdded={todoAdded} categories={categoryList} />
				</div>
			</div>

			<div className="flex flex-1 flex-col justify-start">
				<h3 className="text-heading4-medium text-dark-2 dark:text-light-1">Add Category</h3>
				<div className="mt-7 flex w-[350px] flex-col gap-10">
					<AddCategory icons={props.icons} userId={props.userId} func={pullData} />
				</div>
			</div>
		</section>
	)
}
