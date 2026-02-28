import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

function CustomCursor() {
    const cursorRef = useRef(null)
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    useEffect(() => {
        const cursor = cursorRef.current
        if (!cursor) return

        let mouseX = 0, mouseY = 0
        let cursorX = 0, cursorY = 0

        const onMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        const onMouseDown = () => setIsClicking(true)
        const onMouseUp = () => setIsClicking(false)

        const animate = () => {
            // Smooth follow with slight delay for retro feel
            cursorX += (mouseX - cursorX) * 0.2
            cursorY += (mouseY - cursorY) * 0.2

            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`
            requestAnimationFrame(animate)
        }

        const onMouseEnterInteractive = () => setIsHovering(true)
        const onMouseLeaveInteractive = () => setIsHovering(false)

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mousedown', onMouseDown)
        document.addEventListener('mouseup', onMouseUp)

        const interactiveEls = document.querySelectorAll('a, button, .projects__card, .toggle, [data-cursor="hover"]')
        interactiveEls.forEach((el) => {
            el.addEventListener('mouseenter', onMouseEnterInteractive)
            el.addEventListener('mouseleave', onMouseLeaveInteractive)
        })

        // Re-observe logic
        const observer = new MutationObserver(() => {
            const els = document.querySelectorAll('a, button, .projects__card, .toggle, [data-cursor="hover"]')
            els.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnterInteractive)
                el.removeEventListener('mouseleave', onMouseLeaveInteractive)
                el.addEventListener('mouseenter', onMouseEnterInteractive)
                el.addEventListener('mouseleave', onMouseLeaveInteractive)
            })
        })
        observer.observe(document.body, { childList: true, subtree: true })

        requestAnimationFrame(animate)

        return () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mousedown', onMouseDown)
            document.removeEventListener('mouseup', onMouseUp)
            observer.disconnect()
        }
    }, [])

    return (
        <div
            className={`retro-cursor ${isHovering ? 'retro-cursor--hover' : ''} ${isClicking ? 'retro-cursor--click' : ''}`}
            ref={cursorRef}
        >
            <div className="retro-cursor__icon">
                {isHovering ? (
                    // Pixel Hand Icon
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="pixel-svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9 2H11V4H13V6H13V10H15V6H17V12H19V8H21V16H19V18H17V20H15V22H9V20H7V14H5V8H7V6H9V2ZM9 6H7V8H9V6ZM11 12H9V14H11V12ZM11 10H13V12H11V10ZM15 12H13V16H15V12ZM17 16H15V18H17V16Z" fill="var(--color-text)" />
                    </svg>
                ) : (
                    // Pixel Arrow Icon
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="pixel-svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2 2H4V4H6V6H8V8H10V10H12V12H14V14H10V16H8V18H6V20H4V14H2V2ZM6 6H4V8H6V6ZM8 8H6V10H8V8ZM10 10H8V12H10V10ZM6 12H4V14H6V12Z" fill="var(--color-text)" />
                    </svg>
                )}
            </div>
        </div>
    )
}

export default CustomCursor
