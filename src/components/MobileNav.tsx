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
