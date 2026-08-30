import { useEffect, useRef } from 'react'
import './Resume.css'

function Resume() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.15 }
        )

        const elements = sectionRef.current?.querySelectorAll('.animate-in')
        elements?.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <section className="resume" ref={sectionRef} id="01">
            {/* Header */}
            <div className="resume__header animate-in">
                <span className="resume__watermark">Resume.</span>
                <h2 className="resume__heading"><span className="resume__number">01 —</span> Resume</h2>
            </div>

            <div className="resume__content">
                {/* ─── Left Column ─── */}
                <div className="resume__left">
                    {/* Education */}
                    <div className="resume__section animate-in">
                        <h3 className="resume__section-title">Education</h3>

                        <div className="resume__edu-item">
                            <div className="resume__edu-marker" />
                            <div className="resume__edu-details">
                                <h4 className="resume__edu-name">Kurukshetra University</h4>
                                <span className="resume__edu-year">2022 – 2026</span>
                                <p className="resume__edu-desc">B.Tech in Artificial Intelligence &amp; Data Science</p>
                            </div>
                        </div>

                        <div className="resume__edu-item">
                            <div className="resume__edu-marker" />
                            <div className="resume__edu-details">
                                <h4 className="resume__edu-name">Higher Secondary Education</h4>
                                <span className="resume__edu-year">2020 – 2022</span>
                                <p className="resume__edu-desc">Science Stream (PCM + Computer Science)</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* ─── Right Column ─── */}
                <div className="resume__right">
                    <div className="resume__section animate-in">
                        <h3 className="resume__section-title resume__section-title--exp">Experience &amp; Projects</h3>

                        <div className="resume__exp-list">
                            {[
                                { company: 'INTELLIML', role: 'Major Project — Engineering', period: '2026', desc: 'Built IntelliML — an automated machine learning pipeline with a FastAPI backend and Node.js frontend that streamlines the entire data science workflow from data preprocessing and feature engineering to model selection, training, and evaluation.' },
                                { company: 'AI RESEARCH ASSISTANT', role: 'Nexus AI (RAG)', period: '2025', desc: 'Developed Nexus AI — an intelligent AI research assistant leveraging Retrieval-Augmented Generation (RAG) and LLMs for document search and context-aware Q&A.' },
                                { company: 'VIOLENCE DETECTION SYSTEM', role: 'Minor Project — Engineering', period: '2025', desc: 'Research and development of a real-time violence detection system using deep learning and computer vision. Designed to analyze video feeds and classify violent activities for safety and surveillance applications.' },
                                { company: 'ML RESEARCH SYSTEM', role: 'Student Researcher', period: '2024', desc: 'Developed a machine learning model for predictive analytics using Python, scikit-learn, and PyTorch. Achieved high accuracy on real-world datasets through feature engineering and hyperparameter tuning.' },
                                { company: 'DATA SCIENCE', role: 'Academic Projects', period: '2023 – 2024', desc: 'Exploratory data analysis and visualization using Python, Pandas, and Matplotlib. Worked on real-world datasets for insights extraction and dashboard creation.' },
                            ].map((exp, i) => (
                                <div className="resume__exp-item" key={i}>
                                    <h4 className="resume__exp-company">{exp.company}</h4>
                                    <p className="resume__exp-role">
                                        {exp.role} <span className="resume__exp-sep">|</span> {exp.period}
                                    </p>
                                    <p className="resume__exp-desc">{exp.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Resume
