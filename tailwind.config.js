/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Work Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#F1E9E9',
          100: '#e8d4e8',
          200: '#d4a8d4',
          300: '#bf7dbf',
          400: '#ab51ab',
          500: '#982598',
          600: '#7d1e7d',
          700: '#621762',
          800: '#471047',
          900: '#15173D',
        },
        navy: {
          50:  '#eeeef5',
          100: '#d4d4e8',
          200: '#a8a8d0',
          300: '#7d7db9',
          400: '#5151a1',
          500: '#2a2a7a',
          600: '#202063',
          700: '#15173D',
          800: '#0f1030',
          900: '#080922',
        },
        blush: {
          50:  '#fdfafa',
          100: '#F1E9E9',
          200: '#e8d4d4',
          300: '#debfbf',
          400: '#d4aaaa',
          500: '#ca9595',
        },
        purple: {
          400: '#b535b5',
          500: '#982598',
          600: '#7d1e7d',
        }
      }
    },
  },
  plugins: [],
}
