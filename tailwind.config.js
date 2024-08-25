/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/views/**/*.{pug,html,css}',
    './public/**/*.{html,js,css}', 
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

