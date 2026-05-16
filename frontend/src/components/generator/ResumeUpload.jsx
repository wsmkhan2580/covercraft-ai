import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, X, CheckCircle2, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { parseResumePDF } from '../../services/api'

export default function ResumeUpload({ onParsed, onClear }) {
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [parsing, setParsing] = useState(false)
  const [preview, setPreview] = useState('')
  const inputRef = useRef(null)

  const handleFile = useCallback(async (f) => {
    if (!f) return
    if (f.type !== 'application/pdf') {
      toast.error('Only PDF files are supported')
      return
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error('File must be under 5MB')
      return
    }

    setFile(f)
    setParsing(true)

    try {
      const result = await parseResumePDF(f)
      setPreview(result.preview || result.text?.slice(0, 500))
      onParsed?.(result.text, f)
      toast.success(`Resume parsed — ${result.wordCount || 0} words extracted`)
    } catch (err) {
      toast.error('Could not parse PDF: ' + err.message)
      setFile(null)
      setPreview('')
      onClear?.()
    } finally {
      setParsing(false)
    }
  }, [onParsed, onClear])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files?.[0]
    if (f) handleFile(f)
  }, [handleFile])

  const handleClear = () => {
    setFile(null)
    setPreview('')
    if (inputRef.current) inputRef.current.value = ''
    onClear?.()
    toast.success('Resume removed')
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="upload-zone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              onDragEnter={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-8 cursor-pointer text-center transition-all duration-200
                ${dragging
                  ? 'border-ink-400 bg-ink-50 dark:bg-ink-900/20 scale-[1.01]'
                  : 'border-slate-200 dark:border-slate-700 hover:border-ink-300 dark:hover:border-ink-600 hover:bg-slate-50 dark:hover:bg-surface-800/50'
                }`}
            >
              <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center transition-all
                ${dragging ? 'bg-ink-100 dark:bg-ink-800' : 'bg-slate-100 dark:bg-surface-800'}`}>
                <Upload className={`w-5 h-5 transition-colors ${dragging ? 'text-ink-500' : 'text-slate-400'}`} />
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {dragging ? 'Drop your PDF here' : 'Upload Resume PDF'}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Drag & drop or click to browse · PDF only · Max 5MB
              </p>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="file-preview"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="card p-4"
          >
            {/* File info row */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{file.name}</p>
                <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(0)} KB</p>
              </div>

              {parsing ? (
                <Loader2 className="w-5 h-5 text-ink-500 animate-spin flex-shrink-0" />
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <button
                    onClick={handleClear}
                    type="button"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400
                      hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Preview text */}
            {!parsing && preview && (
              <div className="bg-slate-50 dark:bg-surface-800 rounded-lg p-3 max-h-28 overflow-y-auto">
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 leading-relaxed whitespace-pre-wrap break-words">
                  {preview}…
                </p>
              </div>
            )}

            {parsing && (
              <div className="space-y-2 mt-2">
                {[1, 0.8, 0.6].map((w, i) => (
                  <div key={i} className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 shimmer" style={{ width: `${w * 100}%` }} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
