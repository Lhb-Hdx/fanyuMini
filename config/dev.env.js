'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://localhost:8899/"'
  BASE_API: '"/api/thirdapi"',
  CONTEXT3: '"https://djg.jiajiepay.com/share/share.html"',
})
