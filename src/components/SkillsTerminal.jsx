import { useEffect, useRef, useState } from 'react'
import './SkillsTerminal.css'

const skillCategories = [
    {
        category: 'Languages',
        icon: '⟩',
        skills: ['Python', 'SQL', 'JavaScript', 'R', 'C++'],
    },
    {
        category: 'ML / DL Frameworks',
        icon: '⟩',
        skills: ['TensorFlow', 'PyTorch', 'Keras', 'scikit-learn', 'XGBoost'],
    },
    {
        category: 'Data & Analytics',
        icon: '⟩',
        skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Power BI'],
    },
    {
        category: 'Tools & Platforms',
        icon: '⟩',
        skills: ['Git', 'Docker', 'Jupyter', 'Streamlit', 'FastAPI'],
    },
]

function SkillsTerminal() {
    const sectionRef = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true)
            },
            { threshold: 0.2 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section className="skills-terminal" ref={sectionRef} id="02">
            <div className="skills-terminal__header">
                <span className="skills-terminal__number">02 —</span>
                <h2 className="skills-terminal__heading">Toolkit</h2>
            </div>

            <div className="skills-terminal__window">
                {/* Terminal chrome */}
                <div className="skills-terminal__titlebar">
                    <div className="skills-terminal__dots">
                        <span className="skills-terminal__dot skills-terminal__dot--red" />
                        <span className="skills-terminal__dot skills-terminal__dot--yellow" />
                        <span className="skills-terminal__dot skills-terminal__dot--green" />
                    </div>
                    <span className="skills-terminal__title">mahesh@portfolio ~ /skills</span>
                </div>

                {/* Terminal body */}
                <div className="skills-terminal__body">
                    <div className="skills-terminal__line skills-terminal__line--comment">
                        # Proficiency in data science & machine learning stack
                    </div>

                    {skillCategories.map((cat, catIdx) => (
                        <div
                            key={cat.category}
                            className={`skills-terminal__category ${visible ? 'skills-terminal__category--visible' : ''}`}
                            style={{ animationDelay: `${catIdx * 0.2 + 0.3}s` }}
                        >
                            <div className="skills-terminal__line skills-terminal__line--prompt">
                                <span className="skills-terminal__prompt">$</span>
                                <span className="skills-terminal__cmd">list</span>
                                <span className="skills-terminal__arg">--{cat.category.toLowerCase().replace(/ \/ /g, '-').replace(/ & /g, '-').replace(/ /g, '-')}</span>
                            </div>
                            <div className="skills-terminal__output">
                                {cat.skills.map((skill, i) => (
                                    <span
                                        key={skill}
                                        className={`skills-terminal__skill ${visible ? 'skills-terminal__skill--visible' : ''}`}
                                        style={{ animationDelay: `${catIdx * 0.2 + i * 0.08 + 0.5}s` }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div
                        className={`skills-terminal__line skills-terminal__line--cursor ${visible ? 'skills-terminal__line--cursor-visible' : ''}`}
                        style={{ animationDelay: '1.6s' }}
                    >
                        <span className="skills-terminal__prompt">$</span>
                        <span className="skills-terminal__blink">█</span>
                    </div>
                </div>
            </div>

            {/* Scanline overlay */}
            <div className="skills-terminal__scanlines" />
        </section>
    )
}

export default SkillsTerminal
