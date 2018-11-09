const path = require('path')
const nodeExternals = require('webpack-node-externals')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isCoverage = process.env.NODE_ENV === 'coverage'
const isProd = process.env.PROD === 'true'
  ? true
  : process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    testapp: './dev/entry.js'
  },

  output: {
    path: path.resolve(__dirname, 'dev/dist'),
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    filename: '[name].js'
  },

  target: 'node',
  devtool: 'inline-cheap-module-source-map',

  node: {
    __dirname: true,
    __filename: true
  },

  externals: [
    nodeExternals()
  ],

  resolve: {
    extensions: [
      '.js',
      '.json',
      '.vue'
    ],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@lib': path.resolve(__dirname, './lib'),
      '#': path.resolve(__dirname, 'dev/src'),
      'VPVue': path.resolve(__dirname, 'src/vue/index'),
      'ValidPlus': path.resolve(__dirname, './validplus')
    }
  },

  mode: isProd ? 'production' : 'development',

  module: {
    rules: [
      ...(isCoverage ? [{
        test: /\.js/,
        resourceQuery: /blockType=test/,
        include: (file) => (
          /src/.test(file) ||
          /dev\/src/.test(file)
        ),
        exclude: (file) => (
          /src\/vue\//.test(file)
        ),
        loader: 'istanbul-instrumenter-loader',
        query: {
          esModules: true
        }
      }]: []),
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
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          optimizeSSR: false
        }
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
    new VueLoaderPlugin()
  ]
}