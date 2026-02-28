import { useEffect, useRef, useState } from 'react'
import './StatsCounter.css'

const stats = [
    { value: 4, suffix: '+', label: 'Projects Built' },
    { value: 6, suffix: '+', label: 'Tech Skills' },
    { value: 3, suffix: '', label: 'Languages Spoken' },
    { value: 2026, suffix: '', label: 'Graduating Year' },
]

function AnimatedNumber({ target, suffix, isVisible }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isVisible) return
        let start = 0
        const duration = 2000
        const increment = target / (duration / 16)
        const timer = setInterval(() => {
            start += increment
            if (start >= target) {
                setCount(target)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)
        return () => clearInterval(timer)
    }, [isVisible, target])

    return (
        <span className="stats__number">
            {count}{suffix}
        </span>
    )
}

function StatsCounter() {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true)
            },
            { threshold: 0.5 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section className="stats" ref={ref}>
            <div className="stats__grid">
                {stats.map((stat, i) => (
                    <div key={i} className={`stats__item ${visible ? 'stats__item--visible' : ''}`} style={{ animationDelay: `${i * 0.15}s` }}>
                        <AnimatedNumber target={stat.value} suffix={stat.suffix} isVisible={visible} />
                        <span className="stats__label">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default StatsCounter
