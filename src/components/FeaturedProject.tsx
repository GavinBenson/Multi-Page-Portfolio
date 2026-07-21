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
