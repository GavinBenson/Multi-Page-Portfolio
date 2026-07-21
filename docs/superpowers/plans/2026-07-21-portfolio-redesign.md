# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate Gavin Benson's portfolio from vanilla HTML/CSS/JS + Vite to Next.js 15 App Router + Tailwind v4 + Framer Motion + MDX with an Apple-quality dark-first design.

**Architecture:** Next.js 15 App Router with hybrid routing — main portfolio is a single-page scroll, Codex blog gets its own routes (`/codex`, `/codex/[slug]`). Server Components by default; Client Components only for interactivity (theme toggle, mobile nav, Framer Motion animations). MDX for blog articles via `@next/mdx`.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4, Framer Motion, next-themes, @next/mdx, Geist fonts (via `geist` npm package), Vercel

## Global Constraints

- Node.js 18.18+
- All images use `next/image` — no raw `<img>` tags
- WCAG AA contrast on all text
- `prefers-reduced-motion: reduce` disables all animations
- Three color palettes in `lib/theme.ts` — Palette A ("Validated") active, B ("Precision") and C ("Signal") commented with swap instructions
- No external font CDN requests — Geist loaded via npm package
- Tailwind v4 CSS-first configuration (no `tailwind.config.js`)
- Dark mode default, light mode via `next-themes` class strategy

## File Map

```
C:/Code/ClaudeCode/Portfolio/
├── public/
│   ├── img/                    (moved from src/public/img/)
│   │   ├── hero.jpg
│   │   ├── automation.png
│   │   ├── visualvalidator1-4.png
│   │   ├── cryptobot*.PNG
│   │   ├── 1.png, game1.png, ogre.png
│   │   └── icon.svg
│   └── Benson_Gavin_Resume.pdf (moved from src/public/)
├── src/
│   ├── app/
│   │   ├── layout.tsx          Root layout: fonts, ThemeProvider, Header, Footer
│   │   ├── page.tsx            Home: Hero, About, Featured, Projects, CodexPreview, Contact
│   │   ├── globals.css         Tailwind v4 import + theme tokens + base styles
│   │   └── codex/
│   │       ├── page.tsx        Blog listing
│   │       └── [slug]/
│   │           └── page.tsx    Individual MDX article
│   ├── components/
│   │   ├── Header.tsx          Fixed nav, backdrop blur, desktop links
│   │   ├── MobileNav.tsx       Full-screen mobile overlay
│   │   ├── ThemeToggle.tsx     Dark/light toggle button
│   │   ├── Hero.tsx            Hero section with load animation
│   │   ├── About.tsx           Bio + skills pills
│   │   ├── FeaturedProject.tsx Immersive project card + gallery
│   │   ├── ProjectsGrid.tsx    Projects section
│   │   ├── ProjectCard.tsx     Individual project card
│   │   ├── CodexPreview.tsx    Latest 3 articles on home
│   │   ├── Contact.tsx         Contact section
│   │   ├── Footer.tsx          Minimal footer
│   │   ├── ScrollProgress.tsx  Test-runner progress bar
│   │   └── SectionReveal.tsx   Reusable scroll-triggered reveal
│   ├── content/
│   │   └── codex/
│   │       ├── qa-fundamentals-1.mdx
│   │       ├── qa-fundamentals-2.mdx
│   │       └── qa-fundamentals-3.mdx
│   └── lib/
│       ├── theme.ts            Palette definitions (A/B/C)
│       ├── fonts.ts            Geist font config
│       ├── codex.ts            MDX content utilities
│       └── metadata.ts         SEO defaults
├── mdx-components.tsx          MDX component overrides (Next.js convention)
├── next.config.mjs             Next.js + MDX config
├── postcss.config.mjs          Tailwind v4 PostCSS plugin
├── tsconfig.json               TypeScript config
└── package.json                Dependencies
```

---

### Task 1: Project Scaffold & Theme Foundation

