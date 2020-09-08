module.exports = {
  purge: [],
  theme: {
    fontFamily: {
      body: ['Nunito'],
    },
    extend: {
      inset: {
        '1/2': '50%',
        '-1/12': '-8.3%',
        '-1/8': '-12.5%',
      },
      animation: {
        growtext: 'growtext 1s  linear',
        loadshowcasephoto: 'loadshowcasephoto 1s linear',
      },
      keyframes: {
        growtext: {
          '0%': { transform: 'scale(.1) translateY(-12rem)' },
          '50%': { transform: 'scale(.5) translateY(-6rem)' },
          '100%': { transform: 'scale(1) translateY(0px)' },
        },
        loadshowcasephoto: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
