'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const themes = ['system', 'light', 'dark']

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Determine next theme
  const getNextTheme = () => {
    const currentIndex = themes.indexOf(theme || 'system')
    return themes[(currentIndex + 1) % themes.length]
  }

  // Cycle theme
  const cycleTheme = () => {
    setTheme(getNextTheme())
  }

  // Icon for next theme
  const getNextThemeIcon = () => {
    switch (getNextTheme()) {
      case 'dark':
        return <MoonIcon className="w-5 h-5" />
      case 'light':
        return <SunIcon className="w-5 h-5" />
      default:
        return <ComputerDesktopIcon className="w-5 h-5" />
    }
  }

  return (
    <button
      onClick={cycleTheme}
      className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-sm"
    >
      {getNextThemeIcon()}
      <span className="ml-2 capitalize">{getNextTheme()}</span>
    </button>
  )
}

export default ThemeSwitch
