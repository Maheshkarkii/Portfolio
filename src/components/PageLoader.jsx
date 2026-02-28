import { useEffect, useState } from 'react'
import './PageLoader.css'

function PageLoader() {
    const [visible, setVisible] = useState(true)
    const [exiting, setExiting] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setExiting(true)
            setTimeout(() => setVisible(false), 600)
        }, 1600)
        return () => clearTimeout(timer)
    }, [])

    if (!visible) return null

    return (
        <div className={`loader ${exiting ? 'loader--exit' : ''}`}>
            <div className="loader__content">
                <div className="loader__name">MK</div>
                <div className="loader__bar">
                    <div className="loader__bar-fill" />
                </div>
            </div>
        </div>
    )
}

export default PageLoader
