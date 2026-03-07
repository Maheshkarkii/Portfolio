import { useState, useEffect } from 'react'
import './TopNav.css'

function TopNav() {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('hero')

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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

    const handleClick = (e, id) => {
        e.preventDefault()
        const el = document.getElementById(id)
        el?.scrollIntoView({ behavior: 'smooth' })
    }

    const navLinks = [
        { id: 'hero', label: 'Home' },
        { id: '01', label: 'Resume' },
        { id: '02', label: 'Toolkit' },
        { id: '03', label: 'Projects' },
        { id: 'contact', label: 'Contact' },
    ]

    return (
        <header className={`topnav ${scrolled ? 'topnav--scrolled' : ''}`}>
            <div className="topnav__inner">
                <a
                    href="#hero"
                    className="topnav__logo"
                    onClick={(e) => handleClick(e, 'hero')}
                >
                    MK<span className="topnav__logo-dot">.</span>
                </a>

                <nav className="topnav__links">
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(e) => handleClick(e, link.id)}
                            className={`topnav__link ${activeSection === link.id ? 'topnav__link--active' : ''}`}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    )
}

export default TopNav
