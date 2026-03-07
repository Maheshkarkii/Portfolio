import { useEffect, useRef, useState } from 'react'
import './Hero.css'

function Hero() {
    const heroRef = useRef(null)
    const [roleIndex, setRoleIndex] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const [typedText, setTypedText] = useState('')
    const [timeGreeting, setTimeGreeting] = useState('')
    const [isNepali, setIsNepali] = useState(false)

    useEffect(() => {
        const hour = new Date().getHours()
        if (hour < 5) setTimeGreeting('Good Evening!')
        else if (hour < 12) setTimeGreeting('Good Morning!')
        else if (hour < 17) setTimeGreeting('Good Afternoon!')
        else setTimeGreeting('Good Evening!')
    }, [])

    // Alternate Hello / नमस्ते every 3 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setIsNepali(prev => !prev)
        }, 3000)
        return () => clearInterval(timer)
    }, [])

    const roles = [
        'AI & Data Science Student',
        'Machine Learning Enthusiast',
        'Data-Driven Problem Solver',
        'Deep Learning Explorer',
    ]

    // Typing animation
    useEffect(() => {
        const currentRole = roles[roleIndex]
        let timeout

        if (!isDeleting && charIndex <= currentRole.length) {
            setTypedText(currentRole.slice(0, charIndex))
            timeout = setTimeout(() => setCharIndex((c) => c + 1), 80)
        } else if (!isDeleting && charIndex > currentRole.length) {
            timeout = setTimeout(() => setIsDeleting(true), 2000)
        } else if (isDeleting && charIndex > 0) {
            setTypedText(currentRole.slice(0, charIndex - 1))
            timeout = setTimeout(() => setCharIndex((c) => c - 1), 40)
        } else if (isDeleting && charIndex === 0) {
            setIsDeleting(false)
            setRoleIndex((r) => (r + 1) % roles.length)
        }

        return () => clearTimeout(timeout)
    }, [charIndex, isDeleting, roleIndex])

    // Scroll entrance observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible')
                })
            },
            { threshold: 0.1 }
        )
        const elements = heroRef.current?.querySelectorAll('.animate-in')
        elements?.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <section className="hero" ref={heroRef} id="hero">
            <div className="hero__content">
                <div className="hero__text">
                    <p className="hero__greeting animate-in">
                        <span className="hero__hello" key={isNepali ? 'np' : 'en'}>
                            {isNepali ? 'नमस्ते' : 'Hello'}
                        </span>
                        <span>, {timeGreeting}</span>
                    </p>
                    <h1 className="hero__heading animate-in">Mahesh Karki</h1>

                    <div className="hero__typed animate-in">
                        <span className="hero__typed-text">{typedText}</span>
                        <span className="hero__typed-cursor">|</span>
                    </div>

                    <div className="hero__bio animate-in">
                        <p>
                            B.Tech student in Artificial Intelligence &amp; Data Science at Kurukshetra University, India.
                            Passionate about machine learning, data science, and building intelligent, data-driven solutions.
                        </p>
                    </div>

                    {/* Pull Quote */}
                    <blockquote className="hero__quote animate-in">
                        "Turning data into decisions, one model at a time."
                    </blockquote>

                    <div className="hero__cta animate-in">
                        <a href="#03" className="hero__btn hero__btn--primary">
                            View Projects
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </a>
                        <a href="#contact" className="hero__btn hero__btn--ghost">
                            Get in Touch
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="hero__scroll-hint animate-in">
                <span>Scroll</span>
                <div className="hero__scroll-line" />
            </div>
        </section>
    )
}

export default Hero
