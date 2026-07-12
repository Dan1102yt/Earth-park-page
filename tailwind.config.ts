import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#4a7c2f',
          dark: '#2d4f1c',
          light: '#6aaa45',
        },
        earth: {
          DEFAULT: '#c0392b',
          dark: '#922b21',
        },
        cream: {
          DEFAULT: '#f5e6d3',
          dark: '#e8d4bc',
        },
        dark: {
          DEFAULT: '#1a1a1a',
          soft: '#2a2a2a',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e8c96a',
        },
        crema: '#F7F3EA',
        bosque: {
          DEFAULT: '#2C4A2E',
          deep: '#1A2E1C',
          surface: '#24361F',
        },
        terracota: '#B5602F',
        musgo: '#6B8F5A',
        dorado: '#D4A24E',
        carbon: '#3A362E',
      },
      fontFamily: {
        display: ['Lilita One', 'cursive'],
        body: ['Lato', 'sans-serif'],
        fraunces: ['Fraunces', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
