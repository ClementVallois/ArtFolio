/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  plugins: [],
  mode: 'jit',
  theme: {
    // colors: {
    //   black: '#000',
    //   white: '#fff',
    //   gray: {
    //     300: '#d1d5db',
    //   },
    // },
    fontFamily: {
      title: ['Bebas Neue', 'sans-serif'],
      sans: ['Montserrat Regular', 'sans-serif'],
      lightText: ['Montserrat Light', 'sans-serif'],
      mediumText: ['Montserrat Medium', 'sans-serif'],
      boldText: ['Montserrat Bold', 'sans-serif'],
    },
  },
}
