import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './utils/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Yellow palette for optimism
        primary: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15', // Main yellow
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        // Functional colors for status
        surplus: {
          light: '#dcfce7',
          DEFAULT: '#22c55e',
          dark: '#15803d',
        },
        deficit: {
          light: '#fee2e2',
          DEFAULT: '#ef4444',
          dark: '#b91c1c',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'ios': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
        'ios-lg': '0 8px 30px -4px rgba(0, 0, 0, 0.1)',
        'ios-xl': '0 12px 40px -8px rgba(0, 0, 0, 0.12)',
        'bento': '0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.04)',
        'bento-hover': '0 4px 24px rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      animation: {
        'blob-1': 'blob-float-1 20s ease-in-out infinite',
        'blob-2': 'blob-float-2 25s ease-in-out infinite',
        'blob-3': 'blob-float-3 18s ease-in-out infinite',
        'marquee': 'marquee 60s linear infinite',
        'marquee-fast': 'marquee 40s linear infinite',
      },
      keyframes: {
        'blob-float-1': {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '25%': {
            transform: 'translate(30px, -50px) scale(1.05)',
          },
          '50%': {
            transform: 'translate(-20px, 20px) scale(0.95)',
          },
          '75%': {
            transform: 'translate(40px, 30px) scale(1.02)',
          },
        },
        'blob-float-2': {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '25%': {
            transform: 'translate(-40px, 30px) scale(1.03)',
          },
          '50%': {
            transform: 'translate(30px, -40px) scale(0.97)',
          },
          '75%': {
            transform: 'translate(-20px, -20px) scale(1.05)',
          },
        },
        'blob-float-3': {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '33%': {
            transform: 'translate(50px, 20px) scale(1.04)',
          },
          '66%': {
            transform: 'translate(-30px, -30px) scale(0.96)',
          },
        },
        'marquee': {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(-50%)',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config




