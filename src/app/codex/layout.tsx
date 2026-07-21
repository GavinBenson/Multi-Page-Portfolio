import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Codex',
  description: 'QA knowledge base — articles on testing, automation, and quality engineering.',
}

export default function CodexLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
