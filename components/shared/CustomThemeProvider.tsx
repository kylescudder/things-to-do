import React, { type ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'

interface CustomThemeProviderProps {
	children: ReactNode
}

const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
	children
}) => <ThemeProvider attribute="class">{children}</ThemeProvider>

export default CustomThemeProvider
