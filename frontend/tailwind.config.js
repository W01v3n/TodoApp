/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('./src/assets/background-images/green-dust-and-scratches.png')"
      },
      fontFamily: {
        "hero": ['"-apple-system"', '"Helvetica Neue"', '"Open Sans"', '"sans-serif"'],
        "feature": ['"Open Sans"', "Dosis", '"sans-serif"']
      },
    },
  },
  plugins: [],
}

