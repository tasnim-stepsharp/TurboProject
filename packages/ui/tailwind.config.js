/** @type {import('tailwindcss').Config} */
const sharedConfig = require('../../apps/web/tailwind.config');

export default {
  presets: [sharedConfig],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust this path based on your folder structure
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        
      }
    },
  },
  plugins: [],
}

