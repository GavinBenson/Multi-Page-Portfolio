'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState, useCallback } from 'react'

function getTimeBasedTheme(): 'light' | 'dark' {
  const hour = new Date().getHours()
  return hour >= 7 && hour < 19 ? 'light' : 'dark'
}

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [autoResolved, setAutoResolved] = useState<'light' | 'dark'>('light')

  const updateAutoTheme = useCallback(() => {
    const resolved = getTimeBasedTheme()
    setAutoResolved(resolved)
    if (theme === 'auto') {
      document.documentElement.classList.remove('light', 'dark')
      if (resolved === 'light') {
        document.documentElement.classList.add('light')
      }
    }
  }, [theme])

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    updateAutoTheme()
    if (theme !== 'auto') return
    const interval = setInterval(updateAutoTheme, 60_000)
    return () => clearInterval(interval)
  }, [theme, updateAutoTheme])

  if (!mounted) {
    return <div className={`w-4 h-4 ${className}`} />
  }

  const isDark = theme === 'auto' ? autoResolved === 'dark' : theme === 'dark'

  function cycleTheme() {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('auto')
    else setTheme('light')
  }

  const label = theme === 'auto'
    ? `Auto mode (${autoResolved})`
    : theme === 'dark' ? 'Dark mode' : 'Light mode'

  return (
    <button
      onClick={cycleTheme}
      className={`w-4 h-4 cursor-pointer transition-colors duration-200 leading-none p-0 translate-y-1 ${className}`}
      style={{ color: 'var(--text-secondary)' }}
      aria-label={label}
      title={label}
    >
      {theme === 'auto' ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" />
        </svg>
      ) : isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
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
      )}
    </button>
  )
}
