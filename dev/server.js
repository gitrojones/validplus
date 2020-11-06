const express = require('express')
const expressHB = require('express-handlebars');
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const config = require('./webpack.js')

const server = express()
const bundle = webpack(config)

server.engine('handlebars', expressHB());
server.set('view engine', 'handlebars');
server.set('views', __dirname + '/views');
server.use(express.static('public'))

server.get('/', function (req, res) {
  res.render('app');
});

server.use(WebpackDevMiddleware(bundle, {
  publicPath: config.output.publicPath
}))
server.use(WebpackHotMiddleware(bundle, {
  publicPath: config.output.publicPath
}))

server.listen(3000, () => console.log('Test app listening on port 3000!'))
