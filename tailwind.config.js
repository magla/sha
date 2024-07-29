/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        showShort: {
          '10%': { transform: 'scale(1)' },
          '95%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
      },
      animation: {
        showShort: 'showShort 1s',
      },
    },
  },
  plugins: [],
};
