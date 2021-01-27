const withPWA = require('next-pwa')
const dev = process.env.NODE_ENV !== 'production'
module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: dev
  },
  // other next config
})