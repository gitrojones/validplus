const Webpack = require('webpack')
const Mocha = require('mocha')
const fs = require('fs')
const path = require('path')

const server = require('express')()
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')

const buildBundle = (bundle) => {
  const builder = Webpack(bundle)
  
  builder.run((err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    console.log('Output Successful!')
  })
}


if (process.env.APP === 'true') {
  const config = require('./dev.webpack.js')
  const bundle = Webpack(config)

  server.use(WebpackDevMiddleware(bundle, {
    publicPath: config.output.publicPath
  }))
  server.use(WebpackHotMiddleware(bundle, {
    publicPath: config.output.publicPath
  }))

  server.listen(12000, () => console.log('Test App listening on port 12000!'))
}

if (process.env.TEST === 'true') {
  const tests = path.resolve('./test')
  let mocha = new Mocha()

  fs.readdirSync(tests).filter(file => {
    return file.substr(-8) === '.test.js'
  }).forEach(file => {
    mocha.addFile(path.join(tests, file))
  })

  mocha.run(failures => {
    process.exitCode = failures ? -1 : 0
  })
}

buildBundle(require('./build.webpack.js'))