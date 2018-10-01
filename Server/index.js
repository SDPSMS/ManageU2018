require('babel-register')({
  presets: [ 'env' ],
  plugins: ['react-native-config-node/transform']
})

module.exports = require('./server')
