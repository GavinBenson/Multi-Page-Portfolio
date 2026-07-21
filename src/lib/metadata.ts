import type { Metadata } from 'next'

export const siteMetadata: Metadata = {
  title: {
    default: 'Gavin Benson — QA Engineer & Scrum Master',
    template: '%s | Gavin Benson',
  },
  description:
    'QA Engineer and Scrum Master specializing in end-to-end test strategy across SaaS, API, database, and mobile platforms.',
  keywords: [
    'QA Engineer',
    'Scrum Master',
    'automation testing',
    'Playwright',
    'Selenium',
    'software testing',
  ],
  authors: [{ name: 'Gavin Benson' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Gavin Benson Portfolio',
  },
}
