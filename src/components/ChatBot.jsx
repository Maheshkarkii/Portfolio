import { useState, useRef, useEffect } from 'react'
import './ChatBot.css'

/* ── Knowledge base about Mahesh ── */
const knowledge = [
    {
        keys: ['who', 'about', 'yourself', 'mahesh', 'introduce', 'tell me'],
        answer: "Mahesh Karki is an Artificial Intelligence Engineer, Machine Learning Engineer, and Artificial Intelligence & Data Science Graduate from Kurukshetra University, India. He's passionate about deep learning, RAG systems, and building intelligent end-to-end applications."
    },
    {
        keys: ['skill', 'tech', 'stack', 'technology', 'good at', 'know', 'tools'],
        answer: "Mahesh's core skills include:\n• Python (90%) — primary language\n• Data Analysis (88%) — Pandas, NumPy, Matplotlib\n• Machine Learning (85%) — scikit-learn, model building\n• SQL (82%) — databases & queries\n• TensorFlow (78%) — deep learning\nHe also works with PyTorch, OpenCV, Streamlit, Power BI, and React."
    },
    {
        keys: ['project', 'built', 'portfolio', 'work', 'made'],
        answer: "Mahesh has built 4 key projects:\n\n1. Sentiment Analysis — Python GUI app for real-time text sentiment classification using NLP & scikit-learn.\n2. Violence Detection & Alert — Real-time system using CNN + LSTM for video surveillance safety.\n3. Job Posting Data Analysis — Power BI dashboards analyzing hiring trends, salaries, and in-demand skills.\n4. IntelliML (Ongoing) — Automated data science workflow with human-in-the-loop for end-to-end ML pipelines."
    },
    {
        keys: ['intelliml', 'automl', 'automat', 'pipeline', 'workflow'],
        answer: "IntelliML was completed in 2026 as Mahesh's Major Engineering Project. It's an automated data science workflow that handles data preprocessing, feature engineering, model selection, and evaluation — with a human-in-the-loop system for critical decision points."
    },
    {
        keys: ['violence', 'detection', 'cnn', 'lstm', 'surveillance', 'alert'],
        answer: "The Violence Detection & Alert System was Mahesh's minor engineering project (2025). It uses CNN for spatial feature extraction and LSTM for temporal sequence analysis on video feeds, triggering real-time alerts for safety and surveillance applications."
    },
    {
        keys: ['sentiment', 'nlp', 'text', 'gui', 'emotion'],
        answer: "Mahesh built a Sentiment Analysis application with a Python GUI (Tkinter) that classifies text as positive, negative, or neutral in real-time. It uses NLP techniques and scikit-learn for accurate emotion detection."
    },
    {
        keys: ['job', 'posting', 'power bi', 'powerbi', 'dashboard', 'hiring'],
        answer: "The Job Posting Data Analysis project uses Power BI to analyze large-scale job posting datasets — extracting hiring trends, in-demand skills, salary patterns, and geographic insights through interactive dashboards."
    },
    {
        keys: ['education', 'university', 'college', 'degree', 'study', 'btech', 'b.tech'],
        answer: "Mahesh is pursuing a B.Tech in Artificial Intelligence & Data Science at Kurukshetra University (2022–2026). Before that, he completed his Higher Secondary Education in Science Stream (PCM + Computer Science) from 2020–2022."
    },
    {
        keys: ['experience', 'work experience', 'intern', 'research', 'job'],
        answer: "Mahesh's experience includes:\n• IntelliML — Major Project of Engineering (2026)\n• AI Research Assistant — Nexus AI (RAG) (2025)\n• Violence Detection System — Minor Engineering Project (2025)\n• ML Research System — Student Researcher (2024)\n• Data Science — Academic Projects (2023–2024)"
    },
    {
        keys: ['language', 'speak', 'hindi', 'english', 'nepali'],
        answer: "Mahesh speaks three languages: Nepali (native), Hindi, and English."
    },
    {
        keys: ['contact', 'reach', 'email', 'connect', 'hire', 'collaborate', 'talk'],
        answer: "You can connect with Mahesh through:\n• LinkedIn: linkedin.com/in/mahesh-karki-078a08236\n• GitHub: github.com/Maheshkarkii\nOr scroll down and click the 'Let's Talk' button in the footer!"
    },
    {
        keys: ['python', 'programming', 'code', 'coding'],
        answer: "Python is Mahesh's primary programming language (90% proficiency). He uses it extensively for machine learning (scikit-learn, TensorFlow, PyTorch), data analysis (Pandas, NumPy, Matplotlib), web apps (Streamlit), and building GUI applications (Tkinter)."
    },
    {
        keys: ['tensorflow', 'deep learning', 'neural', 'pytorch', 'keras'],
        answer: "Mahesh works with TensorFlow (78% proficiency) and has experience with PyTorch and Keras. He's applied deep learning in projects like the Violence Detection System (CNN + LSTM) and Image Classification tasks."
    },
    {
        keys: ['sql', 'database', 'data', 'query'],
        answer: "Mahesh has strong SQL skills (82% proficiency) for database management and querying. He uses SQL alongside Python and Power BI for data analysis, reporting, and backend development."
    },
    {
        keys: ['resume', 'cv', 'download'],
        answer: "You can download Mahesh's CV by clicking the 'Download CV' button in the footer section at the bottom of this page!"
    },
    {
        keys: ['open source', 'github', 'contribute', 'contribution'],
        answer: "Mahesh is an active open-source contributor on GitHub (2023–Present). He focuses on Python libraries, data tools, and developer utilities. He's passionate about collaborative coding and community-driven development."
    },
    {
        keys: ['hello', 'hi', 'hey', 'greet', 'sup', 'yo'],
        answer: "Hey there! 👋 I'm Mahesh's portfolio assistant. I can tell you about his skills, projects, experience, education, or how to contact him. What would you like to know?"
    },
    {
        keys: ['thank', 'thanks', 'bye', 'goodbye', 'see you'],
        answer: "You're welcome! Feel free to come back anytime. You can also scroll down and hit 'Let's Talk' to reach Mahesh directly. Have a great day! 😊"
    },
    {
        keys: ['game', 'typing', 'easter egg', 'hidden', 'secret'],
        answer: "Mahesh's site features a Matrix rain effect (top-left button) and an interactive 3D hero section. Try exploring! 🎨"
    },
    {
        keys: ['hobby', 'interest', 'passion', 'fun', 'free time'],
        answer: "Mahesh is passionate about AI and building intelligent solutions. He enjoys exploring new ML research, contributing to open-source projects, and working on personal projects that solve real-world problems. He's always looking for the next challenge!"
    },
]

