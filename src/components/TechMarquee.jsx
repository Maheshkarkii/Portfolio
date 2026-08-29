import './TechMarquee.css'

const techs = [
    'Python', 'PyTorch', 'LangChain', 'LangGraph', 'Hugging Face', 'RAG & Vector DBs',
    'scikit-learn', 'Pandas', 'NumPy', 'SQL', 'Power BI', 'OpenCV',
    'Deep Learning', 'NLP', 'Computer Vision', 'Data Integration',
    'Git', 'FastAPI', 'Streamlit'
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
