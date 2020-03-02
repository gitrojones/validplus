const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('vue-html-webpack-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production';

const devBundle = {
  entry: {
    testapp: './dev/entry.js',
    ValidPlus: path.resolve(__dirname, './validplus'),
    VPVue: path.resolve(__dirname, './src/vue/index'),
    'SSR/VPVue': path.resolve(__dirname, './src/vue/index.ssr'),
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'var',
  },

  resolve: {
    extensions: ['.js', '.ts', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lib': path.resolve(__dirname, './lib'),
      '#': path.resolve(__dirname, 'dev/src'),
      VPVue: path.resolve(__dirname, 'src/vue'),
      'SSR/VPVue': path.resolve(__dirname, 'src/vue/index.ssr'),
      validplus: path.resolve(__dirname, 'dist/ValidPlus')
    },
  },

  externals: {
    validplus: 'validplus'
  },

  devtool: 'eval-source-map',

  mode: isProd ? 'production' : 'development',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(js|ts)x?$/,
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: '>0.25%, not dead',
                    useBuiltIns: 'usage',
                    loose: true
                  },
                  '@babel/preset-typescript',
                ],
              ],
              plugins: [
                '@babel/plugin-transform-typescript',
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                '@babel/plugin-proposal-object-rest-spread',
                'babel-plugin-lodash'
              ],
              comments: true,
              sourceType: 'unambiguous'
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        loader: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
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
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new VueLoaderPlugin(),

    new LodashWebpackPlugin(),

    new HtmlWebpackPlugin({
      vue: true,
      chunks: ['testapp'],
    }),
  ],
}

devBundle.externals = {};
module.exports = devBundle;
