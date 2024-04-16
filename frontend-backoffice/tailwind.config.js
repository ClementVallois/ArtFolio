/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // Use Montserrat for regular text
        'title': ['Bebas Neue', 'sans-serif'], // Use Bebas Neue for titles
      },
    },
  },
  plugins: [],
}

