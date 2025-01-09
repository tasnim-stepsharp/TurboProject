/** @type {import('tailwindcss').Config} */
const sharedConfig = require('../../packages/ui/tailwind.config');
export default {
  presets: [sharedConfig],
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*{.js,.ts,.jsx,.tsx}",
  ], 
  theme: {
    extend: {
      colors:{
        primary :"#7F56D9",
        gray: {
          "abc-50": "#373A41",
          "abc-100": "#535862",
          "abc-200": "#717680",
          "abc-300": "#414651",
          "abc-400": "#D5D7DA",
          "abc-500": "#94979C",
          "abc-600" : "#181D27",
          "abc-700" : "#0C0E12",
          "abc-800" : "#13161B",
        },
        red:{
          "abc-100": "#e54750",
          "abc-200": "#c93c43",
        },
        Offwhite:{
          "abc-100" :"#F7F7F7",
          "abc-200" :"#FAFAFA",
          "abc-300" :"#CECFD2"
        }
      }
    },
  },
  plugins: [],
}

