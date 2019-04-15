const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    ValidPlus: path.resolve(__dirname, './validplus'),
    VPVue: path.resolve(__dirname, './src/vue/index'),
    'SSR/VPVue': path.resolve(__dirname, './src/vue/index.ssr'),
  },

	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
		library: '[name]',
		libraryTarget: 'commonjs2'
	},

  externals: {
    validplus: 'validplus',
    vue: 'vue'
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lib': path.resolve(__dirname, './lib'),
    },
    extensions: ['.js', '.ts', '.vue'],
  },

	optimization: {
		minimizer: [
			new UglifyJSPlugin({
				uglifyOptions: {
					compress: {
						pure_funcs: [ 'debug' ]
					},
					mangle: {
						reserved: [ 'debug' ]
					}
				}
			})
		]
	},

	mode: 'production',

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
        use: 'vue-loader'
      },
			{
				test: /\.(js|ts)x?$/,
				exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
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
									'@babel/preset-typescript'
								]
							],
							plugins: [
                '@babel/plugin-transform-typescript',
								'@babel/plugin-transform-runtime',
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
								'@babel/plugin-proposal-object-rest-spread'
							],
              comments: process.env.NODE_ENV !== 'production',
              sourceType: 'unambiguous'
						}
					}
				]
			}
		]
	},
	plugins: [
    new VueLoaderPlugin(),
		new CompressionPlugin({
			filename: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.js$/,
			threshold: 10240,
			minRatio: 0.8
		}),

		new BrotliPlugin({
			asset: '[path].br[query]',
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0.8
		})
	]
};
