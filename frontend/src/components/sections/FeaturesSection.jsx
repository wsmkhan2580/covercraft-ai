import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Brain, FileText, Zap, Shield, Target, RefreshCw,
  Download, Palette
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Gemini AI Powered',
    desc: 'Google\'s most capable model generates human-quality, context-aware cover letters tailored to each application.',
    color: 'text-ink-500',
    bg: 'bg-ink-50 dark:bg-ink-900/20',
  },
  {
    icon: FileText,
    title: 'Smart PDF Parsing',
    desc: 'Upload your resume and our system automatically extracts key information to personalize your cover letter.',
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: Target,
    title: 'ATS Optimized',
    desc: 'Every letter is engineered to pass Applicant Tracking Systems with relevant keywords from the job description.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: Zap,
    title: 'Instant Generation',
    desc: 'Get a complete, professional cover letter in under 10 seconds — not hours of manual writing.',
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    icon: Download,
    title: 'PDF Download',
    desc: 'Download your cover letter as a formatted PDF, ready to attach to any job application immediately.',
    color: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    icon: RefreshCw,
    title: 'Unlimited Regeneration',
    desc: 'Not satisfied? Regenerate with one click to get a fresh, unique version every time.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    desc: 'Your resume data is processed server-side and never stored. API keys are never exposed to the frontend.',
    color: 'text-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
  },
  {
    icon: Palette,
    title: 'Human-Like Tone',
    desc: 'Advanced prompt engineering ensures every letter sounds authentic, not robotic — employers can\'t tell the difference.',
    color: 'text-violet-500',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
  },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = feature.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="card p-6 hover:shadow-glow-sm hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className={`w-10 h-10 rounded-xl ${feature.bg} flex items-center justify-center mb-4
        group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-5 h-5 ${feature.color}`} />
      </div>
      <h3 className="font-display font-bold text-slate-900 dark:text-white mb-2 text-[15px]">
        {feature.title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        {feature.desc}
      </p>
    </motion.div>
  )
}

export default function FeaturesSection() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section id="features" className="py-24 bg-surface-50 dark:bg-surface-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest text-ink-500 mb-3"
          >
            Everything You Need
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight"
          >
            Features built for <span className="gradient-text">job seekers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto"
          >
            Every feature is designed to maximize your chances of landing an interview.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feat, i) => (
            <FeatureCard key={feat.title} feature={feat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
