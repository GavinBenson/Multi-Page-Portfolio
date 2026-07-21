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
          <a
            href="/Benson_Gavin_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)' }}
            className="text-sm font-medium hover:underline"
          >
            Download Resume
          </a>
        </div>
      </SectionReveal>
    </section>
  )
}
