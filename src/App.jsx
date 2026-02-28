import './App.css'
import ScrollProgress from './components/ScrollProgress'
import ThemeToggle from './components/ThemeToggle'
import TopNav from './components/TopNav'
import Hero from './components/Hero'
import Resume from './components/Resume'
import Projects from './components/Projects'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      <ScrollProgress />
      <TopNav />
      <ThemeToggle />

      <Hero />

      <div className="section-divider">
        <span className="section-divider__ornament">✦</span>
      </div>

      <Resume />

      <div className="section-divider">
        <span className="section-divider__ornament">✦</span>
      </div>

      <Projects />
      <Footer />
    </div>
  )
}

export default App