**Files:**
- Remove: `src/index.html`, `src/codex.html`, `src/main.js`, `src/codex.js`, `src/style.css`, `src/assets/` (entire directory), `src/articles/` (entire directory), `vite.config.js`
- Move: `src/public/img/*` → `public/img/`, `src/public/Benson_Gavin_Resume.pdf` → `public/Benson_Gavin_Resume.pdf`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/lib/theme.ts`, `src/lib/fonts.ts`, `src/lib/metadata.ts`, `next.config.mjs`, `postcss.config.mjs`, `tsconfig.json`, `mdx-components.tsx`
- Modify: `package.json`

**Interfaces:**
- Produces: Root layout with ThemeProvider, Geist fonts loaded, CSS theme tokens available globally, `theme.ts` exporting palette config

- [ ] **Step 1: Move public assets and remove old source files**

```bash
# Move public assets to Next.js public directory
mkdir -p public/img
cp src/public/img/* public/img/
cp src/public/Benson_Gavin_Resume.pdf public/Benson_Gavin_Resume.pdf

# Preserve article content for later MDX conversion (copy to temp)
mkdir -p _migration
cp src/articles/*.html _migration/

# Remove old source structure
rm -rf src/assets src/articles src/public
rm -f src/index.html src/codex.html src/main.js src/codex.js src/style.css
rm -f vite.config.js
```

- [ ] **Step 2: Install dependencies**

```bash
npm install next@latest react@latest react-dom@latest
npm install framer-motion next-themes @next/mdx @mdx-js/loader @mdx-js/react
npm install -D typescript @types/react @types/react-dom @types/mdx
npm install -D tailwindcss @tailwindcss/postcss postcss
npm install geist
```

- [ ] **Step 3: Update package.json scripts**

Replace the `scripts` section in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

Remove `glob` from `devDependencies` (no longer needed).

- [ ] **Step 4: Create tsconfig.json**

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.mdx"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: Create next.config.mjs**

Create `next.config.mjs`:

```js
import createMDX from '@next/mdx'

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
```

- [ ] **Step 6: Create postcss.config.mjs**

Create `postcss.config.mjs`:

```js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
```

- [ ] **Step 7: Create mdx-components.tsx**

Create `mdx-components.tsx` at project root:

```tsx
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
```

- [ ] **Step 8: Create theme config — src/lib/theme.ts**

Create `src/lib/theme.ts`:

```ts
export const palettes = {
  // ━━━ ACTIVE PALETTE ━━━
  validated: {
    name: 'Validated',
    dark: {
      bg: '#09090b',
      surface: '#18181b',
      textPrimary: '#fafafa',
      textSecondary: '#a1a1aa',
      accent: '#10b981',
      accentSecondary: '#6366f1',
    },
    light: {
      bg: '#fafafa',
      surface: '#f4f4f5',
      textPrimary: '#09090b',
      textSecondary: '#52525b',
      accent: '#059669',
      accentSecondary: '#4f46e5',
    },
  },

  // ━━━ ALTERNATIVE PALETTES (uncomment to swap) ━━━

  // precision: {
  //   name: 'Precision',
  //   dark: {
  //     bg: '#0a0a0f',
  //     surface: '#131320',
  //     textPrimary: '#f8fafc',
  //     textSecondary: '#94a3b8',
  //     accent: '#3b82f6',
  //     accentSecondary: '#8b5cf6',
  //   },
  //   light: {
  //     bg: '#f8fafc',
  //     surface: '#f1f5f9',
  //     textPrimary: '#0a0a0f',
  //     textSecondary: '#475569',
  //     accent: '#2563eb',
  //     accentSecondary: '#7c3aed',
  //   },
  // },

  // signal: {
  //   name: 'Signal',
  //   dark: {
  //     bg: '#0c0a09',
  //     surface: '#1c1917',
  //     textPrimary: '#fafaf9',
  //     textSecondary: '#a8a29e',
  //     accent: '#f97316',
  //     accentSecondary: '#06b6d4',
  //   },
  //   light: {
  //     bg: '#fafaf9',
  //     surface: '#f5f5f4',
  //     textPrimary: '#0c0a09',
  //     textSecondary: '#57534e',
  //     accent: '#ea580c',
  //     accentSecondary: '#0891b2',
  //   },
  // },
}

export const activePalette = palettes.validated
```

- [ ] **Step 9: Create font config — src/lib/fonts.ts**

Create `src/lib/fonts.ts`:

```ts
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export const fontSans = GeistSans
export const fontMono = GeistMono
```

- [ ] **Step 10: Create metadata config — src/lib/metadata.ts**

Create `src/lib/metadata.ts`:

```ts
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
```

- [ ] **Step 11: Create globals.css with Tailwind v4 + theme tokens**

Create `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --font-sans: 'Geist Sans', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;
}

:root {
  --bg: #09090b;
  --surface: #18181b;
  --text-primary: #fafafa;
  --text-secondary: #a1a1aa;
  --accent: #10b981;
  --accent-secondary: #6366f1;
  --accent-glow: rgba(16, 185, 129, 0.15);
}

:root.light {
  --bg: #fafafa;
  --surface: #f4f4f5;
  --text-primary: #09090b;
  --text-secondary: #52525b;
  --accent: #059669;
  --accent-secondary: #4f46e5;
  --accent-glow: rgba(5, 150, 105, 0.1);
}

/* ━━━ PALETTE B: Precision (uncomment both blocks, comment A above) ━━━ */
/*
:root {
  --bg: #0a0a0f;
  --surface: #131320;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --accent: #3b82f6;
  --accent-secondary: #8b5cf6;
  --accent-glow: rgba(59, 130, 246, 0.15);
}
:root.light {
  --bg: #f8fafc;
  --surface: #f1f5f9;
  --text-primary: #0a0a0f;
  --text-secondary: #475569;
  --accent: #2563eb;
  --accent-secondary: #7c3aed;
  --accent-glow: rgba(37, 99, 235, 0.1);
}
*/

