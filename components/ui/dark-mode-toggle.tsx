'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export const DarkModeToggle = (): JSX.Element | null => {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<div>
			<input
				type="checkbox"
				id="toggle"
				checked={theme !== 'light'}
				className="toggle--checkbox"
				onChange={() => { setTheme(theme === 'dark' ? 'light' : 'dark') }}
			/>
			<label htmlFor="toggle" className="toggle--label float-right mr-2">
				<span className="toggle--label-background" />
			</label>
		</div>
	)
}
