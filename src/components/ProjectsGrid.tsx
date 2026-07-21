'use client'

import SectionReveal from './SectionReveal'
import ProjectCard from './ProjectCard'

const projects = [
  {
    title: 'QA TestGen',
    description:
      'AI-powered test case generator. Paste a user story or feature description and get structured manual test cases with pre/post-conditions instantly.',
    image: '/img/qa-testgen.png',
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'Claude API'],
    url: 'https://qa-testgen.vercel.app',
  },
  {
    title: 'LeafScore',
    description:
      'Full-stack plant health scoring app with authentication, Stripe payments, and image uploads via Vercel Blob.',
    image: '/img/leafscore.png',
    techStack: ['Next.js', 'Drizzle', 'Neon', 'Stripe', 'NextAuth', 'Vitest'],
    url: 'https://github.com/GavinBenson/leafscore',
  },
  {
    title: 'Forge',
    description:
      'A 3D workout tracker with drag-and-drop workout builder, Three.js visualizations, and end-to-end Playwright tests.',
    image: '/img/workout-app.png',
    techStack: ['Next.js', 'Three.js', 'Drizzle', 'Playwright', 'Motion'],
    url: 'https://workout-app-xi-jet.vercel.app',
  },
  {
    title: 'Tally',
    description:
      'Local-first budgeting app with CSV import, spending insights, and interactive charts. All data stays in-browser via IndexedDB.',
    image: '/img/budget-app.png',
    techStack: ['Next.js', 'Dexie', 'Recharts', 'dnd-kit'],
    url: 'https://budget-app-seven-orpin-90.vercel.app',
  },
  {
    title: 'Cryptobot',
    description:
      'A hybrid automation/data-analysis tool for scraping, visualizing, and analyzing cryptocurrency price data.',
    image: '/img/cryptobot5.PNG',
    techStack: ['Selenium', 'Pandas', 'Plotly', 'SQLite3', 'Python'],
    url: 'https://github.com/GavinBenson/cryptobot',
  },
  {
    title: 'Eva Hoopes Real Estate',
    description:
      'A fully responsive, interactive real estate website built for a local agent.',
    image: '/img/1.png',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://www.evahoopes.com/',
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
