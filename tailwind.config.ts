import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {},
      keyframes: {
        fadeIn: { to: { opacity: '1' } },
        slideUp: { to: { opacity: '1', transform: 'translateY(0)' } },
        slideLeft: { to: { opacity: '1', transform: 'translateX(0)' } },
        slideRight: { to: { opacity: '1', transform: 'translateX(0)' } },
        blurIn: { to: { opacity: '1', filter: 'blur(0)' } },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-left': 'slideLeft 0.8s ease-out forwards',
        'slide-right': 'slideRight 0.8s ease-out forwards',
        'blur-in': 'blurIn 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
