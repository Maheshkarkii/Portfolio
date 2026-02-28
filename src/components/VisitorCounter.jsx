import { useEffect, useState } from 'react'
import './VisitorCounter.css'

function VisitorCounter() {
    const [count, setCount] = useState(null)
    const [prevCount, setPrevCount] = useState(0)

    useEffect(() => {
        // CountAPI free service
        fetch('https://api.countapi.xyz/hit/mahesh-portfolio/visits')
            .then((res) => res.json())
            .then((data) => {
                setPrevCount(data.value - 1 || 0)
                setCount(data.value)
            })
            .catch(() => {
                // Fallback if API fails
                setCount('∞')
            })
    }, [])

    if (count === null) return null

    return (
        <div className="visitor-counter">
            <span className="visitor-counter__label">You're visitor</span>
            <span className="visitor-counter__number">
                #{typeof count === 'number' ? count.toLocaleString() : count}
            </span>
        </div>
    )
}

export default VisitorCounter
