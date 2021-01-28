const withPWA = require('next-pwa')
const dev = process.env.NODE_ENV !== 'production'
module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: dev
  },
  // other next config
  module:{
    rules: [
      { test: /\.svg$/,
        use: [
          'file-loader',
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {removeOffCanvasPaths: true},
                {removeDimensions: true},
                {reusePaths: true}
              ]
            }
          },
        ]
      },
    ]
  }
})