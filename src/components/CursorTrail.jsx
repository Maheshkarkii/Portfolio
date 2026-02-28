import { useEffect, useRef } from 'react'
import './CursorTrail.css'

/**
 * CursorTrail — spawns glowing dots behind the cursor that
 * fade out and shrink, creating a comet-tail effect.
 */
function CursorTrail() {
    const containerRef = useRef(null)
    const poolRef = useRef([])
    const idxRef = useRef(0)
    const POOL_SIZE = 20

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // Pre-create dot elements for performance
        for (let i = 0; i < POOL_SIZE; i++) {
            const dot = document.createElement('div')
            dot.className = 'cursor-trail__dot'
            container.appendChild(dot)
            poolRef.current.push(dot)
        }

        let lastX = 0, lastY = 0, frame = 0

        const handleMouseMove = (e) => {
            frame++
            if (frame % 2 !== 0) return // throttle

            const dx = e.clientX - lastX
            const dy = e.clientY - lastY
            const dist = Math.sqrt(dx * dx + dy * dy)
            lastX = e.clientX
            lastY = e.clientY

            if (dist < 4) return // skip tiny movements

            const dot = poolRef.current[idxRef.current % POOL_SIZE]
            idxRef.current++

            const size = Math.min(8 + dist * 0.3, 16)
            dot.style.left = `${e.clientX}px`
            dot.style.top = `${e.clientY}px`
            dot.style.width = `${size}px`
            dot.style.height = `${size}px`
            dot.style.opacity = '0.6'
            dot.style.transform = 'translate(-50%, -50%) scale(1)'

            // Trigger fade
            requestAnimationFrame(() => {
                dot.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
                dot.style.opacity = '0'
                dot.style.transform = 'translate(-50%, -50%) scale(0)'
                setTimeout(() => {
                    dot.style.transition = 'none'
                }, 800)
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return <div className="cursor-trail" ref={containerRef} aria-hidden="true" />
}

export default CursorTrail
