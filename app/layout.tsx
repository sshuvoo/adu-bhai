import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Adu Bhai: Your Next-Gen AI Chat Assistant',
  description:
    'Chat with Adu Bhai, your intelligent AI assistant. Get instant answers, personalized conversations, and powerful insights. Experience the future of AI-powered communication today!',
  openGraph: {
    images: [
      {
        url: 'https://adu-bhai.vercel.app/adu_bhai.svg',
        width: 800,
        height: 600,
      },
    ],
  },
}

interface Children {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<Children>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