/* ━━━ PALETTE C: Signal (uncomment both blocks, comment A above) ━━━ */
/*
:root {
  --bg: #0c0a09;
  --surface: #1c1917;
  --text-primary: #fafaf9;
  --text-secondary: #a8a29e;
  --accent: #f97316;
  --accent-secondary: #06b6d4;
  --accent-glow: rgba(249, 115, 22, 0.15);
}
:root.light {
  --bg: #fafaf9;
  --surface: #f5f5f4;
  --text-primary: #0c0a09;
  --text-secondary: #57534e;
  --accent: #ea580c;
  --accent-secondary: #0891b2;
  --accent-glow: rgba(234, 88, 12, 0.1);
}
*/

* {
  margin: 0;
  line-height: calc(1em + 0.5rem);
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg);
  color: var(--text-primary);
  font-family: var(--font-sans);
  transition: background-color 0.3s, color 0.3s;
}

::selection {
  background-color: var(--accent);
  color: var(--bg);
}

body::-webkit-scrollbar {
  width: 6px;
}

body::-webkit-scrollbar-track {
  background: transparent;
}

body::-webkit-scrollbar-thumb {
  background-color: var(--accent);
  border-radius: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 12: Create root layout — src/app/layout.tsx**

Create `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { fontSans } from '@/lib/fonts'
import { siteMetadata } from '@/lib/metadata'
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
          value={{ dark: '', light: 'light' }}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 13: Create placeholder home page — src/app/page.tsx**

Create `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1
        className="text-4xl font-bold"
        style={{ color: 'var(--text-primary)' }}
      >
        Portfolio — scaffold working
      </h1>
    </main>
  )
}
```

- [ ] **Step 14: Verify scaffold runs**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- Page loads with "Portfolio — scaffold working" centered
- Dark background (#09090b)
- Geist Sans font rendering
- No console errors

- [ ] **Step 15: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 + Tailwind v4 + theme foundation

Migrated from vanilla HTML/CSS/JS + Vite to Next.js 15 App Router.
Configured Tailwind v4 (CSS-first), Geist fonts, next-themes,
MDX support. Three color palettes defined (Validated active,
Precision and Signal commented). Old source files preserved in git history."
```

---

### Task 2: Header & Navigation

**Files:**
- Create: `src/components/Header.tsx`, `src/components/MobileNav.tsx`, `src/components/ThemeToggle.tsx`
- Modify: `src/app/layout.tsx` (add Header)

**Interfaces:**
- Consumes: Theme tokens from `globals.css`, `fontSans` from `@/lib/fonts`
- Produces: `Header` component (exported default), `MobileNav` component (used internally by Header), `ThemeToggle` component (used by Header and MobileNav)

- [ ] **Step 1: Create ThemeToggle — src/components/ThemeToggle.tsx**

```tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className={`w-5 h-5 ${className}`} />
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${className}`}
      style={{ color: 'var(--text-secondary)' }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
```

- [ ] **Step 2: Create MobileNav — src/components/MobileNav.tsx**

```tsx
'use client'

import { useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#featured' },
  { label: 'Codex', href: '/codex' },
  { label: 'Contact', href: '#contact' },
]

export default function MobileNav({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div
      className={`fixed inset-0 z-[9998] flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center cursor-pointer"
        style={{ color: 'var(--text-secondary)' }}
        aria-label="Close menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <nav>
        <ul className="flex flex-col items-center gap-6 list-none p-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={onClose}
                className="text-2xl font-semibold no-underline transition-colors duration-200"
                style={{ color: 'var(--text-primary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-6">
        <ThemeToggle className="w-6 h-6" />
        <a
          href="/Benson_Gavin_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 rounded-md text-sm font-semibold no-underline transition-transform duration-200 hover:-translate-y-0.5"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--bg)',
          }}
        >
          Resume
        </a>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create Header — src/components/Header.tsx**

```tsx
'use client'

import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import MobileNav from './MobileNav'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#featured' },
  { label: 'Codex', href: '/codex' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'color-mix(in srgb, var(--bg) 80%, transparent)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-end">
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 list-none p-0 m-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs font-semibold tracking-tight no-underline transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li
                className="h-6 border-l"
                style={{ borderColor: 'var(--text-secondary)', opacity: 0.3 }}
              />
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden w-6 h-6 cursor-pointer"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
```

- [ ] **Step 4: Add Header to root layout**

Modify `src/app/layout.tsx` — add import and render Header inside ThemeProvider:

```tsx
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
          value={{ dark: '', light: 'light' }}
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 5: Verify header works**

```bash
npm run dev
```

Verify at `http://localhost:3000`:
- Desktop (768px+): nav links visible, theme toggle works, hamburger hidden
- Mobile (<768px): hamburger visible, nav hidden, tap hamburger opens overlay, close button works
- Scroll: header gets backdrop blur after 20px scroll
- Theme toggle: switches between dark and light, colors transition smoothly

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.tsx src/components/MobileNav.tsx src/components/ThemeToggle.tsx src/app/layout.tsx
git commit -m "feat: add fixed header with mobile nav and theme toggle

Desktop nav with backdrop-blur on scroll, full-screen mobile overlay,
dark/light theme toggle with next-themes."
```

---

### Task 3: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`, `src/components/SectionReveal.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: Theme tokens from `globals.css`, `next/image`
- Produces: `Hero` component (exported default), `SectionReveal` component (exported default, reused by all sections)

- [ ] **Step 1: Create SectionReveal wrapper — src/components/SectionReveal.tsx**

```tsx
'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export default function SectionReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Create Hero — src/components/Hero.tsx**

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="text-center flex flex-col items-center gap-6 max-w-2xl"
      >
        <motion.div variants={fadeUp}>
          <Image
            src="/img/hero.jpg"
            alt="Gavin Benson"
            width={160}
            height={160}
            priority
            className="rounded-full object-cover w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40"
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-base lg:text-lg tracking-tight"
          style={{ color: 'var(--text-secondary)' }}
        >
          Hi, I&apos;m Gavin
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-2">
          <h1
            className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-tighter leading-none"
            style={{ color: 'var(--text-secondary)' }}
          >
            QA Engineer
          </h1>
          <hr
            className="w-3/4 border-none h-0.5"
            style={{ backgroundColor: 'var(--accent-secondary)' }}
          />
          <h1
            className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-tighter leading-none"
            style={{ color: 'var(--text-secondary)' }}
          >
            Scrum Master
          </h1>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-base lg:text-lg max-w-[60ch] leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          QA Engineer and Scrum Master at an Inc. 5000 company, specializing in{' '}
          <strong style={{ color: 'var(--accent-secondary)' }}>end-to-end test strategy</strong>{' '}
          across SaaS, API, database, and mobile platforms. I bridge technical
          execution and team leadership to ship high-quality software — and I
          helped build the{' '}
          <strong style={{ color: 'var(--accent-secondary)' }}>automation practice</strong>{' '}
          that&apos;s still running today.
        </motion.p>

        <motion.div variants={fadeUp} className="flex gap-4 mt-2">
          <a
            href="mailto:gavindbenson@gmail.com"
            className="px-6 py-2.5 rounded-md text-sm font-semibold no-underline transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg)',
              boxShadow: '0 4px 20px var(--accent-glow)',
            }}
          >
            Reach Out
          </a>
          <a
            href="/Benson_Gavin_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-md text-sm font-semibold no-underline transition-all duration-200 hover:-translate-y-0.5 border"
            style={{
              borderColor: 'var(--text-secondary)',
              color: 'var(--text-primary)',
              opacity: 0.8,
            }}
          >
            Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 3: Update home page — src/app/page.tsx**

```tsx
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  )
}
```

- [ ] **Step 4: Verify hero renders**

```bash
npm run dev
```

Verify:
- Full-viewport hero with centered content
- Profile photo loads (circular, optimized)
- Staggered fade-up animation on load
- Dual titles with indigo divider
- CTAs render and link correctly
- Responsive sizing across breakpoints
- Light/dark theme toggle works on hero text

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx src/components/SectionReveal.tsx src/app/page.tsx
git commit -m "feat: add hero section with staggered load animation

Full-viewport centered hero with profile photo, dual titles,
description, and CTAs. Framer Motion staggered fade-up on load.
SectionReveal wrapper created for reuse."
```

---

### Task 4: About Section

**Files:**
- Create: `src/components/About.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `SectionReveal` from `@/components/SectionReveal`, theme tokens, `next/image`
- Produces: `About` component (exported default)

- [ ] **Step 1: Create About — src/components/About.tsx**

```tsx
'use client'

import Image from 'next/image'
import SectionReveal from './SectionReveal'

const skillCategories = [
  {
    title: 'Testing',
    skills: ['Agile Testing', 'API Testing', 'Automation Testing', 'Database Testing', 'Mobile Testing', 'Defect Tracking'],
  },
  {
    title: 'Leadership',
    skills: ['Scrum', 'Sprint Planning', 'Process Improvement', 'Team Leadership', 'Technical Training', 'Stakeholder Reporting'],
  },
  {
    title: 'Tools',
    skills: ['Playwright / Selenium', 'Postman / Bruno', 'Next.js / React', 'C++', 'Azure DevOps', 'Git'],
  },
]

export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24 lg:py-40">
      <SectionReveal>
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-12"
          style={{ color: 'var(--text-primary)' }}
        >
          About
        </h2>
      </SectionReveal>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 items-start">
        <div className="space-y-8">
          <SectionReveal>
            <div className="space-y-5">
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                Hello there! I&apos;m Gavin — a{' '}
                <strong style={{ color: 'var(--accent-secondary)' }}>
                  QA Engineer and Scrum Master
                </strong>{' '}
                based in Portland.
              </p>
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                I&apos;m curious and hands-on by nature. I like taking things apart,
                figuring out how they work, and making them better — which turns out
                to be a pretty good foundation for both breaking software and leading
                teams.
              </p>
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                At Isolved, I wear two hats. As a{' '}
                <strong style={{ color: 'var(--accent-secondary)' }}>QA Engineer</strong>,
                I own end-to-end test strategy for an Applicant Tracking System across
                SaaS, API, database, and mobile domains. As a{' '}
                <strong style={{ color: 'var(--accent-secondary)' }}>Scrum Master</strong>,
                I lead a 7-person agile team — running ceremonies, removing blockers,
                and building the kind of team culture where sprint goals actually get hit.
                I also helped build the automation practice at my previous company
                that&apos;s still running today.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <hr
              className="border-none h-px"
              style={{ backgroundColor: 'var(--surface)' }}
            />
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <h3
              className="text-lg font-semibold tracking-tight mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Skills
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {skillCategories.map((category) => (
                <div key={category.title}>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-3"
                    style={{ color: 'var(--accent)' }}
                  >
                    {category.title}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-medium border"
                        style={{
                          borderColor: 'color-mix(in srgb, var(--text-secondary) 20%, transparent)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.2} className="hidden lg:block">
          <div className="rounded-xl overflow-hidden">
            <Image
              src="/img/automation.png"
              alt="Automation testing visualization"
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add About to home page**

Modify `src/app/page.tsx`:

```tsx
import Hero from '@/components/Hero'
import About from '@/components/About'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
    </main>
  )
}
```

- [ ] **Step 3: Verify about section**

Verify:
- Two-column layout on desktop (bio left, image right)
- Single column on mobile (image hidden)
- Skills in pill/chip layout with three categories
- Scroll-triggered reveal animation
- Text readable in both themes

- [ ] **Step 4: Commit**

```bash
git add src/components/About.tsx src/app/page.tsx
git commit -m "feat: add about section with skills pills

Two-column layout, categorized skill chips, scroll-triggered
reveal animations."
```

---

### Task 5: Featured Project Section

**Files:**
- Create: `src/components/FeaturedProject.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `SectionReveal`, `next/image`, theme tokens
- Produces: `FeaturedProject` component (exported default)

- [ ] **Step 1: Create FeaturedProject — src/components/FeaturedProject.tsx**

```tsx
'use client'

import Image from 'next/image'
import SectionReveal from './SectionReveal'

const techStack = ['Next.js', 'React', 'Playwright', 'Tailwind CSS']

const screenshots = [
  { src: '/img/visualvalidator1.PNG', alt: 'Visual Test Validator — main interface' },
  { src: '/img/visualvalidator2.png', alt: 'Visual Test Validator — split screen view' },
  { src: '/img/visualvalidator3.png', alt: 'Visual Test Validator — test results' },
  { src: '/img/visualvalidator4.png', alt: 'Visual Test Validator — export view' },
]

export default function FeaturedProject() {
  return (
    <section id="featured" className="max-w-6xl mx-auto px-6 py-24 lg:py-40">
      <SectionReveal>
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: 'var(--accent)' }}
        >
          Featured project
        </p>
      </SectionReveal>

      <SectionReveal delay={0.05}>
        <div className="flex items-center gap-4 mb-6">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Visual Test Validator
          </h2>
          <a
            href="https://visual-test-validator.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-5 h-5 transition-colors duration-200"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            aria-label="Visit Visual Test Validator"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          </a>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <p
          className="text-sm sm:text-base leading-relaxed max-w-3xl mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          A tool built in 2 days during an internal hackathon to solve a major QA
          bottleneck — our team was manually validating 700+ AI-generated test cases
          trained on our codebase. The validator automates the tedious parts:
          split-screen ATS preview, step-by-step screenshot capture, pass/fail
          marking, notes, and CSV export — turning a slow manual process into a
          seamless, auditable workflow.
        </p>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <div className="grid sm:grid-cols-3 gap-8 mb-12">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: 'var(--accent)' }}
            >
              Tech stack
            </p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--surface)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: 'var(--accent)' }}
            >
              Project type
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Automation / Internal Tool
            </p>
          </div>
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: 'var(--accent)' }}
            >
              Timeline
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              2 Days
            </p>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <div className="grid sm:grid-cols-2 gap-4">
          {screenshots.map((img) => (
            <div
              key={img.src}
              className="rounded-lg overflow-hidden"
              style={{ backgroundColor: 'var(--surface)' }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
```

- [ ] **Step 2: Add FeaturedProject to home page**

Modify `src/app/page.tsx`:

```tsx
import Hero from '@/components/Hero'
import About from '@/components/About'
import FeaturedProject from '@/components/FeaturedProject'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <FeaturedProject />
    </main>
  )
}
```

- [ ] **Step 3: Verify featured project**

Verify:
- Section label, title with external link
- Description text
- Tech stack pills, project type, timeline in 3-column grid
- 2x2 screenshot grid on desktop, stacked on mobile
- Images load via next/image
- Scroll-triggered reveals

- [ ] **Step 4: Commit**

```bash
git add src/components/FeaturedProject.tsx src/app/page.tsx
git commit -m "feat: add featured project section with image gallery

Visual Test Validator showcase with tech stack pills, metadata grid,
and 2x2 screenshot gallery."
```

---

### Task 6: Projects Grid

**Files:**
- Create: `src/components/ProjectCard.tsx`, `src/components/ProjectsGrid.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `SectionReveal`, `next/image`, theme tokens
- Produces: `ProjectsGrid` component (exported default), `ProjectCard` component (used internally)

- [ ] **Step 1: Create ProjectCard — src/components/ProjectCard.tsx**

```tsx
import Image from 'next/image'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  techStack: string[]
  url?: string
}

