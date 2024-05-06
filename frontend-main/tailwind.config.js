/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#f3f4f6",
          "secondary": "#1c1917",
          "accent": "#e5e7eb",
          "neutral": "#050207",
          "base-100": "#ffffff",
          "info": "#dbeafe",
          "success": "#dcfce7",
          "warning": "#fef3c7",
          "error": "#fda4af",
        },
      },
    ],
  },
  theme: {
    colors: {
      black: '#000',
      white: '#fff',
      gray: {
        300: '#d1d5db',
      },
    },
    fontFamily: {
      title: ['Bebas Neue', 'sans-serif'],
      sans: ['Montserrat Regular', 'sans-serif'],
      lightText: ['Montserrat Light', 'sans-serif'],
      mediumText: ['Montserrat Medium', 'sans-serif'],
      boldText: ['Montserrat Bold', 'sans-serif'],
    },
  }
}

