const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const babel_loader = {
  loader: 'babel-loader',
  options: {
    presets: [
      ['@babel/preset-env', {
        targets: '>0.25%, not dead',
        useBuiltIns: 'usage',
        corejs: '3.6'
      }]
    ]
  }
}

module.exports = {
  context: __dirname,

  entry: {
    jquery: [
      'webpack-hot-middleware/client?reload=true',
      './src/jquery/entry.js'
    ],
    vue: [
      'webpack-hot-middleware/client?reload=true',
      './src/vue/entry.js'
    ],
    react: [
      'webpack-hot-middleware/client?reload=true',
      './src/react/entry.js'
    ],
    angular: [
      'webpack-hot-middleware/client?reload=true',
      './src/angular/entry.js'
    ]
  },

  target: ['web', 'es5'],

  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'vp-[name].js',
    publicPath: '/'
  },

  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
      dotFiles: [
        path.resolve(__dirname, '../.eslintrc'),
        path.resolve(__dirname, '../babel.config.js'),
        path.resolve(__dirname, '../tsconfig.json')
      ]
    }
  },

  mode: process.env.NODE_ENV,

  resolve: {
    alias: {
      'vue$': path.resolve(__dirname, '../node_modules/vue/dist/vue.js'),
      'validplus': isDev ? path.resolve(__dirname, '../validplus.ts') : path.resolve(__dirname, '../dist/validplus-poly.js'),
      'vpvue': isDev ? path.resolve(__dirname, '../src/vue') : path.resolve(__dirname, '../dist/vpvue-poly.js'),
      'dev': path.resolve(__dirname, './src'),
      'src': path.resolve(__dirname, '../src'),
      'lib': path.resolve(__dirname, '../lib')
    },
    extensions: [ '.js', '.ts', '.vue' ]
  },

  target: ['web', 'es5'],

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ 'source-map-loader' ],
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file) && !/\/dist\//.test(file),
        use: [
          babel_loader,
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file) && !/\/dist\//.test(file),
        use: [
          babel_loader
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              esModule: false
            }
          },
          'less-loader'
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: '../dist/validplus.browser.js' }
      ]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ]
};
