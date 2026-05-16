

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  User,
  Mail,
  Briefcase,
  Building2,
  Wand2,
  Code2,
  BarChart3,
  ChevronDown
} from 'lucide-react'

import ResumeUpload from './ResumeUpload'
import GeneratedOutput from './GeneratedOutput'
import { generateCoverLetter } from '../../services/api'

const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level (0-2 years)' },
  { value: 'mid', label: 'Mid Level (2-5 years)' },
  { value: 'senior', label: 'Senior Level (5-10 years)' },
  { value: 'lead', label: 'Lead / Principal (10+ years)' },
  { value: 'executive', label: 'Executive / C-Level' },
]

function FormField({ label, icon: Icon, error, counter, children }) {
  return (
    <div>
      <label className="label-text flex items-center gap-1.5">
        {Icon && <Icon className="w-3.5 h-3.5 text-ink-400" />}
        {label}
      </label>

      {children}

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-xs text-red-500 flex items-center gap-1"
        >
          ⚠ {error}
        </motion.p>
      )}

      {counter !== undefined && (
        <p
          className={`mt-1 text-xs text-right ${
            counter > 4500 ? 'text-amber-500' : 'text-slate-400'
          }`}
        >
          {counter}/5000
        </p>
      )}
    </div>
  )
}

export default function GeneratorForm({
  onResult,
  result,
  isGenerating,
  setIsGenerating
}) {
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeText, setResumeText] = useState('')

  // ✅ VERY IMPORTANT
  const [lastFormData, setLastFormData] = useState(null)

  const formRef = useRef(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit'
  })

  const jobDescValue = watch('jobDescription', '')

  // ✅ MAIN GENERATE FUNCTION
  const onSubmit = async (data) => {
    setIsGenerating(true)

    setTimeout(() => {
      document
        .getElementById('output-section')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
    }, 300)

    try {
      // ✅ Save latest valid form data
      setLastFormData(data)

      const formData = new FormData()

      Object.entries(data).forEach(([k, v]) => {
        formData.append(k, v)
      })

      if (resumeFile) {
        formData.append('resume', resumeFile)
      }

      formData.append(
        'requestId',
        Date.now().toString()
      )

      const result = await generateCoverLetter(formData)

      onResult(result)

      toast.success(
        'Cover letter generated! 🎉',
        {
          duration: 3000
        }
      )

    } catch (err) {
      toast.error(
        err.message ||
        'Generation failed. Please try again.'
      )
    } finally {
      setIsGenerating(false)
    }
  }

  // ✅ FIXED PROFESSIONAL REGENERATE
  const handleRegenerate = async () => {

    if (!lastFormData) {
      toast.error('No previous form data found')
      return
    }

    setIsGenerating(true)

    try {
      const formData = new FormData()

      Object.entries(lastFormData).forEach(([k, v]) => {
        if (v) {
          formData.append(k, v)
        }
      })

      if (resumeFile) {
        formData.append('resume', resumeFile)
      }

      // ✅ Forces fresh AI generation
      formData.append(
        'requestId',
        Date.now().toString()
      )

      const result = await generateCoverLetter(formData)

      onResult(result)

      toast.success(
        'New version generated! 🎉',
        {
          duration: 3000
        }
      )

    } catch (err) {
      toast.error(
        err.message ||
        'Regeneration failed. Please try again.'
      )
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start">

      {/* LEFT FORM */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card p-6 sm:p-8">

          <div className="mb-6">
            <h2 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mb-1">
              Generate Your Cover Letter
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Fill in your details and let AI craft the perfect letter.
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* NAME + EMAIL */}
            <div className="grid sm:grid-cols-2 gap-4">

              <FormField
                label="Your Name"
                icon={User}
                error={errors.candidateName?.message}
              >
                <input
                  {...register('candidateName', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Too short'
                    },
                  })}
                  className={`input-field ${
                    errors.candidateName
                      ? 'input-field-error'
                      : ''
                  }`}
                  placeholder="Alex Johnson"
                />
              </FormField>

              <FormField
                label="Email Address"
                icon={Mail}
                error={errors.email?.message}
              >
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email'
                    },
                  })}
                  type="email"
                  className={`input-field ${
                    errors.email
                      ? 'input-field-error'
                      : ''
                  }`}
                  placeholder="alex@example.com"
                />
              </FormField>

            </div>

            {/* ROLE + COMPANY */}
            <div className="grid sm:grid-cols-2 gap-4">

              <FormField
                label="Job Role"
                icon={Briefcase}
                error={errors.jobRole?.message}
              >
                <input
                  {...register('jobRole', {
                    required: 'Job role is required'
                  })}
                  className={`input-field ${
                    errors.jobRole
                      ? 'input-field-error'
                      : ''
                  }`}
                  placeholder="Senior Frontend Engineer"
                />
              </FormField>

              <FormField
                label="Target Company"
                icon={Building2}
                error={errors.company?.message}
              >
                <input
                  {...register('company', {
                    required: 'Company name is required'
                  })}
                  className={`input-field ${
                    errors.company
                      ? 'input-field-error'
                      : ''
                  }`}
                  placeholder="Google"
                />
              </FormField>

            </div>

            {/* EXPERIENCE */}
            <FormField
              label="Experience Level"
              icon={BarChart3}
              error={errors.experienceLevel?.message}
            >
              <div className="relative">
                <select
                  {...register('experienceLevel', {
                    required: 'Select experience level'
                  })}
                  className={`input-field appearance-none pr-10 ${
                    errors.experienceLevel
                      ? 'input-field-error'
                      : ''
                  }`}
                >
                  <option value="">
                    Select experience level...
                  </option>

                  {EXPERIENCE_LEVELS.map((lvl) => (
                    <option
                      key={lvl.value}
                      value={lvl.label}
                    >
                      {lvl.label}
                    </option>
                  ))}
                </select>

                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </FormField>

            {/* SKILLS */}
            <FormField
              label="Key Skills"
              icon={Code2}
              error={errors.skills?.message}
            >
              <input
                {...register('skills', {
                  required: 'Please list your key skills',
                  minLength: {
                    value: 5,
                    message: 'List at least a few skills'
                  },
                })}
                className={`input-field ${
                  errors.skills
                    ? 'input-field-error'
                    : ''
                }`}
                placeholder="React, TypeScript, Node.js, REST APIs, AWS..."
              />

              <p className="mt-1 text-xs text-slate-400">
                Comma-separated list of relevant technical & soft skills
              </p>
            </FormField>

            {/* JOB DESCRIPTION */}
            <FormField
              label="Job Description"
              error={errors.jobDescription?.message}
              counter={jobDescValue?.length}
            >
              <textarea
                {...register('jobDescription', {
                  required: 'Job description is required',
                  minLength: {
                    value: 50,
                    message:
                      'Please paste the full job description (min 50 chars)'
                  },
                  maxLength: {
                    value: 5000,
                    message: 'Max 5000 characters'
                  },
                })}
                rows={6}
                className={`input-field resize-none ${
                  errors.jobDescription
                    ? 'input-field-error'
                    : ''
                }`}
                placeholder="Paste the full job description here for best results..."
              />
            </FormField>

            {/* RESUME */}
            <div>
              <label className="label-text mb-2 block">
                Resume PDF{' '}
                <span className="text-slate-400 font-normal">
                  (optional but recommended)
                </span>
              </label>

              <ResumeUpload
                onParsed={(text, file) => {
                  setResumeText(text)
                  setResumeFile(file)
                }}
                onClear={() => {
                  setResumeText('')
                  setResumeFile(null)
                }}
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isGenerating}
              className="btn-primary w-full py-4 text-base"
            >
              {isGenerating ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>

                  Generating your cover letter...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Cover Letter with AI
                </>
              )}
            </button>

          </form>
        </div>
      </motion.div>

      {/* RIGHT OUTPUT */}
      <motion.div
        id="output-section"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.1
        }}
      >
        {(result || isGenerating) ? (
          <GeneratedOutput
            result={result}
            isLoading={isGenerating}
            onRegenerate={handleRegenerate}
          />
        ) : (
          <div
            className="
              card p-10 flex flex-col items-center
              justify-center text-center min-h-[400px]
              border-2 border-dashed
              border-slate-200 dark:border-slate-700
              bg-transparent shadow-none
            "
          >
            <div className="w-16 h-16 rounded-2xl bg-ink-50 dark:bg-ink-900/20 flex items-center justify-center mb-4">
              <Wand2 className="w-7 h-7 text-ink-400" />
            </div>

            <h3 className="font-display font-bold text-lg text-slate-700 dark:text-slate-300 mb-2">
              Your cover letter will appear here
            </h3>

            <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs leading-relaxed">
              Fill in the form and click "Generate" to create your personalized, ATS-optimized cover letter.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}