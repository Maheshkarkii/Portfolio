import { useState, useEffect } from 'react'
import './SideNav.css'

function SideNav() {
    const [activeSection, setActiveSection] = useState('hero')

    useEffect(() => {
        const sections = document.querySelectorAll('section[id]')
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.3 }
        )

        sections.forEach((section) => observer.observe(section))
        return () => observer.disconnect()
    }, [])

    const navItems = [
        { id: 'hero', label: 'INTRO' },
        { id: '01', label: '01' },
        { id: '02', label: '02' },
    ]

    const handleClick = (e, id) => {
        e.preventDefault()
        const el = document.getElementById(id)
        el?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <nav className="sidenav" aria-label="Section navigation">
            <div className="sidenav__track">
                {navItems.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => handleClick(e, item.id)}
                        className={`sidenav__item ${activeSection === item.id ? 'sidenav__item--active' : ''}`}
                    >
                        <span className="sidenav__label">{item.label}</span>
                        {activeSection === item.id && <span className="sidenav__dot" />}
                    </a>
                ))}
                <div className="sidenav__line" />
            </div>
        </nav>
    )
}

export default SideNav
