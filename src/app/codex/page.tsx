import Link from 'next/link'
import { getArticles } from '@/lib/codex'

export default function CodexPage() {
  const articles = getArticles()

  return (
    <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
      <h1
        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
        style={{ color: 'var(--text-primary)' }}
      >
        The Codex
      </h1>
      <p
        className="text-sm sm:text-base mb-16"
        style={{ color: 'var(--text-secondary)' }}
      >
        Deep dives into QA, automation frameworks, and quality engineering.
      </p>

      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/codex/${article.slug}`}
            className="block p-6 rounded-xl border no-underline transition-all duration-200 hover:-translate-y-0.5 group"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'color-mix(in srgb, var(--text-secondary) 10%, transparent)',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="px-2 py-0.5 rounded text-xs font-semibold"
                style={{
                  backgroundColor: 'var(--accent-glow)',
                  color: 'var(--accent)',
                }}
              >
                {article.category}
              </span>
              <span
                className="text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                {article.readTime} read
              </span>
            </div>
            <h2
              className="text-lg font-semibold tracking-tight mb-1 transition-colors duration-200"
              style={{ color: 'var(--text-primary)' }}
            >
              {article.title}
            </h2>
            {article.description && (
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {article.description}
              </p>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-16">
        <Link
          href="/"
          className="text-sm font-medium no-underline transition-colors duration-200"
          style={{ color: 'var(--accent)' }}
        >
          &larr; Back to portfolio
        </Link>
      </div>
    </main>
  )
}
