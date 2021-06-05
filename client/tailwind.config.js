module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    truncate: {
      lines: {
          3: '3',
          5: '5',
          8: '8',
    }
  }
  },
  variants: {
    extend: {
      animation: ['motion-safe'],
    }
  },
  plugins: [
    require('tailwindcss-truncate-multiline')(),
  ],
}
