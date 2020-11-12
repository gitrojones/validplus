const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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

module.exports = [{
	entry: {
		vpvue: path.resolve(__dirname, './src/vue'),
		validplus: path.resolve(__dirname, './validplus'),
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
	  new BundleAnalyzerPlugin(),

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
}, {
	entry: {
		'vpvue.browser': path.resolve(__dirname, './src/vue'),
		'validplus.browser': path.resolve(__dirname, './validplus'),
		'ssr/vpvue.browser': path.resolve(__dirname, './src/vue/index.ssr'),
	},

	target: ['web', 'es5'],

	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
		libraryTarget: 'window',
		library: 'VP'
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
				  babel_loader,
					'ts-loader'
				]
			},
			{
				test: /\.jsx?$/,
				exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        use: [
        	babel_loader
				]
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
}];
