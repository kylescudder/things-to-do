import React from 'react'
import Topbar from './Topbar'
import { MainContent } from './MainContent'
import { Toast } from './Toast'
import { type ICategory } from '@/lib/models/category'
import { type IIcon } from '@/lib/models/icon'
import { type IToDo } from '@/lib/models/todo'

export default function Content (props: {
	categories: ICategory[]
	icons: IIcon[]
	userId: string
	children: React.ReactNode
}) {
	const pullToDo = (data: IToDo) => {

	}
	return (
		<div>
			<Topbar
				icons={props.icons}
				userId={props.userId}
				categories={props.categories}
			/>
			<MainContent
				categories={props.categories}
				icons={props.icons}
				userId={props.userId}
				children={props.children}
			/>
			<Toast />
		</div>
	)
}
