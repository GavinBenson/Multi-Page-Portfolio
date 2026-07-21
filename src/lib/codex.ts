import fs from 'fs'
import path from 'path'

export interface ArticleMeta {
  slug: string
  title: string
  description: string
  category: string
  readTime: string
  date: string
}

const contentDir = path.join(process.cwd(), 'src', 'content', 'codex')

export function getArticles(): ArticleMeta[] {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'))

  return files
    .map((file) => {
      const slug = file.replace('.mdx', '')
      const content = fs.readFileSync(path.join(contentDir, file), 'utf-8')
      const meta = extractMeta(content)
      return { slug, ...meta }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getArticle(slug: string): { meta: ArticleMeta; content: string } | null {
  const filePath = path.join(contentDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const content = fs.readFileSync(filePath, 'utf-8')
  const meta = extractMeta(content)

  return { meta: { slug, ...meta }, content }
}

const DEFAULT_META: Omit<ArticleMeta, 'slug'> = {
  title: 'Untitled',
  description: '',
  category: 'General',
  readTime: '5 min',
  date: '2024-01-01',
}

function extractMeta(content: string): Omit<ArticleMeta, 'slug'> {
  const metaMatch = content.match(/export\s+const\s+meta\s*=\s*(\{[\s\S]*?\n\})/)
  if (!metaMatch) {
    return { ...DEFAULT_META }
  }

  const block = metaMatch[1]

  const field = (key: keyof typeof DEFAULT_META): string | undefined => {
    const fieldMatch = block.match(
      new RegExp(`${key}\\s*:\\s*['"]([^'"]*)['"]`)
    )
    return fieldMatch?.[1]
  }

  return {
    title: field('title') || DEFAULT_META.title,
    description: field('description') || DEFAULT_META.description,
    category: field('category') || DEFAULT_META.category,
    readTime: field('readTime') || DEFAULT_META.readTime,
    date: field('date') || DEFAULT_META.date,
  }
}
