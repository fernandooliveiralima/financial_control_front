/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"],
  theme: {
    extend: {},
    screens:{
      'sm': {'max': '480px'},
      // => @media (max-width: 639px) { ... }

      'md': [{'min': '481px', 'max': '767px'}],
      // => @media (max-width: 767px) { ... }

      'lg': [{'min': '768px', 'max': '991px'}],
      // => @media (max-width: 1023px) { ... }

      'xl': [{'min': '992px', 'max': '1199px'}],
      // => @media (max-width: 1279px) { ... }

      '2xl': [{'min': '1200px', 'max': '1919px'}],
      // => @media (max-width: 1535px) { ... }

      '3xl': {'min': '1920px'},
      // => @media (max-width: 639px) { ... }
}
  },
  plugins: [],
}

