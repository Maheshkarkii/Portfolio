import './TechMarquee.css'

const techs = [
    'Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Pandas', 'NumPy',
    'SQL', 'Power BI', 'OpenCV', 'Keras', 'Matplotlib', 'Streamlit',
    'Deep Learning', 'NLP', 'Computer Vision', 'Data Analysis',
    'Git', 'JavaScript', 'React', 'REST APIs'
]

function TechMarquee() {
    // Double the items for seamless loop
    const items = [...techs, ...techs]

    return (
        <div className="marquee" aria-hidden="true">
            <div className="marquee__track">
                {items.map((tech, i) => (
                    <span key={i} className="marquee__item">
                        <span className="marquee__dot" />
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default TechMarquee
