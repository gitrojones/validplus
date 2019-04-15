const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    ValidPlus: path.resolve(__dirname, './validplus'),
    VPVue: path.resolve(__dirname, './src/vue'),
    'SSR/VPVue': path.resolve(__dirname, './src/vue/index.ssr'),
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'commonjs2',
  },

  externals: {
    validplus: 'validplus',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lib': path.resolve(__dirname, './lib'),
    },
    extensions: ['.js', '.ts'],
  },

  optimization: {
    minimizer: [new UglifyJSPlugin({})],
  },

  mode: 'production',

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
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
                  },
                  '@babel/preset-typescript',
                ],
              ],
              plugins: [
                '@babel/plugin-transform-typescript',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread'
              ],
            },
          },
        ],
      },
    ],
  },
};
