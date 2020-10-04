const express = require('express')
const path = require('path')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const config = require('./build.webpack.js')

const server = express()
const bundle = webpack(config)
server.use(express.static('dist'))

server.use(WebpackDevMiddleware(bundle, {
  publicPath: config.output.publicPath
}))
server.use(WebpackHotMiddleware(bundle, {
  publicPath: config.output.publicPath
}))

server.listen(3000, () => console.log('Test app listening on port 3000!'))
