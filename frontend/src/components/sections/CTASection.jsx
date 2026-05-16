import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTASection({ onGetStarted }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section className="py-24 bg-white dark:bg-surface-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl gradient-primary p-[1px] shadow-glow"
        >
          <div className="relative rounded-3xl overflow-hidden noise-overlay">
            <div className="bg-gradient-to-br from-ink-600 via-purple-600 to-blue-600 px-8 sm:px-16 py-16 text-center">
              {/* Glowing orb */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="inline-flex w-14 h-14 rounded-2xl bg-white/20 items-center justify-center mb-6"
                >
                  <Sparkles className="w-7 h-7 text-white" />
                </motion.div>

                <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white mb-4 tracking-tight">
                  Ready to land your dream job?
                </h2>
                <p className="text-lg text-white/70 mb-10 max-w-lg mx-auto">
                  Generate your first professional cover letter in under 30 seconds — completely free.
                </p>

                <button
                  onClick={onGetStarted}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-ink-700
                    font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5
                    active:scale-95 transition-all duration-200 group"
                >
                  Generate My Cover Letter
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-white/50 text-sm mt-5">
                  No sign-up required · No credit card · Free to use
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
