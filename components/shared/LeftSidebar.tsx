'use client'

import React, { useEffect, useState } from 'react'
import NavOptions from './NavOptions'
import Logout from './Logout'
import { type ICategory } from '@/lib/models/category'

export default function LeftSidebar (props: {
	categories: ICategory[] | null
	func: (categories: ICategory[]) => void
}): JSX.Element {
	const [categoryList, setCategoryList] = useState<ICategory[] | null>(
		props.categories
	)
	useEffect(() => {
		setCategoryList(props.categories)
	}, [props.categories])

	const pullData = (data: ICategory[]): void => {
		props.func(data)
	}

	return (
		<section
			className="custom-scrollbar
		  sticky left-0 top-0 z-20 h-screen w-fit justify-between
      overflow-auto border-r border-r-dark-4 bg-light-2
    dark:bg-dark-2 pt-28 max-md:hidden flex flex-col pb-0"
		>
			<div className="flex-1 flex flex-col gap-3 px-6 overflow-y-auto">
				<NavOptions
					func={pullData}
					position="leftsidebar"
					categories={categoryList}
				/>
			</div>
			<div className="mt-auto px-6 py-3 shadow-inner">
				<Logout placement="" />
			</div>
		</section>
	)
}
