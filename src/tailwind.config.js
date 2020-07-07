/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        base: {
          light: '#FFF5E0',
          default: '#FFECC3',
          dark: '#DAC089',
          darkness: 'B49653',
        },
      },
      height: {
        'screen-1/5': '20vh',
      },
      maxHeight: {
        '0': '0',
        'screen-1/5': '20vh',
      },
      minHeight: {
        '0': '0',
        'screen-1/5': '20vh',
      },
    },
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
}
