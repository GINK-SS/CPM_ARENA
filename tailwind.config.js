/** @type {import('tailwindcss').Config} */
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      borderWidth: px0_10,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_200,
      minHeight: px0_200,
      spacing: px0_200,
      keyframes: {
        'click-effect': {
          '0%': {
            outline: '4px solid #fff',
            outlineOffset: 0,
            boxShadow: 'inset 0 0 100px 100px rgba(255, 165, 0, 0.8), 0 0 10px 10px rgba(255, 165, 0, 0.7)',
          },
          '30%': {
            opacity: 1,
            outline: '4px solid #fff',
            outlineOffset: 0,
            boxShadow: 'inset 0 0 0 0 rgba(255, 165, 0, 0.2), 0 0 10px 5px rgba(255, 165, 0, 0.7)',
          },
          '100%': {
            opacity: 0,
            outline: '2px solid #fff',
            outlineOffset: '2px',
            boxShadow: 'inset 0 0 0 0 rgba(255, 165, 0, 0.2), 0 0 10px 5px rgba(255, 165, 0, 0)',
          },
        },
      },
    },
    screens: {
      mobileL: '640px',
      tablet: '768px',
      laptop: '1024px',
      desktop: '1280px',
    },
  },
  plugins: [],
};
