const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        base: ['Inter', 'sans-serif'],
      },

      screens: {
        xs: '475px',
        lgx: '1200px',
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    plugin(function ({ addUtilities, addComponents }) {
      const utilities = {

      }

      addUtilities(utilities)
    }),
  ],
}
