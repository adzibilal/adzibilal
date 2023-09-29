'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import SunIcon from './icons/SunIcon'
import MoonIcon from './icons/MoonIcon'

const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div
            role='button'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </div>
    )
}

export default ThemeToggle
