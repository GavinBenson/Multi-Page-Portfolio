'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const fadeUp: Variants = {
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
            className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-tighter leading-none flex flex-col items-center gap-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span>QA Engineer</span>
            <hr
              className="w-3/4 border-none h-0.5"
              style={{ backgroundColor: 'var(--accent-secondary)' }}
            />
            <span>Scrum Master</span>
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
