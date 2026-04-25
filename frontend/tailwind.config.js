/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3E2723', // deep espresso / dark brown
          light: '#5D4037',
        },
        secondary: {
          DEFAULT: '#F5F5DC', // cream / ivory
          dark: '#EBEBD3',
        },
        accent: {
          DEFAULT: '#B87333', // copper / terracotta / muted gold
          hover: '#9E6329',
        },
        background: '#FAF9F6', // warm off-white
        text: {
          DEFAULT: '#333333', // charcoal
          light: '#555555',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      }
    },
  },
  plugins: [],
}
