// app/layout.tsx
import '../globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata, Viewport } from "next";
import { dark } from '@clerk/themes'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: "#877EFF",
};

export const metadata: Metadata = {
	title: 'Things To Do',
	description: 'All your To Dos, organised, simplified, accessible...',
	applicationName: 'Things To Do',
	manifest: '/manifest.json',
	icons: [
		{
			url: '/assets/maskable_icon_x48',
			type: 'image/png',
			sizes: '48x48'
		},
		{
			url: '/assets/maskable_icon_x72',
			type: 'image/png',
			sizes: '72x72'
		},
		{
			url: '/assets/maskable_icon_x96.png',
			type: 'image/png',
			sizes: '96x96'
		},
		{
			url: '/assets/maskable_icon_x128.png',
			type: 'image/png',
			sizes: '128x128'
		},
		{
			url: '/assets/maskable_icon_x192.png',
			type: 'image/png',
			sizes: '192x192',
			rel: 'apple-touch-icon'
		}
	],
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default',
		title: 'Things To Do'
	},
	formatDetection: {
		telephone: false
	},
	openGraph: {
		type: 'website',
		siteName: 'Things To Do',
		title: {
			default: 'Things To Do',
			template: '% - PWA App'
		},
		description: 'All your To Dos, organised, simplified, accessible...'
	},
	twitter: {
		card: 'summary',
		title: {
			default: 'Things To Do',
			template: '% - PWA App'
		},
		description: 'All your To Dos, organised, simplified, accessible...'
	}
}

export default function RootLayout({
	children
}: {
  children: React.ReactNode;
}) {
	return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={`${inter.className}`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
