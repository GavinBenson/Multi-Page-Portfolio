import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { fontSans } from '@/lib/fonts'
import { siteMetadata } from '@/lib/metadata'
import Header from '@/components/Header'
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
          defaultTheme="dark"
          enableSystem={false}
          themes={['dark', 'light']}
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
