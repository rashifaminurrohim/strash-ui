/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C6B3F',
      },
      gridTemplateColumns: {
        20: 'repeat(20, minmax(0, 1fr))',
      },
      fontFamily: {
        nunito: ['Nunito', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
