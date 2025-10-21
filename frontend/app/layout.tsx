import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
// import { SessionProvider } from '@/components/providers/SessionProvider'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  title: 'Chancify AI - College Admissions Predictor',
  description: 'AI-powered college admissions probability calculator with holistic factor analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

