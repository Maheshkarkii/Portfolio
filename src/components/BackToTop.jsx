import { useEffect, useState } from 'react'
import './BackToTop.css'

function BackToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <button
            className={`back-to-top ${visible ? 'back-to-top--visible' : ''}`}
            onClick={scrollToTop}
            data-cursor="hover"
            aria-label="Back to top"
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="18 15 12 9 6 15" />
            </svg>
        </button>
    )
}

export default BackToTop
