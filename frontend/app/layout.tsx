import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Chancify AI',
  description: 'Revenue Agents for College Admissions - AI-powered holistic admissions analysis',
  themeColor: '#0b0f17',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-black text-white overflow-x-hidden`}>
        {/* Global ambient background (ROX-style), sits behind everything */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-50">
          <div className="absolute -top-48 left-1/2 -translate-x-1/2 h-[900px] w-[1400px] rounded-full blur-[120px] opacity-25 bg-[radial-gradient(closest-side,rgba(245,200,75,.35),transparent_70%)]" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[560px] w-[560px] rounded-full blur-[100px] opacity-15 bg-[radial-gradient(closest-side,rgba(103,232,249,.25),transparent_70%)]" />
        </div>
        
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

