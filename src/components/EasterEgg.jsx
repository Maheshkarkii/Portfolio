import { useEffect, useState } from 'react'
import './EasterEgg.css'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

function EasterEgg() {
    const [triggered, setTriggered] = useState(false)
    const [seq, setSeq] = useState([])

    useEffect(() => {
        const handleKey = (e) => {
            setSeq((prev) => {
                const next = [...prev, e.key].slice(-KONAMI.length)
                if (next.length === KONAMI.length && next.every((k, i) => k === KONAMI[i])) {
                    setTriggered(true)
                    setTimeout(() => setTriggered(false), 4000)
                    return []
                }
                return next
            })
        }

        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [])

    if (!triggered) return null

    // Generate confetti particles
    const confetti = Array.from({ length: 50 }, (_, i) => {
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA', '#A8E6CF']
        return {
            id: i,
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 0.8}s`,
            duration: `${1.5 + Math.random() * 2}s`,
            color: colors[i % colors.length],
            size: `${6 + Math.random() * 6}px`,
            rotation: `${Math.random() * 360}deg`,
        }
    })

    return (
        <div className="easter-egg" aria-hidden="true">
            <div className="easter-egg__message">
                🎉 You found the secret! 🎮
                <br />
                <small>— Mahesh appreciates the curiosity —</small>
            </div>
            {confetti.map((c) => (
                <div
                    key={c.id}
                    className="easter-egg__confetti"
                    style={{
                        left: c.left,
                        animationDelay: c.delay,
                        animationDuration: c.duration,
                        backgroundColor: c.color,
                        width: c.size,
                        height: c.size,
                        '--rotation': c.rotation,
                    }}
                />
            ))}
        </div>
    )
}

export default EasterEgg
