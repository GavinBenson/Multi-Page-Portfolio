import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { fontSans } from '@/lib/fonts'
import { siteMetadata } from '@/lib/metadata'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import MotionProvider from '@/components/MotionProvider'
import './globals.css'

export const metadata: Metadata = siteMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="auto"
          enableSystem={false}
          themes={['light', 'dark', 'auto']}
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-semibold focus:no-underline"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg)',
            }}
          >
            Skip to content
          </a>
          <MotionProvider>
            <ScrollProgress />
            <Header />
            {children}
            <Footer />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
