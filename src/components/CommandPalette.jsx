import { useEffect, useState, useRef, useCallback } from 'react'
import './CommandPalette.css'

const commands = [
    { label: 'Go to Home', section: '#00', icon: '🏠' },
    { label: 'Go to Resume', section: '#01', icon: '📄' },
    { label: 'Go to Projects', section: '#02', icon: '🚀' },
    { label: 'Go to Contact', section: '#contact', icon: '✉️' },
    { label: 'Toggle Dark Mode', action: 'toggle-theme', icon: '🌙' },
    { label: 'Back to Top', action: 'scroll-top', icon: '⬆️' },
    { label: 'Download CV', action: 'download-cv', icon: '📥' },
    { label: 'Open LinkedIn', action: 'open-linkedin', icon: '🔗' },
    { label: 'Open GitHub', action: 'open-github', icon: '💻' },
    { label: 'Play Typing Game', action: 'typing-game', icon: '⌨️' },
    { label: 'ML Knowledge Quiz', action: 'ml-quiz', icon: '🧠' },
    { label: 'Aptitude Test', action: 'aptitude-quiz', icon: '🎯' },
]

function CommandPalette() {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [selectedIdx, setSelectedIdx] = useState(0)
    const inputRef = useRef(null)

    const filtered = commands.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
    )

    // Keyboard shortcut: Ctrl+K
    useEffect(() => {
        const handleKey = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                setOpen((prev) => !prev)
                setQuery('')
                setSelectedIdx(0)
            }
            if (e.key === 'Escape') {
                setOpen(false)
            }
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [])

    // Focus input when opened
    useEffect(() => {
        if (open && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 50)
        }
    }, [open])

    // Reset selection when query changes
    useEffect(() => {
        setSelectedIdx(0)
    }, [query])

    const executeCommand = useCallback((cmd) => {
        setOpen(false)
        setQuery('')

        if (cmd.section) {
            const el = document.querySelector(cmd.section)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
        } else if (cmd.action === 'toggle-theme') {
            const current = document.documentElement.getAttribute('data-theme')
            const next = current === 'dark' ? 'light' : 'dark'
            document.documentElement.setAttribute('data-theme', next)
            localStorage.setItem('theme', next)
        } else if (cmd.action === 'scroll-top') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else if (cmd.action === 'download-cv') {
            // Placeholder — update with real CV link
            window.open('/Mahesh_Karki_CV.pdf', '_blank')
        } else if (cmd.action === 'open-linkedin') {
            window.open('https://www.linkedin.com/in/mahesh-karki-078a08236/', '_blank')
        } else if (cmd.action === 'open-github') {
            window.open('https://github.com/Maheshkarkii', '_blank')
        } else if (cmd.action === 'typing-game') {
            window.dispatchEvent(new CustomEvent('open-typing-game'))
        } else if (cmd.action === 'ml-quiz') {
            window.dispatchEvent(new CustomEvent('open-ml-quiz'))
        } else if (cmd.action === 'aptitude-quiz') {
            window.dispatchEvent(new CustomEvent('open-aptitude-quiz'))
        }
    }, [])

    const handleKey = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIdx((i) => Math.min(i + 1, filtered.length - 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIdx((i) => Math.max(i - 1, 0))
        } else if (e.key === 'Enter' && filtered[selectedIdx]) {
            executeCommand(filtered[selectedIdx])
        }
    }

    if (!open) return null

    return (
        <div className="cmd-palette" onClick={() => setOpen(false)}>
            <div className="cmd-palette__modal" onClick={(e) => e.stopPropagation()}>
                <div className="cmd-palette__search-wrap">
                    <svg className="cmd-palette__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        ref={inputRef}
                        className="cmd-palette__input"
                        type="text"
                        placeholder="Type a command…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKey}
                    />
                    <kbd className="cmd-palette__kbd">ESC</kbd>
                </div>

                <div className="cmd-palette__list">
                    {filtered.length === 0 && (
                        <div className="cmd-palette__empty">No results found</div>
                    )}
                    {filtered.map((cmd, i) => (
                        <button
                            key={cmd.label}
                            className={`cmd-palette__item ${i === selectedIdx ? 'cmd-palette__item--active' : ''}`}
                            onClick={() => executeCommand(cmd)}
                            onMouseEnter={() => setSelectedIdx(i)}
                        >
                            <span className="cmd-palette__item-icon">{cmd.icon}</span>
                            <span className="cmd-palette__item-label">{cmd.label}</span>
                        </button>
                    ))}
                </div>

                <div className="cmd-palette__footer">
                    <span><kbd>↑↓</kbd> Navigate</span>
                    <span><kbd>↵</kbd> Select</span>
                    <span><kbd>Esc</kbd> Close</span>
                </div>
            </div>
        </div>
    )
}

export default CommandPalette
