import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import GeneratorForm from '../components/generator/GeneratorForm'

export default function GeneratorPage() {
  const [result, setResult] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleResult = (data) => {
    setResult(data)
    setIsGenerating(false)
  }

  return (
    <section id="generator" className="py-16 sm:py-24 bg-surface-50 dark:bg-surface-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold
            bg-ink-50 dark:bg-ink-900/40 text-ink-700 dark:text-ink-300
            border border-ink-200 dark:border-ink-800 mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Generator
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Generate Your <span className="gradient-text">Cover Letter</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Complete the form below. Our AI will craft a professional, ATS-optimized letter tailored to your target role.
          </p>
        </motion.div>

        <GeneratorForm
          onResult={handleResult}
          result={result}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
      </div>
    </section>
  )
}
