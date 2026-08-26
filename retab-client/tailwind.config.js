/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    

    extend: {
    colors: {
      // Vuestic Defautl primary.
      'primary': '#154EC1'
    },  
    },
  },
  plugins: [],
}

  