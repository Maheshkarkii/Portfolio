import { useEffect, useRef } from 'react'
import './MouseSpotlight.css'

/**
 * MouseSpotlight — a radial gradient glow that follows the cursor,
 * visible on in the hero/resume backgrounds.
 */
function MouseSpotlight() {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const handleMouseMove = (e) => {
            el.style.setProperty('--spot-x', `${e.clientX}px`)
            el.style.setProperty('--spot-y', `${e.clientY}px`)
            el.style.opacity = '1'
        }

        const handleMouseLeave = () => {
            el.style.opacity = '0'
        }

        window.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseleave', handleMouseLeave)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return <div className="mouse-spotlight" ref={ref} aria-hidden="true" />
}

export default MouseSpotlight