function getResponse(input) {
    const lower = input.toLowerCase().trim()

    // Find the best matching knowledge entry
    let bestMatch = null
    let bestScore = 0

    for (const entry of knowledge) {
        let score = 0
        for (const key of entry.keys) {
            if (lower.includes(key)) {
                score += key.length // longer keyword matches score higher
            }
        }
        if (score > bestScore) {
            bestScore = score
            bestMatch = entry
        }
    }

    if (bestMatch && bestScore > 0) {
        return bestMatch.answer
    }

    // Fallback
    const fallbacks = [
        "Great question! I can tell you about Mahesh's skills, projects, experience, education, or how to contact him. Try asking about one of those!",
        "I'm best at answering questions about Mahesh's portfolio — try asking about his projects, tech stack, or background!",
        "Hmm, I'm not sure about that one. But I can tell you about Mahesh's AI/DS projects, skills like Python & TensorFlow, or his experience. What interests you?",
    ]
    return fallbacks[Math.floor(Math.random() * fallbacks.length)]
}

function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { from: 'bot', text: "Hi! 👋 I'm Mahesh's portfolio assistant. Ask me anything — skills, projects, experience, or how to get in touch!" },
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef(null)



    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isTyping])

    const handleSend = () => {
        if (!input.trim()) return
        const userMsg = { from: 'user', text: input }
        const userInput = input
        setMessages((prev) => [...prev, userMsg])
        setInput('')
        setIsTyping(true)

        // Simulate thinking delay
        const delay = 400 + Math.random() * 600
        setTimeout(() => {
            const response = getResponse(userInput)
            setIsTyping(false)
            setMessages((prev) => [...prev, { from: 'bot', text: response }])
        }, delay)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend()
    }

    // Quick-ask suggestions
    const suggestions = ['Skills', 'Projects', 'Experience', 'Contact']

    const handleSuggestion = (text) => {
        setInput('')
        const userMsg = { from: 'user', text }
        setMessages((prev) => [...prev, userMsg])
        setIsTyping(true)

        setTimeout(() => {
            const response = getResponse(text)
            setIsTyping(false)
            setMessages((prev) => [...prev, { from: 'bot', text: response }])
        }, 500)
    }

    return (
        <div className="chatbot">
            {/* Chat Panel */}
            <div className={`chatbot__panel ${isOpen ? 'chatbot__panel--open' : ''}`}>
                <div className="chatbot__header">
                    <span className="chatbot__title">Portfolio Assistant</span>
                    <button className="chatbot__close" onClick={() => setIsOpen(false)} data-cursor="hover">&times;</button>
                </div>
                <div className="chatbot__messages">
                    {messages.map((msg, i) => (
                        <div key={i} className={`chatbot__msg chatbot__msg--${msg.from}`}>
                            {msg.text}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="chatbot__msg chatbot__msg--bot chatbot__msg--typing">
                            <span className="chatbot__dot-1" />
                            <span className="chatbot__dot-2" />
                            <span className="chatbot__dot-3" />
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick suggestions */}
                {messages.length <= 2 && (
                    <div className="chatbot__suggestions">
                        {suggestions.map((s) => (
                            <button key={s} className="chatbot__suggestion" onClick={() => handleSuggestion(s)} data-cursor="hover">
                                {s}
                            </button>
                        ))}
                    </div>
                )}

                <div className="chatbot__input-bar">
                    <input
                        className="chatbot__input"
                        type="text"
                        placeholder="Ask about Mahesh..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="chatbot__send" onClick={handleSend} data-cursor="hover">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Floating Icon */}
            <button
                className={`chatbot__fab ${isOpen ? 'chatbot__fab--open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                data-cursor="hover"
                aria-label="Open chatbot"
            >
                {!isOpen && <span className="chatbot__tooltip">Ask me about Mahesh&apos;s work.</span>}
                <span className="chatbot__fab-icon">
                    {isOpen ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    )}
                </span>
            </button>
        </div>
    )
}

export default ChatBot
