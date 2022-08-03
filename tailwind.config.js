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
        '2xlg': '1200px',
        '3xlg': '1364px',
      },
    },
  },
  corePlugins: {
    // aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    plugin(function ({ addUtilities, addComponents }) {
      const utilities = {}

      addUtilities(utilities)
    }),
  ],
}
