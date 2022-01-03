const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'display': ['Heebo', 'sans-serif'],
      'body': ['Heebo', 'sans-serif'],
      mono: ['Baumans', 'monospace']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.3xl'), fontWeight: "700", fontFamily: '"Baumans"' },
        'h2': { fontSize: theme('fontSize.xl'),  fontWeight: "700", fontFamily: '"Baumans"' },
        'h3': { fontSize: theme('fontSize.lg'), fontFamily: '"Heebo"' },
      })
    })
  ],
}