export default function ProjectCard({
  title,
  description,
  image,
  techStack,
  url,
}: ProjectCardProps) {
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 group border"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'color-mix(in srgb, var(--text-secondary) 10%, transparent)',
      }}
    >
      <div className="aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={600}
          height={340}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3
          className="text-lg font-semibold tracking-tight mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: 'var(--text-secondary)' }}
        >
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{
                backgroundColor: 'var(--bg)',
                color: 'var(--text-secondary)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 rounded-md text-xs font-semibold no-underline transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg)',
            }}
          >
            Website
          </a>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create ProjectsGrid — src/components/ProjectsGrid.tsx**

```tsx
'use client'

import SectionReveal from './SectionReveal'
import ProjectCard from './ProjectCard'

const projects = [
  {
    title: 'Cryptobot',
    description:
      'A hybrid automation/data-analysis tool for scraping, visualizing, and analyzing cryptocurrency price data.',
    image: '/img/cryptobot5.PNG',
    techStack: ['Selenium', 'Pandas', 'Plotly', 'SQLite3', 'Python'],
    url: 'https://github.com/GavinBenson/visual-test-validator',
  },
  {
    title: 'Eva Hoopes Real Estate',
    description:
      'A fully responsive, interactive real estate website built for a local agent.',
    image: '/img/1.png',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://www.evahoopes.com/',
  },
  {
    title: 'Game Store',
    description: 'An ecommerce game store similar to Steam.',
    image: '/img/game1.png',
    techStack: ['React', 'CSS'],
  },
  {
    title: 'Echoes of An Abyss',
    description: 'A text based JavaScript fantasy adventure game.',
    image: '/img/ogre.png',
    techStack: ['JavaScript', 'HTML', 'CSS'],
  },
]

export default function ProjectsGrid() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 lg:py-40">
      <SectionReveal>
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-12"
          style={{ color: 'var(--text-primary)' }}
        >
          Projects
        </h2>
      </SectionReveal>

      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <SectionReveal key={project.title} delay={i * 0.08}>
            <ProjectCard {...project} />
          </SectionReveal>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add ProjectsGrid to home page**

Modify `src/app/page.tsx`:

```tsx
import Hero from '@/components/Hero'
import About from '@/components/About'
import FeaturedProject from '@/components/FeaturedProject'
import ProjectsGrid from '@/components/ProjectsGrid'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <FeaturedProject />
      <ProjectsGrid />
    </main>
  )
}
```

- [ ] **Step 4: Verify projects grid**

Verify:
- 2-column grid on desktop, single column on mobile
- Cards have surface background, subtle border, hover lift + image zoom
- Tech stack tags render for each project
- Website buttons link correctly where present
- Staggered reveal on scroll

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectCard.tsx src/components/ProjectsGrid.tsx src/app/page.tsx
git commit -m "feat: add projects grid with hover cards

2-column responsive grid, hover lift with image zoom,
tech stack tags, staggered scroll reveal."
```

