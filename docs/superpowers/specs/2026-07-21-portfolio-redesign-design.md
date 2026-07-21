# Portfolio Redesign — Design Spec

## Overview

Full redesign of Gavin Benson's portfolio from vanilla HTML/CSS/JS + Vite to Next.js 15 (App Router) + Tailwind CSS v4 + Framer Motion + MDX. Goal: premium Apple-quality design that sells QA/Scrum Master skills, showcases technical depth, and demonstrates current React ecosystem fluency.

## Tech Stack

- **Framework:** Next.js 15, App Router, React 19
- **Styling:** Tailwind CSS v4 (CSS-first config)
- **Motion:** Framer Motion (scroll-triggered reveals, page load orchestration)
- **Content:** MDX for Codex blog articles (via `@next/mdx`)
- **Typography:** Geist Sans + Geist Mono via `next/font/google` (Geist is available on Google Fonts and bundled with `create-next-app`)
- **Theme:** `next-themes` with `darkMode: 'class'`
- **Images:** `next/image` with automatic WebP/AVIF optimization
- **Deploy:** Vercel (existing)

## Color Palette

### Active: "Validated" (Palette A)

Ties to QA identity — emerald green signals tests passing, quality validated.

| Token | Hex | Role |
|-------|-----|------|
| `--bg` | `#09090b` | Page background (dark) |
| `--surface` | `#18181b` | Cards, elevated elements |
| `--text-primary` | `#fafafa` | Headings, body text |
| `--text-secondary` | `#a1a1aa` | Subtitles, captions |
| `--accent` | `#10b981` | Primary accent (CTAs, links, progress) |
| `--accent-secondary` | `#6366f1` | Secondary accent (hover states, highlights) |

Light mode:

| Token | Hex |
|-------|-----|
| `--bg` | `#fafafa` |
| `--surface` | `#f4f4f5` |
| `--text-primary` | `#09090b` |
| `--text-secondary` | `#52525b` |
| `--accent` | `#059669` (slightly darker for light bg contrast) |
| `--accent-secondary` | `#4f46e5` |

### Commented Alternative: "Precision" (Palette B)

| Token | Dark | Light |
|-------|------|-------|
| `--bg` | `#0a0a0f` | `#f8fafc` |
| `--surface` | `#131320` | `#f1f5f9` |
| `--text-primary` | `#f8fafc` | `#0a0a0f` |
| `--text-secondary` | `#94a3b8` | `#475569` |
| `--accent` | `#3b82f6` | `#2563eb` |
| `--accent-secondary` | `#8b5cf6` | `#7c3aed` |

### Commented Alternative: "Signal" (Palette C)

| Token | Dark | Light |
|-------|------|-------|
| `--bg` | `#0c0a09` | `#fafaf9` |
| `--surface` | `#1c1917` | `#f5f5f4` |
| `--text-primary` | `#fafaf9` | `#0c0a09` |
| `--text-secondary` | `#a8a29e` | `#57534e` |
| `--accent` | `#f97316` | `#ea580c` |
| `--accent-secondary` | `#06b6d4` | `#0891b2` |

## Typography

- **Display:** Geist Sans, weights 700-800. Used for hero title, section headings.
- **Body:** Geist Sans, weights 400-500. Used for paragraphs, descriptions.
- **Mono:** Geist Mono, weight 400. Used for code snippets in Codex articles, tech stack labels.
- **Scale:** Fluid via `clamp()`:
  - Hero title: `clamp(2.25rem, 5vw, 4.5rem)`
  - Section heading: `clamp(1.5rem, 3vw, 2.25rem)`
  - Body: `clamp(0.875rem, 1.5vw, 1.125rem)`
  - Caption/label: `clamp(0.75rem, 1vw, 0.875rem)`

## Routing

| Route | Type | Content |
|-------|------|---------|
| `/` | Single-page scroll | Hero, About, Featured Project, Projects Grid, Codex Preview, Contact |
| `/codex` | Blog listing | All articles with category tags, dates, read time |
| `/codex/[slug]` | MDX article | Individual Codex article |

Future consideration: `/projects/[slug]` for detailed case study pages. Not in initial scope.

## Page Sections

### 1. Header / Navigation

- Fixed top, transparent bg with backdrop-blur on scroll
- Desktop: horizontal nav links (About, Work, Codex, Contact) + theme toggle + Resume button
- Mobile: hamburger menu opens full-screen overlay nav
- Smooth scroll to anchor sections on home page
- Active section indicator based on scroll position

### 2. Hero

- Full viewport height, centered layout
- Profile photo (circular, `next/image` optimized)
- "Hi, I'm Gavin" subtitle
- Dual title: "QA Engineer" divider "Scrum Master"
- One-liner description (current copy)
- Two CTAs: "Reach Out" (mailto) + "Resume" (PDF download)
- Generous whitespace — let the content breathe
- Load animation: staggered fade-up (photo > subtitle > titles > description > CTAs, 100ms delays)

### 3. About

- Desktop: two-column layout. Bio text left (60%), skills right (40%)
- Bio: current copy, 3 paragraphs
- Skills: organized in categories displayed as pill/chip grid layout instead of bullet lists
  - Categories: Testing, Leadership, Tools
  - Each skill is a rounded pill with subtle border
- Horizontal rule separator between bio and skills on mobile (stacks vertically)

