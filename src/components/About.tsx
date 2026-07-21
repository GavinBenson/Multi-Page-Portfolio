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
