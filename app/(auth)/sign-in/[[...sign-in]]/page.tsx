import React from 'react'
import { SignIn } from '@clerk/nextjs'

export default function Page (): JSX.Element {
	return (
		<div className="flex items-center justify-center h-screen bg-dark-1">
			<SignIn />
		</div>
	)
}
