import { useEffect, useState } from 'react'
import './SoundEffects.css'

/**
 * Hover sound effects using Web Audio API
 * Generates simple tones for button hovers and clicks
 */
function SoundEffects() {
    const [enabled, setEnabled] = useState(true)
    const [audioContext, setAudioContext] = useState(null)

    useEffect(() => {
        if (typeof AudioContext !== 'undefined') {
            setAudioContext(new (window.AudioContext || window.webkitAudioContext)())
        }
    }, [])

    const playTone = (freq, duration) => {
        if (!enabled || !audioContext) return
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = freq
        oscillator.type = 'sine'
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration)
    }

    useEffect(() => {
        const handleHover = (e) => {
            const target = e.target.closest('[data-cursor="hover"], button, a')
            if (target) playTone(440, 0.08)
        }

        const handleClick = (e) => {
            const target = e.target.closest('button, a')
            if (target) playTone(880, 0.05)
        }

        document.addEventListener('mouseenter', handleHover, true)
        document.addEventListener('click', handleClick, true)

        return () => {
            document.removeEventListener('mouseenter', handleHover, true)
            document.removeEventListener('click', handleClick, true)
        }
    }, [enabled, audioContext])

    return (
        <button
            className={`sound-toggle ${enabled ? 'sound-toggle--on' : 'sound-toggle--off'}`}
            onClick={() => setEnabled(!enabled)}
            aria-label="Toggle sound effects"
        >
            <span className="sound-toggle__icon">{enabled ? '🔊' : '🔇'}</span>
        </button>
    )
}

export default SoundEffects
