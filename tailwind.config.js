/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      width: {
        '96': '33rem', // Change the width of w-96 to 33rem
      },
    },
  },
  plugins: [],
}

