import { useEffect, useState } from 'react'
import './Footer.css'

function Footer() {
    const [localTime, setLocalTime] = useState('')

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const ktmTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }))
            setLocalTime(ktmTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
        }
        updateTime()
        const timer = setInterval(updateTime, 60000)
        return () => clearInterval(timer)
    }, [])

    return (
        <footer className="footer" id="contact">
            {/* ─── CTA Bar ─── */}
            <div className="footer__cta">
                <div className="footer__cta-inner">
                    <div className="footer__cta-text">
                        <h3 className="footer__cta-heading">Interested in working together?</h3>
                        <p className="footer__cta-sub">Let's create something remarkable.</p>
                    </div>
                    <div className="footer__cta-actions">
                        <a href="mailto:karkimahesh305@gmail.com" className="footer__btn footer__btn--primary">
                            Let's Talk
                            <span className="footer__btn-arrow">→</span>
                        </a>
                        <a href="#" className="footer__btn footer__btn--secondary">
                            Download CV
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* ─── Bottom Bar ─── */}
            <div className="footer__bottom">
                <div className="footer__bottom-inner">
                    <span className="footer__copy">© 2026 Mahesh Karki</span>

                    <div className="footer__location">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>Kathmandu, Nepal</span>
                        <span className="footer__location-sep">·</span>
                        <span className="footer__location-time">{localTime}</span>
                    </div>

                    <div className="footer__socials">
                        <a href="https://www.linkedin.com/in/mahesh-karki-078a08236/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="LinkedIn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <a href="https://github.com/Maheshkarkii" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="GitHub">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

