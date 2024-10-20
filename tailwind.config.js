/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/ejs/**/*.ejs', // Adjust the path based on your EJS files
    './src/**/*.{js,jsx,ts,tsx}', // If you use JS/TS files in src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
