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
        sans: ['var(--font-montserrat)', 'Inter', 'sans-serif'],
      },
      colors: {
        background: {
          DEFAULT: '#0B0D10', // page
          subtle: '#0E1116',  // cards
          raised: '#12151C',  // popovers
        },
        foreground: {
          DEFAULT: '#E8EAED',
          muted: '#AEB4BE',
          dim: '#8B92A1',
        },
        primary: {
          DEFAULT: '#D4AF37', // gold
          foreground: '#0B0D10',
        },
        accent: {
          DEFAULT: '#7BDFFF', // for small hints only
        },
        border: {
          DEFAULT: '#1C2230',
        },
        success: {
          DEFAULT: '#16a34a',
        },
        warning: {
          DEFAULT: '#f59e0b',
        },
        danger: {
          DEFAULT: '#ef4444',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'spin-slow': 'spin 1s ease-in-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'stagger': 'stagger 0.08s ease-out',
      },
      backdropBlur: {
        strong: '20px',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
      },
    },
  },
  plugins: [],
}
export default config

