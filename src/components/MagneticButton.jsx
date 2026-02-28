import { useEffect, useRef } from 'react'

/**
 * MagneticButton — Wraps children in a container that
 * pulls toward the cursor when nearby, creating a "magnetic" feel.
 */
function MagneticButton({ children, strength = 0.3, className = '' }) {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const handleMouseMove = (e) => {
            const rect = el.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const distX = e.clientX - centerX
            const distY = e.clientY - centerY
            const distance = Math.sqrt(distX * distX + distY * distY)
            const maxDist = 120

            if (distance < maxDist) {
                const pull = (1 - distance / maxDist) * strength
                el.style.transform = `translate(${distX * pull}px, ${distY * pull}px)`
            } else {
                el.style.transform = 'translate(0, 0)'
            }
        }

        const handleMouseLeave = () => {
            el.style.transform = 'translate(0, 0)'
        }

        document.addEventListener('mousemove', handleMouseMove)
        el.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            el.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [strength])

    return (
        <span ref={ref} className={`magnetic ${className}`} style={{ display: 'inline-block', transition: 'transform 0.25s var(--ease-out-expo)' }}>
            {children}
        </span>
    )
}

export default MagneticButton
