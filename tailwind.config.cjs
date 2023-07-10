module.exports = {
  content: ['./src/routes/**/*.{svelte,js,ts}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        corporate: {
          ...require("daisyui/src/colors/themes")["[data-theme=corporate]"],
          "background-color": "#f1f1e6"
        },
      },
    ],
  },  
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
};
