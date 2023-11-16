'use server'

// app/page.tsx
import { UserButton, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { getUserInfo } from '@/lib/actions/user.actions'

async function Page() {
	const user = await currentUser()
	if (!user) return null

	const userInfo = await getUserInfo(user.id)
	if (!userInfo?.onboarded) redirect('/onboarding')

	return (
		<div>
			<UserButton afterSignOutUrl="/sign-in" />
		</div>
	)
}

export default Page
