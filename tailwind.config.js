/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        'serif-title': ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        ui: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        manrope: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        brand: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        whuut: {
          terra: '#B63E26',
          orange: '#C86D2D',
          charcoal: '#141413',
          paper: '#F5F0DC',
          darkBg: '#0E0E0D',
        }
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      dropShadow: {
        xs: '0 1px 1px rgba(0, 0, 0, 0.08)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
