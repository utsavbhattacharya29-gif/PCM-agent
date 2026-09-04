/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#05070D',
          900: '#0B0F19',
          850: '#111827',
          800: '#1E293B',
          700: '#334155',
        },
        math: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#1D4ED8',
          accent: '#8B5CF6',
          glow: 'rgba(59, 130, 246, 0.25)',
        },
        physics: {
          DEFAULT: '#F97316',
          light: '#FB923C',
          dark: '#C2410C',
          accent: '#F59E0B',
          glow: 'rgba(249, 115, 22, 0.25)',
        },
        chemistry: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#047857',
          accent: '#14B8A6',
          glow: 'rgba(16, 185, 129, 0.25)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
}
