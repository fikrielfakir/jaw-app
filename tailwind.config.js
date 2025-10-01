/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
    "./index.ts"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#453063',
        'pure-black': '#000000',
      },
    },
  },
  plugins: [],
}
