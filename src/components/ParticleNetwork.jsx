import { useEffect, useRef } from 'react'
import './ParticleNetwork.css'

function ParticleNetwork() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animationId
        let particles = []
        let mouse = { x: null, y: null }

        const resize = () => {
            canvas.width = canvas.parentElement.offsetWidth
            canvas.height = canvas.parentElement.offsetHeight
        }

        const createParticles = () => {
            particles = []
            const count = Math.floor((canvas.width * canvas.height) / 12000)
            for (let i = 0; i < Math.min(count, 80); i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    radius: Math.random() * 1.5 + 0.5,
                })
            }
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Get current theme
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
            const particleColor = isDark ? '255,255,255' : '26,26,26'

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 120) {
                        const alpha = (1 - dist / 120) * 0.15
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(${particleColor}, ${alpha})`
                        ctx.lineWidth = 0.6
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }

                // Mouse connection
                if (mouse.x !== null) {
                    const dx = particles[i].x - mouse.x
                    const dy = particles[i].y - mouse.y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 150) {
                        const alpha = (1 - dist / 150) * 0.3
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(${particleColor}, ${alpha})`
                        ctx.lineWidth = 0.8
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(mouse.x, mouse.y)
                        ctx.stroke()
                    }
                }
            }

            // Draw particles
            particles.forEach((p) => {
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${particleColor}, 0.25)`
                ctx.fill()

                // Move
                p.x += p.vx
                p.y += p.vy

                // Bounce
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1
            })

            animationId = requestAnimationFrame(draw)
        }

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouse.x = e.clientX - rect.left
            mouse.y = e.clientY - rect.top
        }

        const handleMouseLeave = () => {
            mouse.x = null
            mouse.y = null
        }

        resize()
        createParticles()
        draw()

        window.addEventListener('resize', () => {
            resize()
            createParticles()
        })
        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', resize)
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return <canvas className="particle-network" ref={canvasRef} aria-hidden="true" />
}

export default ParticleNetwork
