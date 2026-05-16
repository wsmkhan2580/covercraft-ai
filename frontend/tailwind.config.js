/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', '"Cabinet Grotesk"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c4c4ff',
          300: '#a3a3ff',
          400: '#8080ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        surface: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f4f4f8',
          800: '#1a1a2e',
          900: '#0f0f1a',
          950: '#08080f',
        },
        neon: {
          purple: '#a855f7',
          blue: '#3b82f6',
          cyan: '#06b6d4',
          green: '#10b981',
        },
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(262,80%,50%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(220,80%,60%,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(280,70%,55%,0.1) 0px, transparent 50%)',
        'dark-mesh': 'radial-gradient(at 40% 20%, hsla(262,80%,30%,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(220,80%,40%,0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(280,70%,35%,0.2) 0px, transparent 50%)',
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.3), transparent)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'typing': 'typing 3.5s steps(40, end), blink 0.75s step-end infinite',
        'gradient-x': 'gradient-x 4s ease infinite',
        'fade-up': 'fade-up 0.6s ease forwards',
        'scale-in': 'scale-in 0.4s ease forwards',
        'slide-in-right': 'slide-in-right 0.5s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'glow': '0 0 40px rgba(99, 102, 241, 0.3)',
        'glow-sm': '0 0 20px rgba(99, 102, 241, 0.2)',
        'glow-lg': '0 0 80px rgba(99, 102, 241, 0.4)',
        'card': '0 1px 3px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)',
        'card-dark': '0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
