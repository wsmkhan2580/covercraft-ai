import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Upload, Wand2, Download } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: Upload,
    title: 'Fill In Your Details',
    desc: 'Enter your name, target role, company, skills, and paste the job description. Optionally upload your resume PDF for extra personalization.',
    color: 'from-ink-500 to-purple-500',
  },
  {
    num: '02',
    icon: Wand2,
    title: 'AI Generates Your Letter',
    desc: 'Google Gemini AI analyzes the job description, your skills, and resume content to craft a tailored, ATS-optimized cover letter in seconds.',
    color: 'from-purple-500 to-blue-500',
  },
  {
    num: '03',
    icon: Download,
    title: 'Download & Apply',
    desc: 'Copy to clipboard or download as a formatted PDF. Your cover letter is ready to attach to any job application immediately.',
    color: 'from-blue-500 to-cyan-500',
  },
]

export default function HowItWorksSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-surface-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-xs font-bold uppercase tracking-widest text-ink-500 mb-3"
          >
            Simple as 1-2-3
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            How it <span className="gradient-text">works</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[22%] right-[22%] h-px bg-gradient-to-r from-ink-300 via-purple-300 to-blue-300 dark:from-ink-800 dark:via-purple-800 dark:to-blue-800" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.55 }}
                className="text-center relative"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 shadow-glow-sm`}>
                  <Icon className="w-9 h-9 text-white" />
                </div>
                <span className="text-5xl font-display font-black text-slate-100 dark:text-slate-800 absolute -top-3 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0">
                  {step.num}
                </span>
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-3 relative z-10">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
