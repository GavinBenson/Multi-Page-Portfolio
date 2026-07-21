import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticles, getArticle } from '@/lib/codex'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: article.meta.title,
    description: article.meta.description,
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let MdxContent
  try {
    MdxContent = (await import(`@/content/codex/${slug}.mdx`)).default
  } catch {
    notFound()
  }

  const article = getArticle(slug)
  if (!article) notFound()

  return (
    <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <Link
        href="/codex"
        className="text-sm font-medium no-underline transition-colors duration-200 mb-8 inline-block"
        style={{ color: 'var(--accent)' }}
      >
        &larr; Back to Codex
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <span
          className="px-2 py-0.5 rounded text-xs font-semibold"
          style={{
            backgroundColor: 'var(--accent-glow)',
            color: 'var(--accent)',
          }}
        >
          {article.meta.category}
        </span>
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {article.meta.readTime} read
        </span>
      </div>

      <article
        className="prose max-w-none
          [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:mb-8
          [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:mt-12 [&_h2]:mb-4
          [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3
          [&_p]:text-sm [&_p]:leading-relaxed [&_p]:mb-4
          [&_ul]:text-sm [&_ul]:leading-relaxed [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6
          [&_ol]:text-sm [&_ol]:leading-relaxed [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6
          [&_code]:text-xs [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
          [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:text-sm [&_pre]:overflow-x-auto [&_pre]:mb-6"
        style={{
          color: 'var(--text-secondary)',
          ['--tw-prose-body' as string]: 'var(--text-secondary)',
          ['--tw-prose-headings' as string]: 'var(--text-primary)',
          ['--tw-prose-bold' as string]: 'var(--text-primary)',
          ['--tw-prose-links' as string]: 'var(--accent)',
          ['--tw-prose-code' as string]: 'var(--accent)',
          ['--tw-prose-bullets' as string]: 'var(--text-secondary)',
          ['--tw-prose-quotes' as string]: 'var(--text-secondary)',
          ['--tw-prose-quote-borders' as string]: 'var(--accent)',
          ['--tw-prose-counters' as string]: 'var(--text-secondary)',
          ['--tw-prose-hr' as string]: 'var(--text-secondary)',
        }}
      >
        <MdxContent />
      </article>
    </main>
  )
}
