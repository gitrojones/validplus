const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: {
		validplus: path.resolve(__dirname, './validplus'),
		vpvue: path.resolve(__dirname, './src/vue'),
		'ssr/vpvue': path.resolve(__dirname, './src/vue/index.ssr'),
	},

	target: ['web', 'es5'],

	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
		libraryTarget: 'commonjs2'
	},

	cache: {
	  type: 'filesystem',
		buildDependencies: {
	  	config: [__filename],
			dotFiles: [
				path.resolve(__dirname, '.eslintrc'),
				path.resolve(__dirname, 'babel.config.js'),
        path.resolve(__dirname, 'tsconfig.json')
			]
		}
	},

	resolve: {
		alias: {
			'src': path.resolve(__dirname, './src'),
			'lib': path.resolve(__dirname, './lib')
		},
		extensions: [ '.js', '.ts' ]
	},

	optimization: {
		minimizer: [
		  new TerserPlugin({
				terserOptions: {
					compress: {
						// drop_console: true
					}
				}
			})
		]
	},

	// VPVue uses validplus internally
	externals: {
		validplus: 'validplus'
	},

	devtool: 'source-map',

	module: {
		rules: [
			{
				test: /\.js$/,
				use: [ 'source-map-loader' ],
				enforce: 'pre'
			},
			{
			  test: /\.tsx?$/,
				exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
				use: [
					'babel-loader',
					'ts-loader'
				]
			},
			{
				test: /\.jsx?$/,
				exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new CompressionPlugin({
			filename: '[path][base].gz[query]',
			algorithm: 'gzip',
			test: /\.js$/,
			threshold: 10240,
			minRatio: 0.8
		}),

		new CompressionPlugin({
			filename: '[path][base].br[query]',
			algorithm: 'brotliCompress',
			test: /\.(js|css|html|svg)$/,
      compressionOptions: {
				level: 11
			},
			threshold: 10240,
			minRatio: 0.8
		})
	]
};
