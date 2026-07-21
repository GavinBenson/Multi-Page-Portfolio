import Link from 'next/link'
import { getArticles } from '@/lib/codex'
import SectionReveal from './SectionReveal'

export default function CodexPreview() {
  const articles = getArticles().slice(0, 3)

  if (articles.length === 0) return null

  return (
    <section className="max-w-6xl mx-auto px-6 py-24 lg:py-40">
      <SectionReveal>
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-12"
          style={{ color: 'var(--text-primary)' }}
        >
          From the Codex
        </h2>
      </SectionReveal>

      <div className="grid sm:grid-cols-3 gap-6">
        {articles.map((article, i) => (
          <SectionReveal key={article.slug} delay={i * 0.08}>
            <Link
              href={`/codex/${article.slug}`}
              className="block p-5 rounded-xl border no-underline transition-all duration-200 hover:-translate-y-1 h-full"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'color-mix(in srgb, var(--text-secondary) 10%, transparent)',
              }}
            >
              <span
                className="inline-block px-2 py-0.5 rounded text-xs font-semibold mb-3"
                style={{
                  backgroundColor: 'var(--accent-glow)',
                  color: 'var(--accent)',
                }}
              >
                {article.category}
              </span>
              <h3
                className="text-base font-semibold tracking-tight mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                {article.title}
              </h3>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {article.readTime} read
              </p>
            </Link>
          </SectionReveal>
        ))}
      </div>

      <SectionReveal delay={0.3}>
        <div className="mt-8 text-center">
          <Link
            href="/codex"
            className="text-sm font-medium no-underline transition-colors duration-200"
            style={{ color: 'var(--accent)' }}
          >
            View all articles &rarr;
          </Link>
        </div>
      </SectionReveal>
    </section>
  )
}
