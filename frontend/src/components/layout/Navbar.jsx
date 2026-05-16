import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Sun, Moon, Menu, X, Zap } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

export default function Navbar({ onGetStarted, onNavClick, currentPage }) {
  const { isDark, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [currentPage])

  const navLinks = [
    { label: 'Features', sectionId: 'features' },
    { label: 'How It Works', sectionId: 'how-it-works' },
    { label: 'Testimonials', sectionId: 'testimonials' },
  ]

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    setMobileOpen(false)
    onNavClick?.(sectionId)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => onNavClick?.('hero') || window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            CoverCraft<span className="gradient-text">AI</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={`#${link.sectionId}`}
              onClick={(e) => handleNavClick(e, link.sectionId)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400
                hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-surface-800
                transition-all duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100
              dark:hover:bg-surface-800 transition-all duration-200"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.div>
            </AnimatePresence>
          </button>

          <button
            onClick={onGetStarted}
            className="hidden sm:inline-flex btn-primary text-sm py-2 px-4"
          >
            <Zap className="w-3.5 h-3.5" />
            Try Free
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400
              hover:bg-slate-100 dark:hover:bg-surface-800 transition-all"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden glass border-t border-slate-200 dark:border-slate-800"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={`#${link.sectionId}`}
                  onClick={(e) => handleNavClick(e, link.sectionId)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-600
                    dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-800 transition-all"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileOpen(false); onGetStarted() }}
                className="w-full btn-primary mt-2"
              >
                <Zap className="w-4 h-4" /> Try Free Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
