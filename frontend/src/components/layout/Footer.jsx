import { Sparkles, Github, Twitter, Linkedin, Heart } from 'lucide-react'

export default function Footer({ onNavClick }) {

  const handleClick = (e, sectionId) => {
    e.preventDefault()
    onNavClick?.(sectionId)
  }

  const navLinks = [
    { label: 'Features', sectionId: 'features' },
    { label: 'How It Works', sectionId: 'how-it-works' },
    { label: 'Testimonials', sectionId: 'testimonials' },
  ]

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-950 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display text-base font-bold text-slate-900 dark:text-white">
                CoverCraft<span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              Generate ATS-optimized, personalized cover letters in seconds using the power of Google Gemini AI.
            </p>
            <div className="flex gap-3 mt-4">
              {[
                { icon: Github, href: 'https://github.com' },
                { icon: Twitter, href: 'https://twitter.com' },
                { icon: Linkedin, href: 'https://linkedin.com' },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-surface-800 flex items-center justify-center
                    text-slate-500 dark:text-slate-400 hover:text-ink-600 dark:hover:text-ink-400
                    hover:bg-ink-50 dark:hover:bg-ink-900/30 transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              Product
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={`#${item.sectionId}`}
                    onClick={(e) => handleClick(e, item.sectionId)}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-ink-600
                      dark:hover:text-ink-400 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-ink-600
                      dark:hover:text-ink-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} CoverCraft AI. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> using Google Gemini AI
          </p>
        </div>
      </div>
    </footer>
  )
}
