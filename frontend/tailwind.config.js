/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "hero-font": [["\-apple-system", "Helvetica Neue", "Open Sans"],]
    },
    extend: {
      backgroundImage: {
        "hero-pattern": "url('./src/assets/background-images/green-dust-and-scratches.png')"
      }
    },
  },
  plugins: [],
}

