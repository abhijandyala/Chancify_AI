import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        background: 'rgb(var(--bg-light) / <alpha-value>)',
        foreground: 'rgb(var(--text-light) / <alpha-value>)',
        glass: {
          light: 'rgb(var(--glass-light) / <alpha-value>)',
          dark: 'rgb(var(--glass-dark) / <alpha-value>)',
        },
        border: 'rgb(var(--border-light) / <alpha-value>)',
        accent: {
          amber: 'rgb(var(--accent-amber) / <alpha-value>)',
          blue: 'rgb(var(--accent-blue) / <alpha-value>)',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'spin-slow': 'spin 1s ease-in-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
      },
      backdropBlur: {
        strong: '20px',
      },
    },
  },
  plugins: [],
}
export default config

