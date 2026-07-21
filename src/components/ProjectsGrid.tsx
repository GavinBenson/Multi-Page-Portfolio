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
