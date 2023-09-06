var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
NODE_ENV: '"development"',
// CONTEXT: '"https://mall.beeba.cn"'
// CONTEXT: '"https://192.168.2.195"'
CONTEXT: '"https://iot.faryu.cn"'
})
