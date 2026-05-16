import { useState } from 'react'
import { ThemeProvider } from './hooks/useTheme'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LandingPage from './pages/LandingPage'
import GeneratorPage from './pages/GeneratorPage'

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  // Go to generator page and scroll to top
  const goToGenerator = () => {
    setCurrentPage('generator')
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  /**
   * FIX: Cross-page anchor navigation
   * Agar generator page pe hain aur #features click hote hain,
   * pehle landing page pe navigate karo, phir us section pe scroll karo.
   */
  const goToSection = (sectionId) => {
    if (currentPage !== 'landing') {
      // Step 1: Landing page pe wapas jao
      setCurrentPage('landing')
      // Step 2: Wait for landing page to mount, then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 120) // 120ms enough for React to re-render landing page
    } else {
      // Already on landing page — just scroll
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar
          onGetStarted={goToGenerator}
          onNavClick={goToSection}
          currentPage={currentPage}
        />

        <div className="flex-1">
          {currentPage === 'landing' ? (
            <LandingPage onGetStarted={goToGenerator} />
          ) : (
            <GeneratorPage />
          )}
        </div>

        <Footer onNavClick={goToSection} />
      </div>
    </ThemeProvider>
  )
}
