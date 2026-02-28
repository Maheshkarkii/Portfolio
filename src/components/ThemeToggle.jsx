import { useEffect, useState } from 'react'
import './ThemeToggle.css'

function ThemeToggle() {
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        // Default to dark mode if no saved preference or explicitly saved as dark
        const saved = localStorage.getItem('theme')
        if (!saved || saved === 'dark') {
            setIsDark(true)
            document.documentElement.setAttribute('data-theme', 'dark')
        } else {
            setIsDark(false)
            document.documentElement.setAttribute('data-theme', 'light')
        }
    }, [])

    const toggle = () => {
        const next = !isDark
        setIsDark(next)
        document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
        localStorage.setItem('theme', next ? 'dark' : 'light')
    }

    return (
        <button
            className="theme-toggle"
            onClick={toggle}
            data-cursor="hover"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <div className={`theme-toggle__icon ${isDark ? 'theme-toggle__icon--dark' : ''}`}>
                {/* Sun */}
                <svg className="theme-toggle__sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                {/* Moon */}
                <svg className="theme-toggle__moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            </div>
        </button>
    )
}

export default ThemeToggle
