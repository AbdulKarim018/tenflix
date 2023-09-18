import AuthProvider from '@/hooks/contexts/AuthProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/hooks/contexts/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tenflix - An Awesome Streaming Service!',
  description: 'An Awesome Streaming Service!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <body className={`${inter.className} bg-black`}>
          <ThemeProvider defaultTheme='dark' attribute="class">
            {children}
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  )
}
