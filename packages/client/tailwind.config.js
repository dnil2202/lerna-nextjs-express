/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'Fuzy':['Fuzzy Bubbles', 'cursive'],
        'Public':['Public Sans', 'sans-serif',defaultTheme.fontFamily.Public]
      },
    },
  },
  plugins: [],
}
