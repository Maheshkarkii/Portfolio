import { useEffect, useRef } from 'react'
import './Projects.css'

const projects = [
    {
        id: 1,
        title: 'Sentiment Analysis',
        category: 'NLP / Python',
        year: '2024',
        description: 'Built a sentiment analysis application with a Python GUI that classifies text as positive, negative, or neutral. Uses NLP techniques and machine learning for accurate emotion detection.',
        tags: ['Python', 'NLP', 'Tkinter', 'scikit-learn'],
    },
    {
        id: 2,
        title: 'Violence Detection & Alert',
        category: 'Deep Learning / CV',
        year: '2025',
        description: 'Developed a violence detection and alert system using CNN for spatial feature extraction and LSTM for temporal sequence analysis on video feeds. Triggers real-time alerts for safety and surveillance applications.',
        tags: ['CNN', 'LSTM', 'TensorFlow', 'OpenCV'],
    },
    {
        id: 3,
        title: 'Job Posting Data Analysis',
        category: 'Data Analytics / BI',
        year: '2024',
        description: 'Analyzed large-scale job posting datasets to extract hiring trends, in-demand skills, salary patterns, and geographic insights. Built interactive dashboards and reports using Power BI.',
        tags: ['Power BI', 'SQL', 'Data Analysis', 'EDA'],
    },
    {
        id: 4,
        title: 'IntelliML',
        category: 'AutoML / AI',
        year: '2026 (Ongoing)',
        description: 'Building IntelliML — an end-to-end automated data science workflow that handles data preprocessing, feature engineering, model selection, and evaluation with human-in-the-loop intelligence.',
        tags: ['Python', 'FastAPI', 'Node.js', 'AutoML'],
    },
]

function ProjectCard({ project }) {
    return (
        <a href="https://github.com/Maheshkarkii?tab=repositories" target="_blank" rel="noopener noreferrer" className="projects__card-link">
            <article className="projects__card">
                <div className="projects__card-number">
                    {String(project.id).padStart(2, '0')}
                </div>
                <div className="projects__card-info">
                    <div className="projects__card-meta">
                        <span className="projects__card-category">{project.category}</span>
                        <span className="projects__card-year">{project.year}</span>
                    </div>
                    <h3 className="projects__card-title">{project.title}</h3>
                    <p className="projects__card-desc">{project.description}</p>
                    <div className="projects__card-tags">
                        {project.tags.map((tag) => (
                            <span key={tag} className="projects__tag">{tag}</span>
                        ))}
                    </div>
                </div>
            </article>
        </a>
    )
}

function Projects() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible')
                })
            },
            { threshold: 0.05 }
        )
        const elements = sectionRef.current?.querySelectorAll('.animate-in')
        elements?.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <section className="projects" ref={sectionRef} id="03">
            <div className="projects__header animate-in">
                <h2 className="projects__heading"><span className="projects__number">03 —</span> Projects</h2>
                <p className="projects__intro">
                    A selection of projects showcasing my work in AI, machine learning,
                    data science, and real-world intelligent applications.
                </p>
            </div>

            <div className="projects__grid">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    )
}

export default Projects
