import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, CheckCircle2, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

const TYPING_PHRASES = [
  'Software Engineer at Google',
  'Product Manager at Stripe',
  'UX Designer at Figma',
  'Data Scientist at OpenAI',
  'Full Stack Developer at Vercel',
]

function TypingEffect() {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = TYPING_PHRASES[phraseIdx]
    let timeout

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setPhraseIdx((i) => (i + 1) % TYPING_PHRASES.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, phraseIdx])

  return (
    <span className="gradient-text font-display font-bold">
      {displayed}
      <span className="inline-block w-0.5 h-8 bg-ink-500 ml-1 align-middle animate-pulse" />
    </span>
  )
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function HeroSection({ onGetStarted }) {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden noise-overlay">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-mesh-gradient dark:bg-dark-mesh pointer-events-none" />
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 right-[10%] w-72 h-72 rounded-full bg-ink-400/10 dark:bg-ink-500/15 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-32 left-[5%] w-56 h-56 rounded-full bg-purple-400/10 dark:bg-purple-500/15 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <motion.variants variants={stagger} initial="hidden" animate="show">

            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold
                bg-ink-50 dark:bg-ink-900/40 text-ink-700 dark:text-ink-300
                border border-ink-200 dark:border-ink-800 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-ink-500" />
                Powered by Google Gemini AI
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold leading-[1.05] tracking-tight mb-6 text-slate-900 dark:text-white"
            >
              Land Your Dream Job as{' '}
              <br className="hidden sm:block" />
              <TypingEffect />
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-body"
            >
              Generate ATS-optimized, personalized cover letters in seconds.
              Upload your resume, describe the role — our AI does the rest.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
              <button onClick={onGetStarted} className="btn-primary text-base py-3.5 px-8 group">
                Generate My Cover Letter
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#how-it-works" className="btn-secondary text-base py-3.5 px-8">
                See How It Works
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm text-slate-500 dark:text-slate-400">
              {[
                'ATS-Optimized Output',
                'Human-Quality Tone',
                'Instant Generation',
                '100% Free to Try',
              ].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {badge}
                </span>
              ))}
            </motion.div>

          </motion.variants>
        </div>

        {/* Hero card mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="card p-6 shadow-glow-sm border border-ink-100 dark:border-ink-900/50">
            {/* Fake toolbar */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">cover-letter.ai</span>
                <Zap className="w-3 h-3 text-ink-400 ml-auto" />
                <span className="text-xs text-ink-500 font-semibold">Generating...</span>
              </div>
            </div>
            {/* Fake content lines */}
            <div className="space-y-2.5">
              <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 w-1/3" />
              <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 w-full shimmer" />
              <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 w-5/6 shimmer" />
              <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 w-full shimmer" />
              <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 w-4/5" />
              <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 w-full shimmer" />
              <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 w-3/4 shimmer" />
            </div>
            <div className="mt-5 flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="w-6 h-6 rounded-full gradient-primary" />
              <div className="text-xs text-slate-400">AI is crafting your personalized letter...</div>
              <div className="ml-auto flex gap-1">
                {[0, 0.2, 0.4].map((delay) => (
                  <motion.span
                    key={delay}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay }}
                    className="w-1.5 h-1.5 rounded-full bg-ink-400"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
