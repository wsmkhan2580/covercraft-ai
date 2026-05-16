import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Copy, Download, RefreshCw, Check, FileText } from 'lucide-react'
import toast from 'react-hot-toast'
import { copyToClipboard, downloadCoverLetterAsPDF } from '../../utils/pdfDownload'

function TypingText({ text }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const CHUNK = 4 // characters per tick
    const interval = setInterval(() => {
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
        return
      }
      setDisplayed(text.slice(0, i + CHUNK))
      i += CHUNK
    }, 12)
    return () => clearInterval(interval)
  }, [text])

  useEffect(() => {
    // Auto scroll to bottom while typing
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [displayed])

  return (
    <div
      ref={ref}
      className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar"
    >
      <div className="cover-letter-output text-sm sm:text-[15px] leading-[1.9]">
        {done ? (
          <ReactMarkdown>{text}</ReactMarkdown>
        ) : (
          <span style={{ whiteSpace: 'pre-wrap' }}>{displayed}<span className="inline-block w-0.5 h-4 bg-ink-500 ml-0.5 align-middle animate-pulse" /></span>
        )}
      </div>
    </div>
  )
}

export default function GeneratedOutput({ result, onRegenerate, isLoading }) {
  const [copied, setCopied] = useState(false)

  if (!result && !isLoading) return null

  const handleCopy = async () => {
    try {
      await copyToClipboard(result.coverLetter)
      setCopied(true)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopied(false), 2500)
    } catch {
      toast.error('Copy failed — please select & copy manually')
    }
  }

  const handleDownload = () => {
    const filename = `cover-letter-${result.metadata.company?.replace(/\s+/g, '-').toLowerCase() || 'job'}.pdf`
    downloadCoverLetterAsPDF(result.coverLetter, filename)
    toast.success('PDF downloaded!')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Output header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-ink-500" />
            Your Cover Letter
          </h3>
          {result?.metadata && (
            <p className="text-xs text-slate-400 mt-0.5">
              {result.metadata.jobRole} @ {result.metadata.company}
              {result.metadata.wordCount ? ` · ~${result.metadata.wordCount} words` : ''}
            </p>
          )}
        </div>

        {result && (
          <div className="flex items-center gap-2">
            <button onClick={onRegenerate} className="btn-ghost text-xs gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" />
              Regenerate
            </button>
            <button onClick={handleCopy} className="btn-secondary text-xs py-2 px-3">
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={handleDownload} className="btn-primary text-xs py-2 px-3">
              <Download className="w-3.5 h-3.5" />
              PDF
            </button>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="card p-6 sm:p-8 border border-ink-100 dark:border-ink-900/40 bg-gradient-to-b from-white to-slate-50/50 dark:from-surface-900 dark:to-surface-900">
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[0, 0.2, 0.4].map((d) => (
                  <motion.span
                    key={d}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: d }}
                    className="w-2 h-2 rounded-full bg-ink-400"
                  />
                ))}
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400">AI is crafting your cover letter...</span>
            </div>
            {[1, 0.9, 1, 0.7, 1, 0.85, 0.5].map((w, i) => (
              <div
                key={i}
                className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 shimmer"
                style={{ width: `${w * 100}%`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        ) : result ? (
          <TypingText text={result.coverLetter} />
        ) : null}
      </div>

      {/* Metadata badges */}
      {result?.metadata && (
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
            ✓ ATS Optimized
          </span>
          <span className="px-2.5 py-1 rounded-full bg-ink-50 dark:bg-ink-900/20 text-ink-700 dark:text-ink-400 border border-ink-200 dark:border-ink-800">
            ✓ Human-Quality Tone
          </span>
          {result.metadata.hasResume && (
            <span className="px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
              ✓ Resume-Personalized
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            Powered by Gemini AI
          </span>
        </div>
      )}
    </motion.div>
  )
}
