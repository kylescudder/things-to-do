'use server'

// app/page.tsx
import React from 'react'
import { UserButton, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { getUserInfo } from '@/lib/actions/user.actions'
import { getOverdueToDos } from '@/lib/actions/todo.actions'
import { type IToDo } from '@/lib/models/todo'
import ToDoList from '@/components/shared/ToDoList'

async function Page (): Promise<JSX.Element | null> {
	const user = await currentUser()
	if (!user) return null

	const userInfo = await getUserInfo(user.id)
	if (!userInfo?.onboarded) redirect('/onboarding')

	const overdueToDos: IToDo[] | null = await getOverdueToDos(userInfo._id)

	return (
		<div>
			<p className='text-2xl'>Overdue</p>
			<ToDoList todos={overdueToDos} />
		</div>
	)
}

export default Page
