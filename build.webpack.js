const path = require('path')

module.exports = {
  entry: {
    ValidPlus: path.resolve(__dirname, './validplus'),
    VPVue: path.resolve(__dirname, './src/vue')
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd'
  },

  externals: {
    ValidPlus: 'ValidPlus'
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
        exclude: (file) => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: '>0.25%, not dead',
                  useBuiltIns: 'usage'
                }]
              ]
            }
          }
        ]
      }
    ]
  }
}