### 4. Featured Project

- Full-width section with immersive card treatment
- Large title: "Visual Test Validator"
- External link icon
- Description paragraph (current hackathon copy)
- Info grid: Tech Stack (pills), Project Type, Timeline
- Image gallery: 4 screenshots in responsive grid (2x2 on desktop, stacked on mobile)
- All images via `next/image` with lazy loading, WebP/AVIF

### 5. Projects Grid

- Section title: "Projects"
- 2-column card grid on desktop, single column on mobile
- Each card:
  - Project screenshot (aspect-ratio constrained)
  - Project title
  - One-liner description
  - Tech stack tags
  - External link button (where available)
- Cards: surface background, subtle border, hover lift (4px translateY + shadow)
- Projects: Cryptobot, Eva Hoopes Real Estate, Game Store, Echoes of An Abyss

### 6. Codex Preview

- Section title: "From the Codex"
- Latest 3 articles as horizontal cards
- Each card: category tag, article title, estimated read time
- "View all articles" link to `/codex`

### 7. Contact

- Section title: "Get In Contact"
- Description paragraph (current copy)
- "Reach Out" CTA button (mailto)
- Email displayed as text below
- Resume download link

### 8. Footer

- Minimal: "~ Gavin Benson ~" centered
- Small text, muted color

## Signature Element: Scroll Progress Bar

Thin progress bar fixed to top of viewport. Fills with emerald accent color as user scrolls down the page. Styled to evoke a test suite progress indicator.

Implementation:
- Track scroll position via `useScroll()` from Framer Motion
- Width transitions from 0% to 100% based on scroll progress
- Emerald green fill (`--accent`)
- 3px height, z-index above header
- `prefers-reduced-motion`: static, no animation

## Motion Design

| Element | Animation | Trigger |
|---------|-----------|---------|
| Hero elements | Staggered fade-up (opacity 0>1, y 20>0) | Page load, 100ms stagger |
| Section headings | Fade-up | `whileInView`, once |
| Project cards | Fade-up with stagger | `whileInView`, once |
| Card hover | translateY(-4px) + shadow | CSS hover |
| Theme toggle | Color transition on custom properties | Toggle click |
| Scroll progress | Width 0>100% | Scroll position |
| Mobile nav | Slide-in overlay | Menu button click |

All motion respects `prefers-reduced-motion: reduce` — animations disabled, elements render in final state.

## Accessibility

- Semantic HTML5 throughout
- ARIA labels on interactive elements (nav, buttons, links)
- Visible keyboard focus states (outline with accent color offset)
- Skip-to-content link
- Color contrast: WCAG AA minimum on all text
- `alt` text on all images
- Reduced motion support

## Image Optimization

- All images served via `next/image`
- Automatic WebP/AVIF conversion
- Responsive `sizes` attribute for proper srcset
- Lazy loading on below-fold images
- Hero photo: priority loading
- Current PNGs migrated as-is; Next.js handles format optimization at build/serve time

## File Structure

```
src/
  app/
    layout.tsx              Root layout, fonts, theme provider, header, footer
    page.tsx                Home page (all scroll sections)
    globals.css             Tailwind v4 base + custom properties + theme tokens
    codex/
      page.tsx              Blog listing
      [slug]/
        page.tsx            Individual MDX article
  components/
    Header.tsx              Fixed nav with scroll blur
    MobileNav.tsx           Full-screen mobile menu overlay
    Hero.tsx                Hero section
    About.tsx               About + skills pills
    FeaturedProject.tsx     Immersive featured project card
    ProjectsGrid.tsx        Projects section with card grid
    ProjectCard.tsx         Individual project card
    CodexPreview.tsx        Latest 3 articles preview
    Contact.tsx             Contact section
    Footer.tsx              Minimal footer
    ScrollProgress.tsx      Test-runner-style progress bar
    ThemeToggle.tsx         Dark/light mode toggle
    SectionReveal.tsx       Reusable scroll-triggered reveal wrapper
  content/
    codex/
      qa-fundamentals-1.mdx
      qa-fundamentals-2.mdx
      qa-fundamentals-3.mdx
  lib/
    theme.ts                All three palettes (A active, B/C commented)
    fonts.ts                Geist font configuration
    metadata.ts             SEO metadata config
```

## Dark Mode Implementation

- `next-themes` ThemeProvider wraps app in root layout
- Tailwind `darkMode: 'class'` strategy
- Theme tokens defined as CSS custom properties
- Toggle persists preference to localStorage
- Respects system preference on first visit
- All three palettes defined in `lib/theme.ts` — Palette A active, B and C commented with swap instructions

## SEO

- Next.js Metadata API for title, description, keywords, Open Graph
- Structured data (JSON-LD) for Person schema
- Sitemap generation via `next-sitemap` or built-in
- Proper `<title>` and `<meta>` on every route

## Deployment

- Vercel (existing deployment target)
- `next.config.ts` with image optimization config
- Environment: production builds with static generation where possible
- Codex pages: static generation at build time from MDX files

## What Gets Removed

- Popup announcement overlay (aggressive UX pattern)
- Inline `<script>` blocks (moved to React components)
- Manual lazy loading JS (replaced by `next/image`)
- External font CDN requests (replaced by `next/font/local`)
- BEM CSS architecture (replaced by Tailwind utility classes)
- Vite build config (replaced by Next.js)
