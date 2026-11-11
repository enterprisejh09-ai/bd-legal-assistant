/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#101C35',
          light: '#172B4D',
          dark: '#0A1326',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E5C558',
          dark: '#B8962E',
          soft: '#F7E9B6',
        },
        ink: '#202938',
        muted: '#718096',
        surface: '#F5F7FA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif Pro"', 'Georgia', 'serif'],
        bangla: ['"Noto Sans Bengali"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(16,28,53,0.06), 0 1px 2px rgba(16,28,53,0.04)',
        cardHover: '0 10px 25px -5px rgba(16,28,53,0.12), 0 8px 10px -6px rgba(16,28,53,0.08)',
        nav: '0 1px 0 rgba(16,28,53,0.06)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-12px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        slideIn: 'slideIn 0.25s ease-out',
        pulseDot: 'pulseDot 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
