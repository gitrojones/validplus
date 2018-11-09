const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('vue-html-webpack-plugin')

const devBundle = merge(require('./build.webpack.js'), {
  entry: {
    testapp: './dev/entry.js'
  },
  output: {
    path: path.resolve(__dirname, 'dev/dist'),
    filename: '[name].js',
    libraryTarget: 'var'
  },
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.vue'
    ],
    alias: {
      '#': path.resolve(__dirname, 'dev/src'),
      'VPVue': path.resolve(__dirname, 'src/vue/index'),
      'ValidPlus': path.resolve(__dirname, './validplus')
    }
  },
  devtool: 'eval-source-map',
  mode: process.env.NODE_ENV || 'production',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        loader: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      vue: true,
      chunks: ['testapp']
    })
  ]
})

devBundle.externals = {}
module.exports = devBundle