---

### Task 7: Contact, Footer & Scroll Progress

**Files:**
- Create: `src/components/Contact.tsx`, `src/components/Footer.tsx`, `src/components/ScrollProgress.tsx`
- Modify: `src/app/layout.tsx`, `src/app/page.tsx`

**Interfaces:**
- Consumes: `SectionReveal`, theme tokens, `framer-motion` (for ScrollProgress)
- Produces: `Contact`, `Footer`, `ScrollProgress` components (all exported default)

- [ ] **Step 1: Create Contact — src/components/Contact.tsx**

```tsx
'use client'

import SectionReveal from './SectionReveal'

export default function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24 lg:py-40 text-center">
      <SectionReveal>
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Get In Contact
        </h2>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <p
          className="text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          Whether you are starting a project, have business inquiries or just want
          to say hi, my inbox is always open so feel free to reach out and I will
          get back to you as soon as possible.
        </p>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <div className="flex flex-col items-center gap-4">
          <a
            href="mailto:gavindbenson@gmail.com"
            className="px-8 py-3 rounded-md text-sm font-semibold no-underline transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg)',
              boxShadow: '0 4px 20px var(--accent-glow)',
            }}
          >
            Reach Out
          </a>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            gavindbenson@gmail.com
          </p>
        </div>
      </SectionReveal>
    </section>
  )
}
```

