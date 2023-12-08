import React from 'react'
import Topbar from './Topbar'
import { MainContent } from './MainContent'
import { Toast } from './Toast'
import { type ICategory } from '@/lib/models/category'
import { type IIcon } from '@/lib/models/icon'

export default function Content (props: {
	categories: ICategory[]
	icons: IIcon[]
	userId: string
	children: React.ReactNode
}): JSX.Element {
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
				userId={props.userId}>
				{props.children}
			</MainContent>
			<Toast />
		</div>
	)
}
