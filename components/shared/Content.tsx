import React from 'react'
import Topbar from './Topbar'
import { MainContent } from './MainContent'
import { Toast } from './Toast'
import { ICategory } from '@/lib/models/category'
import { IIcon } from '@/lib/models/icon'
import { IToDo } from '@/lib/models/todo'

export default function Content(props: {
  categories: ICategory[];
  icons: IIcon[];
  userId: string;
  children: React.ReactNode;
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
