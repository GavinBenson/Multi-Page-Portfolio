'use client'

import { useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import { navLinks } from '@/lib/navigation'

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
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${
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
        <a
          href="https://github.com/GavinBenson"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="flex items-center transition-colors duration-200"
          style={{ color: 'var(--text-primary)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
          </svg>
        </a>
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
