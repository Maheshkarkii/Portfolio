import { useEffect, useRef, useState } from 'react'
import './MatrixRain.css'

const CHARS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜ01'

function MatrixRain() {
    const canvasRef = useRef(null)
    const [enabled, setEnabled] = useState(false)

    useEffect(() => {
        if (!enabled) return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const fontSize = 14
        const columns = Math.floor(canvas.width / fontSize)
        const drops = Array(columns).fill(1)

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
        const color = isDark ? 'rgba(0, 255, 70, 0.8)' : 'rgba(0, 180, 50, 0.6)'

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.fillStyle = color
            ctx.font = `${fontSize}px monospace`

            for (let i = 0; i < drops.length; i++) {
                const text = CHARS[Math.floor(Math.random() * CHARS.length)]
                const x = i * fontSize
                const y = drops[i] * fontSize

                ctx.fillText(text, x, y)

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0
                }
                drops[i]++
            }
        }

        const interval = setInterval(draw, 50)

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        window.addEventListener('resize', handleResize)

        return () => {
            clearInterval(interval)
            window.removeEventListener('resize', handleResize)
        }
    }, [enabled])

    return (
        <>
            <button
                className={`matrix-toggle ${enabled ? 'matrix-toggle--active' : ''}`}
                onClick={() => setEnabled(!enabled)}
                aria-label="Toggle Matrix Rain"
                data-cursor="hover"
            >
                <span className="matrix-toggle__icon">⚡</span>
                <span className="matrix-toggle__label">Matrix</span>
            </button>

            {enabled && (
                <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />
            )}
        </>
    )
}

export default MatrixRain
