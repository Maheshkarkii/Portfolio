import { useState } from 'react'
import './ShareButton.css'

function ShareButton() {
    const [showToast, setShowToast] = useState(false)
    const [toastMsg, setToastMsg] = useState('')

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        setToastMsg('Link copied to clipboard!')
        setShowToast(true)
        setTimeout(() => setShowToast(false), 2500)
    }

    const shareTwitter = () => {
        const text = encodeURIComponent('Check out this amazing AI & Data Science portfolio by Mahesh Karki!')
        const url = encodeURIComponent(window.location.href)
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
    }

    const shareLinkedIn = () => {
        const url = encodeURIComponent(window.location.href)
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
    }

    const [open, setOpen] = useState(false)

    return (
        <>
            <div className={`share-button ${open ? 'share-button--open' : ''}`}>
                <button
                    className="share-button__toggle"
                    onClick={() => setOpen(!open)}
                    aria-label="Share"
                    data-cursor="hover"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                </button>

                {open && (
                    <div className="share-button__menu">
                        <button onClick={copyLink} className="share-button__option">
                            🔗 Copy Link
                        </button>
                        <button onClick={shareTwitter} className="share-button__option">
                            🐦 Twitter
                        </button>
                        <button onClick={shareLinkedIn} className="share-button__option">
                            💼 LinkedIn
                        </button>
                    </div>
                )}
            </div>

            {showToast && (
                <div className="share-toast">
                    ✓ {toastMsg}
                </div>
            )}
        </>
    )
}

export default ShareButton