- [ ] **Step 2: Create Footer — src/components/Footer.tsx**

```tsx
export default function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-6 py-12 text-center">
      <p
        className="text-sm font-medium tracking-tight"
        style={{ color: 'var(--text-secondary)', opacity: 0.5 }}
      >
        ~ Gavin Benson ~
      </p>
    </footer>
  )
}
```

- [ ] **Step 3: Create ScrollProgress — src/components/ScrollProgress.tsx**

```tsx
'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[10000] origin-left"
      style={{
        scaleX,
        backgroundColor: 'var(--accent)',
      }}
    />
  )
}
```

- [ ] **Step 4: Add Footer and ScrollProgress to root layout, Contact to page**

Modify `src/app/layout.tsx` — add Footer and ScrollProgress:

```tsx
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { fontSans } from '@/lib/fonts'
import { siteMetadata } from '@/lib/metadata'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
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
          value={{ dark: '', light: 'light' }}
        >
          <ScrollProgress />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

Modify `src/app/page.tsx`:

```tsx
import Hero from '@/components/Hero'
import About from '@/components/About'
import FeaturedProject from '@/components/FeaturedProject'
import ProjectsGrid from '@/components/ProjectsGrid'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <FeaturedProject />
      <ProjectsGrid />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 5: Verify contact, footer, and scroll progress**

Verify:
- Contact section: centered text, email CTA with glow shadow, email text below
- Footer: minimal name centered
- Scroll progress bar: thin emerald bar at top, fills as you scroll, smooth spring physics
- All three work in both themes

- [ ] **Step 6: Commit**

```bash
git add src/components/Contact.tsx src/components/Footer.tsx src/components/ScrollProgress.tsx src/app/layout.tsx src/app/page.tsx
git commit -m "feat: add contact, footer, and scroll progress bar

Contact section with email CTA, minimal footer, emerald scroll
progress bar as signature element (test-runner style)."
```

---

### Task 8: Codex — MDX Setup, Blog Listing, Article Pages

**Files:**
- Create: `src/content/codex/qa-fundamentals-1.mdx`, `src/content/codex/qa-fundamentals-2.mdx`, `src/content/codex/qa-fundamentals-3.mdx`, `src/lib/codex.ts`, `src/app/codex/page.tsx`, `src/app/codex/[slug]/page.tsx`, `src/app/codex/layout.tsx`
- Reference: `_migration/qa-fundamentals-1.html`, `_migration/qa-fundamentals-2.html`, `_migration/qa-fundamentals-3.html`

**Interfaces:**
- Consumes: MDX config from `next.config.mjs`, `mdx-components.tsx`, theme tokens, `Header` (via root layout)
- Produces: `/codex` listing page, `/codex/[slug]` article pages, `getArticles()` and `getArticle(slug)` from `@/lib/codex`

- [ ] **Step 1: Create codex utility — src/lib/codex.ts**

```ts
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

function extractMeta(content: string): Omit<ArticleMeta, 'slug'> {
  const metaMatch = content.match(/export\s+const\s+meta\s*=\s*(\{[\s\S]*?\n\})/)
  if (!metaMatch) {
    return {
      title: 'Untitled',
      description: '',
      category: 'General',
      readTime: '5 min',
      date: '2024-01-01',
    }
  }

  try {
    const metaObj = new Function(`return ${metaMatch[1]}`)()
    return {
      title: metaObj.title || 'Untitled',
      description: metaObj.description || '',
      category: metaObj.category || 'General',
      readTime: metaObj.readTime || '5 min',
      date: metaObj.date || '2024-01-01',
    }
  } catch {
    return {
      title: 'Untitled',
      description: '',
      category: 'General',
      readTime: '5 min',
      date: '2024-01-01',
    }
  }
}
```

- [ ] **Step 2: Convert HTML articles to MDX**

Read each HTML file in `_migration/` and convert to MDX format. Each MDX file needs a `meta` export at the top. Convert the HTML content to Markdown.

Create `src/content/codex/qa-fundamentals-1.mdx`:

