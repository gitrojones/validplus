const Webpack = require('webpack')
const Mocha = require('mocha')
const fs = require('fs')
const path = require('path')

const build = require('./build.webpack.js')
const builder = Webpack(build)

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

  if (process.env.TEST === 'true') {
    const tests = path.resolve('./test')
    let mocha = new Mocha();

    fs.readdirSync(tests).filter(file => {
      return file.substr(-8) === '.test.js'
    }).forEach(file => {
      mocha.addFile(path.join(tests, file))
    })

    mocha.run(failures => {
      process.exitCode = failures ? -1 : 0;
    })
  }
})
