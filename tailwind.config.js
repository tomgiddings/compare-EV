const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    theme: {
      fontFamily: {
        'display': ['Heebo', 'sans-serif'],
        'body': ['Heebo', 'sans-serif']
      }
    },
    extend: {},
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.5xl'), fontFamily: '"Baumans"' },
        'h2': { fontSize: theme('fontSize.xl'), fontFamily: '"Baumans"' },
        'h3': { fontSize: theme('fontSize.lg'), fontFamily: '"Baumans"' }
      })
    })
  ],
}
