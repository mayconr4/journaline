/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        cozyBrown: '#582F0E',
        warmBeige: '#A68A64',
        darkGreenish: '#333D29',
        shadowGreen: '#414833',
        softWhite: '#FAFAFA',
        lightGray: '#E0E0E0',
        goldenBeige: '#B6AD90',
        mutedGreen: '#656D4A',
        paleGreen: '#A4AC86',
      }
    },
    fontFamily: {
      serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
    },
    borderRadius: {
      'xl': '1rem'
    },
    boxShadow: {
      md: '0 4px 6px rgba(0,0,0,0.1)',
      lg: '0 10px 15px rgba(0,0,0,0.1)'
    }
  },
  plugins: [],
}