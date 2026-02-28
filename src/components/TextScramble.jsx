import { useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

/**
 * TextScramble — wrap any text element to get a hacker-style
 * character decode animation when it scrolls into view or on hover.
 */
function TextScramble({ text, as: Tag = 'span', className = '', triggerOnHover = false }) {
    const ref = useRef(null)
    const originalText = useRef(text)
    const animating = useRef(false)

    const scramble = () => {
        if (animating.current) return
        animating.current = true
        const el = ref.current
        if (!el) return
        const target = originalText.current
        const length = target.length
        let iteration = 0

        const interval = setInterval(() => {
            el.textContent = target
                .split('')
                .map((char, i) => {
                    if (char === ' ') return ' '
                    if (i < iteration) return target[i]
                    return CHARS[Math.floor(Math.random() * CHARS.length)]
                })
                .join('')

            iteration += 1 / 2

            if (iteration >= length) {
                el.textContent = target
                clearInterval(interval)
                animating.current = false
            }
        }, 30)
    }

    useEffect(() => {
        if (triggerOnHover) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) scramble()
            },
            { threshold: 0.5 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [triggerOnHover])

    return (
        <Tag
            ref={ref}
            className={`text-scramble ${className}`}
            onMouseEnter={triggerOnHover ? scramble : undefined}
            style={{ fontFamily: 'inherit' }}
        >
            {text}
        </Tag>
    )
}

export default TextScramble