```mdx
export const meta = {
  title: 'QA Fundamentals: Part 1',
  description: 'Introduction to software quality assurance fundamentals.',
  category: 'QA',
  readTime: '8 min',
  date: '2024-06-01',
}

# {meta.title}

[ENGINEER: Read _migration/qa-fundamentals-1.html and convert its HTML body
to Markdown. Strip all HTML tags: <h2> becomes ##, <h3> becomes ###,
<p> becomes plain paragraphs, <ul>/<li> becomes - lists, <code> becomes
backticks, <pre><code> becomes fenced code blocks. Preserve all text
content verbatim — only the formatting changes.]
```

Repeat for `qa-fundamentals-2.mdx` and `qa-fundamentals-3.mdx`, adjusting the meta object for each (Part 2, Part 3, incrementing dates).

- [ ] **Step 3: Create Codex layout — src/app/codex/layout.tsx**

```tsx
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
```

- [ ] **Step 4: Create blog listing page — src/app/codex/page.tsx**

```tsx
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
```

- [ ] **Step 5: Create article page — src/app/codex/[slug]/page.tsx**

```tsx
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
        className="prose prose-invert max-w-none
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
          ['--tw-prose-headings' as string]: 'var(--text-primary)',
          ['--tw-prose-code' as string]: 'var(--accent)',
        }}
      >
        <MdxContent />
      </article>
    </main>
  )
}
```

- [ ] **Step 6: Verify Codex pages**

```bash
npm run dev
```

Verify:
- `/codex` — lists all 3 articles with category tags and read times
- Click article — navigates to `/codex/qa-fundamentals-1` etc.
- Article renders with proper typography hierarchy
- Back navigation works
- Both themes work

- [ ] **Step 7: Clean up migration files**

```bash
rm -rf _migration
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add Codex blog with MDX articles

Blog listing at /codex, individual articles at /codex/[slug].
Three QA Fundamentals articles migrated from HTML to MDX.
Static generation with dynamic metadata."
```

---

### Task 9: Codex Preview on Home, Skip Link, Final Polish

**Files:**
- Create: `src/components/CodexPreview.tsx`
- Modify: `src/app/page.tsx`, `src/app/layout.tsx`

**Interfaces:**
- Consumes: `getArticles()` from `@/lib/codex`, `SectionReveal`, theme tokens, `next/link`
- Produces: `CodexPreview` component (exported default). Complete home page with all sections.

- [ ] **Step 1: Create CodexPreview — src/components/CodexPreview.tsx**

```tsx
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
```

- [ ] **Step 2: Complete home page with all sections**

Update `src/app/page.tsx`:

```tsx
import Hero from '@/components/Hero'
import About from '@/components/About'
import FeaturedProject from '@/components/FeaturedProject'
import ProjectsGrid from '@/components/ProjectsGrid'
import CodexPreview from '@/components/CodexPreview'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <FeaturedProject />
      <ProjectsGrid />
      <CodexPreview />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 3: Add skip-to-content link and focus styles to layout**

Modify `src/app/layout.tsx` — add skip link as first child inside body:

```tsx
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { fontSans } from '@/lib/fonts'
import { siteMetadata } from '@/lib/metadata'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
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
          value={{ dark: '', light: 'light' }}
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
          <ScrollProgress />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

Add `id="main-content"` to `<main>` in `src/app/page.tsx`:

```tsx
<main id="main-content">
```

- [ ] **Step 4: Add global focus styles to globals.css**

Append to `src/app/globals.css`:

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 2px;
}
```

- [ ] **Step 5: Final verification**

```bash
npm run dev
```

Full verification checklist:
- [ ] Home page: all 6 sections render in order (Hero, About, Featured, Projects, Codex Preview, Contact)
- [ ] Scroll progress bar fills as you scroll
- [ ] Smooth scroll to anchor sections from nav links
- [ ] Theme toggle works everywhere
- [ ] Mobile nav works (open, close, links navigate correctly)
- [ ] All images load via next/image
- [ ] Codex preview shows 3 articles with "View all" link
- [ ] /codex listing page works
- [ ] Individual article pages render MDX content
- [ ] Tab through page — visible focus outlines on all interactive elements
- [ ] Skip-to-content link appears on focus
- [ ] Light mode: all text readable, accent colors work
- [ ] Dark mode: all text readable, accent colors work
- [ ] Resize: responsive at all breakpoints (mobile, tablet, desktop)

- [ ] **Step 6: Build check**

```bash
npm run build
```

Verify no build errors. Check for any warnings about missing images or type issues.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: complete portfolio redesign with Codex preview and a11y

Added Codex preview section on home page, skip-to-content link,
visible focus states, global focus-visible outlines. All sections
complete and responsive."
```

- [ ] **Step 8: Clean up old files (if any remain)**

Check for any stale files from the old Vite setup:

```bash
git status
```

If `.gitignore` needs updating for Next.js:

Create/update `.gitignore`:

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build
/dist

# misc
.DS_Store
*.pem
.env*.local

# debug
npm-debug.log*

# typescript
*.tsbuildinfo
next-env.d.ts
```

```bash
git add .gitignore
git commit -m "chore: update gitignore for Next.js"
```
