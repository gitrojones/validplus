const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './validplus.js'),

  output: {
    path: path.resolve(__dirname, './'),
    filename: 'ValidPlus.js',
    library: 'ValidPlus',
    libraryTarget: 'umd'
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  mode: process.env.NODE_ENV || 'production',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env']
            }
          }
        ]
      }
    ]
  }
}
