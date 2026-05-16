import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer @ Google',
    avatar: 'PS',
    color: 'from-ink-500 to-purple-500',
    stars: 5,
    text: 'I sent 12 applications with CoverCraft letters and got 8 interviews. The AI truly understands how to match my skills to the job description. It\'s like having a professional career coach.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Product Manager @ Stripe',
    avatar: 'MJ',
    color: 'from-blue-500 to-cyan-500',
    stars: 5,
    text: 'Used to spend 2 hours on each cover letter. Now I do it in 30 seconds and the quality is honestly better than anything I ever wrote manually. The ATS optimization is real.',
  },
  {
    name: 'Aisha Patel',
    role: 'Data Scientist @ OpenAI',
    avatar: 'AP',
    color: 'from-purple-500 to-pink-500',
    stars: 5,
    text: 'The PDF resume parsing is incredible — it pulls out exactly the right achievements to highlight for each role. Landed 3 offers and chose my dream job. This tool is unmatched.',
  },
  {
    name: 'David Chen',
    role: 'UX Designer @ Figma',
    avatar: 'DC',
    color: 'from-emerald-500 to-teal-500',
    stars: 5,
    text: 'As someone who struggles with self-promotion, this tool articulates my experience so much better than I ever could. It sounds genuinely human and impressive every single time.',
  },
  {
    name: 'Sarah Williams',
    role: 'Frontend Dev @ Vercel',
    avatar: 'SW',
    color: 'from-orange-500 to-amber-500',
    stars: 5,
    text: 'Switched from spending weekends on job apps to sending 5 tailored applications in an hour. Secured my current role at Vercel in under 2 weeks. Absolute game-changer.',
  },
  {
    name: 'Rahul Kumar',
    role: 'Backend Engineer @ Coinbase',
    avatar: 'RK',
    color: 'from-rose-500 to-red-500',
    stars: 5,
    text: 'The cover letters are completely tailored to each company\'s culture and the specific role requirements. Recruiters have literally complimented my application materials.',
  },
]

function TestimonialCard({ t, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
      className="card p-6 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-glow-sm transition-all duration-300"
    >
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
        "{t.text}"
      </p>

      <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
          <span className="text-white text-xs font-bold">{t.avatar}</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</div>
          <div className="text-xs text-slate-400">{t.role}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="testimonials" className="py-24 bg-surface-50 dark:bg-surface-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="text-xs font-bold uppercase tracking-widest text-ink-500 mb-3">
            Loved By Job Seekers
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Real results, real <span className="gradient-text">careers</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 dark:text-slate-400">
            Join thousands of professionals who landed their dream jobs with CoverCraft AI.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
