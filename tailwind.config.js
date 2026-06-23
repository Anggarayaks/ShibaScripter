/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'github-dark': '#0D1117',
        'github-dark-secondary': '#161B22',
        'github-dark-border': '#30363D',
        'github-dark-text': '#8B949E',
        'github-dark-text-primary': '#E6EDF3',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
