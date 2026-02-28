import { useEffect, useState } from 'react'
import './ScrollProgress.css'

function ScrollProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const winH = document.documentElement.scrollHeight - window.innerHeight
            const scrolled = winH > 0 ? (window.scrollY / winH) * 100 : 0
            setProgress(scrolled)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="scroll-progress" aria-hidden="true">
            <div className="scroll-progress__bar" style={{ width: `${progress}%` }} />
        </div>
    )
}

export default ScrollProgress
